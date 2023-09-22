import { ScreenObject } from '../abstracts';

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

abstract class Shape extends ScreenObject {
  private static _shapeID: number = 0;
  protected path2D: Path2D;
  protected pathDimension: IArea;
  public is_hidden: boolean;

  constructor(public config: IShapeProperties) {
    super();

    Shape._shapeID++;
    this.pathDimension = {
      h: 100,
      w: 100
    };

    this.path2D = new Path2D();

    this.is_hidden = false;
  }

  public get shapeID() {
    return Shape._shapeID;
  }

  public get area() {
    return this.pathDimension;
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

  public abstract update(time: number): void;
  public abstract display(ctx: CanvasRenderingContext2D): void;
  public abstract init(): void;
}

export type IUninitShape = new (config: IShapeProperties) => Shape;
export default Shape;
