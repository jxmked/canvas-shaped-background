import './styles/index.css';
import gtagPageview from './utils/gtag';
import * as ShapeArray from './shape_object/index';
import Shape from './shape_object/shape'; // Will be use as interface
import * as helpers from './utils/helpers';

// Page Viewed
gtagPageview(window.location.href.toString());

const target: HTMLBodyElement = document.body as HTMLBodyElement;
const canvas: HTMLCanvasElement = document.getElementById('canvas')! as HTMLCanvasElement;
const overlayedCanvas: HTMLCanvasElement = document.getElementById('overlayed-canvas')! as HTMLCanvasElement;

/**
 * We can use CanvasRenderingContext2D.shadowBlur
 * but it has a drawback when it comes to performance.
 *
 * So, to achieve blurry canvas is by layering HTMLelements
 * and adjusting it into css
 *
 * */
const ctx: CanvasRenderingContext2D = canvas.getContext('2d')!;

/**
 * This second context allow us to have a sharp shapes.
 * This canvas handles mouse events
 * */
const octx: CanvasRenderingContext2D = overlayedCanvas.getContext('2d')!;
const shapeArray: TypeShape[] = Object.values(ShapeArray);
const Particles: Shape[] = [];

/**
 * Change main canvas background color
 * */
export const bgColor: (value: string) => void = (value: string): void => {
    ctx.fillStyle = value;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};

/**
 * Clear canvas context
 * */
export const clrscr: () => void = (): void => {
    octx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
};

const ParticlesAttribute: ParticlesProps = {
    count: 20, // Shape count
    colors: [
        // Color for shapes
        'rgb(74, 176, 152, 1)', // Green
        'rgb(234, 94, 93, 1)', // Red
        'rgb(248, 186, 63, 1)', // Yellow
        'rgb(63, 130, 243, 1)' // Blue
    ],
    sizeRange: [60, 100],
    rotationSpeedRange: [1, 7],
    thickRange: [20, 50],
    styles: ['stroke', 'fill'], // Keep this
    transitionSpeedYRange: [1, 2],
    transitionSpeedXRange: [-5, 2]
};

const addShape: TypeAddShape = ({ x, y }: XYCoordinate, returnValue?: boolean): ShapeProperties => {
    // type ReturnTypeValue = typeof returnValue == boolean ? ShapeProperties : undefined;

    const attr: ShapeProperties = {
        size: helpers.getRandomInRange(ParticlesAttribute.sizeRange[0], ParticlesAttribute.sizeRange[1]),

        color: helpers.getRandomItem(ParticlesAttribute.colors),

        angle: 7,

        thick: helpers.getRandomInRange(ParticlesAttribute.thickRange[0], ParticlesAttribute.thickRange[1]),

        style: helpers.getRandomItem(ParticlesAttribute.styles),

        position: { x, y },

        rotationSpeed: helpers.getRandomInRange(ParticlesAttribute.rotationSpeedRange[0], ParticlesAttribute.rotationSpeedRange[1]),

        velocity: {
            x: .5, //helpers.getRandomInRange(ParticlesAttribute.transitionSpeedXRange[0], ParticlesAttribute.transitionSpeedXRange[1]),
            y: .5//helpers.getRandomInRange(ParticlesAttribute.transitionSpeedXRange[0], ParticlesAttribute.transitionSpeedXRange[1])
        },

        isClockwise: helpers.getRandomItem([true, false]),
    };

    if (!returnValue) Particles.push(new (helpers.getRandomItem(shapeArray))(ctx, attr) as Shape);

    return attr;
};
/** * * * * * * * * * * * * * * * **/


const objectMidpointDistance = (a:Shape, b:Shape) => {
    const x = Math.abs(a.position.x - b.position.x);
    const y = Math.abs(a.position.y - b.position.y);
   // const r = sum_r//+ Math.abs(a.thick )
    return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
}

const rotateAngle = (velocity:ShapeProperties['velocity'], angle:number) => {
    const rotatedVelocities = {
        x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
        y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
    };

    return rotatedVelocities;
}


