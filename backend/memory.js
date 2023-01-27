import { v1 } from "uuid";
import logger from "./logger.js";

/**
 * 네, 조촐해 보이겠지만 우리 서비스의 데이터베이스입니다.
 */
let memory = [];
let parsedAt;

// memory = [ { keyword, memo } ], length = 10
// memo = [ { uuid, context, lastWriter }], length = 10

/**
 * DB 갈아엎기, 대신 이전 메모는 유지
 * @param {Array} newTrendings 나무위기 인기 검색어 목록
 */
const resetMemory = (newTrendings) => {
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

  parsedAt = new Date().toString();
  logger.info(parsedAt + " :: Server reset trending data memory.");
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
};
