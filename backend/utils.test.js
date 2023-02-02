import { getLimitedCurrentTime } from "./util.js";

function 십분_단위로_내림한_형식의_시간을_반환한다() {
  const testCaseDate = new Date("2023-01-02 15:25:35");
  const expected = "2023-01-02 15:20";

  const limitedCurrentTime = getLimitedCurrentTime(testCaseDate);

  if (expected === limitedCurrentTime) {
    console.log(`⭕ Test passed. ${expected} === ${limitedCurrentTime}`);
  } else {
    console.error(`❌ Test failed. ${expected} !== ${limitedCurrentTime}`);
  }
}

십분_단위로_내림한_형식의_시간을_반환한다();
