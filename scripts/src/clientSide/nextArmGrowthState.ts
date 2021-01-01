const createAllArmSegments = (
  guy: ArmSegment[],
  armDestination: ArmGrowthInput["armDestination"]
) => {
  const armGrownInput: ArmGrowthInput = {
    armPosition: {
      x: -10,
      y: -10,
    },
    radius: 100,
    lastGrowthWasBendy: true,
    armDirection: "up",
    armDestination,
  };
  for (let i = 0; i < 5000; i++) {
    if (nextArmGrowthState(guy, armGrownInput)) {
      break;
    }
  }
};
interface ArmGrowthInput {
  armDirection: "up" | "down" | "left" | "right";
  armDestination: {
    x: number;
    y: number;
  };
  lastGrowthWasBendy: boolean;
  radius: number;
  armPosition: {
    x: number;
    y: number;
  };
}

const nextArmGrowthState = (
  guy: ArmSegment[],
  armGrowthInput: ArmGrowthInput
): true | undefined => {
  // const { armSegments } = guy;
  const armSegments = guy;
  const {
    armDirection,
    armDestination,
    lastGrowthWasBendy,
    radius,
    armPosition,
  } = armGrowthInput;
  if (
    armPosition.x > armDestination.x - 7.5 &&
    armPosition.x < armDestination.x + 7.5 &&
    armPosition.y > armDestination.y - 7.5 &&
    armPosition.y < armDestination.y + 7.5
  ) {
    return true;
  }
  const lastFrame =
    armSegments.length <= 0 ? 0 : armSegments[armSegments.length - 1].frame;
  const nextFrame = lastFrame == 3 ? 0 : lastFrame + 1;
  const curveChance = 0.2;
  const radiusShrinkFactor = 20;
  switch (armDirection) {
    case "up":
      if (armPosition.y > armDestination.y - radius || lastGrowthWasBendy) {
        if (Math.random() < curveChance) {
          const count = Math.floor(Math.random() * 3) + 1;
          if (Math.random() < 0.5) {
            fromUpToRight(guy, nextFrame, armGrowthInput);
            for (let i = 0; i < count; i++) {
              fromRightToRight(guy, nextFrame, armGrowthInput);
            }
            fromRightToUp(guy, nextFrame, armGrowthInput);
            return;
          }
          fromUpToLeft(guy, nextFrame, armGrowthInput);
          for (let i = 0; i < count; i++) {
            fromLeftToLeft(guy, nextFrame, armGrowthInput);
          }
          fromLeftToUp(guy, nextFrame, armGrowthInput);
          return;
        }
        fromUpToUp(guy, nextFrame, armGrowthInput);
        return;
      }
      armGrowthInput.radius = Math.max(0, radius - radiusShrinkFactor);
      if (armDestination.x > armPosition.x) {
        fromUpToRight(guy, nextFrame, armGrowthInput);
        return;
      }
      fromUpToLeft(guy, nextFrame, armGrowthInput);
      return;
    case "down":
      if (armPosition.y < armDestination.y + radius || lastGrowthWasBendy) {
        if (Math.random() < curveChance) {
          const count = Math.floor(Math.random() * 3) + 1;
          if (Math.random() < 0.5) {
            fromDownToRight(guy, nextFrame, armGrowthInput);
            for (let i = 0; i < count; i++) {
              fromRightToRight(guy, nextFrame, armGrowthInput);
            }
            fromRightToDown(guy, nextFrame, armGrowthInput);
            return;
          }
          fromDownToLeft(guy, nextFrame, armGrowthInput);
          for (let i = 0; i < count; i++) {
            fromLeftToLeft(guy, nextFrame, armGrowthInput);
          }
          fromLeftToDown(guy, nextFrame, armGrowthInput);
          return;
        }
        fromDownToDown(guy, nextFrame, armGrowthInput);
        return;
      }
      armGrowthInput.radius = Math.max(0, radius - radiusShrinkFactor);
      if (armDestination.x > armPosition.x) {
        fromDownToRight(guy, nextFrame, armGrowthInput);
        return;
      }
      fromDownToLeft(guy, nextFrame, armGrowthInput);

      return;
    case "right":
      if (armPosition.x < armDestination.x + radius || lastGrowthWasBendy) {
        if (Math.random() < curveChance) {
          const count = Math.floor(Math.random() * 3) + 1;
          if (Math.random() < 0.5) {
            fromRightToDown(guy, nextFrame, armGrowthInput);
            for (let i = 0; i < count; i++) {
              fromDownToDown(guy, nextFrame, armGrowthInput);
            }
            fromDownToRight(guy, nextFrame, armGrowthInput);
            return;
          }
          fromRightToUp(guy, nextFrame, armGrowthInput);
          for (let i = 0; i < count; i++) {
            fromUpToUp(guy, nextFrame, armGrowthInput);
          }
          fromUpToRight(guy, nextFrame, armGrowthInput);
          return;
        }
        fromRightToRight(guy, nextFrame, armGrowthInput);
        return;
      }
      armGrowthInput.radius = Math.max(0, radius - radiusShrinkFactor);

      if (armDestination.y > armPosition.y) {
        fromRightToDown(guy, nextFrame, armGrowthInput);
        return;
      }
      fromRightToUp(guy, nextFrame, armGrowthInput);
      return;
    case "left":
      if (armPosition.x > armDestination.x - radius || lastGrowthWasBendy) {
        if (Math.random() < curveChance) {
          const count = Math.floor(Math.random() * 3) + 1;
          if (Math.random() < 0.5) {
            fromLeftToDown(guy, nextFrame, armGrowthInput);
            for (let i = 0; i < count; i++) {
              fromDownToDown(guy, nextFrame, armGrowthInput);
            }
            fromDownToLeft(guy, nextFrame, armGrowthInput);
            return;
          }
          fromLeftToUp(guy, nextFrame, armGrowthInput);
          for (let i = 0; i < count; i++) {
            fromUpToUp(guy, nextFrame, armGrowthInput);
          }
          fromUpToLeft(guy, nextFrame, armGrowthInput);
          return;
        }
        fromLeftToLeft(guy, nextFrame, armGrowthInput);
        return;
      }
      armGrowthInput.radius = Math.max(0, radius - radiusShrinkFactor);
      if (armDestination.y > armPosition.y) {
        fromLeftToDown(guy, nextFrame, armGrowthInput);
        return;
      }
      fromLeftToUp(guy, nextFrame, armGrowthInput);
      return;
  }
};

