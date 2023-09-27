export default class {
  private rect: DOMRect;
  private factor: number;

  constructor(private canvas: HTMLCanvasElement) {
    this.rect = this.canvas.getBoundingClientRect();
    this.factor = this.canvas.width / this.rect.width;
  }

  public x(x: number): number {
    return this.factor * (x - this.rect.left);
  }

  public y(y: number): number {
    return this.factor * (y - this.rect.top);
  }

  public resize(): void {
    this.rect = this.canvas.getBoundingClientRect();
    this.factor = this.canvas.width / this.rect.width;
  }
}
