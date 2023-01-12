
class Shape implements ShapeInterface {
    
    public size:ShapeProperties['size'];
    public color:ShapeProperties['color'];
    public angle:ShapeProperties['angle'];
    public thick:ShapeProperties['thick'];
    public style:ShapeProperties['style'];
    public context:Shape2DContext;
    public position:ShapeProperties['position'];
    public rotationSpeed:ShapeProperties['rotationSpeed']
    public isClockwise:ShapeProperties['isClockwise'];
    public isOverride:ShapeProperties['isOverride'];
    public velocity:ShapeProperties['velocity']
    public data:ShapeProperties['data'];
    public static countShape = 0;
    
    constructor(context:Shape2DContext, attr:ShapeProperties) {
        const {
            size, 
            color, 
            angle,
            thick, 
            style, 
            position,
            rotationSpeed, 
            isClockwise,
            isOverride, 
            velocity, 
            data
        } = attr;
        
        ++Shape.countShape
        
        // Validate angle
        if (angle > 360 && angle < 0) 
            throw new Error("Invalid angle")
            
        this.size = size;
        this.color = color;
        this.angle = angle;
        this.thick = thick;
        this.style = style;
        this.position = position;
        this.context = context;
        this.rotationSpeed = rotationSpeed;
        this.isClockwise = isClockwise
        this.isOverride = (isOverride === void 0) ? false : isOverride
        this.velocity = velocity;
        this.data = data;
    }
    
    public applyStyle():void {
        if(this.style === "fill") {
            this.context.fillStyle = this.color;
            this.context.fill()
            return;
        }
        
        this.context.strokeStyle = this.color;
        this.context.lineWidth = this.thick;
        this.context.stroke()
    }
    
    public getAnglePoint(size:number, angle:ShapeProperties['angle']): XYCoordinate {
        const { x, y } = this.position;
        const rad:number = angle * (Math.PI / 180);
        return { 
            x: x + (size * Math.cos(rad)),
            y: y + (size * Math.sin(rad))
        };
    }
    
    public polygonShape(endPointCount:number): void {
        const numOfSections: number = 360 / endPointCount;
        const midpoint:XYCoordinate = this.getAnglePoint(this.size, 0 + this.angle);
        
        this.context.beginPath()
        this.context.moveTo(midpoint.x, midpoint.y);
        
        for(let deg = numOfSections; deg <= (360 - numOfSections); deg += numOfSections) {
            const endpoint:XYCoordinate = this.getAnglePoint(this.size, deg + this.angle);
            this.context.lineTo(endpoint.x, endpoint.y);
        }
        
        this.context.closePath();
    }
    
    public move({x, y}:XYCoordinate): void {
        this.position.x += x;
        this.position.y += y;
    }
    
    /**
     * Move object into desired coordinate
     * */
    public translate({x, y}:XYCoordinate):void {
        this.position = {x, y}
    }
    
    public rotate(angle:ShapeProperties['angle']): void {
        this.angle = angle
    }

}

abstract class AbstractShape extends Shape {
    abstract get type():string;
    abstract draw(): void;
}

export default AbstractShape;
