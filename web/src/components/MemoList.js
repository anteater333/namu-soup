import api from "../api/index";
import { useEffect, useState } from "react";
import {
  Button,
  Form,
  ListGroup,
  ListGroupItem,
  Spinner,
} from "react-bootstrap";
import { useParams } from "react-router-dom";

function MemoList() {
  // memos = [ { uuid, context, lastWriter } ], length = 10
  const [memos, setMemos] = useState([]);
  const [crawledAt, setCrawledAt] = useState("");
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [memoMode, setMemoMode] = useState(false);
  const [selectedMemo, setSelectedMemo] = useState("");
  const [selectedIdx, setSelectedIdx] = useState(-1);
  const [uuid, setUuid] = useState("");

  const keyword = useParams().keyword;

  useEffect(() => {
    const refreshList = async () => {
      setLoading(true);
      try {
        const result = await api.getMemoList(keyword);
        if (result) {
          setMemos(result[0]);
          setCrawledAt(result[1]);
        } else {
          alert("현재 실시간 순위에 존재하지 않는 검색어입니다.");
          // eslint-disable-next-line no-restricted-globals
          location.href = "/";
        }
      } catch (error) {
        console.log(error);
        setError(error);
      }
      setLoading(false);
    };

    refreshList();
  }, [keyword]);

  const handleMemoButton = (memo, idx) => {
    setUuid(memo.uuid);
    setSelectedMemo(memo.context);
    setSelectedIdx(idx);
    toggleMemoMode();
  };

  const handleSubmitButton = async () => {
    if (!selectedMemo) {
      alert("내용을 입력해주세요.");
      return;
    }
    setLoading(true);
    const result = await api.writeMemo(
      keyword,
      uuid,
      selectedMemo,
      selectedIdx
    );
    setLoading(false);
    if (!result) {
      alert(
        `${
          selectedIdx + 1
        }번 슬롯에 메모를 작성하는데 실패했습니다... \n다른 사람이 먼저 수정을 완료하였거나, 검색어가 순위에서 내려갈 경우 실패합니다.`
      );
    }
    toggleMemoMode();
    // eslint-disable-next-line no-restricted-globals
    location.reload();
  };

  const toggleMemoMode = () => {
    setMemoMode(!memoMode);
  };

  let inputForm;
  if (memoMode) {
    inputForm = (
      <div>
        <div className="overlay" onClick={toggleMemoMode}></div>
        <div className="input-form-container">
          <Form.Control
            className="input-form-control"
            as="textarea"
            value={selectedMemo}
            placeholder="짧고 간결하게 적어봅시다."
            onChange={(e) => {
              setSelectedMemo(e.target.value);
            }}
          ></Form.Control>
          <div className="input-button-container">
            <Button onClick={handleSubmitButton}>메모</Button>
            <Button onClick={toggleMemoMode}>닫기</Button>
          </div>
        </div>
      </div>
    );
  }

  let spinner;
  if (loading) {
    spinner = (
      <div className="load-spinner-container">
        <Spinner className="load-spinner" animation="grow" />
      </div>
    );
  }

  const listItem = memos.map((memo, idx) => {
    const memoButton = (
      <Button
        className="list-item-button fw-bold"
        onClick={() => handleMemoButton(memo, idx)}
      >
        메모
      </Button>
    );
    if (memo.context) {
      return (
        <ListGroupItem
          key={memo.uuid}
          as="li"
          className="memo-list-item-container list-item-container"
        >
          <div className="memo-list-item list-item-text fw-bold">
            <div className="memo-text">{memo.context}</div>
            <div className="last-writer">{memo.lastWriter}</div>
          </div>
          {memoButton}
        </ListGroupItem>
      );
    } else {
      return (
        <ListGroupItem key={idx} as="li" className="list-item-container">
          <div className="memo-list-item list-item-text fw-bold">
            <div className="empty-memo-text">{`< 빈 메모 슬롯 >`}</div>
          </div>
          {memoButton}
        </ListGroupItem>
      );
    }
  });

  let errorMessage;
  if (error) {
    errorMessage = (
      <div className="error-page">
        <span className="error-message">
          오류가 발생했습니다. <p />
          개발자에게 연락해주세요.
        </span>
      </div>
    );
  }

  return (
    <div className="list-container">
      {errorMessage}
      {spinner}
      {inputForm}
      <ListGroup as="ol">{listItem}</ListGroup>
      <a
        href={"https://namu.wiki/w/" + keyword}
        target="_blank"
        rel="noreferrer"
      >
        <div className="current-keyword">{keyword}</div>
      </a>
      <div className="crawled-at">기준 시각 : {crawledAt}</div>
    </div>
  );
}

export default MemoList;
