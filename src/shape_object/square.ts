import Shape from './shape';
import Polygonator from '../lib/polygonator';

export default class Square extends Shape {
  public init(): void {
    const ctx = this.path2D;
    const area = {
      h: this.pathDimension.h * this.config.scale,
      w: this.pathDimension.w * this.config.scale
    } satisfies IArea;

    for (const point of Polygonator(4, area)) {
      (point.index === 0 ? ctx.moveTo : ctx.lineTo).call(ctx, point.x, point.y);
    }

    ctx.closePath();
  }

  public update(time: number = 0): void {
    const { velocity, position } = this.config;

    position.x += velocity.x;
    position.y += velocity.y;

    if (velocity.rot !== void 0) this.config.rotation += velocity.rot;
  }

  public display(ctx: CanvasRenderingContext2D): void {
    if (this.is_hidden) return;

    const { position, scale, rotation } = this.config;

    ctx.save();
    ctx.scale(scale, scale);
    ctx.translate(position.x, position.y);
    ctx.rotate(rotation);
    ctx.translate(
      -((this.pathDimension.w * scale) / 2),
      -((this.pathDimension.h * scale) / 2)
    );
    this.applyStyle(ctx, true);

    ctx.restore();
  }
}
