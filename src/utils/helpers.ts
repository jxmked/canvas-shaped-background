/**
 * Randomly flip a positive integer into negative integer
 * */
export const flipper: (num: number) => number = (num: number): number => {
  return Math.floor(Math.random() * 2 * num - num);
};

/**
 * Get a number in between of given min and max
 * */
export const getRandomInRange: (mn: number, mx: number) => number = (
  mn: number,
  mx: number
): number => {
  return Math.floor(Math.random() * (mx - mn)) + mn;
};

/**
 * Get random item from given array
 *
 * @return value from array
 * */
export const getRandomItem: <T>(arr: T[]) => T = <T>(arr: T[]): T => {
  return arr[Math.floor(Math.random() * arr.length)];
};
