import Shape from './shape';

export default class Cross extends Shape {
  public init(): void {
    const ctx = this.path2D;
    let { w, h } = this.pathDimension;
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
