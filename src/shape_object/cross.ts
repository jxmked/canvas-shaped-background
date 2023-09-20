import Shape from './shape';

export default class Cross extends Shape {
  public init(): void {
    const ctx = this.path2D;
    const area = this.pathDimension;

    this.path2D.moveTo(area.w * 0.4, 0);
    this.path2D.lineTo(area.w * 0.4, area.h * 0.4);
    this.path2D.lineTo(0, area.h * 0.4);
    this.path2D.lineTo(0, area.h * 0.6);
    this.path2D.lineTo(area.w * 0.4, area.h * 0.6);
    this.path2D.lineTo(area.w * 0.4, area.h);
    this.path2D.lineTo(area.w * 0.6, area.h);
    this.path2D.lineTo(area.w * 0.6, area.h * 0.6);
    this.path2D.lineTo(area.w, area.h * 0.6);
    this.path2D.lineTo(area.w, area.h * 0.4);
    this.path2D.lineTo(area.w * 0.6, area.h * 0.4);
    this.path2D.lineTo(area.w * 0.6, 0);
    this.path2D.closePath();
  }

  public update(time: number = 0): void {
    const { velocity, position } = this.config;

    position.x += velocity.x;
    position.y += velocity.y;

    if (velocity.rot !== void 0) this.config.rotation += velocity.rot;
  }

  public display(ctx: CanvasRenderingContext2D): void {
    const { position, scale } = this.config;

    ctx.save();
    ctx.scale(scale, scale);
    ctx.translate(position.x, position.y);
    ctx.rotate(this.config.rotation);
    ctx.translate(-(this.pathDimension.w / 2), -(this.pathDimension.h / 2));
    this.applyStyle(ctx, true);

    ctx.restore();
  }
}
