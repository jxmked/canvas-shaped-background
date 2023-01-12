import './styles/index.css';
import gtagPageview from './utils/gtag';
import * as ShapeArray from "./shape_object/index";
import Shape from './shape_object/shape'; // Will be use as interface
import * as helpers from './utils/helpers'
// Page Viewed
gtagPageview(window.location.href.toString());

const target:HTMLBodyElement = document.body as HTMLBodyElement
const canvas:HTMLCanvasElement = document.getElementById("canvas")! as HTMLCanvasElement;
const overlayedCanvas:HTMLCanvasElement = document.getElementById("overlayed-canvas")! as HTMLCanvasElement;

/**
 * We can use CanvasRenderingContext2D.shadowBlur
 * but it has a drawback when it comes to performance.
 * 
 * So, to achieve blurry canvas is by layering HTMLelements
 * and adjusting it into css
 * 
 * */
const ctx:CanvasRenderingContext2D = canvas.getContext('2d')!

/**
 * This second context allow us to have a sharp shapes.
 * This canvas handles mouse events
 * */
const octx :CanvasRenderingContext2D = overlayedCanvas.getContext('2d')! 
const shapeArray:TypeShape[] = Object.values(ShapeArray)
const Particles:Shape[] = [];

/**
 * Change main canvas background color 
 * */
export const bgColor:((value:string) => void) = (value:string): void => {
    ctx.fillStyle = value
    ctx.fillRect(0, 0, canvas.width, canvas.height)
}

/**
 * Clear canvas context
 * */
export const clrscr:(() => void) = (): void => {
    octx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
}

const ParticlesAttribute:ParticlesProps = {
    count: 10, // Shape count
    colors: [ // Color for shapes
        "rgb(74, 176, 152, 1)", // Green
        "rgb(234, 94, 93, 1)", // Red
        "rgb(248, 186, 63, 1)", // Yellow
        "rgb(63, 130, 243, 1)" // Blue
    ],
    sizeRange: [60, 100],
    rotationSpeedRange: [1, 7],
    thickRange: [20, 50],
    styles: ["stroke", "fill"], // Keep this
    transitionSpeedYRange: [1, 8],
    transitionSpeedXRange: [-5, 5]
}

const addShape:(({x,y}:XYCoordinate, returnValue?:boolean) =>  ShapeProperties|undefined) = ({x, y}:XYCoordinate, returnValue?:boolean):ShapeProperties|undefined => {
    
    const attr:ShapeProperties = {
        size: helpers.getRandomInRange(
            ParticlesAttribute.sizeRange[0],
            ParticlesAttribute.sizeRange[1]
        ),
        
        color: helpers.getRandomItem(ParticlesAttribute.colors),
        
        angle: 7,
        
        thick: helpers.getRandomInRange(
            ParticlesAttribute.thickRange[0],
            ParticlesAttribute.thickRange[1]
        ),
        
        style: helpers.getRandomItem(ParticlesAttribute.styles),
        
        position: { x, y },
        
        rotationSpeed: helpers.getRandomInRange(
            ParticlesAttribute.rotationSpeedRange[0],
            ParticlesAttribute.rotationSpeedRange[1]
        ),
        
        velocity: {
            x: helpers.getRandomInRange(
                ParticlesAttribute.transitionSpeedXRange[0],
                ParticlesAttribute.transitionSpeedXRange[1]
            ),
            y: helpers.getRandomInRange(
                ParticlesAttribute.transitionSpeedXRange[0],
                ParticlesAttribute.transitionSpeedXRange[1]
            )
        },
        
        isClockwise: helpers.getRandomItem([true, false])
    }
    
    if(returnValue)
        return attr
        
    const shape:TypeShape = helpers.getRandomItem(shapeArray)
    
    Particles.push(new shape(ctx, attr) as Shape)
    
    return;
}

function start(): void {
    
    clrscr()
    
    bgColor("rgb(26, 43, 51, 1.0)")
    
    Particles.forEach((shape:Shape) => {
        // get coord
        let { x, y } = shape.position
        let angle:number = Math.abs(shape.angle)
        let moveX:number = shape.velocity.x
        let moveY:number = shape.velocity.y
        
        angle += shape.rotationSpeed
        
        // Keep Degree angle in range
        if (angle < 0)
            shape.angle = 360 - angle
            
        else if (angle > 360)
            shape.angle = angle - 360 
        
        // Checking if we hit the boundaries
        // On hit...
        // Decrease/Increase velocities
        // Change rotation angle
        
        //  Width boundaries
        if (x <= 0) {
            moveX = (Math.abs(moveX) + helpers.flipper(2))
            x = 0
            shape.isClockwise = helpers.getRandomItem([true, false])
        
        } else if (x >= canvas.width) {
            moveX = -(Math.abs(moveX) + helpers.flipper(2))
            x = canvas.width
            shape.isClockwise = helpers.getRandomItem([true, false])
        }
        
        // height boundaries
        if (y <= 0) {
            y = 0
            moveY = (Math.abs(moveY) + helpers.flipper(2))
            shape.isClockwise = helpers.getRandomItem([true, false])
        } else if(y >= canvas.height) {
            y = canvas.height
            moveY = -(Math.abs(moveY) + helpers.flipper(2))
            shape.isClockwise = helpers.getRandomItem([true, false])
        }
        
        /**
         * We handled the movement of shape when it is overrided
         * */
        if(! shape.isOverride)
            shape.move({
                x: moveX,
                y: moveY
            })
        
        // Update shape velocities
        shape.velocity.x = moveX
        shape.velocity.y = moveY
        
        shape.rotate(shape.isClockwise ? -angle : angle)
        
        shape.draw()
        
    })
    
    window.requestAnimationFrame(start)
}

