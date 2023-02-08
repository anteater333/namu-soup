import { assertEquals } from "./asserts.js";
import { SameUserGuard } from "./guards.js";

function SameUserGuard로_사용자를_블랙리스트에_추가하고_일정_시간마다_삭제한다() {
  console.log(
    SameUserGuard로_사용자를_블랙리스트에_추가하고_일정_시간마다_삭제한다.name
  );

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
  }, 6000);
}

SameUserGuard로_사용자를_블랙리스트에_추가하고_일정_시간마다_삭제한다();
