export abstract class ScreenObject {
  private _is_visible: boolean;

  constructor() {
    this._is_visible = true;
  }

  public get visibility() {
    return this._is_visible;
  }

  public abstract update(time: number): void;
  public abstract display(ctx: CanvasRenderingContext2D): void;
  public abstract init(): void;
}

export interface MovingObject {
  position: ICoordinates;
  velocity: IVelocities;
  rotation: number;
}

export abstract class MovableScreenObject extends ScreenObject {
  public abstract update(time: number): void;
  public abstract display(ctx: CanvasRenderingContext2D): void;
  public abstract init(): void;
  public abstract move({ x, y }: ICoordinates): void;
}
