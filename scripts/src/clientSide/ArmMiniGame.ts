interface Arm {
  segments: (ArmSegment & {
    velocity?: number;
    velocityX?: number;
    dying?: boolean;
  })[];
  colorIndex: number;
  drawFrame: number;
  dying: boolean;
  caughtBaton: Baton | null;
  /**
   * Destroy the arm from top to bottom
   * Imagine an etch en sketch eraser going
   * from top to bottom at an increasing
   * velocity
   */
  dyingYThreshold: number;
  dyingYThresholdVelocity: number;
  /**
   * How long this arm has
   * been alive
   */
  livingTime: number;
}

const armColors = [
  "#0a84ff",
  "#30d158",
  "#5e5ce6",
  "#64d2ff",
  "#bf5aff",
  "#6c59ff",
  "#7986cb",
  "#64b5f6",
  "#4db6ac",
  "#81c784",
  "#aed581",
];

const batonColors = [
  batonColor,
  "#ff9f0a",
  "#ff375f",
  "#ff453a",
  "#ef5350",
  "#fff176",
  "#ffd54f",
  "#ff7043",
  "#ffa000",
];

type GameState = "neverStarted" | "playing" | "over";

interface SpriteSheet {
  image: HTMLCanvasElement | HTMLImageElement;
  framePositions: AnimCharacterFramePositions;
}

/**
 * This is just a fun mini-game I made in a couple of hours.
 * Most of the code is copy/paste from FullScreenAnimation.
 * If your looking for documentation. Look there
 */
class ArmMiniGame {
  thirdGuy: IGuy3;

  lastFrameTime: number | null = null;
  timeSinceLastAnimationFrame: number = 0;

  width: number;
  height: number;
  context: CanvasRenderingContext2D;

  thirdWall: HTMLElement;
  arms: Map<Number, Arm> = new Map();
  colors: SpriteSheet[] = [];
  batons: Map<number, Baton> = new Map();
  /**
   * Batons are destroyed on a game over
   */
  destroyedBatonParticles: Map<string, Map<number, BatonParticle>> = new Map(
    batonColors.map((color) => [color, new Map()])
  );

  playButtonPosition: {
    x: number;
    y: number;
  } = {
    x: 0,
    y: 0,
  };
  gameState: GameState = "neverStarted";

  timeLeft: number = 30;
  score: number = 0;

  animationCanvas: HTMLCanvasElement;

  touches: Map<
    number,
    {
      x: number;
      y: number;
    }
  > = new Map();

  constructor(
    thirdGuy: IGuy3,
    thirdWall: HTMLElement,
    options: {
      context?: {
        context: CanvasRenderingContext2D;
        canvas: HTMLCanvasElement;
      };
    } = {}
  ) {
    this.thirdGuy = thirdGuy;
    this.thirdWall = thirdWall;
    this.thirdGuy.animState = {
      animation: guy3Animations.grabIdle,
      frame: 0,
      reverse: false,
      nextAnimation: [],
    };

    this.thirdGuy.drawArmSegments = true;
    const ratio = window.devicePixelRatio || 1;
    this.width = window.innerWidth > 0 ? window.innerWidth : screen.width;
    this.height = window.innerHeight > 0 ? window.innerHeight : screen.height;
    const maybeContext =
      options.context ?? makeAnimationCanvas(this.width, this.height, ratio);

    if (!maybeContext) {
      throw new Error("Could not make Animation canvas");
    }
    this.context = maybeContext.context;
    this.animationCanvas = maybeContext.canvas;
    this.context.imageSmoothingEnabled = false;

    createTintedSpriteSheets(
      this.colors,
      this.thirdGuy,
      Object.values(guy3ArmSegmentType) as string[],
      armColors
    );
    this.setupMouseAndTouchListeners();

    requestAnimationFrame(this.updateStateAndDraw);
  }

  updateStateAndDraw = (totalTimeElapsed: number) => {
    this.updateState(totalTimeElapsed);
    this.draw();

    requestAnimationFrame(this.updateStateAndDraw);
  };