const setBatonPositionToLastArmSegment = (
  baton: Baton,
  armSegments: ArmSegment[],
  drawFrame: number
) => {
  const {
    position: { x, y },
    type,
  } = armSegments[Math.floor(drawFrame)];
  baton.position.x = x + 32;
  baton.position.y = y + 32;
  switch (type) {
    case guy3ArmSegmentType.horizontal:
      baton.position.zRotation = 0;
      break;
    case guy3ArmSegmentType.vertical:
      baton.position.zRotation = -Math.PI / 2;
      break;
    case guy3ArmSegmentType.leftDown:
      baton.position.zRotation = Math.PI / 4;
      break;
    case guy3ArmSegmentType.leftUp:
      baton.position.zRotation = -Math.PI / 4;
      break;
    case guy3ArmSegmentType.rightDown:
      baton.position.zRotation = -Math.PI / 4;
      break;
    case guy3ArmSegmentType.rightUp:
      baton.position.zRotation = Math.PI / 4;
      break;
  }
};

const fromUpToUp = (
  armSegments: ArmSegment[],
  nextFrame: number,
  armGrowthInput: ArmGrowthInput
) => {
  const { armPosition } = armGrowthInput;
  armSegments.push({
    type: guy3ArmSegmentType.vertical,
    position: {
      x: armPosition.x,
      y: armPosition.y - 5,
    },
    frame: nextFrame,
  });
  armGrowthInput.lastGrowthWasBendy = false;
  armPosition.y -= 5;
};
const fromDownToDown = (
  armSegments: ArmSegment[],

  nextFrame: number,
  armGrowthInput: ArmGrowthInput
) => {
  const { armPosition } = armGrowthInput;
  armSegments.push({
    type: guy3ArmSegmentType.vertical,
    position: {
      x: armPosition.x,
      y: armPosition.y + 5,
    },
    frame: nextFrame,
  });
  armGrowthInput.lastGrowthWasBendy = false;
  armPosition.y += 5;
};

const fromRightToRight = (
  armSegments: ArmSegment[],

  nextFrame: number,
  armGrowthInput: ArmGrowthInput
) => {
  const { armPosition } = armGrowthInput;

  armSegments.push({
    type: guy3ArmSegmentType.horizontal,
    position: {
      x: armPosition.x + 5,
      y: armPosition.y,
    },
    frame: nextFrame,
  });
  armGrowthInput.lastGrowthWasBendy = false;
  armPosition.x += 5;
};

const fromLeftToLeft = (
  armSegments: ArmSegment[],
  nextFrame: number,
  armGrowthInput: ArmGrowthInput
) => {
  const { armPosition } = armGrowthInput;

  armSegments.push({
    type: guy3ArmSegmentType.horizontal,
    position: {
      x: armPosition.x - 5,
      y: armPosition.y,
    },
    frame: nextFrame,
  });
  armGrowthInput.lastGrowthWasBendy = false;
  armPosition.x -= 5;
};

