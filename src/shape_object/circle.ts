import Shape from './shape'

class Circle extends Shape {

    public get type():string {
        return "circle";
    }
    
    public draw():void {
        const { x, y } = this.position;
        
        this.context.beginPath();
        
        this.context.arc(x, y, this.size, 0, 2 * Math.PI);
        this.context.closePath();
        
        this.applyStyle()
    }
}

export default Circle;
