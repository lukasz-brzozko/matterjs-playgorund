import {
  Engine, Render, World,
} from 'matter-js';

import FloatingObject from './components/FloatingObject';
import MouseC from './components/MouseC';
import MouseConstraintC from './components/MouseConstraintC';

// create an engine
const engine = Engine.create();

// create a renderer
const render = Render.create({
  engine,
  element: document.body,
  options: { height: window.innerHeight, width: window.innerWidth },
});

// create ball and a ground

// create mouse and mouseConstraint
const mouse = new MouseC(render.canvas, engine.world).create();
const mouseConstraint = new MouseConstraintC(engine, mouse).create();

// add all of the bodies to the world

const object = new FloatingObject(100, 100, 100, engine.world);
object.add();

// add mouseConstraint to the world
World.add(engine.world, mouseConstraint);

// run the engine
Engine.run(engine);

// run the renderer
Render.run(render);

window.addEventListener('resize', () => {
  render.canvas.height = window.innerHeight;
  render.canvas.width = window.innerWidth;
});
