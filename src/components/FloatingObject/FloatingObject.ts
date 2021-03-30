import {
  Bodies, Body, IChamferableBodyDefinition, World,
} from 'matter-js';

import COLORS from '../../constants/colors';
import randomValue from '../../helpers/randomValue';

interface FloatingObjectInterface {
  x: number;
  y: number;
  r: number;
  world: World;
  colors: typeof COLORS;
}

class FloatingObject implements FloatingObjectInterface {
  x;

  y;

  r;

  world;

  colors = COLORS;

  constructor(x: number, y: number, r: number, world: World) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.world = world;
  }

  generateColors(): string {
    const colorNames = Object.keys(this.colors);
    const min = 0;
    const max = colorNames.length;
    const randomColorIndex = randomValue(min, max);
    const chosenColorName = colorNames[randomColorIndex];
    const colorVal = this.colors[chosenColorName];

    return colorVal;
  }

  create(): Body {
    const randomColor = this.generateColors();
    const options: IChamferableBodyDefinition = {
      density: 0.1,
      friction: 0,
      frictionAir: 0.002,
      frictionStatic: 0,
      mass: 10,
      render: {
        fillStyle: 'transparent',
        lineWidth: window.innerWidth > 1024 ? 3 : 2,
        strokeStyle: randomColor,
      },
      restitution: 0.5,
    };

    const ball = Bodies.polygon(this.x, this.y, 3, this.r, options);
    const velocityX = randomValue(-2, 5);
    const velocityY = randomValue(-2, 5);
    const angularVelocity = randomValue(-0.05, 0.15, true);

    const velocity = {
      x: velocityX,
      y: velocityY,
    };

    Body.setVelocity(ball, velocity);
    Body.setAngularVelocity(ball, angularVelocity);
    return ball;
  }
}

export default FloatingObject;
