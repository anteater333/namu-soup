import { assertEquals, assertTrue } from "./asserts.js";
import { calcStrSim, getLimitedCurrentTime } from "./utils.js";

function 십분_단위로_내림한_형식의_시간을_반환한다() {
  console.log(십분_단위로_내림한_형식의_시간을_반환한다.name);
  return new Promise((resolve, reject) => {
    const testCaseDate = new Date("2023-01-02 15:25:35");
    const expected = "2023-01-02 15:20";

    const limitedCurrentTime = getLimitedCurrentTime(testCaseDate);

    assertEquals(expected, limitedCurrentTime);

    resolve(0);
  });
}

function 두_문자열의_유사도를_반환한다() {
  console.log(두_문자열의_유사도를_반환한다.name);
  return new Promise((resolve, reject) => {
    const strA = "두 문자열의 유사도를 반환한다.";
    const strB = ".다한환반 를도사유 의열자문 두";
    const strC = "두 문자열의 유사도를 반환한다.";

    const similarity1 = calcStrSim(strA, strB);
    const similarity2 = calcStrSim(strA, strC);

    assertTrue(0.0 <= similarity1 && similarity1 <= 1.0);
    assertTrue(similarity1 < similarity2);

    resolve(0);
  });
}

new Promise((resolve, reject) => {
  resolve();
})
  .then(() => 십분_단위로_내림한_형식의_시간을_반환한다())
  .then(() => 두_문자열의_유사도를_반환한다());
