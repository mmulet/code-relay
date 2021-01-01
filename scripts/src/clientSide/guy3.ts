const guy3Animations = {
  drop: "guy3Drop",
  idle: "guy3Idle",
  grab: "guy3Grab",
  grabIdle: "guy3GrabIdle",
  idleAfter: "guy3IdleAfter",
};

const guy3ArmSegmentType = {
  horizontal: "guy3grabArmHorizontal",
  vertical: "guy3grabArmVertical",
  leftDown: "guy3grabArmHorizontalLeftDown",
  leftUp: "guy3grabArmHorizontalLeftUp",
  rightDown: "guy3grabArmHorizontalRightDown",
  rightUp: "guy3grabArmHorizontalRightUp",
};

const drawArmSegments = (
  armSegments: ArmSegment[],
  armSegmentsDrawFrame: number,
  image: HTMLImageElement | HTMLCanvasElement,
  framePositions: AnimCharacterFramePositions,
  { position: { x: cx, y: cy }, drawArmSegments }: IGuy3,
  context: CanvasRenderingContext2D
) => {
  if (!drawArmSegments || armSegments.length <= 0) {
    return;
  }
  if (!armSegments) {
    debugger;
  }
  context.translate(cx, cy);
  for (let i = 0; i < Math.floor(armSegmentsDrawFrame); i++) {
    const {
      frame,
      type,
      position: { x, y },
    } = armSegments[i];
    const [sx, sy] = framePositions[type][frame];
    context.drawImage(image, sx, sy, 64, 64, x, y, 64, 64);
  }
  context.translate(-cx, -cy);
};

const nextArmAnimationFrame = (guy: IGuy3) => {
  for (const arm of guy.armSegments) {
    arm.frame++;
    if (arm.frame >= 4) {
      arm.frame = 0;
    }
  }
};

interface ArmSegment {
  type: string;
  frame: number;
  position: {
    x: number;
    y: number;
  };
}

interface IGuy3 extends AnimCharacter {
  armSegments: ArmSegment[];
  drawArmSegments: boolean;
  armSegmentsDrawFrame: number;
  armDrawFramesPerSecond: number;
}

class Guy3 implements IGuy3 {
  image: IGuy3["image"];
  constructor() {
    this.image = document.getElementById("guy3-png") as HTMLImageElement;
  }

  armSegments: IGuy3["armSegments"] = [];
  armSegmentsDrawFrame: IGuy3["armSegmentsDrawFrame"] = 0;
  drawArmSegments: IGuy3["drawArmSegments"]  = false;
  animState : IGuy3["animState"] = {
    animation: guy3Animations.idle,
    frame: 0,
    reverse: false,
    nextAnimation: [],
  };
  armDrawFramesPerSecond: IGuy3["armDrawFramesPerSecond"] = 1;
  position: IGuy3["position"] = {
    x: 0,
    y: 0,
  };
  size: IGuy3["size"] = {
    w: 64,
    h: 64,
  };
  setPosition({ thirdGuyWall: { right, top } }: Walls) {
    this.position.x = right - 70;
    this.position.y = top - 45;
  }

  framePositions: IGuy3["framePositions"] = {
    guy3Drop: [
      [0, 0],
      [65, 0],
      [130, 0],
      [0, 65],
      [65, 65],
      [0, 130],
      [65, 130],
      [130, 65],
    ],
    guy3Grab: [
      [130, 130],
      [195, 0],
      [195, 65],
      [260, 0],
      [195, 130],
      [260, 65],
      [325, 0],
      [390, 0],
      [325, 65],
    ],
    guy3grabArmHorizontal: [
      [260, 130],
      [325, 130],
      [390, 65],
      [390, 130],
    ],
    guy3grabArmHorizontalLeftDown: [
      [0, 195],
      [0, 260],
      [65, 195],
      [65, 260],
    ],
    guy3grabArmHorizontalLeftUp: [
      [0, 325],
      [130, 195],
      [65, 325],
      [0, 390],
    ],
    guy3grabArmHorizontalRightDown: [
      [195, 195],
      [130, 260],
      [130, 325],
      [260, 195],
    ],
    guy3grabArmHorizontalRightUp: [
      [65, 390],
      [195, 260],
      [130, 390],
      [260, 260],
    ],
    guy3grabArmVertical: [
      [195, 325],
      [325, 195],
      [260, 325],
      [195, 390],
    ],
    guy3GrabIdle: [
      [390, 195],
      [325, 260],
      [390, 260],
    ],
    guy3Idle: [
      [325, 325],
      [260, 390],
      [325, 390],
    ],
    guy3IdleAfter: [
      [390, 325],
      [390, 390],
      [455, 0],
    ],
  };
  batonPosition: IGuy3["batonPosition"] = {
    guy3GrabIdle: {
      0: {
        zRotation: 1.436052918434143,
        y: 18.470164106191834,
        x: 21.07255058080121,
      },
      1: {
        zRotation: 1.436052918434143,
        y: 18.470164106191834,
        x: 21.07255058080121,
      },
      2: {
        zRotation: 1.436052918434143,
        y: 18.470164106191834,
        x: 21.07255058080121,
      },
    },
    guy3Drop: {
      0: {
        zRotation: 1.436052918434143,
        y: 18.470164106191834,
        x: 21.07255058080121,
      },
      1: {
        zRotation: 1.5090703964233398,
        y: 19.80460044985912,
        x: 21.517362000512296,
      },
      2: {
        zRotation: 1.5377225875854492,
        y: 23.251893382254845,
        x: 21.962173420223383,
      },
      3: {
        zRotation: 1.5749279260635376,
        y: 28.58963823579048,
        x: 21.962173420223383,
      },
      4: {
        zRotation: 1.621967077255249,
        y: 35.929037604827045,
        x: 21.850970825862365,
      },
      5: {
        zRotation: 1.7017238140106201,
        y: 44.26926292878031,
        x: 22.073377056851413,
      },
      6: {
        zRotation: 1.7546398639678955,
        y: 53.832721480906336,
        x: 21.850970825862365,
      },
    },
  };
}
