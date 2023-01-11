import Shape from './shape'

class Triangle extends ShapeObject {
    
    constructor(context:Shape2DContext, attr:ShapeProperties) {    
        super(context, attr)
    }
    
    get type(): string {
        return "triangle";
    }
    
    public draw():void {
        this.createCircularShape(3)
        this.applyStyle()
    }
}

export default Triangle;
