interface Baton {
  character: AnimCharacter | null;
  position: BatonPosition;
  lineWidth: number;
  height: number;
  color: string;
  batonParticles: Map<number, BatonParticle>;
  timeSinceLastParticleGenerated: number;
}

interface BatonParticle {
  size: number;
  position: {
    x: number;
    y: number;
  };
  velocity: {
    x: number;
    y: number;
  };
}

interface BatonPosition {
  zRotation: number;
  y: number;
  x: number;
  frameNumber: number;
  velocity: {
    x: number;
    y: number;
    zRotation: number;
  };
  relativeTo: AnimCharacter;
}
