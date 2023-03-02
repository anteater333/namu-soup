import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import * as dotenv from "dotenv";

import logger, { httpLoggerMiddleware } from "./logger.js";

import db from "./memory.js";
import { SameMemoGuard, SameUserGuard } from "./guards.js";

dotenv.config();

// 초기화
db.initMemory();

const app = express();
const port = process.env.PORT || 8080;

app.set("trust proxy", true);

app.use(cors({ origin: "*" }));

app.use(bodyParser.json());

/**
 * Logging middleware
 */
app.use(httpLoggerMiddleware);

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

  // SameUserGuard
  if (SameUserGuard.checkUserRegistered(req.ip)) {
    return res.status(429).send({ msg: "Too many requests." });
  }

  // SameMemoGuard
  if (SameMemoGuard.checkMemoExists(req.params.keyword, body.memo)) {
    return res.status(409).send({ msg: "Already registered." });
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
    res.status(410).send({ msg: "Key not matches. late or bad access" });
  } else if (result.msg == `memoTooLong`) {
    res.status(419).send({ msg: "Memo too long." });
  } else if (result.msg == `done`) {
    SameUserGuard.registerUser(req.ip);
    res.send(result.newMemo);
  }
});

/**
 * 관리자에 의한 메모 삭제
 */
app.delete("/api/:keyword/:memoSlot", (req, res) => {
  // 스키마 검사
  if (req.body.pwd === undefined) {
    return res.status(400).send({ msg: "body should be {pwd}" });
  }

  // 권한 검사
  if (process.env.ADMIN_SECRET !== req.body.pwd) {
    return res.status(401).send({ msg: "You Shall Not Pass!" });
  }

  const deletedResult = db.clearMemorySlot(
    req.params.keyword,
    req.params.memoSlot
  );

  // 삭제 요청 실패 처리
  if (deletedResult[0] === `keywordNotFound`) {
    return res.status(404).send({ msg: "Not found such keyword" });
  }
  if (deletedResult[0] === `badSlotNumber`) {
    return res.status(400).send({ msg: "Undesirable memo slot number" });
  }
  if (deletedResult[0] !== `done`) {
    return res.status(500).send({ msg: "Unreachable error" });
  }

  return res.status(200).send(deletedResult[1]);
});

app.listen(
  port,
  process.env.NODE_ENV !== "production" ? "127.0.0.1" : "0.0.0.0",
  () => {
    logger.info(`Server time : ${new Date().toString()}`);
    logger.info(`Server listening on port ${port}`);
  }
);