  updateState = (totalTimeElapsed: number) => {
    const rect = this.thirdWall.getBoundingClientRect();
    const thirdWall = {
      left: rect.left + 8,
      width: rect.width,
      right: rect.right - 8,
      top: rect.top,
      bottom: rect.bottom,
    };

    const timeDifference =
      this.lastFrameTime == null ? 0 : totalTimeElapsed - this.lastFrameTime;
    this.lastFrameTime = totalTimeElapsed;
    const timeIncrement = timeDifference / 1000;
    this.timeLeft -= timeIncrement;

    this.timeSinceLastAnimationFrame += timeIncrement;
    /**
     * 0.08333 is 12 frames-per-second
     */
    if (this.timeSinceLastAnimationFrame > 0.08333333) {
      this.timeSinceLastAnimationFrame = 0;
      nextAnimationFrame(this.thirdGuy);
      nextArmAnimationFrame(this.thirdGuy);
    }

    this.thirdGuy.position.x =
      (thirdWall.right - thirdWall.left) / 2 + thirdWall.left;
    this.thirdGuy.position.y = thirdWall.top - 45;
    this.updateArmSegments(timeIncrement);

    this.playButtonPosition.x = rect.left + 25;
    this.playButtonPosition.y = rect.top + 45;

    if (this.gameState == "neverStarted") {
      return;
    }
    updateMiniGameBatons(this.arms, this.batons, this.thirdGuy, timeIncrement);

    for (const [, colorMap] of this.destroyedBatonParticles) {
      updateBatonParticles(colorMap, timeIncrement);
    }
    generateMiniGameBaton(
      this.gameState,
      this.timeLeft,
      this.batons,
      this.thirdGuy,
      this.width
    );
    this.checkForGameOver();
  };

  checkForGameOver = () => {
    if (this.gameState != "playing" || this.timeLeft > 0) {
      return;
    }
    this.timeLeft = 0;
    this.gameState = "over";
    for (const [, arm] of this.arms) {
      arm.dying = true;
      if (arm.caughtBaton) {
        this.destroyBaton(arm.caughtBaton);
        arm.caughtBaton = null;
      }
    }
    this.animationCanvas.style.pointerEvents = "none";
    this.animationCanvas.style.touchAction = "unset";
    for (const [, baton] of this.batons) {
      this.destroyBaton(baton);
    }
    this.batons.clear();
  };

  destroyBaton = (baton: Baton) => {
    const m = this.destroyedBatonParticles.get(baton.color);
    if (!m) {
      debugger;
      return;
    }
    for (const [particleKey, particle] of baton.batonParticles) {
      m.set(particleKey, particle);
    }
    for (let i = 0; i < 50; i++) {
      generateBatonParticles(m, baton, this.thirdGuy);
    }
  };

  draw = () => {
    this.context.clearRect(0, 0, this.width, this.height);
    this.drawStartButton();

    drawAnimatedCharacter(this.thirdGuy, this.context);

    if (this.gameState == "neverStarted") {
      return;
    }
    for (const [, { segments, drawFrame, colorIndex, caughtBaton }] of this
      .arms) {
      const color = this.colors[colorIndex];
      drawArmSegments(
        segments,
        drawFrame,
        color.image,
        color.framePositions,
        this.thirdGuy,
        this.context
      );
      if (caughtBaton) {
        drawBaton(caughtBaton, this.thirdGuy, this.context);
      }
    }

    for (const [, baton] of this.batons) {
      drawBaton(baton, this.thirdGuy, this.context);
    }
    for (const [color, particles] of this.destroyedBatonParticles) {
      drawBatonParticles(color, particles, this.thirdGuy, this.context);
    }

    this.context.font = "36px monospace";
    this.context.fillStyle = batonColor;

    this.context.fillText(
      this.score.toString(),
      this.thirdGuy.position.x,
      this.thirdGuy.position.y
    );
    const a = Math.round(this.timeLeft);
    const b = Math.round((this.timeLeft * 10) % 10);
    const timeText =
      this.gameState == "over"
        ? "game over"
        : `${a < 10 ? `0${a}` : a}:${b == 10 ? "0" : b}`;

    this.context.fillText(timeText, 0, 100);
  };

  drawStartButton = () => {
    const text: { [P in GameState]: string } = {
      neverStarted: "Start",
      over: "Play again",
      playing: "Playing!",
    };
    this.context.font = "36px monospace";
    this.context.fillStyle = batonColor;
    this.context.fillText(
      text[this.gameState],
      this.playButtonPosition.x,
      this.playButtonPosition.y
    );
  };

