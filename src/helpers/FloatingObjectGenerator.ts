import { Body, World } from 'matter-js';

import MEDIA from '../constants/media';
import FloatingObject from '../components/FloatingObject';
import randomValue from './randomValue';

interface FloatingObjectsGeneratorInterface {
  count: number;
  world: World;
  generate(): Body[];
}

class FloatingObjectGenerator implements FloatingObjectsGeneratorInterface {
  #floatingObjectsArr: Body[] = [];

  count = 0;

  world;

  constructor(world: World, count: number) {
    this.count = count;
    this.world = world;
  }

  generate(): Body[] {
    this.resetFloatinObjectsArray();

    for (let index = 0; index < this.count; index += 1) {
      const r = window.innerWidth > MEDIA.large ? 35 : 12;
      const x = randomValue(r * 2, window.innerWidth - (r * 2));
      const y = randomValue(r * 2, window.innerHeight - (r * 2));
      const object = new FloatingObject(x, y, r, this.world).create();
      this.#floatingObjectsArr.push(object);
    }

    return this.#floatingObjectsArr;
  }

  private resetFloatinObjectsArray(): void {
    this.#floatingObjectsArr = [];
  }
}

export default FloatingObjectGenerator;
