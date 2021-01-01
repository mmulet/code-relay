const animationCanvasId = "animation-canvas";

const makeAnimationCanvas = (width: number, height: number, ratio: number) => {
  {
    const canvas = document.getElementById(
      animationCanvasId
    ) as HTMLCanvasElement;
    if (canvas) {
      const context = canvas.getContext("2d");
      if (!context) {
        return null;
      }
      return {
        canvas,
        context,
      };
    }
  }
  const canvas = makeAnimationCanvasElement(width, height, ratio);
  document.body.appendChild(canvas);

  const context = canvas.getContext("2d");
  if (!context) {
    return null;
  }
  context?.scale(ratio, ratio);
  return {
    canvas,
    context,
  };
};

const makeAnimationCanvasElement = (
  width: number,
  height: number,
  ratio: number
) => {
  const canvas = document.createElement("canvas");
  canvas.id = animationCanvasId;
  canvas.width = width * ratio;
  canvas.height = height * ratio;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  canvas.style.top = "0";
  canvas.style.left = "0";
  canvas.style.position = "fixed";
  canvas.style.pointerEvents = "none";
  return canvas;
};
