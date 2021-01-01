interface Walls {
  firstGuyWall: Wall;
  secondGuyWall: Wall;
  thirdGuyWall: Wall;
  fourthGuyWall: Wall;
  fifthGuyWall: Wall;
  sixthGuyWall: Wall;
}

type WallElements = {
  [P in keyof Walls]: HTMLElement;
};
