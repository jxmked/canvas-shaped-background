import Shape from "shape";

class Octagon extends Shape implements ShapeProperties {
    
    constructor(context:CanvasRenderingContext2D, attr:ShapeAttributes) {
        super(context, attr)
    }
    
    get type():string {
        return "octagon";
    }
    
    public draw():void {
        const ratio = 45 + this.angle;
        const pa = this.getAnglePoint(this.size, 0 + ratio);
        const pb = this.getAnglePoint(this.size, 45 + ratio);
        const pc = this.getAnglePoint(this.size, 90 + ratio);
        const pd = this.getAnglePoint(this.size, 135 + ratio);
        const pe = this.getAnglePoint(this.size, 180 + ratio);
        const pf = this.getAnglePoint(this.size, 225 + ratio);
        const pg = this.getAnglePoint(this.size, 270 + ratio);
        const ph = this.getAnglePoint(this.size, 315 + ratio);
        
        this.context.beginPath();
        this.context.moveTo(pa.x, pa.y);
        this.context.lineTo(pb.x, pb.y);
        this.context.lineTo(pc.x, pc.y);
        this.context.lineTo(pd.x, pd.y);
        this.context.lineTo(pe.x, pe.y);
        this.context.lineTo(pf.x, pf.y);
        this.context.lineTo(pg.x, pg.y);
        this.context.lineTo(ph.x, ph.y);

        this.context.closePath();
        
        this.applyStyle()
    }
}

export default Octagon;
