import raf from 'raf';
import { ScreenObject } from './abstracts';
import Shape from './shape_object/shape';

export default class Main {
  private ctx: CanvasRenderingContext2D;

  private parent: Window;
  private layers: Map<string, ScreenObject>;

  constructor(public canvas: HTMLCanvasElement) {
    this.parent = window;
    this.ctx = this.canvas.getContext('2d')!;

    this.layers = new Map();
  }

  private wallCollisionChecker(layer: Shape): void {}

  public init(): void {
    this.canvas.width = this.parent.innerWidth * 2;
    this.canvas.height = this.parent.innerHeight * 2;
  }

  public start(): void {
    raf(this.animate.bind(this));
  }

  private animate(): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.imageSmoothingEnabled = false;

    for (const [key, layer] of this.layers) {
      layer.update(0);
      layer.display(this.ctx);
    }

    raf(this.animate.bind(this));
  }

  public insertLayer(key: string, layer: ScreenObject): void {
    this.layers.set(key, layer);
  }

  public initializeLayers(): void {
    for (const [key, layer] of this.layers) {
      layer.init();
    }
  }
}
