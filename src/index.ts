import './styles/index.css';
import '@total-typescript/ts-reset';
import * as ShapeArray from './shape_object/index';
import MainObject from './main';
import { getRandomItem, getRandomInRange, flipper } from './utils';

const canvas = document.querySelector('#canvas') as HTMLCanvasElement;

const main = new MainObject(canvas);

main.init();

const shapes = Object.values(ShapeArray);

const genRand = () => {
  return Math.random() / 1000;
};

//const randomColors = ['#738678', '#A89F91', '#6D7E7D', '#8E847C', '#5C6E71'];
const randomColors = ['#4ab098', '#ea5e5d', '#f8ba3f', '#3f82f3'];

let i = 0;

main.start();
const { width, height } = canvas;

const shapeCount = Math.abs(Math.floor(Math.sqrt(width * height) / 30));

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

console.log(shapeCount);
