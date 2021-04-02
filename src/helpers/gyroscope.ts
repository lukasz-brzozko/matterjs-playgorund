import { Common, World } from 'matter-js';

const updateGravity = function updateGravityFunc(
  event: DeviceOrientationEvent,
  world: World,
): void {
  const orientation = typeof window.orientation !== 'undefined' ? window.orientation : 0;
  const { gravity } = world;
  const { beta: betaEvent, gamma: gammaEvent } = event;
  const beta = betaEvent ?? 0;
  const gamma = gammaEvent ?? 0;

  if (orientation === 0) {
    gravity.x = Common.clamp(gamma, -90, 90) / 90;
    gravity.y = Common.clamp(beta, -90, 90) / 90;
  } else if (orientation === 180) {
    gravity.x = Common.clamp(gamma, -90, 90) / 90;
    gravity.y = Common.clamp(-beta, -90, 90) / 90;
  } else if (orientation === 90) {
    gravity.x = Common.clamp(beta, -90, 90) / 90;
    gravity.y = Common.clamp(-gamma, -90, 90) / 90;
  } else if (orientation === -90) {
    gravity.x = Common.clamp(-beta, -90, 90) / 90;
    gravity.y = Common.clamp(gamma, -90, 90) / 90;
  }
};

export default updateGravity;
