export const flipNum = (value: number) => {
  if (value === 0) return value;

  return value > 0 ? -value : Math.abs(value);
};
