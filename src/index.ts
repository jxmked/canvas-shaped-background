import './styles/index.css';
import '@total-typescript/ts-reset';
import * as ShapeArray from './shape_object/index';

import MainObject from './main';

import { getRandomItem, getRandomInRange } from './utils';

const canvas = document.querySelector('#canvas') as HTMLCanvasElement;

const main = new MainObject(canvas);

main.init();

const shapes = Object.values(ShapeArray);

const Circle = ShapeArray.Triangle;

const genRand = () => {
  return Math.random() / 1000;
};

const randomColors = ['#738678', '#A89F91', '#6D7E7D', '#8E847C', '#5C6E71'];

let i = 0;

main.start();

function insert() {
  i++;
  const Shape = getRandomItem(shapes);

  const config = {
    rotation: 0,
    velocity: {
      x: canvas.width * genRand(),
      y: canvas.height * genRand(),
      rot: 0.04
    },
    color: getRandomItem(randomColors),
    scale: 1,
    is_solid: Math.random() > 0.5,
    thick: 5,
    style: Math.random() > 0.5 ? 'stroke' : 'fill',
    position: {
      x: 100,
      y: 100
    }
  };

  const shapy = new Shape(config);

  main.insertLayer(String(i), shapy);
  main.initializeLayers();
}

insert();
