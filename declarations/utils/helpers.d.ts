import Shape from '../shape_object/shape';
export declare const flipper: (num: number) => number;
export declare const getRandomInRange: (mn: number, mx: number) => number;
export declare const getRandomItem: <T>(arr: T[]) => T;
export declare const observeDOM: (obj: HTMLElement, callback: () => void) => MutationObserver | undefined;
export declare const numberFlip: TypeNumberFlip;
export declare const restrictVelocities: TypeRestrictVelocities;
export declare const objectMidpointDistance: (a: Shape, b: Shape) => number;
