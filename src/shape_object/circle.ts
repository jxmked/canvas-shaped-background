import Shape from './shape';

export default class Circle extends Shape {
  public init(): void {
    this.path2D.ellipse(
      0,
      0,
      this.pathDimension.w / 2,
      this.pathDimension.h / 2,
      0,
      0,
      2 * Math.PI
    );
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
    ctx.scale(scale, scale);
    ctx.translate(position.x, position.y);
    ctx.rotate(rotation);
    this.applyStyle(ctx, true);

    ctx.restore();
  }
}
