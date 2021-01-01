const guy4Animations = {
  idle: "guy4idle",
  avoid: "guy4Avoid",
  idleAfter: "guy4IdleAfter",
};

interface IGuy4 extends AnimCharacter {}

class Guy4 implements IGuy4 {
  image: IGuy4["image"];

  constructor() {
    this.image = document.getElementById("guy4-png") as HTMLImageElement;
  }

  animState: IGuy4["animState"] = {
    animation: guy4Animations.idle,
    frame: 0,
    reverse: false,
    nextAnimation: [],
  };
  position: IGuy4["position"] = {
    x: 0,
    y: 0,
  };
  size: IGuy4["size"] = {
    w: 64,
    h: 64,
  };
  setPosition({ fourthGuyWall: { top } }: Walls, { thirdGuy }: Characters) {
    this.position.x = thirdGuy.position.x - 10;
    this.position.y = top - 59;
  }

  framePositions: IGuy4["framePositions"] = {
    guy4Avoid: [
      [0, 0],
      [65, 0],
      [130, 0],
      [0, 65],
      [65, 65],
      [0, 130],
      [65, 130],
      [130, 65],
      [130, 130],
      [195, 0],
      [195, 65],
      [260, 0],
      [195, 130],
      [260, 65],
      [325, 0],
      [325, 65],
      [260, 130],
      [325, 130],
      [0, 195],
      [65, 195],
      [0, 260],
    ],
    guy4idle: [
      [130, 195],
      [65, 260],
      [195, 195],
      [130, 260],
    ],
    guy4IdleAfter: [
      [195, 260],
      [260, 195],
      [325, 195],
      [260, 260],
    ],
  };
  batonPosition: IGuy4["batonPosition"] = {};
}
