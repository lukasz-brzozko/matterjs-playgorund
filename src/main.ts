import {
  Body, Engine, Render, World,
} from 'matter-js';
import { debounce } from 'debounce';

import FloatingObject from './components/FloatingObject';
import getDOMElementRects from './helpers/getDOMElementRects';
import MouseC from './components/MouseC';
import MouseConstraintC from './components/MouseConstraintC';
import randomValue from './helpers/randomValue';
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
  const floatingObjects: Body[] = [];
  for (let index = 0; index < 5; index += 1) {
    const r = window.innerWidth > 1024 ? 35 : 12;
    const x = randomValue(r * 2, window.innerWidth - (r * 2));
    const y = randomValue(r * 2, window.innerHeight - (r * 2));
    floatingObjects.push(new FloatingObject(x, y, r, world).create());
  }

  const childrenRects = getDOMElementRects('.container');
  const childrenBorders: Body[] = [];
  childrenRects.forEach(({
    x, y, width, height,
  }) => {
    const border = new StaticObject(x + width / 2, y + height / 2, width, height, world).create();
    childrenBorders.push(border);
  });

  const walls = new WallGenerator(world).generate();

  // create mouse and mouseConstraint
  const mouse = new MouseC(render.canvas, world).create();
  const mouseConstraint = new MouseConstraintC(engine, mouse).create();

  // add all of the bodies to the world
  World.add(world, [...floatingObjects, ...walls, ...childrenBorders]);

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
