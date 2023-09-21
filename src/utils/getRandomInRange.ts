/**
 * Get a number in between of given min and max
 * */
export const getRandomInRange = (mn: number, mx: number): number => {
  return Math.floor(Math.random() * (mx - mn)) + mn;
};
