

interface CanvasProperties {
    doubleBuffer:boolean
}

interface CanvasVirtualCanvas {
    canvas?: HTMLCanvasElement;
    context?: CanvasRenderingContext2D;
}
export default class Canvas {
    
    canvas:HTMLCanvasElement;
    context:CanvasRenderingContext2D;
    
    private virtual?:CanvasVirtualCanvas;
    
    options:CanvasProperties;
    width:number;
    height :number;
    
    constructor(canvas:HTMLCanvasElement, options?:CanvasProperties) {
        this.canvas = canvas;
        this.context = this.canvas.getContext("2d")!;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        
        this.options = Object.assign({
            doubleBuffer: false
        }, options);
        
        this.virtual = { };
        
        if(this.options.doubleBuffer) {
            this.virtual.canvas = document.createElement('canvas');
            this.virtual.context = this.virtual.canvas.getContext('2d')!;
        }
    }
    
    /**
     * This will automatically 
     * call CanvasRenderingContext2D.closePath then
     * call CanvasRenderingContext2D.beginPath
     * */
    get begin() {
        let context:CanvasRenderingContext2D = this.context;
        if(this.options.doubleBuffer) {
            context = this.virtual!.context!;
        }
        return new CanvasGetView(context, {
            width: this.width, 
            height: this.height
        });
    }
    
    /**
     * Clear Main Context
     * 
     * */
    clear() {
        
        this.context.clearRect(0,0, this.width, this.height)
    }
    
    draw():void {
        if(this.options.doubleBuffer)
            this.context.drawImage(this.virtual!.canvas!, 0, 0, this.width, this.height)
    }
    
}
// XYCoordinate
// 
interface CanvasGetViewOptionProperties {
    width:number;
    height:number;
}
export class CanvasGetView {
    context:CanvasRenderingContext2D;
    private width:number;
    private height:number;
    
    constructor(context:CanvasRenderingContext2D, options?:CanvasGetViewOptionProperties) {
        this.context = context;
        const { width, height } = Object.assign({
            width: 0,
            height: 0
        }, options);
        
        this.width = (width === void 0 || width === 0) ? this.context.canvas.width : width;
        this.height = (height === void 0 || height === 0) ? this.context.canvas.height : height;
        

        // Close any path that has been started
        this.close()
        
        this.begin()
    }
    
    /**
     * LineTo
     * */
    set line(xy:XYCoordinate) {
        const {x, y} = xy
        this.context.lineTo(x, y);
    }
    
    set move(xy:XYCoordinate) {
        const {x, y} = xy
        this.context.moveTo(x, y);
    }
    
    clear() : void{
        this.context.clearRect(0, 0, this.width, this.height)
    }
    
    set backgroundColor(value:string) {
        this.context.fillStyle = value;
        this.context.fillRect(0,0, this.width, this.height)
    }
    
    rect(x:number, y: number, width:number, height: number): void {
        this.context.fillRect(x, y, width, height)
    }
    
    fill(style:string) :void{
        this.context.fillStyle = style;
        this.context.fill();
    }
    
    stroke(style:string, thick:number) : void {
        this.context.strokeStyle = style;
        this.context.lineWidth = thick;
        this.context.stroke();
    }
    
    arc(x:number, y:number, radius:number, startAngle?:number, endAngle?:number): void {
        startAngle = startAngle === void 0 ? 0 : startAngle;
        endAngle = endAngle === void 0 ? (Math.PI * 2) : endAngle;
        
        this.context.arc(x,y,radius,startAngle,endAngle)
    }
    
    begin(): void {
        this.context.beginPath()
    }
    
    close(): void {
        try {
            this.context.closePath()
        } catch(err) {
            console.warn(err)
        }
    }
}
