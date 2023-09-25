/**
 * Touch event handler
 *
 * Every touches will be registered here.
 *
 *
 * */
import * as ShapeArray from './shape_object/index';
import { getRandomItem, flipper, random as genRand } from './utils';
import { randomColors } from './constants';

const shapes = Object.values(ShapeArray);

export default (identifier: number, _down_time: number) => {
  const Shapey = getRandomItem(shapes);

  class TapAnimator extends Shapey {
    private coor: ICoordinates;
    private is_down: boolean;
    private is_to_be_kill: boolean;
    private lift_up_time: number;
    private _kill_now: boolean;

    public static readonly kill_interval = 500; // ms

    constructor(
      private identifier: number,
      private _down_time: number
    ) {
      const config = {
        rotation: 0,
        velocity: {
          x: 0,
          y: 0,
          rot: flipper(500) * genRand()
        },
        color: getRandomItem(randomColors),
        scale: 1,
        is_solid: Math.random() > 0.5,
        thick: 5,
        style: Math.random() > 0.5 ? 'stroke' : 'fill',
        position: {
          x: -100,
          y: -100
        },
        is_movable: true
      };

      super(config);

      this.coor = { x: 0, y: 0 };
      this.is_down = true;
      this.is_to_be_kill = false;
      this._kill_now = false;
      this.lift_up_time = 0;
    }

    public get kill_now() {
      return this._kill_now;
    }

    public get to_be_kill() {
      return this.is_to_be_kill;
    }

    public get id() {
      return this.identifier;
    }

    public get position() {
      return Object.assign({}, this.coor);
    }

    public move({ x, y }: ICoordinates): void {
      this.coor = { x, y };
      super.move(this.coor);
    }

    public up(): void {
      if (!this.is_down) return;

      this.is_down = false;
      this.is_to_be_kill = true;
    }

    public down({ x, y }: ICoordinates): void {
      this.coor = { x, y };
    }

    public init(): void {
      super.init();
    }

    public update(time: number = 0): void {
      if (!this.is_down && this.is_to_be_kill && this.lift_up_time === 0) {
        this.lift_up_time = time;
      }

      if (this.is_to_be_kill && this.lift_up_time + TapAnimator.kill_interval <= time) {
        this._kill_now = true;
      }

      super.update(time);
    }

    public display(ctx: CanvasRenderingContext2D): void {
      if (!this.is_down) return;

      super.display(ctx);
    }
  }

  return new TapAnimator(identifier, _down_time);
};
