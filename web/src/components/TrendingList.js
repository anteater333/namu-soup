import api from "../api/index";
import { useEffect, useState } from "react";
import { Button, ListGroup, ListGroupItem, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";

function TrendingList() {
  const [trendings, setTrendings] = useState([]);
  const [crawledAt, setCrawledAt] = useState("");
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const refreshList = async () => {
      setLoading(true);
      try {
        const result = await api.getTrendingList();
        setTrendings(result[0]);
        setCrawledAt(result[1]);
      } catch (error) {
        setError(error);
      }
      setLoading(false);
    };

    refreshList();
  }, []);

  let spinner;
  if (loading) {
    spinner = (
      <div className="load-spinner-container">
        <Spinner className="load-spinner" animation="grow" />
      </div>
    );
  }

  const listItem = trendings.map((trending, idx) => {
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
          className="list-item-button fw-bold"
        >
          메모
        </Button>
      </ListGroupItem>
    );
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
      <ListGroup as="ol">{listItem}</ListGroup>
      <div className="crawled-at">기준 시각 : {crawledAt}</div>
    </div>
  );
}

export default TrendingList;
