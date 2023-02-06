import { v1 } from "uuid";
import logger from "./logger.js";

import fs from "fs/promises";
import { writeFile } from "fs";
import { getLimitedCurrentTime } from "./util.js";

/**
 * 복구용 파일 경로
 */
const recoveryFilePath = "./logs/soup_recovery.json";

/**
 * 네, 조촐해 보이겠지만 우리 서비스의 데이터베이스입니다.
 */
let memory = [];
let parsedAt;

// memory = [ { keyword, memo } ], length = 10
// memo = [ { uuid, context, lastWriter }], length = 10

/**
 * 서버 실행 시 메모리 초기 설정
 * 지정 경로에 이전 실검 데이터 파일이 존재하면 그것을 사용해 초기화
 * 파일이 없으면 경고 출력 후 그냥 넘어감
 */
const initMemory = async () => {
  try {
    const recoveryFileData = await fs.readFile(recoveryFilePath, "utf-8");

    const [recoveredTrendingData, parsedAt] = JSON.parse(recoveryFileData);

    resetMemory(recoveredTrendingData, parsedAt);
  } catch (error) {
    if (error.code === "ENOENT") {
      logger.warn(`could not found recovery file.`);
      logger.warn(`No trending data`);
    } else {
      logger.error(`Unhandled file system error: ${error.code}`);
      logger.error(error);
    }
    logger.warn(`Failed to initiate trending database.`);
  }
};

/**
 * DB 갈아엎기, 대신 이전 메모는 유지
 * @param {Array} newTrendings 나무위기 인기 검색어 목록
 */
const resetMemory = (newTrendings, newParsedAt) => {
  const newMemory = [];

  for (const trending of newTrendings) {
    const found = memory.findIndex((val) => {
      return val.keyword == trending;
    });
    newMemory.push({
      keyword: trending,
      memo:
        found == -1
          ? Array.from({ length: 10 }, () => {
              return {};
            })
          : memory[found].memo,
    });
  }

  memory = newMemory;

  if (!newParsedAt) parsedAt = getLimitedCurrentTime(new Date());
  else parsedAt = newParsedAt;
  logger.info(
    "Server reset trending data memory. (data parsed at " + parsedAt + ")"
  );
  logger.info(`new trending data : [ ${newTrendings.join(", ")} ]`);

  // 서버 종료 시 복구용 데이터 저장
  writeFile(
    recoveryFilePath,
    JSON.stringify([newTrendings, parsedAt]),
    (error) => {
      if (error) {
        logger.error(`Failed to save recovery data.`);
        logger.error(error);
      }
    }
  );
};

/**
 * 실시간 검색어 키워드에 메모 하기
 * 경쟁적 기록 -> 기록이 완료되면 새 uuid를 발급한다. uuid가 다를 경우 기록은 취소된다
 * @param {*} keyword
 * @param {*} memoSlotNum
 * @param {*} uuid
 * @param {*} memo
 * @param {*} writer
 * @returns
 */
const setMemory = (keyword, memoSlotNum, uuid, memo, writer) => {
  // 키워드 존재 여부
  const found = memory.findIndex((val) => {
    return val.keyword == keyword;
  });
  if (-1 == found) {
    return { msg: `keywordNotFound` };
  }

  const slot = memory[found];
  const savedMemo = slot.memo[memoSlotNum];
  // 메모 배열 범위 초과 여부
  if (!savedMemo) {
    return { msg: `badSlotNumber` };
  }

  if (memo.length > 140) {
    return { msg: "memoTooLong" };
  }

  // uuid 일치 여부
  if (!savedMemo.uuid || savedMemo.uuid == uuid) {
    slot.memo[memoSlotNum] = {
      uuid: v1(),
      context: memo,
      lastWriter: writer,
    };

    console.log(
      new Date().toString() +
        ` :: new Memo // ${keyword} // ${memoSlotNum} // ${memo} // ${writer}`
    );

    return { msg: `done`, newMemo: slot.memo[memoSlotNum] };
  } else {
    return { msg: `thatWasClose` };
  }
};

/**
 * 크롤링해 저장해놓은 데이터를 읽어온다.
 * @returns
 */
const getAllMemory = () => {
  return [memory, parsedAt];
};

/**
 * 키워드를 검색해 해당 키워드에 대한 메모 목록을 읽어온다.
 * @param {*} keyword
 */
const getMemory = (keyword) => {
  // 키워드 존재 여부
  const found = memory.findIndex((val) => {
    return val.keyword == keyword;
  });
  if (-1 == found) {
    return [`keywordNotFound`];
  }

  return [memory[found].memo, parsedAt];
};

export default {
  resetMemory,
  getAllMemory,
  getMemory,
  setMemory,
  initMemory,
};
