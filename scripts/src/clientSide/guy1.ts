const guy1Animations = {
  drop: "guy1Drop",
  idle: "guy1Idle",
  tossIdle: "tossIdle",
  lookArrow: "guy1LookArrow",
  lookArrowShrink: "guy1LookArrowShrink",
};

const getGuy1Image = () =>
  document.getElementById("guy1-png") as HTMLImageElement;

const guy1FramePositions: AnimCharacterFramePositions = {
  guy1Drop: [
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
    [390, 0],
    [325, 65],
    [260, 130],
    [325, 130],
    [390, 65],
    [390, 130],
    [0, 195],
    [0, 260],
    [65, 195],
    [65, 260],
  ],
  guy1Idle: [
    [0, 325],
    [130, 195],
    [65, 325],
    [195, 195],
    [130, 260],
    [260, 195],
    [195, 260],
    [130, 325],
    [195, 325],
    [325, 195],
    [260, 260],
    [325, 260],
    [260, 325],
  ],
  guy1LookArrow: [
    [390, 195],
    [390, 260],
    [325, 325],
    [390, 325],
  ],
  guy1LookArrowShrink: [
    [455, 0],
    [455, 65],
    [520, 0],
    [455, 130],
    [585, 0],
    [520, 65],
    [585, 65],
  ],
  tossIdle: [
    [520, 130],
    [455, 195],
    [650, 0],
    [585, 130],
    [520, 195],
    [455, 260],
    [650, 65],
    [455, 325],
    [650, 130],
    [585, 195],
    [520, 260],
    [650, 195],
    [585, 260],
    [520, 325],
    [585, 325],
    [650, 260],
    [650, 325],
  ],
};

interface IGuy1 extends AnimCharacter {
  /**
   * How long we have been holding
   * the drop animation while waiting for
   * the user to scroll up to the view.
   */
  animationHoldTime: number;
}

class Guy1 implements IGuy1 {
  image: IGuy1["image"];
  constructor() {
    this.image = getGuy1Image();
  }

  animState: IGuy1["animState"] = {
    animation: guy1Animations.tossIdle,
    frame: 0,
    reverse: false,
    nextAnimation: [],
  };
  position: IGuy1["position"] = {
    x: 0,
    y: 0,
  };
  size: IGuy1["size"] = {
    w: 64,
    h: 64,
  };
  animationHoldTime: IGuy1["animationHoldTime"] = 0;

  setPosition({ firstGuyWall: { right, top } }: Walls) {
    this.position.x = right - 50;
    this.position.y = top - 59;
  }
  framePositions: IGuy1["framePositions"] = guy1FramePositions;

  batonPosition: IGuy1["batonPosition"] = {
    tossIdle: {
      0: {
        zRotation: -0.023361653089523315,
        y: 24.06517381094844,
        x: 21.935524737248656,
      },
      1: {
        zRotation: -0.010460142977535725,
        y: 22.72480748911373,
        x: 22.291760137172346,
      },
      2: {
        zRotation: 0.044911667704582214,
        y: 19.060666735706434,
        x: 24.9889751913769,
      },
      3: {
        zRotation: 0.05001365765929222,
        y: 14.429600283096397,
        x: 28.958461094423722,
      },
      4: {
        zRotation: 0.05068837106227875,
        y: 14.91815252251964,
        x: 32.98901602739845,
      },
      5: {
        zRotation: 0.057581573724746704,
        y: 19.009775964288764,
        x: 36.71422581073365,
      },
      6: {
        zRotation: 0.11654308438301086,
        y: 19.681534772362216,
        x: 39.218055516644256,
      },
      7: {
        zRotation: 0.14932450652122498,
        y: 20.84184686212592,
        x: 41.66081671376046,
      },
      8: {
        zRotation: 0.15907184779644012,
        y: 20.4754337248255,
        x: 43.3707495517418,
      },
      9: {
        zRotation: 0.13688893616199493,
        y: 18.704432378049756,
        x: 43.3096810429474,
      },
      10: {
        zRotation: 0.07757002115249634,
        y: 15.956326552427532,
        x: 41.17226655887124,
      },
      11: {
        zRotation: 0.05079180374741554,
        y: 13.513564313044315,
        x: 36.469952817823064,
      },
      12: {
        zRotation: 0.05894042178988457,
        y: 13.69676983942751,
        x: 31.27908631621814,
      },
      13: {
        zRotation: 0.0772642195224762,
        y: 15.895254916832096,
        x: 26.454634515314154,
      },
      14: {
        zRotation: -0.020530100911855698,
        y: 19.07084343081615,
        x: 24.68363316853841,
      },
      15: {
        zRotation: -0.059051234275102615,
        y: 22.612846124367636,
        x: 22.729424731978952,
      },
      16: {
        zRotation: -0.02401825785636902,
        y: 24.07850284263736,
        x: 21.69125174433807,
      },
    },
    guy1Drop: {
      0: {
        zRotation: 0.16528819501399994,
        y: 13.89730618169399,
        x: 24.1879012727998,
      },
      1: {
        zRotation: 0.20386040210723877,
        y: 10.872686917664575,
        x: 23.351304288770333,
      },
      2: {
        zRotation: 0.2533254325389862,
        y: 7.976775122470544,
        x: 22.96518240339769,
      },
      3: {
        zRotation: 0.2716540992259979,
        y: 5.981813524590165,
        x: 22.450353570323173,
      },
      4: {
        zRotation: 0.2937687635421753,
        y: 4.95215585844113,
        x: 22.450353570323173,
      },
      5: {
        zRotation: 0.2937687635421753,
        y: 4.759094655188056,
        x: 22.06423220608404,
      },
      6: {
        zRotation: 0.3069930374622345,
        y: 5.788752321337091,
        x: 22.257293409337112,
      },
      7: {
        zRotation: 0.34152111411094666,
        y: 9.392553110591702,
        x: 22.321647143754802,
      },
      8: {
        zRotation: 0.3909189701080322,
        y: 15.634851799636591,
        x: 22.83647597682932,
      },
      9: {
        zRotation: 0.47766628861427307,
        y: 23.743404617726476,
        x: 23.54436601315691,
      },
      10: {
        zRotation: 0.630596399307251,
        y: 35.97058783984575,
        x: 23.54436601315691,
      },
    },
  };
}

interface IGuy1Look extends AnimCharacter {}

class Guy1Look implements IGuy1Look {
  image: IGuy1Look["image"];
  constructor() {
    this.image = getGuy1Image();
  }

  animState: IGuy1Look["animState"] = {
    animation: guy1Animations.lookArrow,
    frame: 0,
    reverse: false,
    nextAnimation: [],
  };
  position: IGuy1Look["position"] = {
    x: 0,
    y: 0,
  };
  size: IGuy1Look["size"] = {
    w: 64,
    h: 64,
  };
  hide: IGuy1Look["hide"] = true;
  setPosition(
    _walls: Walls,
    {
      firstGuy: {
        position: { x, y },
      },
    }: Characters
  ) {
    this.position.x = x;
    /**
     * should always be at the top of the screen,
     * or stuck to the bottom of guy1
     */
    this.position.y = Math.max(60, y + 64);
  }
  framePositions: IGuy1Look["framePositions"] = guy1FramePositions;
  batonPosition: IGuy1Look["batonPosition"] = {};
}