let isInitialized = false;
let cshape = 0;

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth * 2
    canvas.height = window.innerHeight * 2
    
    overlayedCanvas.width = canvas.width;
    overlayedCanvas.height = canvas.height;
    
    isInitialized = true;
    
})

window.dispatchEvent(new Event("resize"));
window.requestAnimationFrame(start)

/**
 * Lets add some intro
 * */
const ival:number = window.setInterval(() => {
    if (! isInitialized) return
    cshape++;
    if(ParticlesAttribute.count <= cshape)
        clearInterval(ival)
        
    addShape({
        x: helpers.getRandomInRange(20, canvas.width - 20), 
        y: canvas.height
    })
    
}, 100)

/**
 * Allow User to Add Object On Specified Area 
 * */
 /*
canvas.addEventListener("click", (evt:MouseEvent) => {
    const {left, top, width, height} = canvas.getBoundingClientRect()
    const x = ((evt.pageX - left) / width) * canvas.width
    const y = ((evt.pageY - top) / height) * canvas.height
    
    addShape({ x, y })
}) 
*/

// Lets do some click event where...
/**
 * On Mouse Down, A Shape will appear and still
 * On Mouse Up, A shape will enlarge then disappear
 * 
 * */

const mouseEvent:MouseEventProps = {
    x:0,
    y:0,
    isDown:false,
    shapeIndex: -1
}

const eventMove:(({x,y}:XYCoordinate) => void) = ({x, y}:XYCoordinate): void => {
    const {left, top, width, height} = canvas.getBoundingClientRect()
    const dx:number = ((x - left) / width) * canvas.width
    const dy:number = ((y - top) / height) * canvas.height
    
    mouseEvent.x = dx;
    mouseEvent.y = dy;
    
   if(mouseEvent.isDown)
        Particles[mouseEvent.shapeIndex].translate({
            x:dx, y:dy
        }) 
}

const eventDown:(({x,y}:XYCoordinate) => void) = ({x, y}:XYCoordinate): void => {
    eventMove({x, y})
    mouseEvent.isDown = true;
    
    mouseEvent.shapeIndex = Particles.length
    
    const shape:TypeShape = helpers.getRandomItem(shapeArray)
    
    const shapeAttr:ShapeProperties = {
        ...addShape({
                x:mouseEvent.x,
                y:mouseEvent.y
        }, true)!,
        isOverride:true
    }
    
    shapeAttr.size = 50;
    shapeAttr.rotationSpeed = 8;
    shapeAttr.thick = 40
    shapeAttr.style = "fill"
    
    /**
     * Insert Shape into overlayed canvas so its not blurred
     * */
    Particles[mouseEvent.shapeIndex] = new shape(octx, shapeAttr) as Shape
    
    let color:ShapeProperties['color'] = Particles[mouseEvent.shapeIndex].color;
    
    color = color.replace("0.5", "1.0")
    Particles[mouseEvent.shapeIndex].color = color
}

const eventUp: (({x,y}:XYCoordinate) => void) = ({x, y}:XYCoordinate): void => {
    mouseEvent.isDown = false
    eventMove({x, y})
    
    try {
        Particles[mouseEvent.shapeIndex].size = 20
    } catch(err) {
        console.warn(err)
    }
    
    setTimeout(() => {
        try {
            Particles[mouseEvent.shapeIndex].size = 80
        } catch(err) {
            console.warn(err)
        }
        // Finally
        setTimeout(() => {
            // Remove all overrided shapes
            Particles.forEach((shape, index) => {
                if(shape.isOverride) {
                    Particles.splice(index, 1)
                }
            })
        }, 30)
    },  50)
}

target.addEventListener("mousemove", (evt:MouseEvent) => eventMove({x:evt.pageX, y:evt.pageY}))
target.addEventListener("mousedown", (evt:MouseEvent) => eventDown({x:evt.pageX, y:evt.pageY}))
target.addEventListener("mouseup", (evt:MouseEvent) => eventUp({x:evt.pageX, y:evt.pageY}))

target.addEventListener("touchmove", (evt:TouchEvent) => {
    const { pageX, pageY } = evt.targetTouches[0]
    
    eventMove({
        x: pageX,
        y: pageY
    })
})

target.addEventListener("touchend", (evt:TouchEvent) => {
    const { pageX, pageY } = evt.changedTouches[0]
    
    eventUp({
        x: pageX,
        y: pageY
    })
})


target.addEventListener("touchstart", (evt:TouchEvent) => {
    const { pageX, pageY } = evt.changedTouches[0]
    
    eventDown({
        x: pageX,
        y: pageY
    }) 
})

