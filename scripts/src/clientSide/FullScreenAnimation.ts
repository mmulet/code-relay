class FullScreenAnimation {
  snowFlakes = new Map<number, SnowFlake>();
  snowBoxes: HTMLElement[] = [];

  lastFrameTime: number | null = null;
  timeSinceLastAnimationFrame: number = 0;

  width: number;
  height: number;
  context: CanvasRenderingContext2D;

  characters: Characters;
  characterList: AnimCharacter[];
  wallElements: WallElements;
  baton: Baton;

  touches = new Map<number, MouseOrTouchInput>();
  mouse: MouseOrTouchInput | null = null;

  animationDirectorState: AnimationDirectorState = "guy1";

  constructor(
    characters: Characters,
    wallElements: WallElements,
    baton: Baton,
    /**
     * The options are elements that we can
     * get from the dom. Or optionally,
     * pass them in here
     */
    options: {
      context?: {
        canvas: HTMLCanvasElement;
        context: CanvasRenderingContext2D;
      };
      snowBoxes?: HTMLElement[];
    } = {}
  ) {
    this.characters = characters;

    this.characterList = Object.values(this.characters) as AnimCharacter[];
    this.wallElements = wallElements;
    this.baton = baton;

    const ratio = window.devicePixelRatio || 1;
    this.width = window.innerWidth > 0 ? window.innerWidth : screen.width;
    this.height = window.innerHeight > 0 ? window.innerHeight : screen.height;
    const maybeContext =
      options.context ?? makeAnimationCanvas(this.width, this.height, ratio);
    if (!maybeContext) {
      throw new Error("Could not make Animation canvas");
    }
    this.context = maybeContext.context;
    this.context.imageSmoothingEnabled = false;
    this.context.fillStyle = "white";
    const snowBoxClass: SnowBoxClass = "snow-box";
    this.snowBoxes =
      options.snowBoxes ??
      (Array.from(
        document.getElementsByClassName(snowBoxClass)
      ) as HTMLElement[]);

    this.setupMouseAndTouchListeners();

    requestAnimationFrame(this.updateStateAndDraw);
  }

  updateStateAndDraw = (totalTimeElapsed: number) => {
    this.updateState(totalTimeElapsed);
    this.draw();

    requestAnimationFrame(this.updateStateAndDraw);
  };

  updateState = (totalTimeElapsed: number) => {
    const snowWalls: Wall[] = this.snowBoxes.map((a) => {
      const rect = a.getBoundingClientRect();
      /**
       * adjust left and right to account for
       * the border radius
       */
      return {
        left: rect.left + 8,
        width: rect.width,
        right: rect.right - 8,
        top: rect.top,
        bottom: rect.bottom,
      };
    });

    const walls = wallElementsToWalls(this.wallElements);

    const timeDifference =
      this.lastFrameTime == null ? 0 : totalTimeElapsed - this.lastFrameTime;
    this.lastFrameTime = totalTimeElapsed;
    const timeIncrement = timeDifference / 1000;

    this.timeSinceLastAnimationFrame += timeIncrement;
    /**
     * 0.08333 is 12 frames-per-second
     */
    if (this.timeSinceLastAnimationFrame > 0.08333333) {
      this.timeSinceLastAnimationFrame = 0;
      for (const c of this.characterList) {
        nextAnimationFrame(c);
      }
      nextArmAnimationFrame(this.characters.thirdGuy);
    }

    for (const c of this.characterList) {
      c.setPosition(walls, this.characters);
    }

    this.animationDirectorState = animationDirector(
      this.baton,
      this.characters,
      walls,
      this.height,
      timeIncrement,
      this.animationDirectorState
    );
    updateAndGenerateBatonParticles(
      this.baton,
      this.characters.firstGuy,
      timeIncrement
    );

    updateSnowFlakes(
      this.snowFlakes,
      timeIncrement,
      this.width,
      this.height,
      snowWalls,
      this.touches,
      this.mouse
    );

    /**
     * Touch and requestAnimationFrame may not be
     * updated in sync. Make sure the difference is only
     * applied once, by deleting it now.
     */
    for (const [_, touch] of this.touches) {
      touch.difference = null;
    }
    if (this.mouse) {
      this.mouse.difference = null;
    }
  };

  draw = () => {
    this.context.clearRect(0, 0, this.width, this.height);
    for (const c of this.characterList) {
      drawAnimatedCharacter(c, this.context);
    }
    drawAnimationDirectorDirectedState(
      this.context,
      this.baton,
      this.characters,
      this.animationDirectorState
    );
    drawBaton(this.baton, this.characters.firstGuy, this.context);
    drawSnowFlakes(this.snowFlakes, this.context);
  };

  setupMouseAndTouchListeners = () => {
    window.addEventListener(
      "touchstart",
      ({ changedTouches }: TouchEvent) => {
        for (const { identifier, clientX, clientY } of changedTouches) {
          this.touches.set(
            identifier,
            setupTouch({
              clientX,
              clientY,
            })
          );
        }
      },
      false
    );
    window.addEventListener(
      "touchmove",
      ({ changedTouches }: TouchEvent) => {
        for (const { identifier, clientX, clientY } of changedTouches) {
          const touchInfo = this.touches.get(identifier);
          if (!touchInfo) {
            continue;
          }
          this.touches.set(
            identifier,
            setupTouch({
              clientX,
              clientY,
              input: touchInfo,
            })
          );
        }
      },
      false
    );

    window.addEventListener("touchcancel", this.deleteTouch, false);
    window.addEventListener("touchend", this.deleteTouch, false);

    window.addEventListener(
      "mouseenter",
      ({ clientX, clientY }: MouseEvent) => {
        this.mouse = setupTouch({
          clientX,
          clientY,
        });
      },
      false
    );

    window.addEventListener(
      "mousemove",
      ({ clientX, clientY }: MouseEvent) => {
        this.mouse = setupTouch({
          clientX,
          clientY,
          input: this.mouse ?? undefined,
        });
      },
      false
    );

    window.addEventListener(
      "mouseenter",
      ({ clientX, clientY }: MouseEvent) => {
        this.mouse = setupTouch({
          clientX,
          clientY,
        });
      },
      false
    );
    window.addEventListener("mouseleave", () => {
      this.mouse = null;
    });
  };

  deleteTouch = ({ changedTouches }: TouchEvent) => {
    for (const { identifier } of changedTouches) {
      this.touches.delete(identifier);
    }
  };
}

