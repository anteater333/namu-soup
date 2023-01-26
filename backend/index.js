import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import * as dotenv from "dotenv";

import db from "./memory.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

app.use(cors({ origin: "*" }));

app.use(bodyParser.json());

/**
 * 전체 순위 가져오기
 */
app.get("/api/", (req, res) => {
  res.send(db.getAllMemory());
});

/**
 * 전체 순위 새로 업데이트하기, 비밀번호를 가지고 있는 Agent(soup-yojeong)만이 수정 가능
 */
app.put("/api/", (req, res) => {
  // 스키마 검사
  const body = {};
  if (req.body.pwd !== undefined && req.body.trendings !== undefined) {
    body.pwd = req.body.pwd;
    body.trendings = req.body.trendings;
  } else {
    return res.status(400).send({ msg: "body should be {trendings, pwd}" });
  }

  if (process.env.AGENT_SECRET !== body.pwd) {
    return res.status(401).send({ msg: "Wrong password" });
  }

  // update trendings
  db.resetMemory(body.trendings);

  res.status(201).send({ msg: `updated` });
});

/**
 * 해당 키워드 메모 가져오기
 */
app.get("/api/:keyword", (req, res) => {
  const result = db.getMemory(req.params.keyword);

  if (result[0] == `keywordNotFound`) {
    return res.status(404).send({ msg: "Not found such keyword" });
  }
  res.send(result);
});

/**
 * 해당 키워드에 메모 적어놓기
 */
app.post("/api/:keyword", (req, res) => {
  // 스키마 검사
  const body = {};
  if (undefined != req.body.slot && req.body.memo && req.body.uuid) {
    body.slot = req.body.slot;
    body.memo = req.body.memo;
    body.uuid = req.body.uuid;
  } else {
    return res.status(400).send({ msg: "body should be {slot, memo, uuid}" });
  }

  const result = db.setMemory(
    req.params.keyword,
    body.slot,
    body.uuid,
    body.memo,
    req.ip
  );

  if (result.msg == `keywordNotFound`) {
    res.status(404).send({ msg: "Not found such keyword" });
  } else if (result.msg == `badSlotNumber`) {
    res.status(400).send({ msg: "Undesirable memo slot number" });
  } else if (result.msg == `thatWasClose`) {
    res.status(409).send({ msg: "Key not matches. late or bad access" });
  } else if (result.msg == `done`) {
    res.send(result.newMemo);
  }
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Server time : ${new Date().toString()}`);
  console.log(`Crawler listening on port ${port}`);
});
