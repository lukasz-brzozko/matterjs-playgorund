import { Body, World } from 'matter-js';

import GetDOMElement from './GetDOMElement';
import StaticObject from '../components/StaticObject';

interface BordersGeneratorInterface {
  elementsBorders: Body[];
  world: World;
  addStaticObject(rects: DOMRect): void
  generate(): Body[];
}

class BordersGenerator implements BordersGeneratorInterface {
  elementsBorders: Body[] = [];

  world: World;

  constructor(world: World) {
    this.world = world;
  }

  addStaticObject({
    x, y, width, height,
  }: DOMRect): void {
    const border = new StaticObject(
      x + width / 2,
      y + height / 2,
      width, height,
      this.world,
    ).create();

    this.elementsBorders.push(border);
  }

  generate(): Body[] {
    const elementsRects = new GetDOMElement('.container').getChildrenRects();
    elementsRects.forEach((rect) => this.addStaticObject(rect));

    return this.elementsBorders;
  }
}

export default BordersGenerator;
