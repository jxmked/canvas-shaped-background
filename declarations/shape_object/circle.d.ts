import Shape from './shape';
declare class Circle extends Shape {
    get type(): string;
    draw(): void;
}
export default Circle;
