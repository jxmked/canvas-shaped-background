

import * as shapeObjects from "./shape_object/index"

/* const btn = {
    left: <HTMLButtonElement> document.getElementById("left")!,
    right: <HTMLButtonElement> document.getElementById("right")!,
    up: <HTMLButtonElement> document.getElementById("up")!,
    down: <HTMLButtonElement> document.getElementById("down")!,
    upLeft: <HTMLButtonElement> document.getElementById("up-left")!,
    upRight: <HTMLButtonElement> document.getElementById("up-right")!,
    downLeft: <HTMLButtonElement> document.getElementById("down-left")!,
    downRight: <HTMLButtonElement> document.getElementById("down-right")!
} */


const canvas = <HTMLCanvasElement> document.getElementById("canvas")!;
const overlayedCanvas = <HTMLCanvasElement> document.getElementById("overlayed-canvas")!

const ctx = canvas.getContext('2d')!
const octx = overlayedCanvas.getContext('2d')! 

let width:number;
let height:number;
const Particles:ShapeProperties[]= [];
const ParticlesAttribute:ParticlesAttributeProps = {
    count: 5,
    colors: [
        "rgb(74, 176, 152, 1)", // Green
        "rgb(234, 94, 93, 1)", // Red
        "rgb(248, 186, 63, 1)", // Yellow
        "rgb(63, 130, 243, 1)" // Blue
    ],
    sizeRange: [60, 100],
    rotationSpeedRange: [1, 7],
    thickRange: [20, 50],
    styles: ["stroke", "fill"],
    transitionSpeedYRange: [1, 8],
    transitionSpeedXRange: [-5, 5]
}

const shapeArray = Object.values(shapeObjects)

const bgColor = (value:string) => {
    ctx.fillStyle = value
    ctx.fillRect(0, 0, canvas.width, canvas.height)
}

const clrscr = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
}

const flipper = (num: number) => {
    return Math.floor(((Math.random() * 2) * num) - num);
}

const getRandomInRange = (mn:number, mx:number) => {
    return Math.floor(Math.random() * (mx - mn)) + mn
}

const getRandomItem = <T>(arr:T[]): T => {
    return arr[Math.floor(Math.random() * arr.length)]
}

const addShape = ({x, y}:XYCoordinate, returnValue?:boolean) => {
    
    const attr:ShapeAttributes = {
        size: getRandomInRange(
            ParticlesAttribute.sizeRange[0],
            ParticlesAttribute.sizeRange[1]
        ),
        
        color: getRandomItem(ParticlesAttribute.colors),
        
        angle: 7,
        
        thick: getRandomInRange(
            ParticlesAttribute.thickRange[0],
            ParticlesAttribute.thickRange[1]
        ),
        
        style: getRandomItem(ParticlesAttribute.styles),
        
        position: { x, y },
        
        rotationSpeed: getRandomInRange(
            ParticlesAttribute.rotationSpeedRange[0],
            ParticlesAttribute.rotationSpeedRange[1]
        ),
        
        velocity: {
            x: getRandomInRange(
                ParticlesAttribute.transitionSpeedXRange[0],
                ParticlesAttribute.transitionSpeedXRange[1]
            ),
            y: getRandomInRange(
                ParticlesAttribute.transitionSpeedXRange[0],
                ParticlesAttribute.transitionSpeedXRange[1]
            )
        },
        
        isClockwise: getRandomItem([true, false])
    }
    
    if(returnValue)
        return attr
        
    const shape = getRandomItem(shapeArray)
    
    Particles.push(new shape(ctx, attr))
}

