/**
 *
 * @param {Date} date
 */
export function getLimitedCurrentTime(date) {
  const limitedMinutes = date
    .getMinutes()
    .toString()
    .padStart(2, "0")
    .split("");
  limitedMinutes[1] = "0";

  return `${date.getFullYear().toString().padStart(4, "0")}-${(
    date.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")} ${date
    .getHours()
    .toString()
    .padStart(2, "0")}:${limitedMinutes.join("")}`;
}
