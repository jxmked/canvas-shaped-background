import Shape from './shape';
declare class Hexagon extends Shape {
    get type(): string;
    draw(): void;
}
export default Hexagon;
