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
import { MovableScreenObject } from './abstracts';
import Shape, { IShapeProperties } from './shape_object/shape';

const shapes = Object.values(ShapeArray);

export default class TapAnimator extends MovableScreenObject {
  private coor: ICoordinates;
  private is_down: boolean;
  private is_to_be_kill: boolean;
  private lift_up_time: number;
  private _kill_now: boolean;

  public static readonly kill_interval = 100; // ms

  private readonly shapes: Map<number, Shape>;

  // User press and hold: viewing level 1
  // user releases: viewing level 2, after ms pass: 3
  private viewingLevel: number;

  constructor(private identifier: number) {
    super();
    this.shapes = new Map();

    this.coor = { x: 0, y: 0 };
    this.is_down = true;
    this.is_to_be_kill = false;
    this._kill_now = false;
    this.lift_up_time = 0;

    this.viewingLevel = 1;

    this.shapes.set(1, this.getRandomShape(1.2)); // Level 1
    this.shapes.set(2, this.getRandomShape(0.8)); // Level 2
    this.shapes.set(3, this.getRandomShape(1.6)); // Level 3
  }

  private getRandomShape(scale: number): Shape {
    const Shapey = getRandomItem(shapes);
    const config: IShapeProperties = {
      rotation: 0,
      velocity: {
        x: 0,
        y: 0,
        rot: flipper(400) * genRand()
      },
      color: getRandomItem(randomColors),
      is_solid: Math.random() > 0.5,
      thick: 5,
      style: Math.random() > 0.5 ? 'stroke' : 'fill',
      position: this.coor,
      scale
    };

    return new Shapey(config);
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

  public move({ x, y }: ICoordinates): void {
    this.coor = { x, y };
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
    for (const shape of this.shapes.values()) {
      shape.init();
    }
  }

  public update(time: number): void {
    if (this.is_to_be_kill) {
      if (!this.is_down && this.lift_up_time === 0) {
        this.lift_up_time = time;
        this.viewingLevel = 2;
      }

      if (TapAnimator.kill_interval * 0.5 + this.lift_up_time <= time) {
        this.viewingLevel = 3;
      }

      if (this.lift_up_time + TapAnimator.kill_interval <= time) {
        this._kill_now = true;
      }
    }

    const shape = this.shapes.get(this.viewingLevel)!;
    shape.config.position = this.coor;
    shape.update();
  }

  public display(ctx: CanvasRenderingContext2D): void {
    try {
      const shapeInstance = this.shapes.get(this.viewingLevel)!;

      shapeInstance.display(ctx);
    } catch (err) {
      console.error("Shape doesn't exists");
    }
  }
}
