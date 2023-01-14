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

    /**
     * Mass of a shape
     *
     * Useful to get a little bit realistic when it comes
     * to collission event
     * */
    mass?: number;

    /**
     * Unique ID
     * */
    id?: number;
}

interface ShapeMethods {
    /**
     * Apply style after crearing lines
     * */
    public applyStyle(): void;

    /**
     * Returns new coordinate from midpoint to spcified distance
     * */
    public getAnglePoint(size: number, angle: ShapeProperties['angle']): XYCoordinate;

    /**
     * Create polygon shale base on endpoints
     * */
    public polygonShape(endPointsCount: number): void;

    /**
     * Move object into specified pixel
     * */
    public move({ x, y }: XYCoordinate): void;

    /**
     * Move object into specified coordinate
     * */
    public translate({ x, y }: XYCoordinate): void;

    /**
     * Rotate object by given angle
     *
     * Ranges: 0 - 360
     * */
    public rotate(angle: ShapeProperties['angle']): void;
}

interface ShapeInterface extends ShapeMethods, ShapeProperties {}

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
type TypeNumberFlip = (num: number) => number;
type TypeRestrictVelocities = (shape: Shape) => void;
type TypeResolveBoundaryCollisionCallback = ({ x, y }: XYCoordinate) => void;
type TypeResolveBoundaryCollision = (shape: Shape, callback?: TypeResolveBoundaryCollisionCallback) => void;
