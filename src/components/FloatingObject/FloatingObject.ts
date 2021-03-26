import { Bodies, Body, World } from 'matter-js';

interface FloatingObjectInterface {
  x: number;
  y: number;
  r: number;
  world: World;
}

class FloatingObject implements FloatingObjectInterface {
  x: number;

  y: number;

  r: number;

  world: World;

  constructor(x: number, y: number, r: number, world: World) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.world = world;
  }

  create(): Body {
    return Bodies.circle(this.x, this.y, this.r);
  }
}

export default FloatingObject;
