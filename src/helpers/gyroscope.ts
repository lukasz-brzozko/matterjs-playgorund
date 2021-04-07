import { Common, World } from 'matter-js';

const updateGravity = function updateGravityFunc(
  event: DeviceOrientationEvent,
  world: World,
): void {
  const isHorizontal = window.innerWidth > window.innerHeight ? 90 : 0;
  const orientation = typeof window.orientation !== 'undefined' ? window.orientation : isHorizontal;
  const { gravity } = world;
  const { beta: betaEvent, gamma: gammaEvent } = event;
  const beta = betaEvent ?? 0;
  const gamma = gammaEvent ?? 0;
  if (orientation === 0) {
    gravity.x = Common.clamp(gamma, -90, 90) / 90;
    gravity.y = Common.clamp(beta, -90, 90) / 90;
  // upside down orientation
  } else if (orientation === 180) {
    gravity.x = Common.clamp(-gamma, -90, 90) / 90;
    gravity.y = Common.clamp(-beta, -90, 90) / 90;
  // landscape left orientation
  } else if (orientation === 90) {
    gravity.x = Common.clamp(beta, -90, 90) / 90;
    gravity.y = Common.clamp(-gamma, -90, 90) / 90;
  // landscape right orientation
  } else if (orientation === -90) {
    gravity.x = Common.clamp(-beta, -90, 90) / 90;
    gravity.y = Common.clamp(gamma, -90, 90) / 90;
  }
};

export default updateGravity;
