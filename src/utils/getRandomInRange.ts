/**
 * Get a number in between of given min and max
 * */
import { seededRandom } from '../constants';

export const getRandomInRange = (mn: number, mx: number): number => {
  return seededRandom.integer(mn, mx);
};
