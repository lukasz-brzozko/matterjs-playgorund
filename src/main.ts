import { debounce } from 'debounce';
import {
  Engine, Render, World,
} from 'matter-js';
import MouseC from './components/MouseC';
import MouseConstraintC from './components/MouseConstraintC';
import MEDIA from './constants/media';
import BordersGenerator from './helpers/BordersGenerator';
import FloatingObjectGenerator from './helpers/FloatingObjectGenerator';
import updateGravity from './helpers/gyroscope';
import resetCanvas from './helpers/resetCanvas';
import shouldCanvasReset from './helpers/shouldCanvasReset';
import WallGenerator from './helpers/WallGenerator';

const { large: largeScreen } = MEDIA;
const canvas: HTMLCanvasElement | null = document.getElementById('playground') as HTMLCanvasElement;
const sectionEl: HTMLElement | null = document.getElementById('about');
let engine: Engine;
let render: Render;
let world: World;
let previousWidth: number = sectionEl?.clientWidth ?? 0;
let previousHeight: number = sectionEl?.clientHeight ?? 0;

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
      height: previousHeight,
      width: previousWidth,
      wireframes: false,
    },
  });

  // create all of the bodies
  const floatingObjects = new FloatingObjectGenerator(world, 5).generate();
  const borderObjects = new BordersGenerator(world).generate();
  const walls = new WallGenerator(previousHeight, world).generate();

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
  const currentHeight = sectionEl?.clientHeight ?? 0;
  const currentWidth = sectionEl?.clientHeight ?? 0;
  const shouldReset = shouldCanvasReset({
    currentHeight, currentWidth, largeScreen, previousHeight, previousWidth,
  });
  if (shouldReset) {
    resetCanvas(engine, render, world);
    setup();
    previousWidth = sectionEl?.clientWidth ?? 0;
    previousHeight = sectionEl?.clientHeight ?? 0;
  }
};

setup();

const debounceInterval = window.innerWidth > largeScreen ? 200 : 1000;
window.addEventListener('resize', debounce(onResize, debounceInterval));
