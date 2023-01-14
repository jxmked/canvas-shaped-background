import Shape from './shape';
declare class Square extends Shape {
    get type(): string;
    draw(): void;
}
export default Square;
