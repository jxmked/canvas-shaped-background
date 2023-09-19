export abstract class ScreenObject {
  private _is_visible: boolean;

  constructor() {
    this._is_visible = true;
  }

  public get visibility() {
    return this._is_visible;
  }

  public abstract update(time: number = 0): void;
  public abstract display(ctx: CanvasRenderingContext2D): void;
  public abstract init(): void;
}
