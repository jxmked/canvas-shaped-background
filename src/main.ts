export default class Main {
    private mainCanvas: HTMLCanvasElement;
    private overlayedCanvas: HTMLCanvasElement;

    private mainCtx: CanvasRenderingContext2D;
    private overlayedCtx: CanvasRenderingContext2D;

    constructor() {
        this.mainCanvas = document.querySelector("#canvas")!;
        this.overlayedCanvas = document.querySelector("#overlayed-canvas")!;

        this.mainCtx = this.mainCanvas.getContext
    }
}