function start() {
    
    clrscr()
    octx.clearRect(0, 0, width, height)
    bgColor("rgb(26, 43, 51, 1.0)")
    
    Particles.forEach((shape) => {
        // get coord
        let { x, y } = shape.position
        let angle = Math.abs(shape.angle)
        let moveX = shape.velocity.x
        let moveY = shape.velocity.y
        
        angle += shape.rotationSpeed
        
        // Keep Degree angle in range
        if (angle < 0)
            shape.angle = 360 - angle
            
        else if (angle > 360)
            shape.angle = angle - 360 
        
        // Checking if we hit the boundaries
        if (x <= 0) {
            moveX = (Math.abs(moveX) + flipper(2))
            x = 0
            shape.isClockwise = getRandomItem([true, false])
        
        } else if (x >= width) {
            moveX = -(Math.abs(moveX) + flipper(2))
            x = width
            shape.isClockwise = getRandomItem([true, false])
        }
        
        if (y <= 0) {
            y = 0
            moveY = (Math.abs(moveY) + flipper(2))
            shape.isClockwise = getRandomItem([true, false])
        } else if(y >= height) {
            y = height
            moveY = -(Math.abs(moveY) + flipper(2))
            shape.isClockwise = getRandomItem([true, false])
        }
        
        if(! shape.isOverride)
            shape.move({
                x: moveX,
                y: moveY
            })
        
        // Update shape Transitions
        shape.velocity.x = moveX
        shape.velocity.y = moveY
        
        shape.rotate(shape.isClockwise ? -angle : angle)
        
        shape.draw()
        
    })
    window.requestAnimationFrame(start)
}

let isInitialized:boolean = false;
let cshape = 0;

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth * 2
    canvas.height = window.innerHeight * 2
    
    width = canvas.width;
    height = canvas.height;
    
    overlayedCanvas.width = width;
    overlayedCanvas.height = height;
    
    isInitialized = true;
    
})

window.dispatchEvent(new Event("resize"));
window.requestAnimationFrame(start)

/**
 * Lets add some intro
 * */

let ival = window.setInterval(() => {
    if (! isInitialized) return
    
    if(ParticlesAttribute.count <= cshape)
        clearInterval(ival)
        
    addShape({
        x:getRandomInRange(20, canvas.width - 20), 
        y:canvas.height
    })
    cshape++;
    
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

const target = document.body;

const eventMove = ({x, y}:XYCoordinate) => {
    const {left, top, width, height} = canvas.getBoundingClientRect()
    const dx = ((x - left) / width) * canvas.width
    const dy = ((y - top) / height) * canvas.height
    
    mouseEvent.x = dx;
    mouseEvent.y = dy;
    
   if(mouseEvent.isDown)
        Particles[mouseEvent.shapeIndex].translate({
            x:dx, y:dy
        }) 
}

const eventDown = ({x, y}:XYCoordinate) => {
    eventMove({x, y})
    mouseEvent.isDown = true;
    
    mouseEvent.shapeIndex = Particles.length
    
    const shape = getRandomItem(shapeArray)
    
    const shapeAttr:ShapeAttributes = {
        ...addShape({
                x:mouseEvent.x,
                y:mouseEvent.y
        }, true)!,
        isOverride:true
    }
    
    shapeAttr.size = 50; //getRandomInRange(12, 17)
    shapeAttr.rotationSpeed = 8;
    shapeAttr.thick = 40
    shapeAttr.style = "fill"
    
    Particles[mouseEvent.shapeIndex] = new shape(octx, shapeAttr)
    let color = Particles[mouseEvent.shapeIndex].color;
    color = color.replace("0.5", "1.0")
    Particles[mouseEvent.shapeIndex].color = color
   
}

const eventUp = ({x, y}:XYCoordinate) => {
    mouseEvent.isDown = false
    eventMove({x, y})
    
    try {
        Particles[mouseEvent.shapeIndex].size = 20// getRandomInRange(40, 70)
    } catch(TypeError) {}
    
    setTimeout(() => {
        try {
            Particles[mouseEvent.shapeIndex].size = 80
        } catch(TypeError) {}
        
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

target.addEventListener("mousemove", (evt) => eventMove({x:evt.pageX, y:evt.pageY}))
target.addEventListener("mousedown", (evt) => eventDown({x:evt.pageX, y:evt.pageY}))
target.addEventListener("mouseup", (evt) => eventUp({x:evt.pageX, y:evt.pageY}))

target.addEventListener("touchmove", (evt) => {
    const { pageX, pageY } = evt.targetTouches[0]
    
    eventMove({
        x: pageX,
        y: pageY
    })
})

target.addEventListener("touchend", (evt) => {
    const { pageX, pageY } = evt.changedTouches[0]
    
    eventUp({
        x: pageX,
        y: pageY
    })
})


target.addEventListener("touchstart", (evt) => {
    const { pageX, pageY } = evt.changedTouches[0]
    
    eventDown({
        x: pageX,
        y: pageY
    }) 
})
