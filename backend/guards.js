// Decorator 형태로 IGuard를 만들면 아주 즐겁겠지만 참았다. 휴
// KISS

import db from "./memory.js";

/**
 * 동일 사용자가 메모 작성에 한 번 성공하면 일정 시간 동안 메모를 작성할 수 없도록 만듭니다.
 */
export class SameUserGuard {
  /**
   * @type {Record<string, number>}
   */
  static _blacklist = {};

  static _period = 30000; // Blacklist 등록 유효 기간 30초

  static checkUserRegistered(user) {
    return (
      this._blacklist[user] !== undefined &&
      Date.now() - this._blacklist[user] < this._period
    );
  }
  static registerUser(user) {
    this._blacklist[user] = Date.now();
  }

  /** 특수 환경(Test)에 따라 유효 기간을 조절 */
  static setGlobalSameUserGuardPeriod(period) {
    this._period = period;
  }
}

/**
 * 작성하려는 메모가 현재 키워드 안의 메모들과 유사하면 메모를 작성할 수 없도록 만듭니다.
 */
export class SameMemoGuard {
  static checkMemoExists(keyword, memo) {
    const memory = db.getMemory(keyword)[0];

    if (memory === `keywordNotFound`) return false;

    const foundMemo = memory.find((val) => {
      return val.context === memo;
    });

    return !!foundMemo;
  }
}
