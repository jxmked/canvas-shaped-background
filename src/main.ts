import raf from 'raf';
import Shape from './shape_object/shape';
import { flipNum } from './utils';

export type IShapeCollided = (side: number) => void;
export type IExtendedAnimation = (ctx: CanvasRenderingContext2D) => void;

export default class Main {
  private ctx: CanvasRenderingContext2D;

  private layers: Map<string, Shape>;
  private initializedLayers: string[];
  private static wallAdjustment = -80;
  private beforeExtendedAnim: IExtendedAnimation;
  private afterExtendedAnim: IExtendedAnimation;

  constructor(public canvas: HTMLCanvasElement) {
    this.init();

    this.ctx = this.canvas.getContext('2d')!;

    this.layers = new Map();
    this.initializedLayers = [];
    this.beforeExtendedAnim = (ctx: CanvasRenderingContext2D) => {};
    this.afterExtendedAnim = (ctx: CanvasRenderingContext2D) => {};
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

  private init(): void {
    try {
      const compStyle = getComputedStyle(this.canvas);

      this.canvas.width = parseFloat(compStyle.width) * 2;
      this.canvas.height = parseFloat(compStyle.height) * 2;
    } catch (err) {
      throw new Error('Failed to get actual screen size');
    }
  }

  public start(): void {
    raf(this.animate.bind(this));
  }

  private animate(): void {
    const { width: c_w, height: c_h } = this.canvas;
    this.ctx.clearRect(0, 0, c_w, c_h);
    this.ctx.imageSmoothingEnabled = false;

    this.beforeExtendedAnim.call(this.beforeExtendedAnim, this.ctx);

    for (const [_, layer] of this.layers) {
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

    this.afterExtendedAnim.call(this.afterExtendedAnim, this.ctx);

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

  /**
   * Perfect for background
   * */
  public beforeLayersAnimation(callback: IExtendedAnimation): void {
    this.beforeExtendedAnim = callback;
  }

  /**
   * Perfect for foreground
   * */
  public afterLayersAnimation(callback: IExtendedAnimation): void {
    this.afterExtendedAnim = callback;
  }
}
