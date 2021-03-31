import {
  Engine, Render, World,
} from 'matter-js';
import { debounce } from 'debounce';

import BordersGenerator from './helpers/BordersGenerator';
import FloatingObjectGenerator from './helpers/FloatingObjectGenerator';
import MouseC from './components/MouseC';
import MouseConstraintC from './components/MouseConstraintC';
import resetCanvas from './helpers/resetCanvas';
import WallGenerator from './helpers/WallGenerator';

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
  world.gravity.scale = 0;

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
};

const onResize = () => {
  console.log(previousWidth, window.innerWidth);
  if (
    (((previousWidth !== window.innerWidth) || (previousHeight !== window.innerHeight))
      && ((window.innerWidth < 1024) && (Math.abs(previousHeight - window.innerHeight) > 70)))
    || ((
      (previousWidth !== window.innerWidth)
      || (previousHeight !== window.innerHeight))
      && (window.innerWidth > 1024))
      || ((
        (previousWidth !== window.innerWidth)
        || (previousHeight !== window.innerHeight))
        && (window.innerWidth < 1024) && (previousWidth > 1024))

  ) {
    resetCanvas(engine, render, world);
    setup();
    previousWidth = window.innerWidth;
    previousHeight = window.innerHeight;
  }
};
setup();

window.addEventListener('resize', debounce(onResize, window.innerWidth > 1024 ? 200 : 1000));
