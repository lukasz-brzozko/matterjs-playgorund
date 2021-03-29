import {
  Engine, Render, World,
} from 'matter-js';
import { debounce } from 'debounce';
import FloatingObject from './components/FloatingObject';
import MouseC from './components/MouseC';
import MouseConstraintC from './components/MouseConstraintC';
import WallGenerator from './helpers/wallGenerator';

let engine:Engine;
let render: Render;

const setup = () => {
  // create an engine
  engine = Engine.create();

  // create a renderer
  render = Render.create({
    engine,
    element: document.body,
    options: {
      height: window.innerHeight,
      width: window.innerWidth,
      wireframes: false,
    },
  });

  // create all of the bodies
  const ball = new FloatingObject(100, 100, 50, engine.world).create();
  const walls = new WallGenerator(engine.world).generate();

  // create mouse and mouseConstraint
  const mouse = new MouseC(render.canvas, engine.world).create();
  const mouseConstraint = new MouseConstraintC(engine, mouse).create();

  // add all of the bodies to the world
  World.add(engine.world, [ball, ...walls]);

  // add mouseConstraint to the world
  World.add(engine.world, mouseConstraint);

  // run the engine
  Engine.run(engine);

  // run the renderer
  Render.run(render);
};

const resetCanvas = () => {
  World.clear(engine.world, false);
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
