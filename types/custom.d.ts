interface XYCoordinate {
    x:number;
    y:number;
}

interface ShapeAttributes {
    size:number;
    color:string;
    angle:number;
    thick:number;
    style:"stroke"|"fill";
    position:XYCoordinate;
    rotationSpeed:number;
    transitionSpeedX:number;
    transitionSpeedY:number;
    isClockwise:boolean;
    isOverride?:boolean
}

interface ShapeProperties extends ShapeAttributes {
    get type():string;
    public draw():void;
    public move({x, y}:XYCoordinate): void;
    public translate({x, y}:XYCoordinate):void;
    public rotate(angle:SquareProperties['angle']|TriangleProperties['angle']):void;
}

interface ParticlesAttributeProps {
    count:number
    colors:ShapeProperties['color'][]
    sizeRange:ShapeProperties['size'][]
    rotationSpeedRange:ShapeProperties['rotationSpeed'][]
    thickRange: ShapeProperties["thick"][]
    styles:ShapeProperties['style'][]
    transitionSpeedYRange:ShapeProperties['transitionSpeedY'][]
    transitionSpeedXRange:ShapeProperties['transitionSpeedX'][]
}

interface MouseEventProps {
    x:number;
    y:number
    isDown:boolean
    shapeIndex:number
}
