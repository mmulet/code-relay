/**
 * A tiny game of life for the bottom
 * of code relay's homepage
 */

/**
 * One cell, this will be drawn
 * on the canvas
 */
interface Cell {
  /**
   * the x position
   */
  readonly x: number;
  /**
   * the y position
   */
  readonly y: number;
  /**
   * The character to draw.
   * No fancy unicode characters
   * are supported. But you can still
   * try it, see what happens!
   */
  readonly character: string;
  /**
   * A css color. Like #aabbcc
   */
  readonly color: string;
}

interface NewCell {
  /**
   * the x position
   */
  x: number;
  /**
   * the y position
   */
  y: number;
  /**
   * The number of times, a live cell
   * is adjacent to this cell
   */
  count: number;
  /**
   * Is this cell currently alive
   */
  live?: true;
  character?: string;
  color?: string;
  /**
   * The cell's parent
   */
  parent?: Cell;
}
/**
 * Global variables
 */
interface WindowVars {
  /**
   * Is the game running right now?
   * @default false
   */
  runningLife: boolean;
  /**
   * The old code node that we removed
   * from the dom. Save it here so we
   * can reset.
   * @default null
   */
  oldCode: ChildNode | null;
  /**
   * The current game state
   */
  cells: Cell[];
  /**
   * The cells that will be born next time
   */
  newBornCells: NewCell[];
  /**
   * Cells that die this turn
   */
  dyingCells: Set<number>;
  /**
   * The nextState
   */
  theNextCells: Cell[];

  /**
   * How fast do we play?
   * This is the delay between
   * draw frames
   * @unit milliseconds
   */
  msDelay: number;
}

type LifeCanvasId = "life";

const lifeCanvasId: LifeCanvasId = "life";

const codeId: CodeId = "code";

/**
 * Play the game and start the
 * run loop
 */
const playGame = () => {
  if ((<WindowVars>(<any>globalThis)).oldCode == null) {
    firstTimeSetup();
  }

  const cnvs = document.getElementById(lifeCanvasId) as HTMLCanvasElement;
  const context = cnvs?.getContext("2d");
  if (!context || !cnvs) {
    return;
  }
  context.font = "13px monospace";
  const color = "#282c34";

  let timeSinceLastDrawFrame = 0;
  let timeOfLastFrame = performance.now();
  let firstState = true;
  let evenOdd = false;
  const runLoop = (totalTimeElapsed: number) => {
    if (!(<WindowVars>(<any>globalThis)).runningLife) {
      return;
    }
    requestAnimationFrame(runLoop);
    timeSinceLastDrawFrame += totalTimeElapsed - timeOfLastFrame;
    timeOfLastFrame = totalTimeElapsed;
    if (timeSinceLastDrawFrame >= (<WindowVars>(<any>globalThis)).msDelay) {
      firstState = false;
      timeSinceLastDrawFrame = 0;
      (<WindowVars>(<any>globalThis)).cells = (<WindowVars>(
        (<any>globalThis)
      )).theNextCells;
      nextState();
    }

    /**
     * Halve the frame rate on the first
     * state for performance reasons.
     * Most things die off on states a
     * after the first state, so we only
     * need this for the first state.
     */
    if (firstState) {
      evenOdd = !evenOdd;
      if (evenOdd) {
        return;
      }
    }
    drawCells(
      context,
      cnvs!.width,
      cnvs!.height,
      color,
      timeSinceLastDrawFrame / (<WindowVars>(<any>globalThis)).msDelay
    );
  };
  requestAnimationFrame(runLoop);
};
/**
 * The max number of cells in a row.
 * Once the cells go beyond this, they
 * will start to wrap around, pac-man style
 */
const maxCells = 300;
/**
 * The color that stationary cells have a
 * chance to turn into
 */
let stationaryColor = "rgb(255,255,255)";
let stationaryCharacter = "m";

const firstTimeSetup = () => {
  codeToCells();
  const cnvs = document.createElement("canvas");
  cnvs.id = lifeCanvasId;

  const code = document.getElementById(codeId);
  const ratio = window.devicePixelRatio || 1;
  const w = (code as any).offsetWidth;
  const h = (code as any).offsetHeight;
  cnvs.width = w * ratio;
  cnvs.height = h * ratio;
  cnvs.style.width = `${w}px`;
  cnvs.style.height = `${h}px`;
  cnvs?.getContext("2d")?.scale(ratio, ratio);
  code!.replaceWith(cnvs);
  (<WindowVars>(<any>globalThis)).oldCode = code;
};

/**
 * Read the code (ie, this). And parse
 * all of the colors and text. Save the
 * result to cells global variable.
 */
const codeToCells = () => {
  const code = document.getElementById(codeId);
  if (!code) {
    return;
  }
  const cells: Cell[] = [];
  let x = 0;
  let y = 0;
  for (const node of code.childNodes) {
    const { text, color } = nodeToText(node);
    for (const char of text) {
      switch (char) {
        /**
         * newline
         */
        case "\n":
          y += 1;
          x = 0;
          continue;
        case " ":
          x += 1;
          continue;
        default:
          break;
      }
      cells.push({
        x,
        y,
        character: char,
        color,
      });
      x += 1;
    }
  }
  (<WindowVars>(<any>globalThis)).cells = cells;
  nextState();
};

