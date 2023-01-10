import Shape from './shape'

class Circle extends Shape implements ShapeProperties {

    constructor(context:CanvasRenderingContext2D, attr:ShapeAttributes) {
        super(context, attr)
    }
    
    public get type():string {
        return "circle";
    }
    
    public draw(doMore?:DoMoreProperties):void {
        const { x, y } = this.position;
        
        this.context.beginPath();
        
        this.context.arc(x, y, this.size, 0, 2 * Math.PI);
        
        (doMore||function(){})(this.context);
        
        this.context.closePath();
        
        this.applyStyle()
    }
}

export default Circle;
