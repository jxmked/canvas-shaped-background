import './styles/index.css';
import gtagPageview from './utils/gtag';
import * as ShapeArray from './shape_object/index';
import Shape from './shape_object/shape'; // Will be use as interface
import * as helpers from './utils/helpers';
import { resolveCollision } from './utils/elastic-collision';
import resolveBoundaryCollision from './utils/resolve-boundary-collision';
import ScreenSizeObject from './screen-size';

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
    count: 0, // Shape count
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
    transitionSpeedYRange: [0.3, 1],
    transitionSpeedXRange: [0.3, 0.4]
};

const addShape: TypeAddShape = ({ x, y }: XYCoordinate, returnValue?: boolean): ShapeProperties => {
    const attr: ShapeProperties = {
        size: helpers.getRandomInRange(ParticlesAttribute.sizeRange[0], ParticlesAttribute.sizeRange[1]),

        color: helpers.getRandomItem(ParticlesAttribute.colors),

        angle: 7,

        thick: helpers.getRandomInRange(ParticlesAttribute.thickRange[0], ParticlesAttribute.thickRange[1]),

        style: helpers.getRandomItem(ParticlesAttribute.styles),

        position: { x, y },

        rotationSpeed: helpers.getRandomInRange(ParticlesAttribute.rotationSpeedRange[0], ParticlesAttribute.rotationSpeedRange[1]),

        velocity: {
            x: helpers.getRandomInRange(ParticlesAttribute.transitionSpeedXRange[0], ParticlesAttribute.transitionSpeedXRange[1]),
            y: helpers.getRandomInRange(ParticlesAttribute.transitionSpeedXRange[0], ParticlesAttribute.transitionSpeedXRange[1])
        },

        isClockwise: helpers.getRandomItem([true, false]),

        mass: helpers.getRandomInRange(0.2, 1)
    };

    if (!returnValue) Particles.push(new (helpers.getRandomItem(shapeArray))(ctx, attr) as Shape);

    return attr;
};
/** * * * * * * * * * * * * * * * **/

function start(): void {
    clrscr();

    bgColor('rgb(26, 43, 51, 1.0)');

    Particles.forEach((shape: Shape) => {
        if (shape.isOverride) {
            shape.draw();
            return;
        }

        Particles.forEach((shapeB: Shape) => {
            if (shape.id === shapeB.id) return;

            const t_thick = 0.5 * ((shape.style === 'stroke' ? shape.thick : 0) + (shapeB.style === 'stroke' ? shapeB.thick : 0));
            const t_radius = shape.size + shapeB.size + t_thick;

            if (helpers.objectMidpointDistance(shape, shapeB) <= t_radius) {
                const saveVelocity: VelocityProperties = shapeB.velocity;

                resolveCollision(shape, shapeB);

                resolveBoundaryCollision(shapeB);

                helpers.restrictVelocities(shapeB);

                // Prevent to apply changes into overrided shape
                if (shapeB.isOverride) shapeB.velocity = saveVelocity;
            }
        });

        helpers.restrictVelocities(shape);
        resolveBoundaryCollision(shape);

        shape.move(shape.velocity);

        shape.draw();
    });

    window.requestAnimationFrame(start);
}

let isInitialized = false;
let cshape = 0;

window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    canvas.width = width * 2;
    canvas.height = height * 2;

    overlayedCanvas.width = canvas.width;
    overlayedCanvas.height = canvas.height;

    ScreenSizeObject.width = canvas.width;
    ScreenSizeObject.height = canvas.height;

    ParticlesAttribute.count = Math.floor(Math.abs(width * height) / 18000);

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
        y: helpers.getRandomInRange(20, canvas.height - 20)
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
const prev_pos = { x: 0, y: 0 };

const eventMove: ({ x, y }: XYCoordinate) => void = ({ x, y }: XYCoordinate): void => {
    const { left, top, width, height } = canvas.getBoundingClientRect();
    const dx: number = ((x - left) / width) * canvas.width;
    const dy: number = ((y - top) / height) * canvas.height;

    mouseEvent.x = dx;
    mouseEvent.y = dy;

    if (mouseEvent.isDown) {
        const c_time = new Date().getTime();
        const dt = startTime - c_time;

        try {
            Particles[mouseEvent.shapeIndex].mass = 1;
            Particles[mouseEvent.shapeIndex].velocity.x = (x - prev_pos.x) / dt;
            Particles[mouseEvent.shapeIndex].velocity.y = (y - prev_pos.y) / dt;
        } catch (TypeError) {
            return;
        }

        Particles[mouseEvent.shapeIndex].translate({
            x: dx,
            y: dy
        });

        prev_pos.x = x;
        prev_pos.y = y;
        startTime = c_time;
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
                    Particles.splice(index, 1);
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
