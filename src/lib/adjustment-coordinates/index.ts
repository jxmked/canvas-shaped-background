export default class {
  private rect: DOMRect;
  private factor: number;

  constructor(canvas: HTMLCanvasElement) {
    this.rect = canvas.getBoundingClientRect();
    this.factor = canvas.width / this.rect.width;
  }

  public x(x: number): number {
    return this.factor * (x - this.rect.left);
  }

  public y(y: number): number {
    return this.factor * (y - this.rect.top);
  }
}
