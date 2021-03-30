import { Mouse, World } from 'matter-js';

interface MouseInterface {
  canvas: HTMLCanvasElement | null;
  world: World;
  create(): Mouse;
}

class MouseC implements MouseInterface {
  canvas: HTMLCanvasElement | null;

  world: World;

  constructor(canvas: HTMLCanvasElement | null, world: World) {
    this.canvas = canvas;
    this.world = world;
  }

  create(): Mouse {
    return Mouse.create(this.canvas);
  }
}

export default MouseC;
