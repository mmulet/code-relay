const batonColor = "rgb(255, 214, 10)";

class BatonState implements Baton {
  character: Baton["character"];
  position: Baton["position"];
  constructor(character: AnimCharacter) {
    this.character = character;
    this.position = {
      zRotation: 0,
      y: 0,
      x: 0,
      frameNumber: 0,
      velocity: {
        x: 0,
        y: 0,
        zRotation: 0,
      },
      relativeTo: character,
    };
  }
  color: Baton["color"] = batonColor;
  batonParticles: Baton["batonParticles"] = new Map();
  timeSinceLastParticleGenerated: Baton["timeSinceLastParticleGenerated"] = 0;
  lineWidth: Baton["lineWidth"] = 3;
  height: Baton["height"] = 10;
}
const batonAcceleration = 150; //300;

const updateBatonPhysics = (
  baton: Baton,
  accelerationX: number,
  accelerationY: number,
  timeIncrement: number
) => {
  baton.position.y += baton.position.velocity.y * timeIncrement;
  baton.position.velocity.y += accelerationY * timeIncrement;

  baton.position.x += baton.position.velocity.x * timeIncrement;
  baton.position.velocity.x += accelerationX * timeIncrement;

  baton.position.zRotation += baton.position.velocity.zRotation * timeIncrement;
};

const transferBatonBetweenCoordinatesSystems = (
  baton: Baton,
  toThisGuyCoordinates: AnimCharacter
) => {
  baton.position.x +=
    baton.position.relativeTo.position.x - toThisGuyCoordinates.position.x;
  baton.position.y +=
    baton.position.relativeTo.position.y - toThisGuyCoordinates.position.y;
  baton.position.relativeTo = toThisGuyCoordinates;
};

const transferBatonPositionFromAnimatedStateToPhysicsBasedPosition = (
  baton: Baton,
  animatedStateName: string,
  frame: number
) => {
  if (!baton.character) {
    debugger;
    return;
  }
  const animatedState = baton.character.batonPosition![animatedStateName]![
    frame
  ]!;

  baton.position.zRotation = animatedState.zRotation;
  baton.position.x = animatedState.x;
  baton.position.y = animatedState.y;
  baton.character = null;
};

const updateBatonParticles = (
  particles: Map<number, BatonParticle>,
  timeIncrement: number
) => {
  for (const [key, particle] of particles) {
    particle.size -= 1 * timeIncrement;
    if (particle.size < 0.9) {
      particles.delete(key);
      continue;
    }
    particle.position.x += particle.velocity.x * timeIncrement;
    particle.position.y += particle.velocity.y * timeIncrement;
  }
};

const generateBatonParticles = (
  particles: Map<number, BatonParticle>,
  baton: Baton,
  referenceGuy: AnimCharacter
) => {
  const absolute = absoluteBatonCoordinates(baton);
  const x = absolute.x - referenceGuy.position.x;
  const y = absolute.y - referenceGuy.position.y;

  const velocity = 20 * (Math.random() - 0.5);
  particles.set(Math.random(), {
    size: Math.random() * 2 + 1,
    position: {
      x:
        x +
        baton.height *
          (2 * Math.random() - 1) *
          Math.cos(baton.position.zRotation + Math.PI / 2),
      y:
        y +
        baton.height *
          (2 * Math.random() - 1) *
          Math.sin(baton.position.zRotation + Math.PI / 2),
    },
    velocity: {
      x: velocity * Math.cos(baton.position.zRotation),
      y: velocity * Math.sin(baton.position.zRotation),
    },
  });
};

const updateAndGenerateBatonParticles = (
  baton: Baton,
  referenceGuy: AnimCharacter,
  timeIncrement: number
) => {
  updateBatonParticles(baton.batonParticles, timeIncrement);
  baton.timeSinceLastParticleGenerated += timeIncrement;
  /**
   * Ramp up the particle rate during physics based
   * animation, and slow it down during animation
   */
  if (
    (baton.character != null && baton.timeSinceLastParticleGenerated < 0.2) ||
    (baton.character == null && baton.timeSinceLastParticleGenerated < 0.017)
  ) {
    return;
  }
  baton.timeSinceLastParticleGenerated = 0;
  generateBatonParticles(baton.batonParticles, baton, referenceGuy);
};

const absoluteBatonCoordinates = (baton: Baton) => {
  if (baton.character == null) {
    return {
      x: baton.position.x + baton.position.relativeTo.position.x,
      y: baton.position.y + baton.position.relativeTo.position.y,
    };
  }
  const {
    batonPosition,
    animState: { animation, frame },
  } = baton.character;

  const batonAnimation = batonPosition![animation]![frame]!;
  return {
    x: batonAnimation.x + baton.character.position.x,
    y: batonAnimation.y + baton.character.position.y,
  };
};

const drawBatonParticles = (
  color: string,
  particles: Map<number, BatonParticle>,
  referenceCharacter: AnimCharacter,
  context: CanvasRenderingContext2D
) => {
  context.fillStyle = color;
  context.translate(
    referenceCharacter.position.x,
    referenceCharacter.position.y
  );
  for (const [
    ,
    {
      position: { x, y },
      size,
    },
  ] of particles) {
    context.fillRect(x, y, size, size);
  }
  context.translate(
    -referenceCharacter.position.x,
    -referenceCharacter.position.y
  );
};

const drawBaton = (
  baton: Baton,
  referenceCharacter: AnimCharacter,
  context: CanvasRenderingContext2D
) => {
  drawBatonParticles(
    baton.color,
    baton.batonParticles,
    referenceCharacter,
    context
  );

  if (baton.character) {
    drawAnimatedBaton(baton, baton.character, context);
    return;
  }
  drawFreeBaton(baton, context);
};

const drawAnimatedBaton = (
  { lineWidth, height, color }: Baton,
  {
    animState: { animation, frame },
    batonPosition,
    position: { x, y },
  }: AnimCharacter,
  context: CanvasRenderingContext2D
) => {
  const positions = batonPosition ? batonPosition[animation] : undefined;
  const frameInfo = positions ? positions[frame] : undefined;
  if (!frameInfo) {
    debugger;
    return;
  }
  const { zRotation, y: cy, x: cx, yScale = 1 } = frameInfo;
  drawBatonShape(
    context,
    yScale * lineWidth,
    yScale * height,
    zRotation,
    cy + y,
    cx + x,
    color
  );
};

const drawFreeBaton = (
  {
    lineWidth,
    height,
    color,
    position: {
      x,
      y,
      zRotation,
      relativeTo: {
        position: { x: cx, y: cy },
      },
    },
  }: Baton,
  context: CanvasRenderingContext2D
) => {
  drawBatonShape(context, lineWidth, height, zRotation, cy + y, cx + x, color);
};

const drawBatonShape = (
  context: CanvasRenderingContext2D,
  lineWidth: number,
  height: number,
  zRotation: number,
  centerY: number,
  centerX: number,
  color: string
) => {
  context.beginPath();
  const halfPi = Math.PI / 2;

  context.moveTo(
    centerX + Math.cos(zRotation + halfPi) * height,
    centerY + -Math.sin(zRotation + halfPi) * height
  );
  context.lineTo(
    centerX + Math.cos(zRotation + halfPi + Math.PI) * height,
    centerY + -Math.sin(zRotation + halfPi + Math.PI) * height
  );
  context.strokeStyle = color;
  context.lineWidth = lineWidth;
  context.stroke();
};
