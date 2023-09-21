/**
 * Get random item from given array
 *
 * @return value from array
 * */
export const getRandomItem = <T>(arr: T[]): T => {
  return arr[Math.floor(Math.random() * arr.length)];
};
