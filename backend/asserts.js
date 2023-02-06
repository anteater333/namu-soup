/**
 * 두 값이 같은지 비교하는 assert 함수
 * @param {any} expected
 * @param {any} actual
 */
export function assertEquals(expected, actual) {
  if (expected === actual) {
    console.log(`⭕ Test passed. ${expected} === ${actual}`);
  } else {
    console.error(`❌ Test failed. ${expected} !== ${actual}`);
  }
}
