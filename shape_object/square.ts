import Shape from 'shape'

class Square extends Shape implements ShapeProperties {
    
    constructor(context:CanvasRenderingContext2D, attr:ShapeAttributes) {
        super(context, attr)
    }
    
    public get type():string {
        return "square";
    }
    
    public draw():void {
        const ratio = 45 + this.angle;

        const pa = this.getAnglePoint(this.size, 0 + ratio);
        const pb = this.getAnglePoint(this.size, 90 + ratio);
        const pc = this.getAnglePoint(this.size, 180 + ratio);
        const pd = this.getAnglePoint(this.size, 270 + ratio);
        
        this.context.beginPath();
        this.context.moveTo(pa.x, pa.y);
        this.context.lineTo(pb.x, pb.y);
        this.context.lineTo(pc.x, pc.y);
        this.context.lineTo(pd.x, pd.y);

        this.context.closePath();
        
        this.applyStyle()
    }
}

export default Square;
