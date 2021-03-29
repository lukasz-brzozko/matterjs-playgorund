import { Body, World } from 'matter-js';

import StaticObject from '../components/StaticObject';

interface WallGeneratorInterface{
  world: World;
}

class WallGenerator implements WallGeneratorInterface {
  world: World;

  constructor(world: World) {
    this.world = world;
  }

  generate(): Body[] {
    const wallThickness = 100;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    return [
      new StaticObject(
        windowWidth / 2,
        0 - (wallThickness / 2),
        windowWidth + 2,
        wallThickness,
        this.world,
      ).create(),

      new StaticObject(
        windowWidth + (wallThickness / 2),
        windowHeight / 2,
        wallThickness,
        windowHeight + 2,
        this.world,
      ).create(),

      new StaticObject(
        windowWidth / 2,
        windowHeight + (wallThickness / 2),
        windowWidth + 2,
        wallThickness,
        this.world,
      ).create(),

      new StaticObject(
        0 - (wallThickness / 2),
        windowHeight / 2,
        wallThickness,
        windowHeight + 2,
        this.world,
      ).create(),
    ];
  }
}
export default WallGenerator;
