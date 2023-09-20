import { ScreenObject } from '../abstracts';

export interface IShapeProperties {
  rotation: number;
  position: ICoordinates;
  velocity: IVelocities;
  color: string;

  /**
   * Sides of a polygon or radius of a circle
   * */
  radius: number;
  is_solid: boolean;
  thick: number;

  style: string;
}

abstract class Shape extends ScreenObject {
  private static _shapeID: number = 0;

  constructor(public config: IShapeProperties) {
    super();
    Shape._shapeID++;
  }

  public get shapeID() {
    return Shape._shapeID;
  }

  protected applyStyle(ctx: CanvasRenderingContext2D): void {
    if (this.config.style === 'fill') {
      ctx.fillStyle = this.config.color;
      ctx.fill();
      return;
    }

    ctx.fillStyle = 'none';
    ctx.strokeStyle = this.config.color;
    ctx.lineWidth = this.config.thick;
    ctx.stroke();
  }

  private getAnglePoint(
    size: IShapeProperties['radius'],
    angle: IShapeProperties['rotation']
  ): ICoordinates {
    const { x, y } = this.config.position;
    const rad = angle * (Math.PI / 180);

    return {
      x: x + size * Math.cos(rad),
      y: y + size * Math.sin(rad)
    };
  }

  protected polygonShape(endPointCount: number): ICoordinates[] {
    const numOfSections = 360 / endPointCount;
    const points: ICoordinates[] = [];

    for (let deg = 0; deg <= 360; deg += numOfSections) {
      points.push(this.getAnglePoint(this.config.radius, deg + this.config.rotation));
    }

    return points;
  }

  public abstract update(time: number): void;
  public abstract display(ctx: CanvasRenderingContext2D): void;
  public abstract init(): void;
}

export type IUninitShape = new (config: IShapeProperties) => Shape;
export default Shape;
