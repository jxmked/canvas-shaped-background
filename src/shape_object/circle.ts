import Shape from "./Shape";

export default class Circle extends Shape {
  public init(): void {

  }
  
  public update(time: number = 0): void {
   const { velocity, position, rotation } = this.config;
   
   
  }
  
  public display(ctx: CanvasRenderingContext2D): void {
    const { radius, position } = this.config;

    ctx.beginPath();
    ctx.arc(position.x, position.y, radius, 0, 2 * Math.PI);
    ctx.closePath();

    this.applyStyle(ctx);
  }
}
