var runningLife = false;
var oldCode: Element | null = null;
var cells: any[] = [];
var newBornCells: any[] = [];
var dyingCells: any[] = [];
var theNextCells: any[] = [];
var msDelay = 500;

const runLifeButtonId: RunLifeButtonId = "runlifebutton";
const speedInputId: SpeedInputId = `speed`;
const runLifeErrorId: RunLifeErrorId = "runLifeError";

function runLife() {
  const lifeButton = document.getElementById(
    runLifeButtonId
  ) as HTMLButtonElement;
  if (!lifeButton) {
    return;
  }
  if (!runningLife) {
    lifeButton.innerText = "Pause";
    const codeId: CodeId = "code";
    const code = oldCode ?? (document.getElementById(codeId) as any);
    if (!code) {
      return;
    }
    try {
      eval(`(() => {${code.innerText}})();`);
    } catch (err) {
      const error = document.getElementById(runLifeErrorId) as HTMLDivElement;
      error.innerHTML = `<h2>Error!</h2>
        <h3>Message:</h3>
        <p>${err.message}</p>
        <p>Code is being eval'ed so I don't have a stack trace for you.
         Try copying pasting the code into an actual editor. 
         Or refresh the page to reload the code, discarding all changes.</p>`;
      throw err;
    }
    runningLife = true;
    return;
  }
  lifeButton.innerText = "Resume";
  runningLife = false;
}

function reset() {
  if (oldCode == null) {
    return;
  }
  const lifeCanvasId: LifeCanvasId = "life";
  const canvas = document.getElementById(lifeCanvasId);
  if (!canvas) {
    return;
  }
  {
    const runLifeButton = document.getElementById(runLifeButtonId);
    if (runLifeButton) {
      (runLifeButton as any).innerText = "Run";
    }
  }
  runningLife = false;
  canvas.replaceWith(oldCode);
  canvas.remove();
  oldCode = null;
  cells = [];
  newBornCells = [];
}
function speedChange(that: any) {
  const speed = that.value;
  msDelay = (1 / speed) * 1000;
  {
    const speedControl = document.getElementById(speedInputId);
    if (speedControl) {
      (speedControl as any).innerText = speed.toString();
    }
  }
}
