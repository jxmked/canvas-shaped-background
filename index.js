var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
define("shape_object/shape", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Shape {
        size;
        color;
        angle;
        thick;
        style;
        context;
        position;
        rotationSpeed;
        transitionSpeedX;
        transitionSpeedY;
        isClockwise;
        isOverride;
        static countShape = 0;
        constructor(context, { size, color, angle, thick, style, position, rotationSpeed, transitionSpeedX, transitionSpeedY, isClockwise, isOverride }) {
            ++Shape.countShape;
            if (angle > 360 && angle < 0)
                throw new Error("Invalid angle");
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
            this.isClockwise = isClockwise;
            this.isOverride = (isOverride === void 0) ? false : isOverride;
        }
        applyStyle() {
            if (this.style === "stroke") {
                this.context.strokeStyle = this.color;
                this.context.lineWidth = this.thick;
                this.context.stroke();
            }
            else if (this.style === "fill") {
                this.context.fillStyle = this.color;
                this.context.fill();
            }
        }
        getAnglePoint(size, angle) {
            const { x, y } = this.position;
            const rad = angle * (Math.PI / 180);
            return {
                x: x + (size * Math.cos(rad)),
                y: y + (size * Math.sin(rad))
            };
        }
        move({ x, y }) {
            this.position.x += x;
            this.position.y += y;
        }
        translate({ x, y }) {
            this.position = { x, y };
        }
        rotate(angle) {
            this.angle = angle;
        }
    }
    exports.default = Shape;
});
define("shape_object/triangle", ["require", "exports", "shape_object/shape"], function (require, exports, shape_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    shape_1 = __importDefault(shape_1);
    class Triangle extends shape_1.default {
        constructor(context, attr) {
            super(context, attr);
        }
        get type() {
            return "triangle";
        }
        draw(doMore) {
            const pa = this.getAnglePoint(this.size, 0 + this.angle);
            const pb = this.getAnglePoint(this.size, 120 + this.angle);
            const pc = this.getAnglePoint(this.size, 240 + this.angle);
            this.context.beginPath();
            this.context.moveTo(pa.x, pa.y);
            this.context.lineTo(pb.x, pb.y);
            this.context.lineTo(pc.x, pc.y);
            (doMore || function () { })(this.context);
            this.context.closePath();
            this.applyStyle();
        }
    }
    exports.default = Triangle;
});
define("shape_object/square", ["require", "exports", "shape_object/shape"], function (require, exports, shape_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    shape_2 = __importDefault(shape_2);
    class Square extends shape_2.default {
        constructor(context, attr) {
            super(context, attr);
        }
        get type() {
            return "square";
        }
        draw(doMore) {
            const pa = this.getAnglePoint(this.size, 0 + this.angle);
            const pb = this.getAnglePoint(this.size, 90 + this.angle);
            const pc = this.getAnglePoint(this.size, 180 + this.angle);
            const pd = this.getAnglePoint(this.size, 270 + this.angle);
            this.context.beginPath();
            this.context.moveTo(pa.x, pa.y);
            this.context.lineTo(pb.x, pb.y);
            this.context.lineTo(pc.x, pc.y);
            this.context.lineTo(pd.x, pd.y);
            (doMore || function () { })(this.context);
            this.context.closePath();
            this.applyStyle();
        }
    }
    exports.default = Square;
});
define("shape_object/circle", ["require", "exports", "shape_object/shape"], function (require, exports, shape_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    shape_3 = __importDefault(shape_3);
    class Circle extends shape_3.default {
        constructor(context, attr) {
            super(context, attr);
        }
        get type() {
            return "circle";
        }
        draw(doMore) {
            const { x, y } = this.position;
            this.context.beginPath();
            this.context.arc(x, y, this.size, 0, 2 * Math.PI);
            (doMore || function () { })(this.context);
            this.context.closePath();
            this.applyStyle();
        }
    }
    exports.default = Circle;
});
define("shape_object/hexagon", ["require", "exports", "shape_object/shape"], function (require, exports, shape_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    shape_4 = __importDefault(shape_4);
    class Hexagon extends shape_4.default {
        constructor(context, attr) {
            super(context, attr);
        }
        get type() {
            return "hexagon";
        }
        draw(doMore) {
            const pa = this.getAnglePoint(this.size, 0 + this.angle);
            const pb = this.getAnglePoint(this.size, 60 + this.angle);
            const pc = this.getAnglePoint(this.size, 120 + this.angle);
            const pd = this.getAnglePoint(this.size, 180 + this.angle);
            const pe = this.getAnglePoint(this.size, 240 + this.angle);
            const pf = this.getAnglePoint(this.size, 300 + this.angle);
            this.context.beginPath();
            this.context.moveTo(pa.x, pa.y);
            this.context.lineTo(pb.x, pb.y);
            this.context.lineTo(pc.x, pc.y);
            this.context.lineTo(pd.x, pd.y);
            this.context.lineTo(pe.x, pe.y);
            this.context.lineTo(pf.x, pf.y);
            (doMore || function () { })(this.context);
            this.context.closePath();
            this.applyStyle();
        }
    }
    exports.default = Hexagon;
});
define("shape_object/octagon", ["require", "exports", "shape_object/shape"], function (require, exports, shape_5) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    shape_5 = __importDefault(shape_5);
    class Octagon extends shape_5.default {
        constructor(context, attr) {
            super(context, attr);
        }
        get type() {
            return "octagon";
        }
        draw(doMore) {
            const pa = this.getAnglePoint(this.size, 0 + this.angle);
            const pb = this.getAnglePoint(this.size, 45 + this.angle);
            const pc = this.getAnglePoint(this.size, 90 + this.angle);
            const pd = this.getAnglePoint(this.size, 135 + this.angle);
            const pe = this.getAnglePoint(this.size, 180 + this.angle);
            const pf = this.getAnglePoint(this.size, 225 + this.angle);
            const pg = this.getAnglePoint(this.size, 270 + this.angle);
            const ph = this.getAnglePoint(this.size, 315 + this.angle);
            this.context.beginPath();
            this.context.moveTo(pa.x, pa.y);
            this.context.lineTo(pb.x, pb.y);
            this.context.lineTo(pc.x, pc.y);
            this.context.lineTo(pd.x, pd.y);
            this.context.lineTo(pe.x, pe.y);
            this.context.lineTo(pf.x, pf.y);
            this.context.lineTo(pg.x, pg.y);
            this.context.lineTo(ph.x, ph.y);
            (doMore || function () { })(this.context);
            this.context.closePath();
            this.applyStyle();
        }
    }
    exports.default = Octagon;
});
define("shape_object/cross", ["require", "exports", "shape_object/shape"], function (require, exports, shape_6) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    shape_6 = __importDefault(shape_6);
    class Cross extends shape_6.default {
        constructor(context, attr) {
            super(context, attr);
            this.style = "stroke";
        }
        get type() {
            return "cross";
        }
        draw(doMore) {
            const closeBottomRight = this.getAnglePoint(this.size, 45 + this.angle);
            const closeBottomLeft = this.getAnglePoint(this.size, 135 + this.angle);
            const closeTopLeft = this.getAnglePoint(this.size, 225 + this.angle);
            const closeTopRight = this.getAnglePoint(this.size, 315 + this.angle);
            this.context.beginPath();
            this.context.moveTo(this.position.x, this.position.y);
            this.context.lineTo(closeBottomRight.x, closeBottomRight.y);
            this.context.moveTo(this.position.x, this.position.y);
            this.context.lineTo(closeBottomLeft.x, closeBottomLeft.y);
            this.context.moveTo(this.position.x, this.position.y);
            this.context.lineTo(closeTopLeft.x, closeTopLeft.y);
            this.context.moveTo(this.position.x, this.position.y);
            this.context.lineTo(closeTopRight.x, closeTopRight.y);
            this.context.moveTo(this.position.x, this.position.y);
            (doMore || function () { })(this.context);
            this.context.closePath();
            this.applyStyle();
        }
    }
    exports.default = Cross;
});
define("shape_object/index", ["require", "exports", "shape_object/triangle", "shape_object/square", "shape_object/circle", "shape_object/octagon", "shape_object/cross"], function (require, exports, triangle_1, square_1, circle_1, octagon_1, cross_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Cross = exports.Octagon = exports.Circle = exports.Square = exports.Triangle = void 0;
    triangle_1 = __importDefault(triangle_1);
    square_1 = __importDefault(square_1);
    circle_1 = __importDefault(circle_1);
    octagon_1 = __importDefault(octagon_1);
    cross_1 = __importDefault(cross_1);
    exports.Triangle = triangle_1.default;
    exports.Square = square_1.default;
    exports.Circle = circle_1.default;
    exports.Octagon = octagon_1.default;
    exports.Cross = cross_1.default;
});
define("index", ["require", "exports", "shape_object/index"], function (require, exports, shapeObjects) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    shapeObjects = __importStar(shapeObjects);
    const canvas = document.getElementById("canvas");
    const overlayedCanvas = document.getElementById("overlayed-canvas");
    const ctx = canvas.getContext('2d');
    const octx = overlayedCanvas.getContext('2d');
    let width;
    let height;
    const Particles = [];
    const ParticlesAttribute = {
        count: 5,
        colors: [
            "rgb(74, 176, 152, 1)",
            "rgb(234, 94, 93, 1)",
            "rgb(248, 186, 63, 1)",
            "rgb(63, 130, 243, 1)"
        ],
        sizeRange: [60, 100],
        rotationSpeedRange: [1, 7],
        thickRange: [20, 50],
        styles: ["stroke", "fill"],
        transitionSpeedYRange: [1, 8],
        transitionSpeedXRange: [-5, 5]
    };
    const shapeArray = Object.values(shapeObjects);
    const bgColor = (value) => {
        ctx.fillStyle = value;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    };
    const clrscr = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
    const flipper = (num) => {
        return Math.floor(((Math.random() * 2) * num) - num);
    };
    const getRandomInRange = (mn, mx) => {
        return Math.floor(Math.random() * (mx - mn)) + mn;
    };
    const getRandomItem = (arr) => {
        return arr[Math.floor(Math.random() * arr.length)];
    };
    const addShape = ({ x, y }, returnValue) => {
        const attr = {
            size: getRandomInRange(ParticlesAttribute.sizeRange[0], ParticlesAttribute.sizeRange[1]),
            color: getRandomItem(ParticlesAttribute.colors),
            angle: 7,
            thick: getRandomInRange(ParticlesAttribute.thickRange[0], ParticlesAttribute.thickRange[1]),
            style: getRandomItem(ParticlesAttribute.styles),
            position: { x, y },
            rotationSpeed: getRandomInRange(ParticlesAttribute.rotationSpeedRange[0], ParticlesAttribute.rotationSpeedRange[1]),
            transitionSpeedX: getRandomInRange(ParticlesAttribute.transitionSpeedXRange[0], ParticlesAttribute.transitionSpeedXRange[1]),
            transitionSpeedY: getRandomInRange(ParticlesAttribute.transitionSpeedYRange[0], ParticlesAttribute.transitionSpeedYRange[1]),
            isClockwise: getRandomItem([true, false])
        };
        if (returnValue)
            return attr;
        const shape = getRandomItem(shapeArray);
        Particles.push(new shape(ctx, attr));
    };
    function start() {
        clrscr();
        octx.clearRect(0, 0, width, height);
        bgColor("rgb(26, 43, 51, 1.0)");
        Particles.forEach((shape) => {
            let { x, y } = shape.position;
            let angle = Math.abs(shape.angle);
            let moveX = shape.transitionSpeedX;
            let moveY = shape.transitionSpeedY;
            angle += shape.rotationSpeed;
            if (angle < 0)
                shape.angle = 360 - angle;
            else if (angle > 360)
                shape.angle = angle - 360;
            if (x <= 0) {
                moveX = (Math.abs(moveX) + flipper(2));
                x = 0;
                shape.isClockwise = getRandomItem([true, false]);
            }
            else if (x >= width) {
                moveX = -(Math.abs(moveX) + flipper(2));
                x = width;
                shape.isClockwise = getRandomItem([true, false]);
            }
            if (y <= 0) {
                y = 0;
                moveY = (Math.abs(moveY) + flipper(2));
                shape.isClockwise = getRandomItem([true, false]);
            }
            else if (y >= height) {
                y = height;
                moveY = -(Math.abs(moveY) + flipper(2));
                shape.isClockwise = getRandomItem([true, false]);
            }
            if (!shape.isOverride)
                shape.move({
                    x: moveX,
                    y: moveY
                });
            shape.transitionSpeedX = moveX;
            shape.transitionSpeedY = moveY;
            shape.rotate(shape.isClockwise ? -angle : angle);
            shape.draw();
        });
        window.requestAnimationFrame(start);
    }
    let isInitialized = false;
    let cshape = 0;
    window.addEventListener("resize", () => {
        canvas.width = window.innerWidth * 2;
        canvas.height = window.innerHeight * 2;
        width = canvas.width;
        height = canvas.height;
        overlayedCanvas.width = width;
        overlayedCanvas.height = height;
        isInitialized = true;
    });
    window.dispatchEvent(new Event("resize"));
    window.requestAnimationFrame(start);
    let ival = window.setInterval(() => {
        if (!isInitialized)
            return;
        if (ParticlesAttribute.count <= cshape)
            clearInterval(ival);
        addShape({
            x: getRandomInRange(20, canvas.width - 20),
            y: canvas.height
        });
        cshape++;
    }, 100);
    const mouseEvent = {
        x: 0,
        y: 0,
        isDown: false,
        shapeIndex: -1
    };
    const target = document.body;
    const eventMove = ({ x, y }) => {
        const { left, top, width, height } = canvas.getBoundingClientRect();
        const dx = ((x - left) / width) * canvas.width;
        const dy = ((y - top) / height) * canvas.height;
        mouseEvent.x = dx;
        mouseEvent.y = dy;
        if (mouseEvent.isDown)
            Particles[mouseEvent.shapeIndex].translate({
                x: dx, y: dy
            });
    };
    const eventDown = ({ x, y }) => {
        eventMove({ x, y });
        mouseEvent.isDown = true;
        mouseEvent.shapeIndex = Particles.length;
        const shape = getRandomItem(shapeArray);
        const shapeAttr = {
            ...addShape({
                x: mouseEvent.x,
                y: mouseEvent.y
            }, true),
            isOverride: true
        };
        shapeAttr.size = 50;
        shapeAttr.rotationSpeed = 8;
        shapeAttr.thick = 40;
        shapeAttr.style = "fill";
        Particles[mouseEvent.shapeIndex] = new shape(octx, shapeAttr);
        let color = Particles[mouseEvent.shapeIndex].color;
        color = color.replace("0.5", "1.0");
        Particles[mouseEvent.shapeIndex].color = color;
    };
    const eventUp = ({ x, y }) => {
        mouseEvent.isDown = false;
        eventMove({ x, y });
        try {
            Particles[mouseEvent.shapeIndex].size = 20;
        }
        catch (TypeError) { }
        setTimeout(() => {
            try {
                Particles[mouseEvent.shapeIndex].size = 80;
            }
            catch (TypeError) { }
            setTimeout(() => {
                Particles.forEach((shape, index) => {
                    if (shape.isOverride) {
                        Particles.splice(index, 1);
                    }
                });
            }, 30);
        }, 50);
    };
    target.addEventListener("mousemove", (evt) => eventMove({ x: evt.pageX, y: evt.pageY }));
    target.addEventListener("mousedown", (evt) => eventDown({ x: evt.pageX, y: evt.pageY }));
    target.addEventListener("mouseup", (evt) => eventUp({ x: evt.pageX, y: evt.pageY }));
    target.addEventListener("touchmove", (evt) => {
        const { pageX, pageY } = evt.targetTouches[0];
        eventMove({
            x: pageX,
            y: pageY
        });
    });
    target.addEventListener("touchend", (evt) => {
        const { pageX, pageY } = evt.changedTouches[0];
        eventUp({
            x: pageX,
            y: pageY
        });
    });
    target.addEventListener("touchstart", (evt) => {
        const { pageX, pageY } = evt.changedTouches[0];
        eventDown({
            x: pageX,
            y: pageY
        });
    });
});
//# sourceMappingURL=index.js.map