function start(): void {
    clrscr();

    bgColor('rgb(26, 43, 51, 1.0)');

    Particles.forEach((shape: Shape) => {

        if(true) {
            // Log if the collide
            Particles.forEach((shapeB:Shape) => {
                if(shape.id === shapeB.id) return;
                const t_thick = 0.5 * ((shape.style === 'stroke' ? shape.thick : 0) + (shapeB.style === "stroke" ? shapeB.thick : 0))
                const t_radius = (shape.size + shapeB.size) + t_thick;

                if(objectMidpointDistance(shape, shapeB) <= t_radius ) {
                    const diff_velocity = {
                        x: shapeB.velocity.x - shape.velocity.x,
                        y: shapeB.velocity.y - shape.velocity.y
                    }
                    const diff_distance = {
                        x: shape.position.x - shapeB.position.x,
                        y: shape.position.y - shapeB.position.y
                    }
                    
                    if(diff_velocity.x * diff_distance.x + diff_velocity.y * diff_distance.y >= 0) {
                        const angle:number = -Math.atan2(diff_distance.y, diff_distance.x)
                        const u1 = rotateAngle(shape.velocity, angle)
                        const u2 = rotateAngle(shapeB.velocity, angle)
                        const m1 = shape.mass!;
                        const m2 = shapeB.mass!;
                        const v1 = { 
                            x: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2), 
                            y: u1.y 
                        };
                        const v2 = { 
                            x: u2.x * (m1 - m2) / (m1 + m2) + u1.x * 2 * m2 / (m1 + m2), 
                            y: u2.y
                        };
                        
                        
                        const vFinal1 = rotateAngle(v1, -angle);
                        const vFinal2 = rotateAngle(v2, -angle);
                
                        // Swap particle velocities for realistic bounce effect
                        shape.velocity.x = vFinal1.x;
                        shape.velocity.y = vFinal1.y;
                
                        shapeB.velocity.x = vFinal2.x;
                        shapeB.velocity.y = vFinal2.y;
                        
                        // Calculate the rotation angle
                        const r_angle = Math.atan2(diff_distance.x, diff_distance.y)
                        const v_angle = Math.atan2(shapeB.velocity.y, shapeB.velocity.x);
                        
                        const br_angle = Math.atan2(diff_distance.y, diff_distance.x);
                        const br_v_angle = Math.atan2(shape.velocity.y, shape.velocity.x)
                        
                        const relative_angle = shapeB.angle - shape.angle
                        const relative_speed = shape.rotationSpeed - shapeB.rotationSpeed
                        
                        shape.rotationSpeed = relative_speed * Math.cos(relative_angle - r_angle)
                        shape.angle = r_angle - v_angle
                        
                        //shapeB.angle = br_angle - br_v_angle
                     //   shape.rotationSpeed = shape

                    }
                
                    
                } else {
                    // boundaries Collision
                    const { x, y } = shape.position;
                    
                    if(x <= shape.size) {
                        shape.velocity.x = Math.abs(shape.velocity.x)
                        shape.position.x = 1 + shape.size
                  //      shape.velocity.x = Math.max(0, shape.velocity.x - 0.002)

                    } else if (x >= Math.abs(canvas.width - shape.size)) {
                        shape.velocity.x = -Math.abs(shape.velocity.x)
                        shape.position.x = canvas.width - (1 + shape.size)
                   //     shape.velocity.x = Math.max(0, shape.velocity.x - 0.002)
                    }
                    
                    if(y <= shape.size) {
                        shape.velocity.y = Math.abs(shape.velocity.y)
                        shape.position.y = 1 + shape.size
                      //  shape.velocity.y = Math.max(0, shape.velocity.y - 0.002)

                    } else if (y >= Math.abs(canvas.height - shape.size)) {
                        shape.velocity.y = -Math.abs(shape.velocity.y)
                        shape.position.y = canvas.height - (shape.size + 1)
                    //    shape.velocity.y = Math.max(0, shape.velocity.y - 0.002)

                        
                    }

                }

            })
        }
        
        if(!shape.isOverride) {
            shape.move(shape.velocity)
        }
        console.log(shape.angle , " : ", shape.rotationSpeed)
        shape.angle += shape.rotationSpeed
        shape.rotate(shape.angle);
        shape.draw()
        
      /*  return;
        // get coord
        let { x, y } = shape.position;
        let angle: number = Math.abs(shape.angle);
        let moveX: number = shape.velocity.x;
        let moveY: number = shape.velocity.y;

        angle += shape.rotationSpeed;

        // Keep Degree angle in range
        if (angle < 0) shape.angle = 360 - angle;
        else if (angle > 360) shape.angle = angle - 360;

        // Checking if we hit the boundaries
        // On hit...
        // Decrease/Increase velocities
        // Change rotation angle

        //  Width boundaries
        if (x <= 0) {
            moveX = Math.abs(moveX) + helpers.flipper(2);
            x = 0;
            shape.isClockwise = helpers.getRandomItem([true, false]);
        } else if (x >= canvas.width) {
            moveX = -(Math.abs(moveX) + helpers.flipper(2));
            x = canvas.width;
            shape.isClockwise = helpers.getRandomItem([true, false]);
        }

        // height boundaries
        if (y <= 0) {
            y = 0;
            moveY = Math.abs(moveY) + helpers.flipper(2);
            shape.isClockwise = helpers.getRandomItem([true, false]);
        } else if (y >= canvas.height) {
            y = canvas.height;
            moveY = -(Math.abs(moveY) + helpers.flipper(2));
            shape.isClockwise = helpers.getRandomItem([true, false]);
        }

        // We handled the movement of shape when it is overrided
        if (! shape.isOverride) {
            shape.move({
                x: moveX,
                y: moveY
            }); 
        }
        // Update shape velocities
        shape.velocity.x = moveX;
        shape.velocity.y = moveY;

        shape.rotate(shape.isClockwise ? -angle : angle);

        shape.draw(); */
    });

    window.requestAnimationFrame(start);
}

