import Shape from '../shape_object/shape';

/**
 * I do not own this functions
 *
 * Modified to fit the requirements
 * */

/**
 * Rotates coordinate system for velocities
 *
 * Takes velocities and alters them as if the coordinate system they're on was rotated
 *
 * @param  Object | velocity | The velocity of an individual particle
 * @param  Float  | angle    | The angle of collision between two objects in radians
 * @return Object | The altered x and y velocities after the coordinate system has been rotated
 */

function rotate(velocity: VelocityProperties, angle: number): VelocityProperties {
    const rotatedVelocities: VelocityProperties = {
        x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
        y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
    };

    return rotatedVelocities;
}

/**
 * Swaps out two colliding particles' x and y velocities after running through
 * an elastic collision reaction equation
 *
 * @param  Object | particle      | A particle object with x and y coordinates, plus velocity
 * @param  Object | otherParticle | A particle object with x and y coordinates, plus velocity
 * @return Null | Does not return a value
 */

function resolveCollision(particle: Shape, otherParticle: Shape): void {
    const xVelocityDiff: number = particle.velocity.x - otherParticle.velocity.x;
    const yVelocityDiff: number = particle.velocity.y - otherParticle.velocity.y;

    const xDist: number = otherParticle.position.x - particle.position.x;
    const yDist: number = otherParticle.position.y - particle.position.y;

    // Prevent accidental overlap of particles
    if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {
        // Grab angle between the two colliding particles
        const angle: number = -Math.atan2(yVelocityDiff, xVelocityDiff);

        // Store mass in var for better readability in collision equation
        const m1: number = particle.mass!;
        const m2: number = otherParticle.mass!;

        // Velocity before equation
        const u1: VelocityProperties = rotate(particle.velocity, angle);
        const u2: VelocityProperties = rotate(otherParticle.velocity, angle);

        // Velocity after 1d collision equation
        const v1: VelocityProperties = {
            x: (u1.x * (m1 - m2)) / (m1 + m2) + (u2.x * 2 * m2) / (m1 + m2),
            y: u1.y
        };
        const v2: VelocityProperties = {
            x: (u2.x * (m1 - m2)) / (m1 + m2) + (u1.x * 2 * m2) / (m1 + m2),
            y: u2.y
        };

        // Final velocity after rotating axis back to original location
        const vFinal1: VelocityProperties = rotate(v1, -angle);
        const vFinal2: VelocityProperties = rotate(v2, -angle);

        // Swap particle velocities for realistic bounce effect
        particle.velocity.x = vFinal1.x;
        particle.velocity.y = vFinal1.y;

        otherParticle.velocity.x = vFinal2.x;
        otherParticle.velocity.y = vFinal2.y;
    }
}

/**
 * Code Below
 *
 * Source: ChatGPT-3
 * */

/*

const GRAVITATIONAL_ACCELERATION = 9.8;


function calculateCollisionalForce(particle: Shape, otherParticle: Shape, frictionCoefficient: number): number {
    const normalForce = particle.mass! * otherParticle.mass! * GRAVITATIONAL_ACCELERATION;
    const frictionForce = frictionCoefficient * normalForce;
    return frictionForce;
}


function applycollisionForce(particle: Shape, otherParticle: Shape, frictionCoefficient: number = 0.01): void {
    const collisionalForce = calculateCollisionalForce(particle, otherParticle, frictionCoefficient);
    const damping = collisionalForce * 0.01;
    particle.velocity.x *= (1 - damping);
    particle.velocity.y *= (1 - damping);
    otherParticle.velocity.x *= (1 - damping);
    otherParticle.velocity.y *= (1 - damping);
}



function resolveCollision(particle: Shape, otherParticle: Shape, restitution: number = 0.8): void {
    const xVelocityDiff: number = particle.velocity.x - otherParticle.velocity.x;
    const yVelocityDiff: number = particle.velocity.y - otherParticle.velocity.y;

    const xDist: number = otherParticle.position.x - particle.position.x;
    const yDist: number = otherParticle.position.y - particle.position.y;

    // Prevent accidental overlap of particles
    if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {
        // Grab angle between the two colliding particles
        const angle: number = -Math.atan2(yDist, xDist);

        // Store mass in var for better readability in collision equation
        const m1: number = particle.mass!;
        const m2: number = otherParticle.mass!;

        // Velocity before equation
        const u1: VelocityProperties = rotate(particle.velocity, angle);
        const u2: VelocityProperties = rotate(otherParticle.velocity, angle);

        // Velocity after 1d collision equation
        const v1: VelocityProperties = {
            x: (u1.x * (m1 - m2) + (2 * m2 * u2.x)) / (m1 + m2),
            y: u1.y
        };
        const v2: VelocityProperties = {
            x: (u2.x * (m2 - m1) + (2 * m1 * u1.x)) / (m1 + m2),
            y: u2.y
        };

        // Apply restitution
        v1.x *= restitution;
        v1.y *= restitution;
        v2.x *= restitution;
        v2.y *= restitution;

        // Final velocity after rotating axis back to original location
        const vFinal1: VelocityProperties = rotate(v1, -angle);
        const vFinal2: VelocityProperties = rotate(v2, -angle);

        // Update particle velocities
        particle.velocity.x = vFinal1.x;
        particle.velocity.y = vFinal1.y;

        otherParticle.velocity.x = vFinal2.x;
        otherParticle.velocity.y = vFinal2.y;
        
        //applycollisionForce(particle, otherParticle)
    }
}
*/

export { rotate, resolveCollision };
