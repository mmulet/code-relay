const guy6CrowdAnimations = {
  idle: "guy6CrowdIdle",
  stand: "guy6CrowdStand",
  standIdle: "guy6CrowdIStanddle",
  finishLine: "guy6FinishLine",
};


const getCrowdImage = () =>  document.getElementById("guy6Crowd-png") as HTMLImageElement;

const crowdFrameSize = {
  w: 74,
  h: 61,
};

const crowdFramePositions: AnimCharacterFramePositions = {
  guy6CrowdIdle: [
    [0, 194],
    [75, 194],
    [150, 194],
    [194, 0],
  ],
  guy6CrowdIStanddle: [
    [194, 62],
    [269, 0],
    [194, 124],
    [269, 62],
  ],
  guy6CrowdStand: [
    [344, 0],
    [269, 124],
    [344, 62],
    [225, 186],
    [344, 124],
    [300, 186],
    [0, 256],
    [0, 318],
    [75, 256],
    [75, 318],
    [150, 256],
    [150, 318],
    [225, 248],
    [225, 310],
  ],
};

interface ICrowdLeft extends AnimCharacter {}

class Guy6CrowdLeft implements ICrowdLeft  {
  image: ICrowdLeft["image"] 

  constructor(){
    this.image = getCrowdImage()
  }

  animState: ICrowdLeft["animState"]  = {
    animation: guy6CrowdAnimations.idle,
    frame: 0,
    reverse: false,
    nextAnimation: [],
  }
  position:ICrowdLeft["position"]  = {
    x: 0,
    y: 0,
  }
  size:ICrowdLeft["size"]  = crowdFrameSize
  setPosition (
   
    _walls : Walls,
    {
      sixthGuy: {
        position: { x, y },
      },
    } : Characters
  )  {
    this.position.x = x - 90;
  this.position.y = y - 1;
  }
  framePositions: ICrowdLeft["framePositions"]  =crowdFramePositions
  batonPosition:ICrowdLeft["batonPosition"]  = {}
};

interface ICrowdRight extends AnimCharacter {}

class Guy6CrowdRight implements ICrowdRight  {
  image: ICrowdRight["image"]

  framePositions: ICrowdRight["framePositions"]

  constructor(){
    const crowdImage = getCrowdImage()

    const canvas = document.createElement("canvas");
    canvas.width = crowdImage.width;
    canvas.height = crowdImage.height;
  
    const context = canvas.getContext("2d")!;
    context.scale(-1, 1);
    context.drawImage(crowdImage, -canvas.width, 0);
    this.image = canvas

    const out: AnimCharacterFramePositions = {};
    const width = crowdImage.width;
    for (const [key, value] of Object.entries(crowdFramePositions)) {
      out[key] = value.map(([x, y]) => [width - x - crowdFrameSize.w, y]);
    }
    this.framePositions = out

  }

  animState: ICrowdRight["animState"] = {
    animation: guy6CrowdAnimations.idle,
    frame: 0,
    reverse: false,
    nextAnimation: [],
  }
  position:ICrowdRight["position"] = {
    x: 0,
    y: 0,
  }
  size:ICrowdRight["size"] = crowdFrameSize
  setPosition (

    _walls : Walls,
    {
      sixthGuy: {
        position: { x, y },
      },
    } : Characters
  )  {
    this.position.x = x + 90;
    this.position.y = y - 1;
  }
  batonPosition: ICrowdRight["batonPosition"] ={}
};


interface IFinishLine extends AnimCharacter {}

class Guy6FinishLine implements IFinishLine  {
  image: IFinishLine["image"]

  constructor(){
    this.image = getCrowdImage()
  }

  animState: IFinishLine["animState"] =  {
    animation: guy6CrowdAnimations.finishLine,
    frame: 0,
    reverse: false,
    nextAnimation: [],
  }
  position:IFinishLine["position"] =  {
    x: 0,
    y: 0,
  }
  size:IFinishLine["size"] = {
    w: 96,
    h: 96,
  }
  setPosition (
  
    _walls : Walls,
    {
      sixthGuy: {
        position: { x, y },
      },
    } : Characters
  )  {
    this.position.x = x - 10;
    this.position.y = y - 32;
  }
  framePositions:IFinishLine["framePositions"] =  {
    guy6FinishLine: [
      [0, 0],
      [97, 0],
      [0, 97],
      [97, 97],
    ],
  }
  batonPosition:IFinishLine["batonPosition"] =  {}
};