let isInitialized = false;
let cshape = 0;

window.addEventListener('resize', () => {
    canvas.width = (window.innerWidth * 2) ;
    canvas.height = (window.innerHeight * 2);

    overlayedCanvas.width = canvas.width;
    overlayedCanvas.height = canvas.height;

    isInitialized = true;
});

window.dispatchEvent(new Event('resize'));
window.requestAnimationFrame(start);

/**
 * Lets add some intro
 * */
const ival: number = window.setInterval(() => {
    if (!isInitialized) return;
    cshape++;
    if (ParticlesAttribute.count <= cshape) clearInterval(ival);

    addShape({
        x: helpers.getRandomInRange(20, canvas.width - 20),
        y: canvas.height / 2
    });
}, 100);

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

const mouseEvent: MouseEventProps = {
    x: 0,
    y: 0,
    isDown: false,
    shapeIndex: -1
};
let startTime = 0;
const prev_pos = { x: 0, y: 0 }

const eventMove: ({ x, y }: XYCoordinate) => void = ({ x, y }: XYCoordinate): void => {
    const { left, top, width, height } = canvas.getBoundingClientRect();
    const dx: number = ((x - left) / width) * canvas.width;
    const dy: number = ((y - top) / height) * canvas.height;

    mouseEvent.x = dx;
    mouseEvent.y = dy;

    if (mouseEvent.isDown) {
        const c_time =  new Date().getTime()
        const dt = startTime - c_time;
        
        Particles[mouseEvent.shapeIndex].velocity.x = (x - prev_pos.x) / dt
        Particles[mouseEvent.shapeIndex].velocity.y = (y - prev_pos.y) / dt
        
        Particles[mouseEvent.shapeIndex].translate({
            x: dx,
            y: dy
        });
        
        prev_pos.x = x
        prev_pos.y = y
        startTime = c_time
    }
};

const eventDown: ({ x, y }: XYCoordinate) => void = ({ x, y }: XYCoordinate): void => {
    eventMove({ x, y });
    prev_pos.x = x;
    prev_pos.y = y;
    startTime = new Date().getTime();
    mouseEvent.isDown = true;

    mouseEvent.shapeIndex = Particles.length;

    const shape: TypeShape = helpers.getRandomItem(shapeArray);

    const shapeAttr: ShapeProperties = {
        ...addShape(
            {
                x: mouseEvent.x,
                y: mouseEvent.y
            },
            true
        )!,
        isOverride: true
    };

    shapeAttr.size = 50;
    shapeAttr.rotationSpeed = 8;
    shapeAttr.thick = 40;
    shapeAttr.style = 'fill';

    /**
     * Insert Shape into overlayed canvas so its not blurred
     * */
    Particles[mouseEvent.shapeIndex] = new shape(ctx, shapeAttr) as Shape;

    let color: ShapeProperties['color'] = Particles[mouseEvent.shapeIndex].color;

    color = color.replace('0.5', '1.0');
    Particles[mouseEvent.shapeIndex].color = color;
};

const eventUp: ({ x, y }: XYCoordinate) => void = ({ x, y }: XYCoordinate): void => {
    mouseEvent.isDown = false;
    eventMove({ x, y });

    try {
       // Particles[mouseEvent.shapeIndex].size = 20;
    } catch (err) {
        console.warn(err);
    }

    setTimeout(() => {
        try {
           // Particles[mouseEvent.shapeIndex].size = 80;
        } catch (err) {
            console.warn(err);
        }
        // Finally
        setTimeout(() => {
            // Remove all overrided shapes
            Particles.forEach((shape, index) => {
                if (shape.isOverride) {
                   // Particles.splice(index, 1);
                }
            });
        }, 30);
    }, 50);
};

target.addEventListener('mousemove', (evt: MouseEvent) => eventMove({ x: evt.pageX, y: evt.pageY }));
target.addEventListener('mousedown', (evt: MouseEvent) => eventDown({ x: evt.pageX, y: evt.pageY }));
target.addEventListener('mouseup', (evt: MouseEvent) => eventUp({ x: evt.pageX, y: evt.pageY }));

target.addEventListener('touchmove', (evt: TouchEvent) => {
    const { pageX, pageY } = evt.targetTouches[0];

    eventMove({
        x: pageX,
        y: pageY
    });
});

target.addEventListener('touchend', (evt: TouchEvent) => {
    const { pageX, pageY } = evt.changedTouches[0];

    eventUp({
        x: pageX,
        y: pageY
    });
});

target.addEventListener('touchstart', (evt: TouchEvent) => {
    const { pageX, pageY } = evt.changedTouches[0];

    eventDown({
        x: pageX,
        y: pageY
    });
});
