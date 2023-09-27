import Shape from './shape';
import Polygonator from '../lib/polygonator';

export default class Square extends Shape {
  public init(): void {
    const ctx = this.path2D;

    for (const point of Polygonator(3, this.pathDimension)) {
      if (point.index === 0) {
        ctx.moveTo(point.x, point.y);
      } else {
        ctx.lineTo(point.x, point.y);
      }
    }

    ctx.closePath();
  }
}
