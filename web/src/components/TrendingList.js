import api from "../api/index";
import { Button, ListGroup, ListGroupItem, Placeholder } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getRandomInt, placeholderData } from "../utils/random";
import { UTCStrToKSTStr } from "../utils/timezone";
import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";

function TrendingList() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["trendings"],
    queryFn: api.getTrendingList,
  });

  const listItem = isLoading
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
    : data[0].map((trending, idx) => {
        return (
          <ListGroupItem
            key={trending.keyword}
            as="li"
            className="list-item-container"
          >
            <div className="list-item-index">{idx + 1}</div>
            <a
              className="list-item-text"
              href={
                "https://namu.wiki/w/" + encodeURIComponent(trending.keyword)
              }
              target="_blank"
              rel="noreferrer"
            >
              <div className="fw-bold">{trending.keyword}</div>
            </a>

            <Button
              as={Link}
              to={`/m/${encodeURIComponent(trending.keyword)}`}
              className="soup-button list-item-button fw-bold"
            >
              기록
            </Button>
          </ListGroupItem>
        );
      });

  let errorMessage;
  if (error) {
    console.error(error);
    errorMessage = (
      <div className="error-page">
        <span className="error-message">서버에 접속할 수 없습니다.</span>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>숲Soup - 나무위키 실시간 검색어</title>
        <meta
          name="description"
          content={`숲, 나무위키 실시간 검색어, ${
            isLoading ? "" : data[0].map((t) => t.keyword).join(", ")
          }`}
        />
        <meta
          name="keywords"
          content="namu, wiki, 숲, 나무위키, 인기, 검색어, 실검, 실시간 검색어, 실시간 인기 검색어, 나무위키 실검 알려주는 채널, 실검 채널"
        />
        <meta property="og:title" content="숲Soup - 나무위키 실시간 검색어" />
      </Helmet>
      <div className="list-container">
        {errorMessage}
        <ListGroup as="ol">{listItem}</ListGroup>
        <div className="crawled-at">
          기준 시각 : {isLoading ? "" : UTCStrToKSTStr(data[1])}
        </div>
      </div>
    </>
  );
}

export default TrendingList;
