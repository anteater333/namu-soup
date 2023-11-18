import { assertEquals, assertTrue } from "./asserts.js";
import { SameUserGuard, SameMemoGuard } from "./guards.js";
import db from "./memory.js";

export const tests = [
  function SameUserGuard로_사용자를_블랙리스트에_추가하고_일정_시간마다_삭제한다() {
    return new Promise((resolve, reject) => {
      // 테스트 환경에서 Blacklist 수명은 5초로 가정
      SameUserGuard.setGlobalSameUserGuardPeriod(5000);

      const user = "127.0.0.1";

      const checkedResult = SameUserGuard.checkUserRegistered(user);

      assertEquals(false, checkedResult);

      SameUserGuard.registerUser(user);

      setTimeout(() => {
        assertEquals(true, SameUserGuard.checkUserRegistered(user));
      }, 3000);
      setTimeout(() => {
        assertEquals(false, SameUserGuard.checkUserRegistered(user));
        resolve();
      }, 6000);
    });
  },
  function MemoSpamGuard로_한_키워드_안에서_이미_등록된_메모를_금지한다() {
    return new Promise((resolve, reject) => {
      db.initMemory().then(() => {
        const keyword = db.getAllMemory()[0][0].keyword;

        const memo = "TEST";

        db.setMemory(keyword, 0, "", memo, "127.0.0.1");

        const checkedResult = SameMemoGuard.checkMemoExists(keyword, memo);

        assertTrue(checkedResult);

        resolve();
      });
    });
  },
];

// new Promise((resolve, reject) => {
//   resolve();
// })
//   .then(async () => {
//     let count = 1;
//     for await (const TC of testCases) {
//       try {
//         console.log(TC.name);
//         await TC();

//         console.log(`Test Case #${count} Passed : `);
//         console.log(TC.name);
//       } catch (error) {
//         console.log(`Test Case #${count} Failed : `);
//         console.log(TC.name);
//         console.log(error);
//       }
//       count++;
//       console.log("============================");
//     }
//   })
//   .finally(() => {
//     console.log(`test ended - ${import.meta.url}`);
//   });
