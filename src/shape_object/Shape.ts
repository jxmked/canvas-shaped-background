import { ScreenObject, MovableScreenObject } from '../abstracts';

export interface IShapeProperties {
  rotation: number;
  position: ICoordinates;
  velocity: IVelocities;
  color: string;

  /**
   * Scale from 100px
   * */
  scale: number;
  is_solid: boolean;
  thick: number;

  style: string;
}

export default abstract class Shape extends ScreenObject implements MovableScreenObject {
  private static _shapeID = 0;
  protected path2D: Path2D;
  protected pathDimension: IArea;

  constructor(public config: IShapeProperties) {
    super();

    Shape._shapeID++;
    this.pathDimension = {
      h: 100,
      w: 100
    };

    this.path2D = new Path2D();
  }

  public get shapeID() {
    return Shape._shapeID;
  }

  public get area() {
    return this.pathDimension;
  }

  public move({ x, y }: ICoordinates): void {
    this.config.position = { x, y };
  }

  protected applyStyle(ctx: CanvasRenderingContext2D, usePath2D: boolean): void {
    if (this.config.style === 'fill') {
      ctx.fillStyle = this.config.color;

      if (usePath2D) ctx.fill(this.path2D);
      else ctx.fill();

      return;
    }

    ctx.fillStyle = 'none';
    ctx.strokeStyle = this.config.color;
    ctx.lineWidth = this.config.thick;
    if (usePath2D) ctx.stroke(this.path2D);
    else ctx.stroke();
  }

  public update(): void {
    const { velocity, position } = this.config;

    if (velocity.rot !== void 0) this.config.rotation += velocity.rot;

    position.x += velocity.x;
    position.y += velocity.y;
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

  public abstract init(): void;
}
