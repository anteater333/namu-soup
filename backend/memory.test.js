import { assertEquals } from "./asserts.js";
import db from "./memory.js";

// Very simple test code

// function 메모리_초기화_테스트() {
//   db.initMemory();
// }

// 메모리_초기화_테스트();

function 길이가_긴_문자열은_거절한다() {
  console.log(길이가_긴_문자열은_거절한다.name);

  const looooooooongMemoString =
    "가슴속에 별 아침이 추억과 별에도 어머니, 한 있습니다. 무엇인지 밤을 경, 아직 이 벌레는 패, 다 사랑과 있습니다. 내일 무덤 차 라이너 이름을 프랑시스 하나에 까닭입니다. 위에도 불러 별빛이 릴케 어머니 멀리 북간도에 있습니다. 가난한 이네들은 지나가는 다하지 별빛이 이름을 별을 슬퍼하는 봅니다. 무성할 하나에 가을 딴은 때 까닭입니다. 멀리 하나의 이웃 북간도에 거외다. 지나가는 보고, 당신은 한 있습니다. 강아지, 내 이제 어머니 비둘기, 있습니다. 하늘에는 덮어 별 둘 봅니다.";

  db.initMemory().then(() => {
    const currentFirstKeyword = db.getAllMemory()[0][0];

    console.log(currentFirstKeyword.keyword);
    console.log(currentFirstKeyword.memo[0]);

    const result = db.setMemory(
      currentFirstKeyword.keyword,
      0,
      "",
      looooooooongMemoString,
      "127.0.0.1"
    );

    const expected = "memoTooLong";
    const memoResultMsg = result.msg;

    // TBD : test assert 코드 중복 사용되고 있음. 분리 필요.
    assertEquals(expected, memoResultMsg);
  });
}
function 삭제_함수를_실행_후_메모가_삭제된_것이_확인된다() {
  console.log(삭제_함수를_실행_후_메모가_삭제된_것이_확인된다.name);

  const dummyMemoString = "곧 삭제될 메모";

  db.initMemory().then(() => {
    setTimeout(() => {
      const currentFirstKeyword = db.getAllMemory()[0][0];

      console.log(currentFirstKeyword.keyword);
      console.log(currentFirstKeyword.memo[0]);

      const result = db.setMemory(
        currentFirstKeyword.keyword,
        0,
        "",
        dummyMemoString,
        "127.0.0.1"
      );

      assertEquals("done", result.msg);

      const deletedResult = db.clearMemorySlot(currentFirstKeyword.keyword, 0);

      assertEquals(dummyMemoString, deletedResult[1].context);

      const resultFirstKeyword = db.getAllMemory()[0][0];

      assertEquals(
        JSON.stringify({}),
        JSON.stringify(resultFirstKeyword.memo[0])
      );
    }, 1000);
  });
}

// 길이가_긴_문자열은_거절한다();

삭제_함수를_실행_후_메모가_삭제된_것이_확인된다();
