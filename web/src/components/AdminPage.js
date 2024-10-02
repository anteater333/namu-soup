import api from "../api/index";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Button, Form, ListGroup, ListGroupItem } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import "moment-timezone";

function AdminPage() {
  const [adminPwd, setAdminPwd] = useState("");
  const { data, error, isLoading } = useQuery({
    queryKey: ["trendings"],
    queryFn: api.getTrendingList,
    refetchInterval: 60000,
  });
  const mutation = useMutation({
    mutationFn: api.removeMemo,
  });
  const queryClient = useQueryClient();

  return (
    <>
      <Helmet>
        <title>숲Soup - 관리자 페이지</title>
      </Helmet>
      <div className="admin-page-scene">
        <div className="password-form-container">
          <Form.Control
            as="input"
            type="password"
            value={adminPwd}
            onChange={(e) => {
              setAdminPwd(e.target.value);
            }}
          />
        </div>
        <div className="total-list-container mt-2">
          {isLoading ? (
            <></>
          ) : (
            data[0].map((trending, idx) => {
              return (
                <div
                  key={`trending-memo-cotainer-${idx}`}
                  className="total-list-item"
                >
                  <span className="fw-bold mb-2">{trending.keyword}</span>
                  <ListGroup>
                    {trending.memo.map((memo, jdx) => {
                      return memo.context ? (
                        <ListGroupItem
                          key={`${idx}-${jdx}`}
                          as="li"
                          className="memo-list-item-container list-item-container total-memo-list-item"
                        >
                          <div className="memo-list-item list-item-text">
                            <div className="memo-text total-memo-text">
                              {memo.context}
                            </div>
                            <div className="last-writer">{memo.lastWriter}</div>
                          </div>
                          <Button
                            className="soup-button list-item-button"
                            onClick={async () => {
                              await mutation.mutateAsync({
                                keyword: trending.keyword,
                                slot: jdx,
                                pwd: adminPwd,
                              });
                              await queryClient.invalidateQueries("trendings");
                            }}
                          >
                            삭제
                          </Button>
                        </ListGroupItem>
                      ) : (
                        <ListGroupItem
                          key={`${idx}-${jdx}`}
                          as="li"
                          className="memo-list-item-container list-item-container total-memo-list-item"
                        >
                          <div className="memo-list-item list-item-text">
                            <div className="empty-memo-text">{`< 빈 기록 슬롯 >`}</div>
                          </div>
                        </ListGroupItem>
                      );
                    })}
                  </ListGroup>
                </div>
              );
            })
          )}
        </div>
        <div className="refresh-button-container mt-4">
          <Button
            className="soup-button button-white"
            onClick={() => queryClient.invalidateQueries("trendings")}
          >
            새로고침
          </Button>
        </div>
      </div>
    </>
  );
}

export default AdminPage;
