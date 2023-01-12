import Shape from './shape'

class Hexagon extends Shape {
    
    constructor(context:CanvasRenderingContext2D, attr:ShapeProperties) {
        super(context, attr)
    }
    
    public get type():string {
        return "hexagon";
    }
    
    public draw():void {
        this.polygonShape(5)
        this.applyStyle()
    }
}

export default Hexagon;