/**
 *
 * Get the node's color and text.
 * It depends on the type of the node,
 * we only handle the case of text, and element
 */
const nodeToText = (node: ChildNode) => {
  if (node.nodeType == 3) {
    return {
      text: node.textContent ?? "",
      color: "white",
    };
  }
  return {
    text: (node as any).innerText,
    color: getComputedStyle(node as Element).color,
  };
};
/**
 * Get the next cells and assign them to
 * the global variables
 */
const nextState = () => {
  const { newLiveCells, newBornCells, dyingCells } = nextCells(
    (<WindowVars>(<any>globalThis)).cells
  );
  (<WindowVars>(<any>globalThis)).theNextCells = newLiveCells;
  (<WindowVars>(<any>globalThis)).newBornCells = newBornCells;
  (<WindowVars>(<any>globalThis)).dyingCells = dyingCells;
};

/**
 *
 * Compute the next state, given the current state
 */
const nextCells = (liveCells: Cell[]) => {
  /**
   * The key is the position of the
   * cell in the buffer. So y*maxCell + x
   */
  const newCellMap = new Map<number, NewCell>();
  for (const liveCell of liveCells) {
    setupAdjacentCells(liveCell, newCellMap);
  }
  const newLiveCells: Cell[] = [];
  const newBornCells: NewCell[] = [];
  const dyingCells = new Set<number>();

  /**
   * Vary the odds by the delay, so it's
   * interesting to watch at slow speeds,
   * but not too crazy at high speeds
   */
  const stationaryOdds =
    (0.25 * (<WindowVars>(<any>globalThis)).msDelay) / 1000;

  //filter and sort the cells.
  for (const [_, { count, live, ...cell }] of newCellMap) {
    if (count != 3 && (!live || count != 2)) {
      if (live) {
        dyingCells.add(cell.y * maxCells + cell.x);
      }
      continue;
    }
    //give stationary cells something to do
    if (live && Math.random() < stationaryOdds) {
      if (Math.random() < 0.5) {
        const oldColor = cell.color;
        cell.color = stationaryColor;
        stationaryColor = oldColor ?? stationaryColor;
      } else {
        const oldCharacter = cell.character;
        cell.character = stationaryCharacter;
        stationaryCharacter = oldCharacter ?? stationaryCharacter;
      }
    }
    newLiveCells.push(cell as Cell);

    if (!live && cell.parent != null) {
      newBornCells.push(cell as NewCell);
    }
  }
  return { newLiveCells, newBornCells, dyingCells };
};
/**
 *
 * @param liveCell In. THe current live cells
 * @param newCellMap Out. The new Live cells
 */
const setupAdjacentCells = (
  liveCell: Cell,
  newCellMap: Map<number, NewCell>
) => {
  const key = liveCell.y * maxCells + liveCell.x;
  for (let row = -1; row <= 1; row++) {
    for (let column = -1; column <= 1; column++) {
      setupCell(liveCell, key, row, column, newCellMap);
    }
  }
};
const setupCell = (
  parentCell: Cell,
  key: number,
  row: number,
  column: number,
  out: Map<number, NewCell>
) => {
  const { character, color, x, y } = parentCell;
  const newKey = key + column + row * maxCells;
  const newCell: NewCell = out.get(newKey) ?? {
    count: 0,
    x: x + column,
    y: y + row,
  };
  if (newKey == key) {
    newCell.live = true;
    //suddenly sheep
    newCell.character = Math.random() < 0.00005 ? "🐑" : character;
    newCell.color = color;
  } else {
    newCell.count += 1;
    //mutation
    if (newCell.live && Math.random() < 0.2) {
      if (Math.random() < 0.5) {
        newCell.color = color;
      } else {
        newCell.character = character;
      }
    }
    if (!newCell.live && newCell.count <= 3) {
      const odds = newCell.count == 2 ? 0.5 : 0.333333;
      const isParent = newCell.character == null || Math.random() < odds;
      newCell.character = isParent ? character : newCell.character;
      if (isParent) {
        newCell.parent = parentCell;
      }
      newCell.color = Math.random() < odds ? color : newCell.color ?? color;
    }
  }
  out.set(newKey, newCell);
};

const drawCells = (
  ctxt: CanvasRenderingContext2D,
  width: number,
  height: number,
  blankColor: string,
  /**
   * 0 to 1
   */
  frameProgress: number
) => {
  const cells = (<WindowVars>(<any>globalThis)).cells;
  const newBornCells = (<WindowVars>(<any>globalThis)).newBornCells;
  const dyingCells = (<WindowVars>(<any>globalThis)).dyingCells;

  ctxt.fillStyle = blankColor;
  ctxt.fillRect(0, 0, width, height);
  const transparencyColor = 1 - frameProgress;
  for (const { x, y, character, color } of cells) {
    ctxt.fillStyle = color;
    if (dyingCells.has(y * maxCells + x)) {
      ctxt.globalAlpha = transparencyColor;
    }
    ctxt.fillText(character, x * 7.16, y * 15 + 12);
    ctxt.globalAlpha = 1;
  }
  for (const { x, y, character, color, parent } of newBornCells) {
    ctxt.fillStyle = color!;
    const newX = (x - parent!.x) * frameProgress + parent!.x;
    const newY = (y - parent!.y) * frameProgress + parent!.y;
    ctxt.fillText(character!, newX * 7.16, newY * 15 + 12);
  }
};
playGame();
