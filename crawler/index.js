import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import init from "./crawler.js";
import db from "./memory.js";

const app = express();
const port = 3030;

init();

app.use(cors({ origin: "*" }));

app.use(bodyParser.json());

/**
 * 전체 순위 가져오기
 */
app.get("/api/", (req, res) => {
  res.send(db.getAllMemory());
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
