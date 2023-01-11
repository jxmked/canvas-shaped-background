import Shape from './shape'

class Square extends ShapeObject {
    
    constructor(context:Shape2DContext, attr:ShapeProperties) {
        super(context, attr)
    }
    
    public get type():string {
        return "square";
    }
    
    public draw():void {
        this.createCircularShape(4);
        this.applyStyle()
    }
}

export default Square;
