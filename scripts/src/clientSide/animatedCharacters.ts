const nextAnimationFrame = (character: AnimCharacter) => {
  const { animState, framePositions } = character;
  if (animState.reverse) {
    animState.frame--;
    if (animState.frame >= 0) {
      return;
    }
    if (goToNextAnimationOrLoop(character)) {
      return;
    }
    animState.frame = 1;
    animState.reverse = false;
    return;
  }
  animState.frame++;
  if (animState.frame < framePositions[animState.animation].length) {
    return;
  }
  if (goToNextAnimationOrLoop(character)) {
    return;
  }
  animState.frame = 0;
};

/**
 *
 * @returns true if we changed animation, or false if we loop
 */
const goToNextAnimationOrLoop = (character: AnimCharacter) => {
  const { animState } = character;
  if (animState.nextAnimation.length <= 0) {
    return false;
  }

  animState.frame = 0;
  animState.reverse = false;
  const nextAnimationState = animState.nextAnimation.pop()!;

  if (nextAnimationState == "hide") {
    character.hide = true;
    return true;
  }
  animState.animation = nextAnimationState;
  return true;
};

const drawAnimatedCharacter = (
  {
    framePositions,
    animState: { animation, frame },
    image,
    hide,
    position: { x, y },
    size: { w, h },
  }: AnimCharacter,
  context: CanvasRenderingContext2D
) => {
  if (hide) {
    return;
  }
  const [sx, sy] = framePositions[animation][frame];
  context.drawImage(image, sx, sy, w, h, x, y, w, h);
};

const havePendingAnimations = ({
  animState: { nextAnimation },
}: AnimCharacter) => nextAnimation.length > 0;
