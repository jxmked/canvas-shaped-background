import raf from 'raf';
import Shape from './shape_object/shape';
import { flipNum } from './utils';
import { WALL_ADJUSTMENT } from './constants';
import SwOffline from './lib/workbox-work-offline';

SwOffline();

export type IExtendedAnimation = (ctx: CanvasRenderingContext2D) => void;

export const enum bit_collide {
  TOP = 0b1000,
  RIGHT = 0b0100,
  BOTTOM = 0b0010,
  LEFT = 0b0001,
  TOP_BOTTOM = 0b1010,
  LEFT_RIGHT = 0b0101
}

export default class Main {
  private ctx: CanvasRenderingContext2D;

  private layers: Map<string, Shape>;
  private initializedLayers: string[];
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

  private wallCollisionChecker(layer: Shape): number {
    const { width, height } = this.canvas;
    const { position, scale } = layer.config;
    const l_width = (layer.area.w * scale) / 2;
    const l_height = (layer.area.h * scale) / 2;

    let sides: number = 0;

    if (position.y - l_height <= WALL_ADJUSTMENT) {
      sides |= bit_collide.TOP;
    } else if (position.y + l_height >= height - WALL_ADJUSTMENT) {
      sides |= bit_collide.BOTTOM;
    }

    if (position.x - l_width <= WALL_ADJUSTMENT) {
      sides |= bit_collide.LEFT;
    } else if (position.x + l_width >= width - WALL_ADJUSTMENT) {
      sides |= bit_collide.RIGHT;
    }

    return sides;
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
    const { width, height } = this.canvas;
    this.ctx.clearRect(0, 0, width, height);
    this.ctx.imageSmoothingEnabled = false;

    this.beforeExtendedAnim.call(this.beforeExtendedAnim, this.ctx);

    for (const [_, layer] of this.layers) {
      const sides = this.wallCollisionChecker(layer);
      if (sides === 0) {
        layer.update();
        layer.display(this.ctx);
        continue;
      }

      const {
        config: { position, velocity, scale }
      } = layer;
      const { area } = layer;

      // top and bottom
      if ((sides & bit_collide.TOP_BOTTOM) > 0) {
        velocity.y = flipNum(velocity.y);

        position.y = height - WALL_ADJUSTMENT;

        if ((sides & bit_collide.TOP) > 0) {
          position.y = area.h * scale + WALL_ADJUSTMENT;
        }

        position.y -= (area.h * scale) / 2;
      }

      // left and right
      if ((sides & bit_collide.LEFT_RIGHT) > 0) {
        velocity.x = flipNum(velocity.x);

        position.x = width - WALL_ADJUSTMENT;

        if ((sides & bit_collide.LEFT) > 0) {
          position.x = area.w * scale + WALL_ADJUSTMENT;
        }

        position.x -= (area.w * scale) / 2;
      }

      layer.update();
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
