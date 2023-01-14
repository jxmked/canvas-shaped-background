declare class Shape implements ShapeInterface {
    size: ShapeProperties['size'];
    color: ShapeProperties['color'];
    angle: ShapeProperties['angle'];
    thick: ShapeProperties['thick'];
    style: ShapeProperties['style'];
    context: Shape2DContext;
    position: ShapeProperties['position'];
    rotationSpeed: ShapeProperties['rotationSpeed'];
    isClockwise: ShapeProperties['isClockwise'];
    isOverride: ShapeProperties['isOverride'];
    velocity: ShapeProperties['velocity'];
    data: ShapeProperties['data'];
    mass: ShapeProperties['mass'];
    id: ShapeProperties['id'];
    static countShape: number;
    constructor(context: Shape2DContext, attr: ShapeProperties);
    applyStyle(): void;
    getAnglePoint(size: number, angle: ShapeProperties['angle']): XYCoordinate;
    polygonShape(endPointCount: number): void;
    move({ x, y }: XYCoordinate): void;
    translate({ x, y }: XYCoordinate): void;
    rotate(angle: ShapeProperties['angle']): void;
}
declare abstract class AbstractShape extends Shape {
    abstract get type(): string;
    abstract draw(): void;
}
export default AbstractShape;
