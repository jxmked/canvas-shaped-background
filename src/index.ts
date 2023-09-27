import './styles/index.css';
import '@total-typescript/ts-reset';
import * as ShapeArray from './shape_object/index';
import MainObject from './main';
import { getRandomItem, getRandomInRange, flipper, random as genRand } from './utils';
import AdjustedCoor from './lib/adjustment-coordinates';
import TapAnimator from './tap-animator';
import { randomColors } from './constants';

const canvas = document.querySelector('#canvas') as HTMLCanvasElement;
const tapCanvas = document.querySelector('#overlayed-canvas') as HTMLCanvasElement;
const translate = new AdjustedCoor(tapCanvas);
const main = new MainObject(canvas);
const shapes = Object.values(ShapeArray);
main.start();

const shapeCount = Math.abs(Math.floor(Math.sqrt(canvas.width * canvas.height) / 39));

windowResize();

function windowResize(): void {
  tapCanvas.width = canvas.width;
  tapCanvas.height = canvas.height;
  translate.resize();
}

let i = 0;

function insert() {
  i++;
  const Shape = getRandomItem(shapes);

  const config = {
    rotation: 0,
    velocity: {
      x: flipper(canvas.width * genRand()),
      y: flipper(canvas.height * genRand()),
      rot: flipper(100) * genRand()
    },
    color: getRandomItem(randomColors),
    scale: 400 * genRand() + 1,
    is_solid: Math.random() > 0.5,
    thick: 5,
    style: Math.random() > 0.5 ? 'stroke' : 'fill',
    position: {
      x: getRandomInRange(0, canvas.width),
      y: getRandomInRange(0, canvas.height)
    },
    is_movable: false
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
const activeTapinator: TapAnimator[] = [];
const activeKeys: number[] = [];

function touchStart(evt: TouchEvent) {
  evt.preventDefault();

  for (const { identifier, clientX, clientY } of Array.from(evt.touches)) {
    // Skip registered ID
    if (activeKeys.indexOf(identifier) !== -1) continue;

    const ta = new TapAnimator(identifier);

    ta.down({
      x: translate.x(clientX),
      y: translate.y(clientY)
    });
    ta.init();
    activeTapinator.push(ta);
    activeKeys.push(identifier);
  }
}

function touchMove(evt: TouchEvent) {
  evt.preventDefault();

  for (const { identifier, clientX, clientY } of Array.from(evt.touches)) {
    // Skip unregistered ID
    for (const ta of activeTapinator) {
      if (ta.to_be_kill) continue;
      if (identifier !== ta.id) continue;

      ta.move({
        x: translate.x(clientX),
        y: translate.y(clientY)
      });
    }
  }
}

function touchEnd(evt: TouchEvent) {
  evt.preventDefault();

  const currentActiveKeys = Array.from(evt.touches).map((x) => x.identifier);

  for (const ta of activeTapinator) {
    if (ta.to_be_kill) continue;
    if (currentActiveKeys.indexOf(ta.id) === -1) ta.up();
  }

  // Delete none active identifier
  for (const index in activeKeys) {
    if (currentActiveKeys.indexOf(activeKeys[index]) === -1) {
      activeKeys.splice(Number(index), 1);
    }
  }
}

tapCanvas.addEventListener('touchstart', touchStart);
tapCanvas.addEventListener('touchmove', touchMove);
tapCanvas.addEventListener('touchend', touchEnd);

// Animate events
main.afterLayersAnimation((ctx) => {
  tapCtx.clearRect(0, 0, canvas.width, canvas.height);
  tapCtx.imageSmoothingEnabled = false;

  const time = performance.now();

  for (const index in activeTapinator) {
    const ta = activeTapinator[index];

    // If the TapAnimator is to be kill
    // just kill it and never ti rerender it
    if (ta.kill_now) {
      activeTapinator.splice(Number(index), 1);
      continue;
    }

    ta.update(time);
    ta.display(tapCtx);
  }
});

/**
 * Window Events
 * */

window.addEventListener('resize', windowResize);
