import Shape from './shape'

class Cross extends Shape implements ShapeProperties {
    
    constructor(context:CanvasRenderingContext2D, attr:ShapeAttributes) {
        super(context, attr)
        // We can't have different styling for this
        this.style = "stroke"
    }
    
    public get type():string {
        return "cross";
    }
    
    public draw(doMore?:DoMoreProperties):void {
        // Close Center
        const closeBottomRight = this.getAnglePoint(this.size, 45 + this.angle);
        const closeBottomLeft = this.getAnglePoint(this.size, 135 + this.angle);
        const closeTopLeft = this.getAnglePoint(this.size, 225 + this.angle);
        const closeTopRight = this.getAnglePoint(this.size, 315 + this.angle);
        
        this.context.beginPath()
        
        this.context.moveTo(this.position.x, this.position.y)
        this.context.lineTo(closeBottomRight.x, closeBottomRight.y)
        this.context.moveTo(this.position.x, this.position.y)
        this.context.lineTo(closeBottomLeft.x, closeBottomLeft.y)
        this.context.moveTo(this.position.x, this.position.y)
        this.context.lineTo(closeTopLeft.x, closeTopLeft.y)
        this.context.moveTo(this.position.x, this.position.y)
        this.context.lineTo(closeTopRight.x, closeTopRight.y)
        
        // To make sure that the cursor will stay at the center
        this.context.moveTo(this.position.x, this.position.y);
        
        (doMore ?? function(){ return void 0})(this.context);
        
        this.context.closePath()
        
        this.applyStyle()
    }
    
}

export default Cross;
