interface XYCoordinate {
    x: number;
    y: number;
}

interface VelocityProperties {
    x: number;
    y: number;
}

type Shape2DContext = CanvasRenderingContext2D;

interface ParticlesAttributeProps {
    count: number;
    colors: ShapeProperties['color'][];
    sizeRange: ShapeProperties['size'][];
    rotationSpeedRange: ShapeProperties['rotationSpeed'][];
    thickRange: ShapeProperties["thick"][];
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
