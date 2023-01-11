import Shape from "./shape";

class Octagon extends ShapeObject {
    
    constructor(context:Shape2DContext, attr:ShapeProperties) {
        super(context, attr)
    }
    
    get type():string {
        return "octagon";
    }
    
    public draw():void {
        this.createCircularShape(8)
        this.applyStyle()
    }
}

export default Octagon;
