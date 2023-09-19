import { ScreenObject } from '../abstracts';

export interface IShapeProperties {
  rotation: number;
  position: ICoordinate;
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

abstract class Shape implements ScreenObject {
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
  ): ICoordinate {
    const { x, y } = this.position;
    const rad = angle * (Math.PI / 180);

    return {
      x: x + size * Math.cos(rad),
      y: y + size * Math.sin(rad)
    };
  }

  protected polygonShape(endPointCount: number): ICoordinate[] {
    const numOfSections = 360 / endPointCount;
    const points: ICoordinate[] = [];

    for (let deg = 0; deg <= 360; deg += numOfSections) {
      points.push(this.getAnglePoint(this.size, deg + this.angle));
    }

    return points;
  }

  public abstract update(time: number = 0): void;
  public abstract display(ctx: CanvasRenderingContext2D): void;
  public abstract init(): void;
}

export type IShapeObject = new (config: IShapeProperties) => Shape;
export default Shape;

class Shape implements ShapeInterface {
  public size: ShapeProperties['size'];
  public color: ShapeProperties['color'];
  public angle: ShapeProperties['angle'];
  public thick: ShapeProperties['thick'];
  public style: ShapeProperties['style'];
  public context: Shape2DContext;
  public position: ShapeProperties['position'];
  public rotationSpeed: ShapeProperties['rotationSpeed'];
  public isClockwise: ShapeProperties['isClockwise'];
  public isOverride: ShapeProperties['isOverride'];
  public velocity: ShapeProperties['velocity'];
  public data: ShapeProperties['data'];
  public static countShape = 0;

  constructor(context: Shape2DContext, attr: ShapeProperties) {
    const {
      size,
      color,
      angle,
      thick,
      style,
      position,
      rotationSpeed,
      isClockwise,
      isOverride,
      velocity,
      data
    } = attr;

    ++Shape.countShape;

    // Validate angle
    if (angle > 360 && angle < 0) throw new Error('Invalid angle');

    this.size = size;
    this.color = color;
    this.angle = angle;
    this.thick = thick;
    this.style = style;
    this.position = position;
    this.context = context;
    this.rotationSpeed = rotationSpeed;
    this.isClockwise = isClockwise;
    this.isOverride = isOverride === void 0 ? false : isOverride;
    this.velocity = velocity;
    this.data = data;
  }

  public move({ x, y }: XYCoordinate): void {
    this.position.x += x;
    this.position.y += y;
  }

  /**
   * Move object into desired coordinate
   * */
  public translate({ x, y }: XYCoordinate): void {
    this.position = { x, y };
  }

  public rotate(angle: ShapeProperties['angle']): void {
    this.angle = angle;
  }
}

abstract class AbstractShape extends Shape {
  abstract get type(): string;
  abstract draw(): void;
}
