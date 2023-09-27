import Shape from './shape';
import Polygonator from '../lib/polygonator';

export default class Octagon extends Shape {
  public init(): void {
    const ctx = this.path2D;

    for (const point of Polygonator(8, this.pathDimension)) {
      (point.index === 0 ? ctx.moveTo : ctx.lineTo).call(ctx, point.x, point.y);
    }

    ctx.closePath();
  }

  public update(time: number = 0): void {
    const { velocity, position, is_movable } = this.config;

    if (velocity.rot !== void 0) this.config.rotation += velocity.rot;

    if (is_movable) return;

    position.x += velocity.x;
    position.y += velocity.y;
  }

  public display(ctx: CanvasRenderingContext2D): void {
    if (this.is_hidden) return;

    const { position, scale, rotation } = this.config;

    ctx.save();
    ctx.translate(position.x, position.y);
    ctx.scale(scale, scale);
    ctx.rotate(rotation);
    ctx.translate(-(this.pathDimension.w / 2), -(this.pathDimension.h / 2));
    this.applyStyle(ctx, true);

    ctx.restore();
  }
}
