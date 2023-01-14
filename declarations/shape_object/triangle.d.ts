import Shape from './shape';
declare class Triangle extends Shape {
    get type(): string;
    draw(): void;
}
export default Triangle;
