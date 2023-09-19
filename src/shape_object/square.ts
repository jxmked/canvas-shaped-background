import Shape from './shape';

class Square extends Shape {
  public get type(): string {
    return 'square';
  }

  public draw(): void {
    this.polygonShape(4);
    this.applyStyle();
  }
}

export default Square;
