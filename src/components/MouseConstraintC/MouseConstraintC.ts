import {
  Engine, IMouseConstraintDefinition, Mouse, MouseConstraint,
} from 'matter-js';

interface MouseConstraintInterface {
  engine: Engine;
  mouse: Mouse;
}

class MouseConstraintC implements MouseConstraintInterface {
  engine: Engine;

  mouse: Mouse;

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

    return MouseConstraint.create(this.engine, options);
  }
}

export default MouseConstraintC;
