import { Mouse, World } from 'matter-js';

interface MouseInterface {
  canvas: HTMLCanvasElement;
  world: World;
}

class MouseC implements MouseInterface {
  canvas: HTMLCanvasElement;

  world: World;

  constructor(canvas: HTMLCanvasElement, world: World) {
    this.canvas = canvas;
    this.world = world;
  }

  create(): Mouse {
    return Mouse.create(this.canvas);
  }
}

export default MouseC;