const fromUpToRight = (
  armSegments: ArmSegment[],
  nextFrame: number,
  armGrowthInput: ArmGrowthInput
) => {
  const { armPosition } = armGrowthInput;
  armSegments.push({
    type: guy3ArmSegmentType.leftDown,
    position: {
      x: armPosition.x + 5,
      y: armPosition.y - 5,
    },
    frame: nextFrame,
  });
  armGrowthInput.armDirection = "right";
  armPosition.y -= 5;
  armPosition.x += 5;
  armGrowthInput.lastGrowthWasBendy = true;
};

const fromUpToLeft = (
  armSegments: ArmSegment[],
  nextFrame: number,
  armGrowthInput: ArmGrowthInput
) => {
  const { armPosition } = armGrowthInput;
  armSegments.push({
    type: guy3ArmSegmentType.rightDown,
    position: {
      x: armPosition.x - 5,
      y: armPosition.y - 5,
    },
    frame: nextFrame,
  });
  armGrowthInput.armDirection = "left";
  armPosition.y -= 5;
  armPosition.x -= 5;
  armGrowthInput.lastGrowthWasBendy = true;
};

const fromDownToRight = (
  armSegments: ArmSegment[],
  nextFrame: number,
  armGrowthInput: ArmGrowthInput
) => {
  const { armPosition } = armGrowthInput;
  armSegments.push({
    type: guy3ArmSegmentType.leftUp,
    position: {
      x: armPosition.x + 5,
      y: armPosition.y + 5,
    },
    frame: nextFrame,
  });
  armGrowthInput.armDirection = "right";
  armPosition.x += 5;
  armPosition.y += 5;
  armGrowthInput.lastGrowthWasBendy = true;
};

const fromDownToLeft = (
  armSegments: ArmSegment[],
  nextFrame: number,
  armGrowthInput: ArmGrowthInput
) => {
  const { armPosition } = armGrowthInput;
  armSegments.push({
    type: guy3ArmSegmentType.rightUp,
    position: {
      x: armPosition.x - 5,
      y: armPosition.y + 5,
    },
    frame: nextFrame,
  });
  armGrowthInput.armDirection = "left";
  armPosition.x -= 5;
  armPosition.y += 5;
  armGrowthInput.lastGrowthWasBendy = true;
};

const fromRightToDown = (
  armSegments: ArmSegment[],
  nextFrame: number,
  armGrowthInput: ArmGrowthInput
) => {
  const { armPosition } = armGrowthInput;

  armSegments.push({
    type: guy3ArmSegmentType.rightDown,
    position: {
      x: armPosition.x + 5,
      y: armPosition.y,
    },
    frame: nextFrame,
  });
  armGrowthInput.armDirection = "down";
  armPosition.x += 10;
  armGrowthInput.lastGrowthWasBendy = true;
};
const fromRightToUp = (
  armSegments: ArmSegment[],
  nextFrame: number,
  armGrowthInput: ArmGrowthInput
) => {
  const { armPosition } = armGrowthInput;

  armSegments.push({
    type: guy3ArmSegmentType.rightUp,
    position: {
      x: armPosition.x + 5,
      y: armPosition.y,
    },
    frame: nextFrame,
  });
  armGrowthInput.armDirection = "up";
  armPosition.x += 10;
  armGrowthInput.lastGrowthWasBendy = true;
};
const fromLeftToDown = (
  armSegments: ArmSegment[],
  nextFrame: number,
  armGrowthInput: ArmGrowthInput
) => {
  const { armPosition } = armGrowthInput;

  armSegments.push({
    type: guy3ArmSegmentType.leftDown,
    position: {
      x: armPosition.x - 5,
      y: armPosition.y,
    },
    frame: nextFrame,
  });
  armGrowthInput.armDirection = "down";
  armGrowthInput.lastGrowthWasBendy = true;
  armPosition.x -= 10;
};
const fromLeftToUp = (
  armSegments: ArmSegment[],
  nextFrame: number,
  armGrowthInput: ArmGrowthInput
) => {
  const { armPosition } = armGrowthInput;

  armSegments.push({
    type: guy3ArmSegmentType.leftUp,
    position: {
      x: armPosition.x + 5,
      y: armPosition.y,
    },
    frame: nextFrame,
  });
  armPosition.x += 0;
  armGrowthInput.armDirection = "up";
  armGrowthInput.lastGrowthWasBendy = true;
};
