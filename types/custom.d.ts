interface XYCoordinate {
    x: number;
    y: number;
}

interface VelocityProperties {
    x: number;
    y: number;
}

interface ShapeAttributes {
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
    data?:object
}

/**
 * Will be called before closing the CanvasRenderingContext2D.closePath()
 * */
type DoMoreProperties = (ctx:CanvasRenderingContext2D) => void;

interface ShapeProperties extends ShapeAttributes {
    
    /**
     * Return shape type/what kind of shape
     * */
    get type(): string;
    
    /**
     * Draw to canvas
     * */
    public draw(doMore?:DoMoreProperties): void;
    
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
    public rotate(angle: ShapeAttributes['angle']): void;
}

interface ParticlesAttributeProps {
    count: number
    colors: ShapeProperties['color'][]
    sizeRange: ShapeProperties['size'][]
    rotationSpeedRange: ShapeProperties['rotationSpeed'][]
    thickRange: ShapeProperties["thick"][]
    styles: ShapeProperties['style'][]
    transitionSpeedYRange: ShapeProperties['transitionSpeedY'][]
    transitionSpeedXRange: ShapeProperties['transitionSpeedX'][]
}

interface MouseEventProps {
    x: number;
    y: number
    isDown: boolean
    shapeIndex: number
}
