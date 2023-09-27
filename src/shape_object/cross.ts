import Shape from './shape';

export default class Cross extends Shape {
  public init(): void {
    const ctx = this.path2D;
    const { w, h } = this.pathDimension;
    //    w *= this.config.scale;
    //  h *= this.config.scale;

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

  public display(ctx: CanvasRenderingContext2D): void {
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
