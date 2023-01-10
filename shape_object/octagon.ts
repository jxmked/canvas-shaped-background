import Shape from "shape";

class Octagon extends Shape implements ShapeProperties {
    
    constructor(context:CanvasRenderingContext2D, attr:ShapeAttributes) {
        super(context, attr)
    }
    
    get type():string {
        return "octagon";
    }
    
    public draw(doMore?:DoMoreProperties):void {
        const pa = this.getAnglePoint(this.size, 0 + this.angle);
        const pb = this.getAnglePoint(this.size, 45 + this.angle);
        const pc = this.getAnglePoint(this.size, 90 + this.angle);
        const pd = this.getAnglePoint(this.size, 135 + this.angle);
        const pe = this.getAnglePoint(this.size, 180 + this.angle);
        const pf = this.getAnglePoint(this.size, 225 + this.angle);
        const pg = this.getAnglePoint(this.size, 270 + this.angle);
        const ph = this.getAnglePoint(this.size, 315 + this.angle);
        
        this.context.beginPath();
        this.context.moveTo(pa.x, pa.y);
        this.context.lineTo(pb.x, pb.y);
        this.context.lineTo(pc.x, pc.y);
        this.context.lineTo(pd.x, pd.y);
        this.context.lineTo(pe.x, pe.y);
        this.context.lineTo(pf.x, pf.y);
        this.context.lineTo(pg.x, pg.y);
        this.context.lineTo(ph.x, ph.y);
        
        (doMore||function(){})(this.context);
        
        this.context.closePath();
        
        this.applyStyle()
    }
}

export default Octagon;
