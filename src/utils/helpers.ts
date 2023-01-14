import Shape from '../shape_object/shape';

/**
 * Randomly flip a positive integer into negative integer
 * */
export const flipper: (num: number) => number = (num: number): number => {
    return Math.floor(Math.random() * 2 * num - num);
};

/**
 * Get a number in between of given min and max
 * */
export const getRandomInRange: (mn: number, mx: number) => number = (mn: number, mx: number): number => {
    return Math.floor(Math.random() * (mx - mn)) + mn;
};

/**
 * Get random item from given array
 *
 * @return value from array
 * */
export const getRandomItem: <T>(arr: T[]) => T = <T>(arr: T[]): T => {
    return arr[Math.floor(Math.random() * arr.length)];
};

// https://stackoverflow.com/a/14570614

export const observeDOM = (function () {
    const MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

    return (obj: HTMLElement, callback: () => void): MutationObserver | undefined => {
        if (!obj || obj.nodeType !== 1) return;

        if (MutationObserver) {
            // define a new observer
            const mutationObserver = new MutationObserver(callback);

            // have the observer observe for changes in children
            mutationObserver.observe(obj, { childList: true, subtree: true });
            return mutationObserver;
        }

        // browser support fallback

        obj.addEventListener('DOMNodeInserted', callback, false);
        obj.addEventListener('DOMNodeRemoved', callback, false);

        return void 0;
    };
})();

export const numberFlip: TypeNumberFlip = (num: number): number => {
    const result = num < 0 ? Math.abs(num) : -Math.abs(num);
    return Math.min(result, 3);
};

export const restrictVelocities: TypeRestrictVelocities = (shape: Shape): void => {
    const { x, y } = shape.velocity;
    shape.velocity.x = Math.min(x, 3);
    shape.velocity.y = Math.min(y, 3);
};

export const objectMidpointDistance = (a: Shape, b: Shape) => {
    const x = Math.abs(a.position.x - b.position.x);
    const y = Math.abs(a.position.y - b.position.y);
    // const r = sum_r//+ Math.abs(a.thick )
    return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
};
