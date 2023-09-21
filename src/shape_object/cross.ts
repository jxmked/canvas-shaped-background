import Shape from './shape';

export default class Cross extends Shape {
  public init(): void {
    const ctx = this.path2D;
    const { w, h } = this.pathDimension;

    ctx.moveTo(w * 0.4, 0);
    ctx.lineTo(w * 0.4, h * 0.4);
    ctx.lineTo(0, h * 0.4);
    ctx.lineTo(0, h * 0.6);
    ctx.lineTo(w * 0.4, h * 0.6);
    ctx.lineTo(w * 0.4, h);
    ctx.lineTo(w * 0.6, h);
    ctx.lineTo(w * 0.6, h * 0.6);
    ctx.lineTo(w, h * 0.6);
    ctx.lineTo(w, h * 0.4);
    ctx.lineTo(w * 0.6, h * 0.4);
    ctx.lineTo(w * 0.6, 0);
    ctx.closePath();
  }

  public update(time: number = 0): void {
    const { velocity, position } = this.config;

    position.x += velocity.x;
    position.y += velocity.y;

    if (velocity.rot !== void 0) this.config.rotation += velocity.rot;
  }

  public display(ctx: CanvasRenderingContext2D): void {
    const { position, scale, rotation } = this.config;

    ctx.save();
    ctx.scale(scale, scale);
    ctx.translate(position.x, position.y);
    ctx.rotate(rotation);
    ctx.translate(-(this.pathDimension.w / 2), -(this.pathDimension.h / 2));
    this.applyStyle(ctx, true);

    ctx.restore();
  }
}
