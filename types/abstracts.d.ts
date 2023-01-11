

interface ShapeMethods {
    public draw(): void;
    public applyStyle(): void;
    protected getAnglePoint(size: number, angle: ShapeAttributes['angle']): XYCoordinate;
    protected createCircularShape(endPointsCount: number): void;
    public move({ x, y }: XYCoordinate): void;
    public translate({ x, y }: XYCoordinate): void;
    public rotate(angle: ShapeAttributes['angle']): void;
}

interface ShapeProperties {
    public size: ShapeAttributes['size'];
    public color: ShapeAttributes['color'];
    public angle: ShapeAttributes['angle'];
    public thick: ShapeAttributes['thick'];
    public style: ShapeAttributes['style'];
    public position: ShapeAttributes['position'];
    public rotationSpeed: ShapeAttributes['rotationSpeed'];
    public isClockwise: ShapeAttributes['isClockwise'];
    public isOverride?: ShapeAttributes['isOverride'];
    public velocity: ShapeAttributes['velocity'];
    public data?: ShapeAttributes['data'];
}

abstract class ShapeObject implements ShapeMethods, ShapeProperties {
    
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
    style: "stroke"|"fill";
    
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
    isOverride?:boolean
    
    /**
     * For Self Defined Properties
     * */
    data?:object;
    
    
    context: Shape2DContext
    
    constructor(context:Shape2DContext, attr:ShapeAttributes): ShapeObject;
    
    abstract draw(): void;
    public applyStyle(): void;
    getAnglePoint(size: number, angle: ShapeAttributes['angle']): XYCoordinate;
    createCircularShape(endPointsCount: number): void;
    public move({ x, y }: XYCoordinate): void;
    public translate({ x, y }: XYCoordinate): void;
    public rotate(angle: ShapeAttributes['angle']): void;
}