import {
  Body, Engine, Render, World,
} from 'matter-js';
import { debounce } from 'debounce';

import FloatingObjectGenerator from './helpers/FloatingObjectGenerator';
import getDOMElementsChildrenRects from './helpers/getDOMElementsChildrenRects';
import MouseC from './components/MouseC';
import MouseConstraintC from './components/MouseConstraintC';
import WallGenerator from './helpers/wallGenerator';
import StaticObject from './components/StaticObject';

let engine: Engine;
let render: Render;
let world: World;

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
    element: document.body,
    options: {
      background: 'transparent',
      height: window.innerHeight,
      width: window.innerWidth,
      wireframes: false,
    },
  });

  // create all of the bodies
  const floatingObjects = new FloatingObjectGenerator(world, 5).generate();

  const elementsRects = getDOMElementsChildrenRects('.container');
  const elementsBorders: Body[] = [];
  elementsRects.forEach(({
    x, y, width, height,
  }) => {
    const border = new StaticObject(x + width / 2, y + height / 2, width, height, world).create();
    elementsBorders.push(border);
  });

  const walls = new WallGenerator(world).generate();

  // create mouse and mouseConstraint
  const mouse = new MouseC(render.canvas, world).create();
  const mouseConstraint = new MouseConstraintC(engine, mouse).create();

  // add all of the bodies to the world
  World.add(world, [...floatingObjects, ...walls, ...elementsBorders]);

  // add mouseConstraint to the world
  World.add(world, mouseConstraint);

  // run the engine
  Engine.run(engine);

  // run the renderer
  Render.run(render);
};

const resetCanvas = () => {
  World.clear(world, false);
  Engine.clear(engine);
  Render.stop(render);
  if (render.canvas) {
    render.canvas.remove();
    render.canvas = null;
    render.context = null;
    render.textures = {};

    setup();
  }
};

const onResize = () => {
  resetCanvas();
};

setup();

window.addEventListener('resize', debounce(onResize, 200));
