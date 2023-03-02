import { assertEquals } from "./asserts.js";
import { getLimitedCurrentTime } from "./utils.js";

function 십분_단위로_내림한_형식의_시간을_반환한다() {
  console.log(십분_단위로_내림한_형식의_시간을_반환한다.name);

  const testCaseDate = new Date("2023-01-02 15:25:35");
  const expected = "2023-01-02 15:20 GMT+9";

  const limitedCurrentTime = getLimitedCurrentTime(testCaseDate);

  assertEquals(expected, limitedCurrentTime);
}

십분_단위로_내림한_형식의_시간을_반환한다();
