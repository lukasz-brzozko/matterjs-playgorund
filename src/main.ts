import {
  Engine, Render, World,
} from 'matter-js';
import { debounce } from 'debounce';

import BordersGenerator from './helpers/BordersGenerator';
import FloatingObjectGenerator from './helpers/FloatingObjectGenerator';
import updateGravity from './helpers/gyroscope';
import MEDIA from './constants/media';
import MouseC from './components/MouseC';
import MouseConstraintC from './components/MouseConstraintC';
import resetCanvas from './helpers/resetCanvas';
import shouldCanvasReset from './helpers/shouldCanvasReset';
import WallGenerator from './helpers/WallGenerator';

const { large: largeScreen } = MEDIA;
const canvas: HTMLCanvasElement | null = document.getElementById('playground') as HTMLCanvasElement;
let engine: Engine;
let render: Render;
let world: World;
let previousWidth: number = window.innerWidth;
let previousHeight: number = window.innerHeight;

const setup = () => {
  // create an engine
  engine = Engine.create();

  // assign thw World's instance to the variable
  world = engine.world;

  // set world's params
  world.gravity.scale = window.innerWidth > largeScreen ? 0 : 0.0005;

  // create a renderer
  render = Render.create({
    engine,
    canvas,
    options: {
      background: 'transparent',
      height: window.innerHeight,
      width: window.innerWidth,
      wireframes: false,
    },
  });

  // create all of the bodies
  const floatingObjects = new FloatingObjectGenerator(world, 5).generate();
  const borderObjects = new BordersGenerator(world).generate();
  const walls = new WallGenerator(world).generate();

  // create mouse and mouseConstraint
  const mouse = new MouseC(render.canvas, world).create();
  const mouseConstraint = new MouseConstraintC(engine, mouse).create();

  // add all of the bodies to the world
  World.add(world, [...floatingObjects, ...walls, ...borderObjects]);

  // add mouseConstraint to the world
  World.add(world, mouseConstraint);

  // run the engine
  Engine.run(engine);

  // run the renderer
  Render.run(render);

  // add gyro control
  if (typeof window !== 'undefined') {
    window.addEventListener('deviceorientation', (e) => updateGravity(e, world));
  }
};

const onResize = () => {
  const shouldReset = shouldCanvasReset({ previousHeight, previousWidth, largeScreen });
  if (shouldReset) {
    resetCanvas(engine, render, world);
    setup();
    previousWidth = window.innerWidth;
    previousHeight = window.innerHeight;
  }
};

setup();

const debounceInterval = window.innerWidth > largeScreen ? 200 : 1000;
window.addEventListener('resize', debounce(onResize, debounceInterval));
