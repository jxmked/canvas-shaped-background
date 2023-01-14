import Shape from '../shape_object/shape';
declare function rotate(velocity: VelocityProperties, angle: number): VelocityProperties;
declare function resolveCollision(particle: Shape, otherParticle: Shape): void;
export { rotate, resolveCollision };
