/**
 * Touch event handler
 *
 * Every touches will be registered here.
 *
 *
 * */
import { ScreenObject } from './abstracts';

export default class TapAnimator extends ScreenObject {
  private coor: ICoordinates;
  private is_down: boolean;
  private is_to_be_kill: boolean;
  public static readonly kill_interval = 500; // ms

  constructor(private identifier: number) {
    super();

    this.coor = { x: 0, y: 0 };
    this.is_down = false;
    this.is_to_be_kill = false;
  }

  public get id() {
    return this.identifier;
  }

  public get position() {
    return Object.assign({}, this.coor);
  }

  public move({ x, y }: ICoordinates): void {}

  public up(): void {
    this.is_down = false;
    this.is_to_be_kill = true;
  }

  public down({ x, y }: ICoordinates): void {}

  public init(): void {}

  public update(time: number = 0): void {}

  public display(ctx: CanvasRenderingContext2D): void {}
}
