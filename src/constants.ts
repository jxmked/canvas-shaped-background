import { Random, MersenneTwister19937 } from 'random-js';

export const randomColors = ['#4ab098', '#ea5e5d', '#f8ba3f', '#3f82f3'];

export const seededRandom = new Random(MersenneTwister19937.autoSeed());

export const WALL_ADJUSTMENT = -80; // px

export const KILL_INTERVAL = 250; // ms

// Level first press, release animation 1, release animation 2
export const TAP_ANIMATION_SCALE_LEVEL = [1, 0.8, 1.5];
