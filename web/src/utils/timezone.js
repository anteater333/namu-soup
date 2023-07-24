export function UTCStrToKSTStr(UTCStr) {
  let [YMD, HM, TZ] = [...UTCStr.split(" ")];
  HM = HM.split(":");
  HM = `${((parseInt(HM[0]) + 9) % 24).toString().padStart(2, "0")}:${HM[1]}`;
  TZ = "KST";

  return [YMD, HM, TZ].join(" ");
}
