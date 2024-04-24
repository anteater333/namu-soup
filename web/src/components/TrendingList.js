import api from "../api/index";
import { useCallback, useEffect, useState } from "react";
import { Button, ListGroup, ListGroupItem, Placeholder } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getRandomInt, placeholderData } from "../utils/random";
import { UTCStrToKSTStr } from "../utils/timezone";
import { Helmet } from "react-helmet-async";

function TrendingList() {
  const [trendings, setTrendings] = useState([]);
  const [crawledAt, setCrawledAt] = useState("");
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const refreshList = useCallback(async () => {
    setLoading(true);
    try {
      const result = await api.getTrendingList();
      setTrendings(result[0]);
      setCrawledAt(UTCStrToKSTStr(result[1]));
    } catch (error) {
      setError(error);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    refreshList();
  }, [refreshList]);

  const listItem = loading
    ? placeholderData.map((idx) => {
        const phLen = getRandomInt(1, 10);
        return (
          <ListGroupItem key={idx} as="li" className="list-item-container">
            <div className="list-item-index">{idx + 1}</div>

            <Placeholder animation="glow" xs={8}>
              <Placeholder xs={phLen} bg="success" />
            </Placeholder>

            <Button className="soup-button list-item-button fw-bold">
              기록
            </Button>
          </ListGroupItem>
        );
      })
    : trendings.map((trending, idx) => {
        return (
          <ListGroupItem
            key={trending.keyword}
            as="li"
            className="list-item-container"
          >
            <div className="list-item-index">{idx + 1}</div>
            <a
              className="list-item-text"
              href={"https://namu.wiki/w/" + trending.keyword}
              target="_blank"
              rel="noreferrer"
            >
              <div className="fw-bold">{trending.keyword}</div>
            </a>

            <Button
              as={Link}
              to={`/m/${trending.keyword}`}
              className="soup-button list-item-button fw-bold"
            >
              기록
            </Button>
          </ListGroupItem>
        );
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
        <title>숲Soup - 나무위키 인기 검색어</title>
        <meta
          name="description"
          content={`숲, 나무위키 인기 검색어, ${trendings
            .map((t) => t.keyword)
            .join(", ")}`}
        />
        <meta
          name="keywords"
          content="namu, wiki, 숲, 나무위키, 인기, 검색어, 실검, 실시간 검색어, 실시간 인기 검색어, 나무위키 실검 알려주는 채널"
        />
        <meta property="og:title" content="숲Soup - 나무위키 인기 검색어" />
      </Helmet>
      <div className="list-container">
        {errorMessage}
        <ListGroup as="ol">{listItem}</ListGroup>
        <div className="crawled-at">기준 시각 : {crawledAt}</div>
      </div>
    </>
  );
}

export default TrendingList;
