import './styles/index.css';
import '@total-typescript/ts-reset';
import * as ShapeArray from './shape_object/index';

import MainObject from './main';
import Circle from './shape_object/circle';

const canvas = document.querySelector('#canvas') as HTMLCanvasElement;

const main = new MainObject(canvas);

main.init();

const circ = new Circle({
  rotation: 0,
  velocity: {
    x: canvas.width * 0.00005,
    y: canvas.height * 0.00005,
    rot: 0.04
  },
  color: '#ff0000',
  scale: 1,
  is_solid: true,
  thick: 5,
  style: 'stroke',
  position: {
    x: 100,
    y: 100
  }
});

const cir2 = new Circle({
  rotation: 0,
  velocity: { x: 0, y: 0, rot: 0.02 },
  color: '#00ff00',
  scale: 2,
  is_solid: true,
  thick: 1,
  style: 'fill',
  position: {
    x: 400,
    y: 500
  }
});

main.start();

main.insertLayer('1', circ);
main.insertLayer('2', cir2);
main.initializeLayers();
