import Shape from './shape'

class Triangle extends Shape implements ShapeProperties {
    
    constructor(context:CanvasRenderingContext2D, attr:ShapeAttributes) {
        super(context, attr)
    }
    
    get type(): string {
        return "triangle";
    }
    
    public draw(doMore?:DoMoreProperties):void {
        const pa:XYCoordinate = this.getAnglePoint(this.size, 0 + this.angle);
        const pb:XYCoordinate = this.getAnglePoint(this.size, 120 + this.angle);
        const pc:XYCoordinate = this.getAnglePoint(this.size, 240 + this.angle);
        
        this.context.beginPath();
        this.context.moveTo(pa.x, pa.y);
        this.context.lineTo(pb.x, pb.y);
        this.context.lineTo(pc.x, pc.y);
        
        (doMore ?? function(){ return void 0})(this.context);
        
        this.context.closePath();
        
        this.applyStyle()
    }
}

export default Triangle;