  updateArmSegments = (timeIncrement: number) => {
    for (const [key, arm] of this.arms) {
      if (!arm.dying) {
        if (arm.caughtBaton) {
          arm.drawFrame = Math.max(0, arm.drawFrame - 150 * timeIncrement);
          if (arm.drawFrame == 0) {
            this.arms.delete(key);

            this.score++;
            continue;
          }
          setBatonPositionToLastArmSegment(
            arm.caughtBaton,
            arm.segments,
            arm.drawFrame
          );
          updateAndGenerateBatonParticles(
            arm.caughtBaton,
            this.thirdGuy,
            timeIncrement
          );
          continue;
        }
        arm.livingTime += timeIncrement;
        if (arm.livingTime > 2) {
          arm.dying = true;
          let minY = Infinity;
          for (let i = 0; i < arm.drawFrame; i++) {
            minY = Math.min(minY, arm.segments[i].position.y);
          }
          arm.dyingYThreshold = minY;
        }
        arm.drawFrame = Math.min(
          arm.segments.length - 1,
          arm.drawFrame + 300 * timeIncrement
        );

        continue;
      }

      let minY = Infinity;
      let boolSomethingIsDying = false;
      for (let i = 0; i < arm.drawFrame; i++) {
        const segment = arm.segments[i];
        if (segment.position.y < arm.dyingYThreshold) {
          segment.dying = true;
        }
        if (!segment.dying) {
          continue;
        }
        const velocity = segment.velocity ?? 10;
        const velocityX = segment.velocityX ?? 50 * (Math.random() - 0.5);
        segment.position.y += velocity * timeIncrement;
        segment.position.x += velocityX * timeIncrement;
        segment.velocity = velocity + Math.random() * 150 * timeIncrement;
        segment.velocityX = velocityX;
        minY = Math.min(segment.position.y, minY);
        boolSomethingIsDying = true;
      }
      if (
        boolSomethingIsDying &&
        minY + this.thirdGuy.position.y > this.height
      ) {
        this.arms.delete(key);
        continue;
      }
      arm.dyingYThreshold += arm.dyingYThresholdVelocity * timeIncrement;
      arm.dyingYThresholdVelocity += 150 * timeIncrement;
    }
  };

  onClick = (clientX: number, clientY: number) => {
    if (
      this.gameState != "playing" ||
      Array.from(this.arms.values()).filter(({ dying }) => !dying).length > 3
    ) {
      return;
    }

    const x = clientX - this.thirdGuy.position.x;
    const y = clientY - this.thirdGuy.position.y;

    if (y > 32) {
      return;
    }

    const freshColors = this.colors.filter((_color, index) => {
      for (const [, { colorIndex }] of this.arms) {
        if (index == colorIndex) {
          return false;
        }
      }
      return true;
    });
    const newArm: Arm = {
      segments: [],
      dying: false,
      drawFrame: 0,
      colorIndex: Math.floor(Math.random() * freshColors.length),
      dyingYThreshold: 10,
      caughtBaton: null,
      livingTime: 0,
      dyingYThresholdVelocity: 10,
    };

    createAllArmSegments(newArm.segments, {
      x: x - 32,
      y: y - 32,
    });
    this.arms.set(Math.random(), newArm);
  };

  setupMouseAndTouchListeners = () => {
    window.addEventListener("click", ({ clientX, clientY }) =>
      this.onClick(clientX, clientY)
    );
    window.addEventListener("touchstart", ({ changedTouches }) => {
      for (const touch of changedTouches) {
        this.touches.set(touch.identifier, {
          x: touch.clientX - this.thirdGuy.position.x,
          y: touch.clientY - this.thirdGuy.position.y,
        });
      }
    });

    window.addEventListener("touchend", ({ changedTouches }) => {
      let clicked = false;
      for (const touch of changedTouches) {
        const oldTouch = this.touches.get(touch.identifier);
        this.touches.delete(touch.identifier);
        if (clicked || !oldTouch) {
          continue;
        }
        const newX = touch.clientX - this.thirdGuy.position.x;
        const newY = touch.clientY - this.thirdGuy.position.y;

        if (
          Math.sqrt(
            Math.pow(newX - oldTouch.x, 2) + Math.pow(newY - oldTouch.y, 2)
          ) > 10
        ) {
          /**
           * not a tap. more of a drag
           */
          continue;
        }
        clicked = true;
        this.onClick(touch.clientX, touch.clientY);
      }
    });
  };

  onStart = () => {
    switch (this.gameState) {
      case "neverStarted":
        this.gameState = "playing";
        this.animationCanvas.style.pointerEvents = "auto";
        this.animationCanvas.style.touchAction = "pan-x pan-y";

        return;
      case "playing":
        return;
      case "over":
        this.gameState = "playing";
        this.animationCanvas.style.pointerEvents = "auto";
        this.animationCanvas.style.touchAction = "pan-x pan-y";

        this.timeLeft = 30;
        this.score = 0;
    }
  };
}

