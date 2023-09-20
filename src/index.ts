import './styles/index.css';
import '@total-typescript/ts-reset';
import * as ShapeArray from './shape_object/index';
import Shape from './shape_object/Shape'; // Will be use as interface


const canvas = document.querySelector('#canvas')! as HTMLCanvasElement;
const overlayedCanvas = document.querySelector('#overlayed-canvas')! as HTMLCanvasElement;

/**
 * We can use CanvasRenderingContext2D.shadowBlur
 * but it has a drawback when it comes to performance.
 *
 * So, to achieve blurry canvas is by overlaying HTML elements
 * and applying filter to THAT element using css
 *
 * */
const ctx = canvas.getContext('2d')!;

/**
 * This second context allow us to have a sharp shapes.
 * This canvas handles mouse events
 * */
const octx = overlayedCanvas.getContext('2d')!;
const shapeArray: TypeShape[] = Object.values(ShapeArray);
const Particles: Shape[] = [];



