const guy5Animations = {
  idle: "guy5Idle",
};

type LightingSegmentPart = {
  offset: number;
  division: number;
  type: "part";
};

type LightningSegment =
  | LightingSegmentPart
  | {
      offset: number;
      first: LightningSegment;
      second: LightningSegment;
      type: "more";
    };

interface IGuy5 extends AnimCharacter {
  batonRadius: number;
  /**
   * We'll us the original radius as
   * the rate we'll *grab* the baton
   * How fast it will reach a stable
   * orbit.
   */
  originalRadius: number;
  angularVelocity: number;
  lightningSegments: LightningSegment;
  timeSinceLastSegmentUpdate: number;
  throwZRotationGoal: number;
}

class Guy5 implements IGuy5 {
  image: IGuy5["image"];
  constructor() {
    this.image = document.getElementById("guy5-png") as HTMLImageElement;
  }
  animState: IGuy5["animState"] = {
    animation: guy5Animations.idle,
    frame: 0,
    reverse: false,
    nextAnimation: [],
  };
  lightningSegments: IGuy5["lightningSegments"] = {
    offset: 0,
    division: 0.4,
    type: "part",
  };
  timeSinceLastSegmentUpdate: IGuy5["timeSinceLastSegmentUpdate"] =
    Number.POSITIVE_INFINITY;
  throwZRotationGoal: IGuy5["throwZRotationGoal"] = 0;
  batonRadius: IGuy5["batonRadius"] = 0;
  originalRadius: IGuy5["originalRadius"] = 0;
  angularVelocity: IGuy5["angularVelocity"] = 2;
  position: IGuy5["position"] = {
    x: 0,
    y: 0,
  };
  size: IGuy5["size"] = {
    w: 64,
    h: 64,
  };
  setPosition({ fifthGuyWall: { right, top } }: Walls) {
    this.position.x = right - 50;
    this.position.y = top - 59;
  }

  framePositions: IGuy5["framePositions"] = {
    guy5Idle: [
      [0, 0],
      [65, 0],
      [130, 0],
      [0, 65],
    ],
  };
  batonPosition: IGuy5["batonPosition"] = {};
}

const updateBatonOrbit = (
  baton: Baton,
  finalRadius: number,
  /**
   * or shrink
   */
  grow: boolean,
  finalVelocity: number,
  fifthGuy: IGuy5,
  timeIncrement: number
) => {
  if (
    (!grow && fifthGuy.batonRadius > finalRadius) ||
    (grow && fifthGuy.batonRadius < finalRadius)
  ) {
    fifthGuy.batonRadius +=
      (grow ? 1 : -1) *
      ((fifthGuy.originalRadius - finalRadius) / 5) *
      timeIncrement;
    baton.position.zRotation += fifthGuy.angularVelocity * timeIncrement;
    fifthGuy.angularVelocity += ((grow ? 1 : -1) * timeIncrement) / 5;
  } else {
    baton.position.zRotation += finalVelocity * timeIncrement;
  }
  baton.position.x =
    fifthGuy.batonRadius * -Math.cos(baton.position.zRotation) + 32;
  baton.position.y =
    fifthGuy.batonRadius * Math.sin(baton.position.zRotation) + 32;
  if (fifthGuy.timeSinceLastSegmentUpdate > 0.1) {
    fifthGuy.lightningSegments = makeLightingSegment(5);
    fifthGuy.timeSinceLastSegmentUpdate = 0;
  }
  fifthGuy.timeSinceLastSegmentUpdate += timeIncrement;
};

const makeLightingSegment = (levels: number): LightningSegment => {
  const offset =
    ((Math.random() > 0.5 ? -1 : 1) *
      Math.random() *
      Math.PI *
      (levels / 5) *
      0.7) /
    2;

  if (levels <= 0) {
    return {
      offset,
      division: Math.random() * 0.5 + 0.25,
      type: "part",
    };
  }
  return {
    offset,
    first: makeLightingSegment(levels - 1),
    second: makeLightingSegment(levels - 1),
    type: "more",
  };
};

const drawLighting = (
  source: {
    x: number;
    y: number;
  },
  destination: {
    x: number;
    y: number;
  },
  segment: LightningSegment,
  context: CanvasRenderingContext2D
) => {
  context.beginPath();
  context.moveTo(source.x, source.y);

  const width = destination.x - source.x;

  const height = destination.y - source.y;
  let pathLength = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));

  const mainDirection1 = width == 0 ? Math.PI / 2 : Math.atan(height / width);
  const mainDirection =
    (height >= 0 && width < 0) || (height < 0 && width < 0)
      ? mainDirection1 + Math.PI
      : mainDirection1;

  let linePosition = {
    x: source.x,
    y: source.y,
  };
  drawLightningSegment(
    linePosition,
    segment,
    mainDirection,
    pathLength,
    context
  );

  context.lineWidth = 1;
  context.stroke();
};

const drawLightningSegment = (
  linePosition: {
    x: number;
    y: number;
  },
  segment: LightningSegment,
  mainDirection: number,
  segmentLength: number,
  context: CanvasRenderingContext2D
): void => {
  if (segment.type == "part") {
    const { offset, division } = segment;
    const angledSegmentLength = (division * segmentLength) / Math.cos(offset);

    const firstX = linePosition.x;
    const firstY = linePosition.y;

    linePosition.x += angledSegmentLength * Math.cos(mainDirection + offset);
    linePosition.y += angledSegmentLength * Math.sin(mainDirection + offset);
    context.lineTo(linePosition.x, linePosition.y);

    linePosition.x = firstX + segmentLength * Math.cos(mainDirection);
    linePosition.y = firstY + segmentLength * Math.sin(mainDirection);

    context.lineTo(linePosition.x, linePosition.y);
    return;
  }
  const angledSegmentLength = (0.5 * segmentLength) / Math.cos(segment.offset);
  drawLightningSegment(
    linePosition,
    segment.first,
    mainDirection + segment.offset,
    angledSegmentLength,
    context
  );
  drawLightningSegment(
    linePosition,
    segment.second,
    mainDirection - segment.offset,
    angledSegmentLength,
    context
  );
};
