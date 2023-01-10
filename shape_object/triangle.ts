import Shape from 'shape'

class Triangle extends Shape implements ShapeProperties {
    
    constructor(context:CanvasRenderingContext2D, attr:ShapeAttributes) {
        super(context, attr)
    }
    
    public get type():string {
        return "triangle";
    }
    
    public draw(doMore?:DoMoreProperties):void {
        const pa = this.getAnglePoint(this.size, 0 + this.angle);
        const pb = this.getAnglePoint(this.size, 120 + this.angle);
        const pc = this.getAnglePoint(this.size, 240 + this.angle);
        
        this.context.beginPath();
        this.context.moveTo(pa.x, pa.y);
        this.context.lineTo(pb.x, pb.y);
        this.context.lineTo(pc.x, pc.y);
        
        (doMore||function(){})(this.context);
        
        this.context.closePath();
        
        this.applyStyle()
    }
}

export default Triangle;