const generateMiniGameBaton = (
  gameState: GameState,
  timeLeft: number,
  batons: Map<number, Baton>,
  referenceGuy: AnimCharacter,
  width: number
) => {
  if (gameState != "playing" || Math.random() > 0.1) {
    return;
  }

  const goingDown = timeLeft > 18 ? true : Math.random() < 0.5;
  batons.set(Math.random(), {
    character: null,
    color: batonColors[Math.floor(Math.random() * batonColors.length)],
    position: {
      zRotation: 0,

      y: goingDown ? 0 - referenceGuy.position.y : 200,
      x: width * Math.random() - referenceGuy.position.x,
      frameNumber: 0,
      velocity: {
        x: 20 * (Math.random() - 0.5),
        y: (goingDown ? 1 : -1) * 30 * Math.random(),
        zRotation: Math.random() * 2,
      },
      relativeTo: referenceGuy,
    },
    batonParticles: new Map(),
    timeSinceLastParticleGenerated: 0,
    lineWidth: 3,
    height: 10,
  });
};

const updateMiniGameBatons = (
  arms: Map<Number, Arm>,
  batons: Map<number, Baton>,
  referenceGuy: AnimCharacter,
  timeIncrement: number
) => {
  const rectHitBoxes = getArmHitBoxes(arms);
  for (const [batonKey, baton] of batons) {
    const oldY = baton.position.y;
    const goingDown = baton.position.velocity.y > 0;
    updateBatonPhysics(baton, 0, (goingDown ? 1 : -1) * 150, timeIncrement);
    const x = baton.position.x;
    for (const [rectHitBoxKey, box] of rectHitBoxes) {
      if (
        !(
          x > box.left &&
          x < box.right &&
          ((goingDown &&
            ((oldY < box.top && baton.position.y > box.top) ||
              (oldY < box.bottom && baton.position.y > box.bottom))) ||
            (!goingDown &&
              ((oldY > box.bottom && baton.position.y < box.bottom) ||
                (oldY > box.top && baton.position.y < box.top))))
        )
      ) {
        continue;
      }
      box.arm.caughtBaton = baton;
      rectHitBoxes.delete(rectHitBoxKey);
      batons.delete(batonKey);
      break;
    }
    if (baton.position.y > 500 || baton.position.y < -2000) {
      batons.delete(batonKey);
      continue;
    }

    updateAndGenerateBatonParticles(baton, referenceGuy, timeIncrement);
  }
};

const createTintedSpriteSheets = (
  spriteSheets: SpriteSheet[],
  original: AnimCharacter,
  animationsNames: string[],
  colors: string[]
) => {
  spriteSheets.push({
    image: original.image,
    framePositions: original.framePositions,
  });

  for (const color of colors) {
    const canvas = document.createElement("canvas");
    const width = animationsNames.length * 64;
    const height = 128 * 4;
    canvas.width = width;
    canvas.height = height;

    const context = canvas.getContext("2d");
    if (!context) {
      continue;
    }
    const framePositions: AnimCharacterFramePositions = {};
    for (let i = 0; i < animationsNames.length; i++) {
      const type = animationsNames[i];
      const thisTypeFramePositions: [number, number][] = [];
      for (let frame = 0; frame < 4; frame++) {
        const [x, y] = original.framePositions[type][frame];
        const dx = i * 64;
        const dy = frame * 64;
        context.drawImage(original.image, x, y, 64, 64, dx, dy, 64, 64);
        thisTypeFramePositions.push([dx, dy]);
      }
      framePositions[type] = thisTypeFramePositions;
    }
    context.globalCompositeOperation = "source-in";

    context.fillStyle = color;
    context.fillRect(0, 0, width, height);
    spriteSheets.push({
      image: canvas,
      framePositions,
    });
  }
};

const getArmHitBoxes = (arms: Map<Number, Arm>) => {
  const rectHitBoxes: Map<
    number,
    {
      left: number;
      right: number;
      top: number;
      bottom: number;
      arm: Arm;
    }
  > = new Map();
  const boxSize = 15;

  for (const [, arm] of arms) {
    if (arm.dying || arm.caughtBaton) {
      continue;
    }
    const segment = arm.segments[Math.floor(arm.drawFrame)]
    if(!segment){
      continue
    }
    const { position } = segment;
    rectHitBoxes.set(Math.random(), {
      left: position.x + 32 - boxSize,
      right: position.x + 32 + boxSize,
      top: position.y + 32 - boxSize,
      bottom: position.y + 32 + boxSize,
      arm,
    });
  }
  return rectHitBoxes;
};

let armMiniGame: ArmMiniGame | null = null;

const start = () => {
  if (!armMiniGame) {
    return;
  }
  armMiniGame.onStart();
};

window.onload = () => {
  const thirdGuyId: WallId = "third-guy";
  armMiniGame = new ArmMiniGame(
    new Guy3(),
    document.getElementById(thirdGuyId) ?? document.createElement("div")
  );
};
