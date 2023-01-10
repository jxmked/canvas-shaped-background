import Shape from 'shape'

class Triangle extends Shape implements ShapeProperties {
    
    constructor(context:CanvasRenderingContext2D, attr:ShapeAttributes) {
        super(context, attr)
    }
    
    public get type():string {
        return "triangle";
    }
    
    public draw():void {
        const ratio = 30 + this.angle;
        
        const pa = this.getAnglePoint(this.size, 0 + ratio);
        const pb = this.getAnglePoint(this.size, 120 + ratio);
        const pc = this.getAnglePoint(this.size, 240 + ratio);
        
        this.context.beginPath();
        this.context.moveTo(pa.x, pa.y);
        this.context.lineTo(pb.x, pb.y);
        this.context.lineTo(pc.x, pc.y);
        
        this.context.closePath();
        
        this.applyStyle()
    }
}

export default Triangle;
