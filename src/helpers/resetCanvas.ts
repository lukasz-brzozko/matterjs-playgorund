import { Engine, Render, World } from 'matter-js';
import updateGravity from './gyroscope';

const resetCanvas = (currentEngine: Engine, currentRender: Render, currentWorld: World): void => {
  const engine = currentEngine;
  const render = currentRender;
  const world = currentWorld;

  World.clear(world, false);
  Engine.clear(engine);
  Render.stop(render);

  if (typeof window !== 'undefined') {
    window.removeEventListener('deviceorientation', (e) => updateGravity(e, world));
  }
};

export default resetCanvas;
