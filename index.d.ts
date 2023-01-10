declare module "shape_object/shape" {
    class Shape implements ShapeAttributes {
        size: ShapeAttributes['size'];
        color: ShapeAttributes['color'];
        angle: ShapeAttributes['angle'];
        thick: ShapeAttributes['thick'];
        style: ShapeAttributes['style'];
        context: CanvasRenderingContext2D;
        position: ShapeAttributes['position'];
        rotationSpeed: ShapeAttributes['rotationSpeed'];
        isClockwise: ShapeAttributes['isClockwise'];
        isOverride: ShapeAttributes['isOverride'];
        velocity: ShapeAttributes['velocity'];
        static countShape: number;
        data: ShapeAttributes['data'];
        constructor(context: CanvasRenderingContext2D, { size, color, angle, thick, style, position, rotationSpeed, isClockwise, isOverride, velocity, data }: ShapeAttributes);
        applyStyle(): void;
        getAnglePoint(size: number, angle: ShapeAttributes['angle']): XYCoordinate;
        move({ x, y }: XYCoordinate): void;
        translate({ x, y }: XYCoordinate): void;
        rotate(angle: ShapeAttributes['angle']): void;
    }
    export default Shape;
}
declare module "shape_object/triangle" {
    import Shape from "shape_object/shape";
    class Triangle extends Shape implements ShapeProperties {
        constructor(context: CanvasRenderingContext2D, attr: ShapeAttributes);
        get type(): string;
        draw(doMore?: DoMoreProperties): void;
    }
    export default Triangle;
}
declare module "shape_object/square" {
    import Shape from "shape_object/shape";
    class Square extends Shape implements ShapeProperties {
        constructor(context: CanvasRenderingContext2D, attr: ShapeAttributes);
        get type(): string;
        draw(doMore?: DoMoreProperties): void;
    }
    export default Square;
}
declare module "shape_object/circle" {
    import Shape from "shape_object/shape";
    class Circle extends Shape implements ShapeProperties {
        constructor(context: CanvasRenderingContext2D, attr: ShapeAttributes);
        get type(): string;
        draw(doMore?: DoMoreProperties): void;
    }
    export default Circle;
}
declare module "shape_object/hexagon" {
    import Shape from "shape_object/shape";
    class Hexagon extends Shape implements ShapeProperties {
        constructor(context: CanvasRenderingContext2D, attr: ShapeAttributes);
        get type(): string;
        draw(doMore?: DoMoreProperties): void;
    }
    export default Hexagon;
}
declare module "shape_object/octagon" {
    import Shape from "shape_object/shape";
    class Octagon extends Shape implements ShapeProperties {
        constructor(context: CanvasRenderingContext2D, attr: ShapeAttributes);
        get type(): string;
        draw(doMore?: DoMoreProperties): void;
    }
    export default Octagon;
}
declare module "shape_object/cross" {
    import Shape from "shape_object/shape";
    class Cross extends Shape implements ShapeProperties {
        constructor(context: CanvasRenderingContext2D, attr: ShapeAttributes);
        get type(): string;
        draw(doMore?: DoMoreProperties): void;
    }
    export default Cross;
}
declare module "shape_object/index" {
    import Triangle from "shape_object/triangle";
    import Square from "shape_object/square";
    import Circle from "shape_object/circle";
    import Octagon from "shape_object/octagon";
    import Cross from "shape_object/cross";
    export { Triangle, Square, Circle, Octagon, Cross };
}
declare module "index" { }
