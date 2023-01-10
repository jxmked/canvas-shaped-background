
class Shape implements ShapeAttributes {
    
    public size:ShapeAttributes['size'];
    public color:ShapeAttributes['color'];
    public angle:ShapeAttributes['angle'];
    public thick:ShapeAttributes['thick'];
    public style:ShapeAttributes['style'];
    public context:CanvasRenderingContext2D;
    public position:ShapeAttributes['position'];
    public rotationSpeed:ShapeAttributes['rotationSpeed']
    public transitionSpeedX:ShapeAttributes['transitionSpeedX'];
    public transitionSpeedY:ShapeAttributes['transitionSpeedY'];
    public isClockwise:ShapeAttributes['isClockwise'];
    public isOverride:ShapeAttributes['isOverride'];
    
    static countShape:number = 0
    constructor(
        context:CanvasRenderingContext2D, 
        {
            size,
            color, 
            angle, 
            thick, 
            style,
            position,
            rotationSpeed,
            transitionSpeedX,
            transitionSpeedY,
            isClockwise,
            isOverride
    }:ShapeAttributes) {
        
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
        this.transitionSpeedX = transitionSpeedX;
        this.transitionSpeedY = transitionSpeedY;
        this.isClockwise = isClockwise
        this.isOverride = (isOverride === void 0) ? false : isOverride
    }
    
    public applyStyle() {
        if(this.style === "stroke") {
            this.context.strokeStyle = this.color;
            this.context.lineWidth = this.thick;
            this.context.stroke()
        } else if (this.style === "fill") {
            this.context.fillStyle = this.color;
            this.context.fill()
        }
    }
    
    public getAnglePoint(size:number, angle:ShapeAttributes['angle']): XYCoordinate {
        /**
         * Get coordinates to a given distance from center point
         * */
        const { x, y } = this.position;
        const rad = angle * (Math.PI / 180);
        return { 
            x: x + (size * Math.cos(rad)),
            y: y + (size * Math.sin(rad))
        };
    }
    
    /**
     * Move object ny step
     * */
    public move({x, y}:XYCoordinate): void {
        this.position.x += x;
        this.position.y += y;
    }
    
    /**
     * Move object into desired location
     * */
    public translate({x, y}:XYCoordinate):void {
        this.position = {x, y}
    }
    
    public rotate(angle:ShapeAttributes['angle']): void {
        this.angle = angle
    }

}




export default Shape;
