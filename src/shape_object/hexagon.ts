import Shape from './shape'

class Hexagon extends Shape implements ShapeProperties {
    
    constructor(context:CanvasRenderingContext2D, attr:ShapeAttributes) {
        super(context, attr)
    }
    
    public get type():string {
        return "hexagon";
    }
    
    public draw(doMore?:DoMoreProperties):void {
        const pa = this.getAnglePoint(this.size, 0 + this.angle);
        const pb = this.getAnglePoint(this.size, 60 + this.angle);
        const pc = this.getAnglePoint(this.size, 120 + this.angle);
        const pd = this.getAnglePoint(this.size, 180 + this.angle);
        const pe = this.getAnglePoint(this.size, 240 + this.angle);
        const pf = this.getAnglePoint(this.size, 300 + this.angle);
        
        this.context.beginPath();
        this.context.moveTo(pa.x, pa.y);
        this.context.lineTo(pb.x, pb.y);
        this.context.lineTo(pc.x, pc.y);
        this.context.lineTo(pd.x, pd.y);
        this.context.lineTo(pe.x, pe.y);
        this.context.lineTo(pf.x, pf.y);
        
        (doMore ?? function(){ return void 0})(this.context);
        
        this.context.closePath();
        
        this.applyStyle()
    }
}

export default Hexagon;
