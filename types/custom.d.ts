interface ICoordinates {
  x: number;
  y: number;
}

interface IVelocities {
  x: number;
  y: number;
  rot?: number; // Rotation Velocity
}

interface IArea {
  h: number;
  w: number;
}

interface XYCoordinate {
  x: number;
  y: number;
}

interface VelocityProperties {
  x: number;
  y: number;
}

type Shape2DContext = CanvasRenderingContext2D;

interface ShapeProperties {
  /**
   * Size of the object
   * */
  size: number;

  /**
   * Color of the object
   *
   * Accepts valid color from CanvasRenderingContext2D.color
   * */
  color: string;

  /**
   * Angle of object
   * */
  angle: number;

  /**
   * Line Width of an object
   * */
  thick: number;

  /**
   * Style of an object
   * */
  style: 'stroke' | 'fill';

  /**
   * Position of an object
   * { x, y }
   * */
  position: XYCoordinate;

  /**
   * Rotation Speed of an object
   * */
  rotationSpeed: number;

  /**
   * Movement speed of X and y axis of an object
   * */
  velocity: VelocityProperties;

  /**
   * Rotation angle of an object
   * */
  isClockwise: boolean;

  /**
   * Is an object is overrided by other method?
   *
   * Useful if the shape was in other events
   * */
  isOverride?: boolean;

  /**
   * For Self Defined Properties
   * */
  data?: object;
}

/**
 * initializable class
 * */
type TypeShape = new (context: Shape2DContext, attr: ShapeProperties) => Shape;

interface ParticlesProps {
  count: number;
  colors: ShapeProperties['color'][];
  sizeRange: ShapeProperties['size'][];
  rotationSpeedRange: ShapeProperties['rotationSpeed'][];
  thickRange: ShapeProperties['thick'][];
  styles: ShapeProperties['style'][];
  transitionSpeedYRange: ShapeProperties['velocity']['y'][];
  transitionSpeedXRange: ShapeProperties['velocity']['x'][];
}

interface MouseEventProps {
  x: number;
  y: number;
  isDown: boolean;
  shapeIndex: number;
}

type TypeAddShape = ({ x, y }: XYCoordinate, returnValue?: boolean) => ShapeProperties;
