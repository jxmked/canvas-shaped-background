import Shape from './shape';

export default class Hexagon extends Shape {
  public init(): void {
    const ctx = this.path2D;
    const area = this.pathDimension;
    const numOfSides = 6;

    for (let i = 0; i < numOfSides; i++) {
      const angle = (Math.PI / (numOfSides / 2)) * i;
      const x = area.w / 2 - (area.w / 2) * Math.cos(angle);
      const y = area.h / 2 - (area.h / 2) * Math.sin(angle);

      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }

    this.path2D.closePath();
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
