import Shape from '../shape_object/shape';
import ScreenSizeObject from '../screen-size';
import { numberFlip } from './helpers';

const resolveBoundaryCollision: TypeResolveBoundaryCollision = (shape: Shape, callback?: TypeResolveBoundaryCollisionCallback): void => {
    const { x, y } = shape.position;
    const isStroke: boolean = shape.style === 'stroke';
    const size: number = shape.size + (isStroke ? shape.thick * 0.5 : 0);

    if (x <= size) {
        shape.velocity.x = numberFlip(shape.velocity.x);
        shape.position.x = size + 1;
        if (callback) callback(shape.position);
    }

    if (x >= ScreenSizeObject.width - size) {
        shape.velocity.x = numberFlip(shape.velocity.x);
        shape.position.x = ScreenSizeObject.width - (size + 1);
        if (callback) callback(shape.position);
    }

    if (y <= size) {
        shape.velocity.y = numberFlip(shape.velocity.y);
        shape.position.y = size + 1;
        if (callback) callback(shape.position);
    }

    if (y >= ScreenSizeObject.height - size) {
        shape.velocity.y = numberFlip(shape.velocity.y);
        shape.position.y = ScreenSizeObject.height - (size + 1);
        if (callback) callback(shape.position);
    }
};

export default resolveBoundaryCollision;
