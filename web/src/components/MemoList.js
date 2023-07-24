import api from "../api/index";
import { useCallback, useEffect, useState } from "react";
import {
  Button,
  Form,
  ListGroup,
  ListGroupItem,
  Placeholder,
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import moment from "moment";
import "moment-timezone";
import { getRandomInt, placeholderData } from "../utils/random";
import { UTCStrToKSTStr } from "../utils/timezone";
import { Helmet } from "react-helmet-async";

function MemoList() {
  // memos = [ { uuid, context, lastWriter } ], length = 10
  const [memos, setMemos] = useState([]);
  const [crawledAt, setCrawledAt] = useState("");
  const [error, setError] = useState();
  const [memoError, setMemoError] = useState(""); // 메모 작성 중 발생한 에러
  const [loading, setLoading] = useState(false);
  const [memoMode, setMemoMode] = useState(false);
  const [selectedMemo, setSelectedMemo] = useState("");
  const [selectedIdx, setSelectedIdx] = useState(-1);
  const [uuid, setUuid] = useState("");

  // ref. https://reactrouter.com/en/main/route/route#splats
  const { "*": keyword } = useParams();

  const refreshList = useCallback(async () => {
    setLoading(true);
    try {
      const result = await api.getMemoList(keyword);
      if (result) {
        setMemos(result[0]);
        setCrawledAt(UTCStrToKSTStr(result[1]));
      } else {
        // 404 - 해당 키워드는 현재 서버에 저장된 실검 목록에 존재하지 않음
        // eslint-disable-next-line no-restricted-globals
        location.href = "/namu-soup";
      }
    } catch (error) {
      console.error(error);
      setError(error);
    }
    setLoading(false);
  }, [keyword]);

  useEffect(() => {
    refreshList();
  }, [refreshList]);

  // Catch ESC for disabling memo mode
  useEffect(() => {
    const keyDownHandler = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();

        setMemoMode(false);
      }
    };

    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, []);

  useEffect(() => {
    if (window.matchMedia("(max-width: 800px)").matches) {
      window.scrollTo(0, memoMode ? document.body.scrollHeight : 0);
    }
  }, [memoMode]);

  const handleMemoButton = (memo, idx) => {
    setUuid(memo.uuid);
    setSelectedMemo(memo.context ? memo.context : "");
    setSelectedIdx(idx);
    setMemoError("");
    setMemoMode(!memoMode || idx !== selectedIdx);
  };

  const handleSubmitButton = async () => {
    if (!selectedMemo) {
      setMemoError("내용을 입력해주세요.");
      return;
    }
    if (selectedMemo.length > 140) {
      setMemoError("내용이 너무 깁니다.");
      return;
    }

    const result = await api.writeMemo(
      keyword,
      uuid,
      selectedMemo,
      selectedIdx
    );

    if (!result[0]) {
      switch (result[1]) {
        case "notFound":
          setMemoError("");
          toggleMemoMode();
          break;
        case "duplicated":
          setMemoError("같은 내용이 존재합니다.");
          break;
        case "missed":
          setMemoError("앗");
          setSelectedMemo("");
          break;
        case "tooLong":
          setMemoError("내용이 너무 깁니다.");
          break;
        case "tooMany":
          setMemoError("잠시만 기다려주세요.");
          break;
        default:
          setMemoError("알 수 없는 오류 발생");
      }
    } else {
      setMemoError("");
      setMemoMode(false);
    }

    refreshList();
  };

  const toggleMemoMode = () => {
    setMemoMode(!memoMode);
  };

  let inputForm;
  if (memoMode) {
    inputForm = (
      <>
        <div className="input-form-container">
          <Form.Control
            className="input-form-control"
            as="input"
            value={selectedMemo}
            placeholder="짧고 간결하게 적어봅시다."
            onChange={(e) => {
              setSelectedMemo(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleSubmitButton();
              }
            }}
          ></Form.Control>
          <div className="input-button-container">
            <div className="input-error-message">{memoError}</div>
            <div>{selectedIdx}번 슬롯</div>
            <div className="input-length-counter">
              {selectedMemo.length}/140
            </div>
            <div className="input-button-inner-container">
              <Button className="soup-button" onClick={handleSubmitButton}>
                기록
              </Button>
              <Button
                className="soup-button soup-button-reject"
                onClick={toggleMemoMode}
              >
                닫기
              </Button>
            </div>
          </div>
        </div>
      </>
    );
  }

  const listItem = loading
    ? placeholderData.map((idx) => {
        const phLen = getRandomInt(1, 10);
        return (
          <ListGroupItem
            key={idx}
            as="li"
            className="memo-list-item-container list-item-container"
          >
            <div className="memo-list-item list-item-text fw-bold">
              <Placeholder animation="glow" xs={9}>
                <Placeholder xs={phLen} bg="success" />
              </Placeholder>
            </div>
            <Button className="soup-button list-item-button fw-bold">
              기록
            </Button>
          </ListGroupItem>
        );
      })
    : memos.map((memo, idx) => {
        const memoButton = (
          <Button
            className="soup-button list-item-button fw-bold"
            onClick={() => handleMemoButton(memo, idx)}
          >
            기록
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
                <div className="last-writer">
                  {memo.lastWriter} -{" "}
                  {moment(memo.memoAt)
                    .tz("Asia/Seoul")
                    .format("yyyy-MM-DD hh:mm:ss z")}
                </div>
              </div>
              {memoButton}
            </ListGroupItem>
          );
        } else {
          return (
            <ListGroupItem key={idx} as="li" className="list-item-container">
              <div className="memo-list-item list-item-text fw-bold">
                <div className="empty-memo-text">{`< 빈 기록 슬롯 >`}</div>
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
        <span className="error-message">서버에 접속할 수 없습니다.</span>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>숲Soup - {keyword}</title>
        <meta
          name="description"
          content={`나무위키 ${keyword}, 숲Soup - 나무위키 인기 검색어`}
        />
        <meta
          name="keywords"
          content={`namu, wiki, 숲, 나무위키, 인기, 검색어, ${keyword}`}
        />
        <meta property="og:title" content={`숲Soup - ${keyword}`} />
      </Helmet>
      <div className="memo-list-scene">
        <div></div>
        <div className="list-container">
          {errorMessage}
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
        <div className="memo-list-scene-side">{inputForm}</div>
      </div>
    </>
  );
}

export default MemoList;
