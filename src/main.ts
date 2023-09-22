import raf from 'raf';
import { ScreenObject } from './abstracts';
import Shape from './shape_object/shape';
import { flipNum } from './utils';

export type IShapeCollided = (side: number) => void;

export default class Main {
  private ctx: CanvasRenderingContext2D;

  private parent: Window;
  private layers: Map<string, Shape>;
  private initializedLayers: string[];
  private static wallAdjustment = -50;

  constructor(public canvas: HTMLCanvasElement) {
    this.parent = window;
    this.ctx = this.canvas.getContext('2d')!;

    this.layers = new Map();
    this.initializedLayers = [];
  }

  private wallCollisionChecker(layer: Shape, collidedCallback: IShapeCollided): void {
    const { width, height } = this.canvas;
    const { position, scale } = layer.config;
    const l_width = (layer.area.w * scale) / 2;
    const l_height = (layer.area.h * scale) / 2;

    let sides: number = 0;

    /**
     * 0b1000 = top
     * 0b0100 = right
     * 0b0010 = bottom
     * 0b0001 = left
     * */
    if (position.y - l_height <= Main.wallAdjustment) sides |= 0b1000;
    else if (position.y + l_height >= height) sides |= 0b0010;

    if (position.x - l_width <= Main.wallAdjustment) sides |= 0b0001;
    else if (position.x + l_width >= width) sides |= 0b0100;

    if (sides > 0) {
      collidedCallback(sides);
    }
  }

  public init(): void {
    this.canvas.width = this.parent.innerWidth * 2;
    this.canvas.height = this.parent.innerHeight * 2;
  }

  public start(): void {
    raf(this.animate.bind(this));
  }

  private animate(): void {
    const { width: c_w, height: c_h } = this.canvas;
    const wAdj = Main.wallAdjustment;

    this.ctx.clearRect(0, 0, c_w, c_h);
    this.ctx.imageSmoothingEnabled = false;

    for (const [key, layer] of this.layers) {
      layer.update(0);
      this.wallCollisionChecker(layer, (sides) => {
        const { position: pos, velocity: velo, scale } = layer.config;
        const area = layer.area;
        // top and bottom
        if ((sides & 0b1010) > 0) {
          velo.y = flipNum(velo.y);

          pos.y = c_h;

          if ((sides & 0b1000) > 0) {
            pos.y = area.h * scale + Main.wallAdjustment;
          }

          pos.y -= (area.h * scale) / 2;
        }

        // left and right
        if ((sides & 0b0101) > 0) {
          velo.x = flipNum(velo.x);

          pos.x = c_w;

          if ((sides & 0b0001) > 0) {
            pos.x = area.w * scale + Main.wallAdjustment;
          }

          pos.x -= (area.w * scale) / 2;
        }
      });

      layer.display(this.ctx);
    }

    raf(this.animate.bind(this));
  }

  public insertLayer(key: string, layer: Shape): void {
    this.layers.set(key, layer);
  }

  public initializeLayers(): void {
    for (const [key, layer] of this.layers) {
      if (key in this.initializedLayers) continue;
      layer.init();
      this.initializedLayers.push(key);
    }
  }
}