const wallElementsToWalls = (elements: WallElements): Walls => {
  const out: Partial<Walls> = {};
  for (const [key, value] of Object.entries(elements) as [
    keyof Walls,
    HTMLElement
  ][]) {
    const rect = value.getBoundingClientRect();
    out[key] = {
      left: rect.left + 8,
      width: rect.width,
      right: rect.right - 8,
      top: rect.top,
      bottom: rect.bottom,
    };
  }
  return out as Walls;
};

const setupTouch = ({
  clientX,
  clientY,
  input: maybeInput,
}: {
  readonly clientX: number;
  readonly clientY: number;
  readonly input?: MouseOrTouchInput;
}) => {
  const touchWidth = 20;
  const input = maybeInput ?? {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    clientX: 0,
    clientY: 0,
    difference: null,
    frameValid: false,
  };
  if (input) {
    input.difference = {
      x: clientX - input.clientX,
      y: clientY - input.clientY,
    };
  }
  input.clientX = clientX;
  input.clientY = clientY;
  input.left = clientX - touchWidth;
  input.right = clientX + touchWidth;
  input.top = clientY - touchWidth;
  input.bottom = clientY + touchWidth;
  return input;
};

let animationState: FullScreenAnimation | null = null;

window.onload = () => {
  const getWallBox = (id: WallId) =>
    document.getElementById(id) ?? document.createElement("div");
  const characters: Characters = {
    firstGuy: new Guy1(),
    look: new Guy1Look(),
    secondGuy: new Guy2(),
    thirdGuy: new Guy3(),
    fourthGuy: new Guy4(),
    fifthGuy: new Guy5(),
    sixthGuy: new Guy6(),
    finishLine: new Guy6FinishLine(),
    crowdLeft: new Guy6CrowdLeft(),
    crowdRight: new Guy6CrowdRight(),
  };
  animationState = new FullScreenAnimation(
    characters,
    {
      firstGuyWall: getWallBox("first-guy"),
      secondGuyWall: getWallBox("second-guy"),
      thirdGuyWall: getWallBox("third-guy"),
      fourthGuyWall: getWallBox("fourth-guy"),
      fifthGuyWall: getWallBox("fifth-guy"),
      sixthGuyWall: getWallBox("sixth-guy"),
    },
    new BatonState(characters.firstGuy)
  );
};
