import {
  Bodies, Body, IChamferableBodyDefinition, World,
} from 'matter-js';

interface StaticObjectInterface {
  x: number;
  y: number;
  w: number;
  h: number;
  world: World;
}

class StaticObject implements StaticObjectInterface {
  x: number;

  y: number;

  w: number;

  h: number;

  world: World;

  constructor(x: number, y: number, w: number, h: number, world: World) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.world = world;
  }

  create(): Body {
    const {
      x, y, w, h,
    } = this;
    const options: IChamferableBodyDefinition = {
      isStatic: true,
    };

    return Bodies.rectangle(x, y, w, h, options);
  }
}

export default StaticObject;
