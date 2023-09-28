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

  // @override
  public display(ctx: CanvasRenderingContext2D): void {
    const { position, scale, rotation } = this.config;

    ctx.save();
    ctx.translate(position.x, position.y);
    ctx.scale(scale, scale);
    ctx.rotate(rotation);
    this.applyStyle(ctx, true);

    ctx.restore();
  }
}
