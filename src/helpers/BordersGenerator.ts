import { Body, World } from 'matter-js';

import GetDOMElement, { OffsetsParams } from './GetDOMElement';
import StaticObject from '../components/StaticObject';

interface BordersGeneratorInterface {
  elementsBorders: Body[];
  world: World;
  addStaticObject(offsets: OffsetsParams, parentOffsets: OffsetsParams): void
  generate(): Body[];
}

class BordersGenerator implements BordersGeneratorInterface {
  elementsBorders: Body[] = [];

  world: World;

  constructor(world: World) {
    this.world = world;
  }

  addStaticObject({
    x, y, height, width,
  }: OffsetsParams, parentOffsets: OffsetsParams)
    : void {
    const border = new StaticObject(
      (x + width / 2) + parentOffsets.x,
      (y + height / 2) + parentOffsets.y - parentOffsets.height / 2,
      width,
      height,
      this.world,
    ).create();

    this.elementsBorders.push(border);
  }

  generate(): Body[] {
    const [containerOffset, ...containerChildrenOffsets] = new GetDOMElement('#about .container').getDOMElementOffsets(true);
    containerChildrenOffsets.forEach((rect) => this.addStaticObject(rect, containerOffset));

    return this.elementsBorders;
  }
}

export default BordersGenerator;
