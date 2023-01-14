import Shape from './shape';
declare class Cross extends Shape {
    constructor(context: Shape2DContext, attr: ShapeProperties);
    get type(): string;
    draw(): void;
}
export default Cross;
