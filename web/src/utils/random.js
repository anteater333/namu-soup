export function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min)) + min;
}

export const placeholderData = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
