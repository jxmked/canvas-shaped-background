import Shape from './shape'

class Square extends Shape implements ShapeProperties {
    
    constructor(context:CanvasRenderingContext2D, attr:ShapeAttributes) {
        super(context, attr)
    }
    
    public get type():string {
        return "square";
    }
    
    public draw(doMore?:DoMoreProperties):void {
        const pa = this.getAnglePoint(this.size, 0 + this.angle);
        const pb = this.getAnglePoint(this.size, 90 + this.angle);
        const pc = this.getAnglePoint(this.size, 180 + this.angle);
        const pd = this.getAnglePoint(this.size, 270 + this.angle);
        
        this.context.beginPath();
        this.context.moveTo(pa.x, pa.y);
        this.context.lineTo(pb.x, pb.y);
        this.context.lineTo(pc.x, pc.y);
        this.context.lineTo(pd.x, pd.y);
        
        (doMore||function(){})(this.context);
        
        this.context.closePath();
        
        this.applyStyle()
    }
}

export default Square;
