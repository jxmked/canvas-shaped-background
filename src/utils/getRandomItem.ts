/**
 * Get random item from given array
 *
 * @return value from array
 * */

import { seededRandom } from '../constants';

export const getRandomItem = <T>(arr: T[]): T => {
  return arr[seededRandom.integer(0, arr.length - 1)];
};
