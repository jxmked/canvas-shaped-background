import Shape from 'shape'

class Hexagon extends Shape implements ShapeProperties {
    
    constructor(context:CanvasRenderingContext2D, attr:ShapeAttributes) {
        super(context, attr)
    }
    
    public get type():string {
        return "hexagon";
    }
    
    public draw():void {
        const ratio = 45 + this.angle;

        const pa = this.getAnglePoint(this.size, 0 + ratio);
        const pb = this.getAnglePoint(this.size, 60 + ratio);
        const pc = this.getAnglePoint(this.size, 120 + ratio);
        const pd = this.getAnglePoint(this.size, 180 + ratio);
        const pe = this.getAnglePoint(this.size, 240 + ratio);
        const pf = this.getAnglePoint(this.size, 300 + ratio);
        
        this.context.beginPath();
        this.context.moveTo(pa.x, pa.y);
        this.context.lineTo(pb.x, pb.y);
        this.context.lineTo(pc.x, pc.y);
        this.context.lineTo(pd.x, pd.y);
        this.context.lineTo(pe.x, pe.y);
        this.context.lineTo(pf.x, pf.y);

        this.context.closePath();
        
        this.applyStyle()
    }
}

export default Hexagon;
