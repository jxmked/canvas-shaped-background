/**
 * Randomly flip a positive integer into negative integer
 * */
export const flipper = (num: number): number => {
  return Math.floor(Math.random() * 2 * num - num);
};
