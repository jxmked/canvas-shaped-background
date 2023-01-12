import Shape from './shape';

class Octagon extends Shape {
    public get type(): string {
        return 'octagon';
    }

    public draw(): void {
        this.polygonShape(8);
        this.applyStyle();
    }
}

export default Octagon;
