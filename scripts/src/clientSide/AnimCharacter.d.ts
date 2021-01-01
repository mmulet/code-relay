interface AnimCharacter {
  framePositions: AnimCharacterFramePositions;
  position: {
    x: number;
    y: number;
  };
  size: {
    w: number;
    h: number;
  };
  hide?: boolean;
  animState: AnimationState;
  batonPosition?: {
    [key: string]:
      | {
          [key: number]:
            | {
                zRotation: number;
                y: number;
                x: number;
                yScale?: number;
              }
            | undefined;
        }
      | undefined;
  };
  image: HTMLImageElement | HTMLCanvasElement;

  // setPosition: (
  //   character: AnimCharacter,
  //   walls: Walls,
  //   characters: Characters
  // ) => void;

  setPosition(walls: Walls, characters: Characters): void;
}
interface AnimCharacterFramePositions {
  [key: string]: [number, number][];
}
