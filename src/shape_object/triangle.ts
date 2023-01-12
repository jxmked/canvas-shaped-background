import Shape from './shape'

class Triangle extends Shape implements ShapeInterface {
    
    constructor(context:Shape2DContext, attr:ShapeProperties) {    
        super(context, attr)
    }
    
    public get type(): string {
        return "triangle";
    }
    
    public draw():void {
        this.polygonShape(3)
        this.applyStyle()
    }
}

export default Triangle;
