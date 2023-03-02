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

/**
 * 해당 값이 존재하는지 확인하는 assert 함수
 * @param {any} data
 */
export function assertExists(data) {
  if (data !== undefined && data !== null) {
    console.log(`⭕ Test passed. ${data}`);
  } else {
    console.error(`❌ Test failed. ${data}`);
  }
}

/**
 * 전달 받은 비교식의 값이 true인지 확인하는 assert 함수
 */
export function assertTrue(compExpr) {
  if (compExpr === true) {
    console.log(`⭕ Test passed. value: ${compExpr}`);
  } else {
    console.error(`❌ Test failed. value: ${compExpr}`);
  }
}
