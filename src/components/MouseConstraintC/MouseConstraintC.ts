import {
  Engine, IMouseConstraintDefinition, Mouse, MouseConstraint,
} from 'matter-js';

interface MouseConstraintInterface {
  engine: Engine;
  mouse: Mouse;
  mouseConstraint: MouseConstraint | null;
  create(): MouseConstraint;
}

class MouseConstraintC implements MouseConstraintInterface {
  engine: Engine;

  mouse: Mouse;

  mouseConstraint: MouseConstraint | null = null;

  constructor(engine: Engine, mouse: Mouse) {
    this.engine = engine;
    this.mouse = mouse;
  }

  create(): MouseConstraint {
    const options: IMouseConstraintDefinition = {
      mouse: this.mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false,
        },
        damping: 1,
      },
    };

    this.mouseConstraint = MouseConstraint.create(this.engine, options);
    this.removeScrollHijack();

    return this.mouseConstraint;
  }

  removeScrollHijack(): void {
    if (this.mouseConstraint !== null) {
      this.mouseConstraint.mouse.element.removeEventListener('mousewheel', this.mouseConstraint.mouse.mousewheel);
      this.mouseConstraint.mouse.element.removeEventListener('DOMMouseScroll', this.mouseConstraint.mouse.mousewheel);
      this.mouseConstraint.mouse.element.removeEventListener('touchmove', this.mouseConstraint.mouse.mousemove);
      this.mouseConstraint.mouse.element.removeEventListener('touchstart', this.mouseConstraint.mouse.mousedown);
      this.mouseConstraint.mouse.element.removeEventListener('touchend', this.mouseConstraint.mouse.mouseup);
    }
  }
}

export default MouseConstraintC;
