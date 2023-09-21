export interface IPolygonatorReturnType extends ICoordinates {
  index: number;
}

export default (numOfSides: number, area: IArea): IPolygonatorReturnType[] => {
  const points: IPolygonatorReturnType[] = [];
  const half_w = area.w / 2;
  const half_h = area.h / 2;

  for (let i = 0; i < numOfSides; i++) {
    const angle = (Math.PI / (numOfSides / 2)) * i;
    points.push({
      index: i,
      x: half_w - half_w * Math.cos(angle),
      y: half_h - half_h * Math.sin(angle)
    });
  }

  return points;
};
