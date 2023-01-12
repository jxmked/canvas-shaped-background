import Shape from "./shape";

class Octagon extends Shape {
    
    constructor(context:Shape2DContext, attr:ShapeProperties) {
        super(context, attr)
    }
    
    public get type():string {
        return "octagon";
    }
    
    public draw():void {
        this.polygonShape(8)
        this.applyStyle()
    }
}

export default Octagon;
