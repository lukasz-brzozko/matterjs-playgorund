import {
  Bodies, Engine, Mouse, MouseConstraint, Render, World,
} from 'matter-js';

// create an engine
const engine = Engine.create();

// create a renderer
const render = Render.create({
  engine,
  element: document.body,
  options: { height: window.innerHeight, width: window.innerWidth },
});

// create ball and a ground
const ball = Bodies.circle(
  (window.innerWidth * 0.2),
  (window.innerHeight * 0.6),
  20,
);
const ground = Bodies.rectangle(
  (window.innerWidth * 0.9),
  (window.innerHeight * 0.7),
  (window.innerWidth * 0.2),
  60,
  { isStatic: true },
);

// create mouse and mouseConstraint
const mouse = Mouse.create(render.canvas);
const mouseConstraint = MouseConstraint.create(engine, {
  mouse,
  constraint: {
    stiffness: 0.2,
    render: {
      visible: false,
    },
    damping: 0.1,
  },
});

// add all of the bodies to the world
World.add(engine.world, [ball, ground]);

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
