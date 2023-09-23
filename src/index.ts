import './styles/index.css';
import '@total-typescript/ts-reset';
import * as ShapeArray from './shape_object/index';
import MainObject from './main';
import { getRandomItem, getRandomInRange, flipper } from './utils';
import AdjustedCoor from './lib/adjustment-coordinates';
import TapAnimator from './tap-animator';

const canvas = document.querySelector('#canvas') as HTMLCanvasElement;
const tapCanvas = document.querySelector('#overlayed-canvas') as HTMLCanvasElement;

const main = new MainObject(canvas);
const shapes = Object.values(ShapeArray);

const genRand = () => Math.random() / 1000;

const randomColors = ['#4ab098', '#ea5e5d', '#f8ba3f', '#3f82f3'];

let i = 0;

main.start();
const { width, height } = canvas; // Must be after calling Main.start method

tapCanvas.width = width;
tapCanvas.height = height;

const shapeCount = Math.abs(Math.floor(Math.sqrt(width * height) / 39));

function insert() {
  i++;
  const Shape = getRandomItem(shapes);

  const config = {
    rotation: 0,
    velocity: {
      x: flipper(width * genRand()),
      y: flipper(height * genRand()),
      rot: flipper(100) * genRand()
    },
    color: getRandomItem(randomColors),
    scale: 400 * genRand() + 1,
    is_solid: Math.random() > 0.5,
    thick: 5,
    style: Math.random() > 0.5 ? 'stroke' : 'fill',
    position: {
      x: getRandomInRange(0, width),
      y: getRandomInRange(0, height)
    }
  };

  const shapy = new Shape(config);

  main.insertLayer(String(i), shapy);
  main.initializeLayers();
}

let ival = window.setInterval(() => {
  insert();
  if (i >= shapeCount) window.clearInterval(ival);
}, 10);

console.log(`Viewing ${shapeCount} moving items.`);

/**
 * Tap animation
 * Tap animator
 * */

const tapCtx = tapCanvas.getContext('2d')!;

const translate = new AdjustedCoor(tapCanvas);

const activeKeys: number[] = [];
const touchAnimation: TapAnimator[] = [];

function touchStart(evt: TouchEvent) {
  for (const { identifier, clientX, clientY } of Array.from(evt.touches)) {
    // Skip registered ID
    if (identifier in activeKeys) continue;

    const ta = new TapAnimator(identifier);
    ta.down({
      x: translate.x(clientX),
      y: translate.y(clientY)
    });
    ta.update(0);

    ta.display(tapCtx);

    activeKeys.push(identifier);
  }
}

function touchMove(evt: TouchEvent) {}

function touchEnd(evt: TouchEvent) {}

tapCanvas.addEventListener('touchstart', touchStart);
tapCanvas.addEventListener('touchmove', touchMove);
tapCanvas.addEventListener('touchend', touchEnd);
