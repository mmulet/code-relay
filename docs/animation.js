"use strict";

  
/**
   * Hello! Here is the code un-minified so,
   * you can play around with it. 
   * 
   * To the Attention of Contributors:
   * This file is generated. Do not modify by hand.
   * Modify ./scripts/src/fileGenerators/animationJS
   */ 

  "use strict";
const createAllArmSegments = (guy, armDestination) => {
    const armGrownInput = {
        armPosition: {
            x: -10,
            y: -10,
        },
        radius: 100,
        lastGrowthWasBendy: true,
        armDirection: "up",
        armDestination,
    };
    for (let i = 0; i < 5000; i++) {
        if (nextArmGrowthState(guy, armGrownInput)) {
            break;
        }
    }
};
const nextArmGrowthState = (guy, armGrowthInput) => {
    const armSegments = guy;
    const { armDirection, armDestination, lastGrowthWasBendy, radius, armPosition, } = armGrowthInput;
    if (armPosition.x > armDestination.x - 7.5 &&
        armPosition.x < armDestination.x + 7.5 &&
        armPosition.y > armDestination.y - 7.5 &&
        armPosition.y < armDestination.y + 7.5) {
        return true;
    }
    const lastFrame = armSegments.length <= 0 ? 0 : armSegments[armSegments.length - 1].frame;
    const nextFrame = lastFrame == 3 ? 0 : lastFrame + 1;
    const curveChance = 0.2;
    const radiusShrinkFactor = 20;
    switch (armDirection) {
        case "up":
            if (armPosition.y > armDestination.y - radius || lastGrowthWasBendy) {
                if (Math.random() < curveChance) {
                    const count = Math.floor(Math.random() * 3) + 1;
                    if (Math.random() < 0.5) {
                        fromUpToRight(guy, nextFrame, armGrowthInput);
                        for (let i = 0; i < count; i++) {
                            fromRightToRight(guy, nextFrame, armGrowthInput);
                        }
                        fromRightToUp(guy, nextFrame, armGrowthInput);
                        return;
                    }
                    fromUpToLeft(guy, nextFrame, armGrowthInput);
                    for (let i = 0; i < count; i++) {
                        fromLeftToLeft(guy, nextFrame, armGrowthInput);
                    }
                    fromLeftToUp(guy, nextFrame, armGrowthInput);
                    return;
                }
                fromUpToUp(guy, nextFrame, armGrowthInput);
                return;
            }
            armGrowthInput.radius = Math.max(0, radius - radiusShrinkFactor);
            if (armDestination.x > armPosition.x) {
                fromUpToRight(guy, nextFrame, armGrowthInput);
                return;
            }
            fromUpToLeft(guy, nextFrame, armGrowthInput);
            return;
        case "down":
            if (armPosition.y < armDestination.y + radius || lastGrowthWasBendy) {
                if (Math.random() < curveChance) {
                    const count = Math.floor(Math.random() * 3) + 1;
                    if (Math.random() < 0.5) {
                        fromDownToRight(guy, nextFrame, armGrowthInput);
                        for (let i = 0; i < count; i++) {
                            fromRightToRight(guy, nextFrame, armGrowthInput);
                        }
                        fromRightToDown(guy, nextFrame, armGrowthInput);
                        return;
                    }
                    fromDownToLeft(guy, nextFrame, armGrowthInput);
                    for (let i = 0; i < count; i++) {
                        fromLeftToLeft(guy, nextFrame, armGrowthInput);
                    }
                    fromLeftToDown(guy, nextFrame, armGrowthInput);
                    return;
                }
                fromDownToDown(guy, nextFrame, armGrowthInput);
                return;
            }
            armGrowthInput.radius = Math.max(0, radius - radiusShrinkFactor);
            if (armDestination.x > armPosition.x) {
                fromDownToRight(guy, nextFrame, armGrowthInput);
                return;
            }
            fromDownToLeft(guy, nextFrame, armGrowthInput);
            return;
        case "right":
            if (armPosition.x < armDestination.x + radius || lastGrowthWasBendy) {
                if (Math.random() < curveChance) {
                    const count = Math.floor(Math.random() * 3) + 1;
                    if (Math.random() < 0.5) {
                        fromRightToDown(guy, nextFrame, armGrowthInput);
                        for (let i = 0; i < count; i++) {
                            fromDownToDown(guy, nextFrame, armGrowthInput);
                        }
                        fromDownToRight(guy, nextFrame, armGrowthInput);
                        return;
                    }
                    fromRightToUp(guy, nextFrame, armGrowthInput);
                    for (let i = 0; i < count; i++) {
                        fromUpToUp(guy, nextFrame, armGrowthInput);
                    }
                    fromUpToRight(guy, nextFrame, armGrowthInput);
                    return;
                }
                fromRightToRight(guy, nextFrame, armGrowthInput);
                return;
            }
            armGrowthInput.radius = Math.max(0, radius - radiusShrinkFactor);
            if (armDestination.y > armPosition.y) {
                fromRightToDown(guy, nextFrame, armGrowthInput);
                return;
            }
            fromRightToUp(guy, nextFrame, armGrowthInput);
            return;
        case "left":
            if (armPosition.x > armDestination.x - radius || lastGrowthWasBendy) {
                if (Math.random() < curveChance) {
                    const count = Math.floor(Math.random() * 3) + 1;
                    if (Math.random() < 0.5) {
                        fromLeftToDown(guy, nextFrame, armGrowthInput);
                        for (let i = 0; i < count; i++) {
                            fromDownToDown(guy, nextFrame, armGrowthInput);
                        }
                        fromDownToLeft(guy, nextFrame, armGrowthInput);
                        return;
                    }
                    fromLeftToUp(guy, nextFrame, armGrowthInput);
                    for (let i = 0; i < count; i++) {
                        fromUpToUp(guy, nextFrame, armGrowthInput);
                    }
                    fromUpToLeft(guy, nextFrame, armGrowthInput);
                    return;
                }
                fromLeftToLeft(guy, nextFrame, armGrowthInput);
                return;
            }
            armGrowthInput.radius = Math.max(0, radius - radiusShrinkFactor);
            if (armDestination.y > armPosition.y) {
                fromLeftToDown(guy, nextFrame, armGrowthInput);
                return;
            }
            fromLeftToUp(guy, nextFrame, armGrowthInput);
            return;
    }
};
const setBatonPositionToLastArmSegment = (baton, armSegments, drawFrame) => {
    const { position: { x, y }, type, } = armSegments[Math.floor(drawFrame)];
    baton.position.x = x + 32;
    baton.position.y = y + 32;
    switch (type) {
        case guy3ArmSegmentType.horizontal:
            baton.position.zRotation = 0;
            break;
        case guy3ArmSegmentType.vertical:
            baton.position.zRotation = -Math.PI / 2;
            break;
        case guy3ArmSegmentType.leftDown:
            baton.position.zRotation = Math.PI / 4;
            break;
        case guy3ArmSegmentType.leftUp:
            baton.position.zRotation = -Math.PI / 4;
            break;
        case guy3ArmSegmentType.rightDown:
            baton.position.zRotation = -Math.PI / 4;
            break;
        case guy3ArmSegmentType.rightUp:
            baton.position.zRotation = Math.PI / 4;
            break;
    }
};
const fromUpToUp = (armSegments, nextFrame, armGrowthInput) => {
    const { armPosition } = armGrowthInput;
    armSegments.push({
        type: guy3ArmSegmentType.vertical,
        position: {
            x: armPosition.x,
            y: armPosition.y - 5,
        },
        frame: nextFrame,
    });
    armGrowthInput.lastGrowthWasBendy = false;
    armPosition.y -= 5;
};
const fromDownToDown = (armSegments, nextFrame, armGrowthInput) => {
    const { armPosition } = armGrowthInput;
    armSegments.push({
        type: guy3ArmSegmentType.vertical,
        position: {
            x: armPosition.x,
            y: armPosition.y + 5,
        },
        frame: nextFrame,
    });
    armGrowthInput.lastGrowthWasBendy = false;
    armPosition.y += 5;
};
const fromRightToRight = (armSegments, nextFrame, armGrowthInput) => {
    const { armPosition } = armGrowthInput;
    armSegments.push({
        type: guy3ArmSegmentType.horizontal,
        position: {
            x: armPosition.x + 5,
            y: armPosition.y,
        },
        frame: nextFrame,
    });
    armGrowthInput.lastGrowthWasBendy = false;
    armPosition.x += 5;
};
const fromLeftToLeft = (armSegments, nextFrame, armGrowthInput) => {
    const { armPosition } = armGrowthInput;
    armSegments.push({
        type: guy3ArmSegmentType.horizontal,
        position: {
            x: armPosition.x - 5,
            y: armPosition.y,
        },
        frame: nextFrame,
    });
    armGrowthInput.lastGrowthWasBendy = false;
    armPosition.x -= 5;
};
const fromUpToRight = (armSegments, nextFrame, armGrowthInput) => {
    const { armPosition } = armGrowthInput;
    armSegments.push({
        type: guy3ArmSegmentType.leftDown,
        position: {
            x: armPosition.x + 5,
            y: armPosition.y - 5,
        },
        frame: nextFrame,
    });
    armGrowthInput.armDirection = "right";
    armPosition.y -= 5;
    armPosition.x += 5;
    armGrowthInput.lastGrowthWasBendy = true;
};
const fromUpToLeft = (armSegments, nextFrame, armGrowthInput) => {
    const { armPosition } = armGrowthInput;
    armSegments.push({
        type: guy3ArmSegmentType.rightDown,
        position: {
            x: armPosition.x - 5,
            y: armPosition.y - 5,
        },
        frame: nextFrame,
    });
    armGrowthInput.armDirection = "left";
    armPosition.y -= 5;
    armPosition.x -= 5;
    armGrowthInput.lastGrowthWasBendy = true;
};
const fromDownToRight = (armSegments, nextFrame, armGrowthInput) => {
    const { armPosition } = armGrowthInput;
    armSegments.push({
        type: guy3ArmSegmentType.leftUp,
        position: {
            x: armPosition.x + 5,
            y: armPosition.y + 5,
        },
        frame: nextFrame,
    });
    armGrowthInput.armDirection = "right";
    armPosition.x += 5;
    armPosition.y += 5;
    armGrowthInput.lastGrowthWasBendy = true;
};
const fromDownToLeft = (armSegments, nextFrame, armGrowthInput) => {
    const { armPosition } = armGrowthInput;
    armSegments.push({
        type: guy3ArmSegmentType.rightUp,
        position: {
            x: armPosition.x - 5,
            y: armPosition.y + 5,
        },
        frame: nextFrame,
    });
    armGrowthInput.armDirection = "left";
    armPosition.x -= 5;
    armPosition.y += 5;
    armGrowthInput.lastGrowthWasBendy = true;
};
const fromRightToDown = (armSegments, nextFrame, armGrowthInput) => {
    const { armPosition } = armGrowthInput;
    armSegments.push({
        type: guy3ArmSegmentType.rightDown,
        position: {
            x: armPosition.x + 5,
            y: armPosition.y,
        },
        frame: nextFrame,
    });
    armGrowthInput.armDirection = "down";
    armPosition.x += 10;
    armGrowthInput.lastGrowthWasBendy = true;
};
const fromRightToUp = (armSegments, nextFrame, armGrowthInput) => {
    const { armPosition } = armGrowthInput;
    armSegments.push({
        type: guy3ArmSegmentType.rightUp,
        position: {
            x: armPosition.x + 5,
            y: armPosition.y,
        },
        frame: nextFrame,
    });
    armGrowthInput.armDirection = "up";
    armPosition.x += 10;
    armGrowthInput.lastGrowthWasBendy = true;
};
const fromLeftToDown = (armSegments, nextFrame, armGrowthInput) => {
    const { armPosition } = armGrowthInput;
    armSegments.push({
        type: guy3ArmSegmentType.leftDown,
        position: {
            x: armPosition.x - 5,
            y: armPosition.y,
        },
        frame: nextFrame,
    });
    armGrowthInput.armDirection = "down";
    armGrowthInput.lastGrowthWasBendy = true;
    armPosition.x -= 10;
};
const fromLeftToUp = (armSegments, nextFrame, armGrowthInput) => {
    const { armPosition } = armGrowthInput;
    armSegments.push({
        type: guy3ArmSegmentType.leftUp,
        position: {
            x: armPosition.x + 5,
            y: armPosition.y,
        },
        frame: nextFrame,
    });
    armPosition.x += 0;
    armGrowthInput.armDirection = "up";
    armGrowthInput.lastGrowthWasBendy = true;
};

  "use strict";
const guy1Animations = {
    drop: "guy1Drop",
    idle: "guy1Idle",
    tossIdle: "tossIdle",
    lookArrow: "guy1LookArrow",
    lookArrowShrink: "guy1LookArrowShrink",
};
const getGuy1Image = () => document.getElementById("guy1-png");
const guy1FramePositions = {
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
class Guy1 {
    constructor() {
        this.animState = {
            animation: guy1Animations.tossIdle,
            frame: 0,
            reverse: false,
            nextAnimation: [],
        };
        this.position = {
            x: 0,
            y: 0,
        };
        this.size = {
            w: 64,
            h: 64,
        };
        this.animationHoldTime = 0;
        this.framePositions = guy1FramePositions;
        this.batonPosition = {
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
        this.image = getGuy1Image();
    }
    setPosition({ firstGuyWall: { right, top } }) {
        this.position.x = right - 50;
        this.position.y = top - 59;
    }
}
class Guy1Look {
    constructor() {
        this.animState = {
            animation: guy1Animations.lookArrow,
            frame: 0,
            reverse: false,
            nextAnimation: [],
        };
        this.position = {
            x: 0,
            y: 0,
        };
        this.size = {
            w: 64,
            h: 64,
        };
        this.hide = true;
        this.framePositions = guy1FramePositions;
        this.batonPosition = {};
        this.image = getGuy1Image();
    }
    setPosition(_walls, { firstGuy: { position: { x, y }, }, }) {
        this.position.x = x;
        this.position.y = Math.max(60, y + 64);
    }
}

  "use strict";
const guy2Animations = {
    drop: "guy2Drop",
    idle: "guy2Idle",
    batonIdle: "guy2BatonIdle",
    grab: "guy2Grab",
    idleAfter: "guy2IdleAfter",
};
class Guy2 {
    constructor() {
        this.animState = {
            animation: guy2Animations.idle,
            frame: 0,
            reverse: false,
            nextAnimation: [],
        };
        this.position = {
            x: 0,
            y: 0,
        };
        this.size = {
            w: 64,
            h: 64,
        };
        this.framePositions = {
            guy2BatonIdle: [
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
            ],
            guy2Drop: [
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
                [390, 195],
                [390, 260],
                [325, 325],
                [390, 325],
                [455, 0],
            ],
            guy2Grab: [
                [455, 65],
                [520, 0],
                [455, 130],
                [585, 0],
                [520, 65],
                [585, 65],
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
            ],
            guy2Idle: [
                [520, 260],
                [650, 195],
                [585, 260],
            ],
            guy2IdleAfter: [
                [520, 325],
                [585, 325],
                [650, 260],
            ],
        };
        this.batonPosition = {
            guy2BatonIdle: {
                0: {
                    zRotation: 1.3168060779571533,
                    y: 6.436556706663039,
                    x: 29.58370013836303,
                },
                1: {
                    zRotation: 1.4242933988571167,
                    y: 7.337506903976691,
                    x: 30.291589653557114,
                },
                2: {
                    zRotation: 1.441925287246704,
                    y: 10.823327236488218,
                    x: 30.55972964906953,
                },
                3: {
                    zRotation: 1.340282678604126,
                    y: 15.757102424329748,
                    x: 30.55972964906953,
                },
                4: {
                    zRotation: 1.1969419717788696,
                    y: 19.99371354566897,
                    x: 30.881497669741105,
                },
                5: {
                    zRotation: 1.1969419717788696,
                    y: 22.085205745175887,
                    x: 31.73954568143751,
                },
                6: {
                    zRotation: 1.1969419717788696,
                    y: 21.97795021599108,
                    x: 32.16856968728571,
                },
                7: {
                    zRotation: 1.220341682434082,
                    y: 21.33441391408118,
                    x: 32.86573368864633,
                },
                8: {
                    zRotation: 1.4085148572921753,
                    y: 19.5110615798033,
                    x: 32.86573368864633,
                },
                9: {
                    zRotation: 1.5533807277679443,
                    y: 15.757101382062736,
                    x: 32.919361713805486,
                },
                10: {
                    zRotation: 1.553730845451355,
                    y: 10.018905556267077,
                    x: 31.846801731755825,
                },
                11: {
                    zRotation: 1.3804703950881958,
                    y: 7.71290229839054,
                    x: 31.739545730293774,
                },
            },
            guy2Grab: {
                11: {
                    zRotation: 1.5765657424926758,
                    y: 2.639694714155355,
                    x: 27.71744574875128,
                },
                12: {
                    zRotation: 1.5364232063293457,
                    y: 3.1545225049628596,
                    x: 27.97486016528854,
                },
                13: {
                    zRotation: 1.5122309923171997,
                    y: 4.44159510878266,
                    x: 28.489688998363057,
                },
                14: {
                    zRotation: 1.4695241451263428,
                    y: 6.372202972245348,
                    x: 28.425335263945367,
                },
                15: {
                    zRotation: 1.2912875413894653,
                    y: 7.273153169559,
                    x: 28.875810623168945,
                },
            },
            guy2Drop: {
                0: {
                    zRotation: 1.3646795749664307,
                    y: 5.793019362486127,
                    x: 32.415258720272874,
                },
                1: {
                    zRotation: 1.3168060779571533,
                    y: 6.693969559799779,
                    x: 33.63797706854148,
                },
                2: {
                    zRotation: 1.3570064306259155,
                    y: 4.505946758666326,
                    x: 35.63293866642186,
                },
                3: {
                    zRotation: 1.3860340118408203,
                    y: 5.020774549473831,
                    x: 35.24681704161597,
                },
                4: {
                    zRotation: 1.5532728433609009,
                    y: 7.594917672579407,
                    x: 36.21212097334732,
                },
                5: {
                    zRotation: 1.5846575498580933,
                    y: 10.040355411383624,
                    x: 39.36544770621211,
                },
                6: {
                    zRotation: 1.9231297969818115,
                    y: 11.198720546368042,
                    x: 41.16734810083942,
                },
                7: {
                    zRotation: 1.9723323583602905,
                    y: 12.099670743681695,
                    x: 41.810884402749316,
                },
                8: {
                    zRotation: 1.8482228517532349,
                    y: 10.876951874279586,
                    x: 40.588166054480716,
                },
                9: {
                    zRotation: 1.6204777956008911,
                    y: 12.6144985344892,
                    x: 37.69225373815318,
                },
                10: {
                    zRotation: 1.128331184387207,
                    y: 15.124288965444096,
                    x: 32.80138034507876,
                },
                11: {
                    zRotation: 0.6471081376075745,
                    y: 20.529991191593023,
                    x: 26.81649555143763,
                },
                12: {
                    zRotation: 0.3215424716472626,
                    y: 27.415825140280802,
                    x: 20.83161075779649,
                },
                13: {
                    zRotation: -0.012283689342439175,
                    y: 35.46002448451975,
                    x: 14.010129501259392,
                },
                14: {
                    zRotation: -0.4242221415042877,
                    y: 48.073328028611144,
                    x: 8.21830591087133,
                },
            },
        };
        this.image = document.getElementById("guy2-png");
    }
    setPosition({ secondGuyWall: { right, top } }) {
        this.position.x = right - 50;
        this.position.y = top - 59;
    }
}

  "use strict";
const guy3Animations = {
    drop: "guy3Drop",
    idle: "guy3Idle",
    grab: "guy3Grab",
    grabIdle: "guy3GrabIdle",
    idleAfter: "guy3IdleAfter",
};
const guy3ArmSegmentType = {
    horizontal: "guy3grabArmHorizontal",
    vertical: "guy3grabArmVertical",
    leftDown: "guy3grabArmHorizontalLeftDown",
    leftUp: "guy3grabArmHorizontalLeftUp",
    rightDown: "guy3grabArmHorizontalRightDown",
    rightUp: "guy3grabArmHorizontalRightUp",
};
const drawArmSegments = (armSegments, armSegmentsDrawFrame, image, framePositions, { position: { x: cx, y: cy }, drawArmSegments }, context) => {
    if (!drawArmSegments || armSegments.length <= 0) {
        return;
    }
    if (!armSegments) {
        debugger;
    }
    context.translate(cx, cy);
    for (let i = 0; i < Math.floor(armSegmentsDrawFrame); i++) {
        const { frame, type, position: { x, y }, } = armSegments[i];
        const [sx, sy] = framePositions[type][frame];
        context.drawImage(image, sx, sy, 64, 64, x, y, 64, 64);
    }
    context.translate(-cx, -cy);
};
const nextArmAnimationFrame = (guy) => {
    for (const arm of guy.armSegments) {
        arm.frame++;
        if (arm.frame >= 4) {
            arm.frame = 0;
        }
    }
};
class Guy3 {
    constructor() {
        this.armSegments = [];
        this.armSegmentsDrawFrame = 0;
        this.drawArmSegments = false;
        this.animState = {
            animation: guy3Animations.idle,
            frame: 0,
            reverse: false,
            nextAnimation: [],
        };
        this.armDrawFramesPerSecond = 1;
        this.position = {
            x: 0,
            y: 0,
        };
        this.size = {
            w: 64,
            h: 64,
        };
        this.framePositions = {
            guy3Drop: [
                [0, 0],
                [65, 0],
                [130, 0],
                [0, 65],
                [65, 65],
                [0, 130],
                [65, 130],
                [130, 65],
            ],
            guy3Grab: [
                [130, 130],
                [195, 0],
                [195, 65],
                [260, 0],
                [195, 130],
                [260, 65],
                [325, 0],
                [390, 0],
                [325, 65],
            ],
            guy3grabArmHorizontal: [
                [260, 130],
                [325, 130],
                [390, 65],
                [390, 130],
            ],
            guy3grabArmHorizontalLeftDown: [
                [0, 195],
                [0, 260],
                [65, 195],
                [65, 260],
            ],
            guy3grabArmHorizontalLeftUp: [
                [0, 325],
                [130, 195],
                [65, 325],
                [0, 390],
            ],
            guy3grabArmHorizontalRightDown: [
                [195, 195],
                [130, 260],
                [130, 325],
                [260, 195],
            ],
            guy3grabArmHorizontalRightUp: [
                [65, 390],
                [195, 260],
                [130, 390],
                [260, 260],
            ],
            guy3grabArmVertical: [
                [195, 325],
                [325, 195],
                [260, 325],
                [195, 390],
            ],
            guy3GrabIdle: [
                [390, 195],
                [325, 260],
                [390, 260],
            ],
            guy3Idle: [
                [325, 325],
                [260, 390],
                [325, 390],
            ],
            guy3IdleAfter: [
                [390, 325],
                [390, 390],
                [455, 0],
            ],
        };
        this.batonPosition = {
            guy3GrabIdle: {
                0: {
                    zRotation: 1.436052918434143,
                    y: 18.470164106191834,
                    x: 21.07255058080121,
                },
                1: {
                    zRotation: 1.436052918434143,
                    y: 18.470164106191834,
                    x: 21.07255058080121,
                },
                2: {
                    zRotation: 1.436052918434143,
                    y: 18.470164106191834,
                    x: 21.07255058080121,
                },
            },
            guy3Drop: {
                0: {
                    zRotation: 1.436052918434143,
                    y: 18.470164106191834,
                    x: 21.07255058080121,
                },
                1: {
                    zRotation: 1.5090703964233398,
                    y: 19.80460044985912,
                    x: 21.517362000512296,
                },
                2: {
                    zRotation: 1.5377225875854492,
                    y: 23.251893382254845,
                    x: 21.962173420223383,
                },
                3: {
                    zRotation: 1.5749279260635376,
                    y: 28.58963823579048,
                    x: 21.962173420223383,
                },
                4: {
                    zRotation: 1.621967077255249,
                    y: 35.929037604827045,
                    x: 21.850970825862365,
                },
                5: {
                    zRotation: 1.7017238140106201,
                    y: 44.26926292878031,
                    x: 22.073377056851413,
                },
                6: {
                    zRotation: 1.7546398639678955,
                    y: 53.832721480906336,
                    x: 21.850970825862365,
                },
            },
        };
        this.image = document.getElementById("guy3-png");
    }
    setPosition({ thirdGuyWall: { right, top } }) {
        this.position.x = right - 70;
        this.position.y = top - 45;
    }
}

  "use strict";
const guy4Animations = {
    idle: "guy4idle",
    avoid: "guy4Avoid",
    idleAfter: "guy4IdleAfter",
};
class Guy4 {
    constructor() {
        this.animState = {
            animation: guy4Animations.idle,
            frame: 0,
            reverse: false,
            nextAnimation: [],
        };
        this.position = {
            x: 0,
            y: 0,
        };
        this.size = {
            w: 64,
            h: 64,
        };
        this.framePositions = {
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
        this.batonPosition = {};
        this.image = document.getElementById("guy4-png");
    }
    setPosition({ fourthGuyWall: { top } }, { thirdGuy }) {
        this.position.x = thirdGuy.position.x - 10;
        this.position.y = top - 59;
    }
}

  "use strict";
const guy5Animations = {
    idle: "guy5Idle",
};
class Guy5 {
    constructor() {
        this.animState = {
            animation: guy5Animations.idle,
            frame: 0,
            reverse: false,
            nextAnimation: [],
        };
        this.lightningSegments = {
            offset: 0,
            division: 0.4,
            type: "part",
        };
        this.timeSinceLastSegmentUpdate = Number.POSITIVE_INFINITY;
        this.throwZRotationGoal = 0;
        this.batonRadius = 0;
        this.originalRadius = 0;
        this.angularVelocity = 2;
        this.position = {
            x: 0,
            y: 0,
        };
        this.size = {
            w: 64,
            h: 64,
        };
        this.framePositions = {
            guy5Idle: [
                [0, 0],
                [65, 0],
                [130, 0],
                [0, 65],
            ],
        };
        this.batonPosition = {};
        this.image = document.getElementById("guy5-png");
    }
    setPosition({ fifthGuyWall: { right, top } }) {
        this.position.x = right - 50;
        this.position.y = top - 59;
    }
}
const updateBatonOrbit = (baton, finalRadius, grow, finalVelocity, fifthGuy, timeIncrement) => {
    if ((!grow && fifthGuy.batonRadius > finalRadius) ||
        (grow && fifthGuy.batonRadius < finalRadius)) {
        fifthGuy.batonRadius +=
            (grow ? 1 : -1) *
                ((fifthGuy.originalRadius - finalRadius) / 5) *
                timeIncrement;
        baton.position.zRotation += fifthGuy.angularVelocity * timeIncrement;
        fifthGuy.angularVelocity += ((grow ? 1 : -1) * timeIncrement) / 5;
    }
    else {
        baton.position.zRotation += finalVelocity * timeIncrement;
    }
    baton.position.x =
        fifthGuy.batonRadius * -Math.cos(baton.position.zRotation) + 32;
    baton.position.y =
        fifthGuy.batonRadius * Math.sin(baton.position.zRotation) + 32;
    if (fifthGuy.timeSinceLastSegmentUpdate > 0.1) {
        fifthGuy.lightningSegments = makeLightingSegment(5);
        fifthGuy.timeSinceLastSegmentUpdate = 0;
    }
    fifthGuy.timeSinceLastSegmentUpdate += timeIncrement;
};
const makeLightingSegment = (levels) => {
    const offset = ((Math.random() > 0.5 ? -1 : 1) *
        Math.random() *
        Math.PI *
        (levels / 5) *
        0.7) /
        2;
    if (levels <= 0) {
        return {
            offset,
            division: Math.random() * 0.5 + 0.25,
            type: "part",
        };
    }
    return {
        offset,
        first: makeLightingSegment(levels - 1),
        second: makeLightingSegment(levels - 1),
        type: "more",
    };
};
const drawLighting = (source, destination, segment, context) => {
    context.beginPath();
    context.moveTo(source.x, source.y);
    const width = destination.x - source.x;
    const height = destination.y - source.y;
    let pathLength = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));
    const mainDirection1 = width == 0 ? Math.PI / 2 : Math.atan(height / width);
    const mainDirection = (height >= 0 && width < 0) || (height < 0 && width < 0)
        ? mainDirection1 + Math.PI
        : mainDirection1;
    let linePosition = {
        x: source.x,
        y: source.y,
    };
    drawLightningSegment(linePosition, segment, mainDirection, pathLength, context);
    context.lineWidth = 1;
    context.stroke();
};
const drawLightningSegment = (linePosition, segment, mainDirection, segmentLength, context) => {
    if (segment.type == "part") {
        const { offset, division } = segment;
        const angledSegmentLength = (division * segmentLength) / Math.cos(offset);
        const firstX = linePosition.x;
        const firstY = linePosition.y;
        linePosition.x += angledSegmentLength * Math.cos(mainDirection + offset);
        linePosition.y += angledSegmentLength * Math.sin(mainDirection + offset);
        context.lineTo(linePosition.x, linePosition.y);
        linePosition.x = firstX + segmentLength * Math.cos(mainDirection);
        linePosition.y = firstY + segmentLength * Math.sin(mainDirection);
        context.lineTo(linePosition.x, linePosition.y);
        return;
    }
    const angledSegmentLength = (0.5 * segmentLength) / Math.cos(segment.offset);
    drawLightningSegment(linePosition, segment.first, mainDirection + segment.offset, angledSegmentLength, context);
    drawLightningSegment(linePosition, segment.second, mainDirection - segment.offset, angledSegmentLength, context);
};

  "use strict";
const guy6CrowdAnimations = {
    idle: "guy6CrowdIdle",
    stand: "guy6CrowdStand",
    standIdle: "guy6CrowdIStanddle",
    finishLine: "guy6FinishLine",
};
const getCrowdImage = () => document.getElementById("guy6Crowd-png");
const crowdFrameSize = {
    w: 74,
    h: 61,
};
const crowdFramePositions = {
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
class Guy6CrowdLeft {
    constructor() {
        this.animState = {
            animation: guy6CrowdAnimations.idle,
            frame: 0,
            reverse: false,
            nextAnimation: [],
        };
        this.position = {
            x: 0,
            y: 0,
        };
        this.size = crowdFrameSize;
        this.framePositions = crowdFramePositions;
        this.batonPosition = {};
        this.image = getCrowdImage();
    }
    setPosition(_walls, { sixthGuy: { position: { x, y }, }, }) {
        this.position.x = x - 90;
        this.position.y = y - 1;
    }
}
;
class Guy6CrowdRight {
    constructor() {
        this.animState = {
            animation: guy6CrowdAnimations.idle,
            frame: 0,
            reverse: false,
            nextAnimation: [],
        };
        this.position = {
            x: 0,
            y: 0,
        };
        this.size = crowdFrameSize;
        this.batonPosition = {};
        const crowdImage = getCrowdImage();
        const canvas = document.createElement("canvas");
        canvas.width = crowdImage.width;
        canvas.height = crowdImage.height;
        const context = canvas.getContext("2d");
        context.scale(-1, 1);
        context.drawImage(crowdImage, -canvas.width, 0);
        this.image = canvas;
        const out = {};
        const width = crowdImage.width;
        for (const [key, value] of Object.entries(crowdFramePositions)) {
            out[key] = value.map(([x, y]) => [width - x - crowdFrameSize.w, y]);
        }
        this.framePositions = out;
    }
    setPosition(_walls, { sixthGuy: { position: { x, y }, }, }) {
        this.position.x = x + 90;
        this.position.y = y - 1;
    }
}
;
class Guy6FinishLine {
    constructor() {
        this.animState = {
            animation: guy6CrowdAnimations.finishLine,
            frame: 0,
            reverse: false,
            nextAnimation: [],
        };
        this.position = {
            x: 0,
            y: 0,
        };
        this.size = {
            w: 96,
            h: 96,
        };
        this.framePositions = {
            guy6FinishLine: [
                [0, 0],
                [97, 0],
                [0, 97],
                [97, 97],
            ],
        };
        this.batonPosition = {};
        this.image = getCrowdImage();
    }
    setPosition(_walls, { sixthGuy: { position: { x, y }, }, }) {
        this.position.x = x - 10;
        this.position.y = y - 32;
    }
}
;

  "use strict";
const guy6Animations = {
    climb: "guy6Climb",
    idle: "guy6Idle",
};
class Guy6 {
    constructor() {
        this.dirtParticles = [];
        this.confettiParticles = new Map();
        this.animState = {
            animation: guy6Animations.climb,
            frame: 0,
            reverse: false,
            nextAnimation: [],
        };
        this.generatedDirtParticleCount = 0;
        this.position = {
            x: 0,
            y: 0,
        };
        this.size = {
            w: 64,
            h: 64,
        };
        this.timeUntilNextDirtParticle = 0.1;
        this.timeSinceBatonCrashed = 0;
        this.timeUntilConfettiBurst = {
            left: 0,
            right: 0,
        };
        this.hide = true;
        this.framePositions = {
            guy6Climb: [
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
                [0, 325],
                [130, 195],
                [65, 325],
                [0, 390],
                [195, 195],
                [130, 260],
                [130, 325],
                [260, 195],
                [65, 390],
                [195, 260],
                [130, 390],
                [260, 260],
                [195, 325],
                [325, 195],
                [260, 325],
                [195, 390],
                [390, 195],
                [325, 260],
                [390, 260],
                [325, 325],
                [260, 390],
                [325, 390],
                [390, 325],
                [390, 390],
                [455, 0],
                [455, 65],
                [520, 0],
                [520, 65],
                [455, 130],
                [585, 0],
                [585, 65],
                [520, 130],
                [455, 195],
                [650, 0],
                [715, 0],
                [650, 65],
                [585, 130],
                [520, 195],
                [455, 260],
                [650, 130],
                [585, 195],
                [520, 260],
                [455, 325],
                [780, 0],
                [715, 65],
                [455, 390],
                [780, 65],
                [715, 130],
                [585, 260],
                [520, 325],
                [650, 195],
                [715, 195],
                [650, 260],
                [585, 325],
                [520, 390],
                [780, 130],
                [585, 390],
                [780, 195],
                [650, 325],
                [715, 260],
                [780, 260],
                [715, 325],
                [650, 390],
                [715, 390],
                [780, 325],
                [780, 390],
                [0, 455],
                [65, 455],
                [0, 520],
                [130, 455],
                [65, 520],
                [0, 585],
                [195, 455],
                [130, 520],
                [65, 585],
                [195, 520],
                [130, 585],
                [260, 455],
                [260, 520],
                [195, 585],
                [325, 455],
                [260, 585],
                [390, 455],
                [325, 520],
                [325, 585],
                [390, 520],
                [455, 455],
                [455, 520],
                [390, 585],
                [520, 455],
                [455, 585],
            ],
            guy6Idle: [
                [585, 455],
                [520, 520],
                [520, 585],
                [650, 455],
            ],
        };
        this.batonPosition = {
            guy6Climb: {
                0: {
                    zRotation: -1.2024732828140259,
                    y: 55.57269453872097,
                    x: 32.66970345752487,
                    yScale: 0.6120448900481402,
                },
                1: {
                    zRotation: -0.7418569326400757,
                    y: 52.56094727229551,
                    x: 32.20635756638532,
                    yScale: 0.6120448900481402,
                },
                2: {
                    zRotation: -0.4884149730205536,
                    y: 49.1630775993639,
                    x: 32.51525482714502,
                    yScale: 0.6120448900481402,
                },
                3: {
                    zRotation: -0.6846311688423157,
                    y: 47.000796708904325,
                    x: 33.364722277948765,
                    yScale: 0.6120448900481402,
                },
                4: {
                    zRotation: -1.1677531003952026,
                    y: 45.99688095342918,
                    x: 34.136965397277166,
                    yScale: 0.5834642608286971,
                },
                5: {
                    zRotation: -1.297169804573059,
                    y: 45.14741353519627,
                    x: 34.90920851660557,
                    yScale: 0.6060670493012768,
                },
                6: {
                    zRotation: -1.3673712015151978,
                    y: 45.14741353519627,
                    x: 34.90920851660557,
                    yScale: 0.6189181137893159,
                },
                7: {
                    zRotation: -1.4036921262741089,
                    y: 45.14741353519627,
                    x: 34.90920851660557,
                    yScale: 0.6253154095956835,
                },
                8: {
                    zRotation: -1.4262566566467285,
                    y: 45.14741353519627,
                    x: 34.90920851660557,
                    yScale: 0.6564918716075057,
                },
                9: {
                    zRotation: -1.4425307512283325,
                    y: 44.838515818444755,
                    x: 34.90920851660557,
                    yScale: 0.6813455436189296,
                },
                10: {
                    zRotation: -1.4538458585739136,
                    y: 44.606842791447875,
                    x: 34.90920851660557,
                    yScale: 0.7221405789003534,
                },
                11: {
                    zRotation: -1.4475769996643066,
                    y: 44.452394454205624,
                    x: 34.90920851660557,
                    yScale: 0.7455626281641298,
                },
                12: {
                    zRotation: -1.4575906991958618,
                    y: 44.452394454205624,
                    x: 34.90920851660557,
                    yScale: 0.7585568448244515,
                },
                13: {
                    zRotation: -1.408705711364746,
                    y: 44.606842791447875,
                    x: 34.90920851660557,
                    yScale: 0.7185837980044091,
                },
                14: {
                    zRotation: -1.3686140775680542,
                    y: 44.91574050819939,
                    x: 34.75475991879656,
                    yScale: 0.7046656588376579,
                },
                15: {
                    zRotation: -1.3354805707931519,
                    y: 44.91574050819939,
                    x: 34.75475991879656,
                    yScale: 0.7205260507131027,
                },
                16: {
                    zRotation: -1.0457594394683838,
                    y: 44.76129217095714,
                    x: 33.98251679946816,
                    yScale: 0.7170834783780373,
                },
                17: {
                    zRotation: -0.9833877682685852,
                    y: 44.684067481202504,
                    x: 33.59639530494565,
                    yScale: 0.703303490654897,
                },
                18: {
                    zRotation: -0.9240888953208923,
                    y: 44.684067481202504,
                    x: 33.13304938123526,
                    yScale: 0.717384481834153,
                },
                19: {
                    zRotation: -0.9084463715553284,
                    y: 44.99296519795402,
                    x: 32.592479158620364,
                    yScale: 0.7256147720045963,
                },
                20: {
                    zRotation: -0.8463501334190369,
                    y: 44.91574050819939,
                    x: 32.28358189786067,
                    yScale: 0.7125906519970652,
                },
                21: {
                    zRotation: -0.8134615421295166,
                    y: 45.14741353519627,
                    x: 32.12913326748082,
                    yScale: 0.7299191870931852,
                },
                22: {
                    zRotation: -0.7644520998001099,
                    y: 45.14741353519627,
                    x: 32.12913326748082,
                    yScale: 0.7216336868577085,
                },
                23: {
                    zRotation: -0.8022697567939758,
                    y: 45.2246382249509,
                    x: 32.12913326748082,
                    yScale: 0.7267595852835704,
                },
                24: {
                    zRotation: -0.8334147334098816,
                    y: 45.61075958919004,
                    x: 32.36080619676517,
                    yScale: 0.7255268298973472,
                },
                25: {
                    zRotation: -0.8566392660140991,
                    y: 45.68798427894467,
                    x: 32.43803049566967,
                    yScale: 0.7180497807971502,
                },
                26: {
                    zRotation: -0.8170664310455322,
                    y: 45.30186291470554,
                    x: 32.283581865289825,
                    yScale: 0.7075482505862997,
                },
                27: {
                    zRotation: -0.7055155634880066,
                    y: 44.9157415504664,
                    x: 31.974684604530125,
                    yScale: 0.699920472452196,
                },
                28: {
                    zRotation: -0.6580761671066284,
                    y: 44.37517184898501,
                    x: 31.82023597415028,
                    yScale: 0.7188606060157389,
                },
                29: {
                    zRotation: -0.6483301520347595,
                    y: 43.680152767994365,
                    x: 31.974684604530125,
                    yScale: 0.7467268887212721,
                },
                30: {
                    zRotation: -0.6530844569206238,
                    y: 43.37125505124285,
                    x: 31.897460289340202,
                    yScale: 0.7076592263528857,
                },
                31: {
                    zRotation: -0.6387086510658264,
                    y: 43.2168067140006,
                    x: 31.897460289340202,
                    yScale: 0.6976127624511719,
                },
                32: {
                    zRotation: -0.5934413075447083,
                    y: 43.06235837675835,
                    x: 31.974684604530125,
                    yScale: 0.7111366522514214,
                },
                33: {
                    zRotation: -0.563218355178833,
                    y: 42.67623701251921,
                    x: 32.05190891972005,
                    yScale: 0.6877270795531193,
                },
                34: {
                    zRotation: -0.539206862449646,
                    y: 42.59901232276458,
                    x: 32.12913323490997,
                    yScale: 0.6841794919159453,
                },
                35: {
                    zRotation: -0.5448576807975769,
                    y: 42.83068534976146,
                    x: 32.05190891972005,
                    yScale: 0.6852857642254587,
                },
                36: {
                    zRotation: -0.46741783618927,
                    y: 42.75346066000683,
                    x: 31.82023597415028,
                    yScale: 0.7098028215311342,
                },
                37: {
                    zRotation: -0.4262125790119171,
                    y: 42.59901232276458,
                    x: 31.66578734377043,
                    yScale: 0.6767896777492459,
                },
                38: {
                    zRotation: -0.4034004807472229,
                    y: 42.05844157901618,
                    x: 31.51133871339058,
                    yScale: 0.6985903291378991,
                },
                39: {
                    zRotation: -0.34073275327682495,
                    y: 41.36342249802553,
                    x: 31.511338778532267,
                    yScale: 0.7019748627129248,
                },
                40: {
                    zRotation: -0.3262194097042084,
                    y: 40.35950622141687,
                    x: 31.665787408912117,
                    yScale: 0.698171732789379,
                },
                41: {
                    zRotation: -0.32720232009887695,
                    y: 39.66448714042622,
                    x: 31.66578737634127,
                    yScale: 0.699121164063276,
                },
                42: {
                    zRotation: -0.2652936577796936,
                    y: 38.89224441194795,
                    x: 31.665787408912117,
                    yScale: 0.7019147529440412,
                },
                43: {
                    zRotation: -0.30138319730758667,
                    y: 38.5061220054418,
                    x: 31.356890115581574,
                    yScale: 0.7306965225833958,
                },
                44: {
                    zRotation: -0.27147912979125977,
                    y: 38.35167366819955,
                    x: 31.202441452630882,
                    yScale: 0.7712819313598892,
                },
                45: {
                    zRotation: -0.2804314196109772,
                    y: 38.042776472581544,
                    x: 31.279665751535383,
                    yScale: 0.7629277342456883,
                },
                46: {
                    zRotation: -0.2871687412261963,
                    y: 37.811103445584656,
                    x: 31.12521715372638,
                    yScale: 0.7758503748198687,
                },
                47: {
                    zRotation: -0.2864128053188324,
                    y: 37.965552303960415,
                    x: 31.356890115581574,
                    yScale: 0.8123111926903159,
                },
                48: {
                    zRotation: -0.2623315453529358,
                    y: 38.197224809823794,
                    x: 31.202441452630882,
                    yScale: 0.843358090368368,
                },
                49: {
                    zRotation: -0.24050681293010712,
                    y: 38.35167366819955,
                    x: 31.279665751535383,
                    yScale: 0.8355053299564427,
                },
                50: {
                    zRotation: -0.2214891016483307,
                    y: 38.042776472581544,
                    x: 31.43411441448608,
                    yScale: 0.8233881602853032,
                },
                51: {
                    zRotation: -0.24778850376605988,
                    y: 38.120000641202665,
                    x: 31.66578737634127,
                    yScale: 0.8184957302222818,
                },
                52: {
                    zRotation: -0.3110043704509735,
                    y: 38.120000641202665,
                    x: 31.66578737634127,
                    yScale: 0.8095837245553227,
                },
                53: {
                    zRotation: -0.28169986605644226,
                    y: 37.888327614205785,
                    x: 31.511338745961424,
                    yScale: 0.8007438000986132,
                },
                54: {
                    zRotation: -0.29471147060394287,
                    y: 37.888327614205785,
                    x: 31.356890115581574,
                    yScale: 0.8119653342133862,
                },
                55: {
                    zRotation: -0.3209635019302368,
                    y: 37.888327614205785,
                    x: 31.12521721886807,
                    yScale: 0.8167543148590347,
                },
                56: {
                    zRotation: -0.3735417127609253,
                    y: 37.6566545872089,
                    x: 30.970768555917374,
                    yScale: 0.8492016186148433,
                },
                57: {
                    zRotation: -0.38857007026672363,
                    y: 37.6566545872089,
                    x: 31.20244151777257,
                    yScale: 0.8382904327521891,
                },
                58: {
                    zRotation: -0.41935646533966064,
                    y: 37.6566545872089,
                    x: 30.893544191871186,
                    yScale: 0.8401449959156877,
                },
                59: {
                    zRotation: -0.39581099152565,
                    y: 37.42498156021202,
                    x: 30.893544191871186,
                    yScale: 0.8350500615976625,
                },
                60: {
                    zRotation: -0.37591543793678284,
                    y: 37.6566545872089,
                    x: 30.816319892966682,
                    yScale: 0.832487819558483,
                },
                61: {
                    zRotation: -0.333662211894989,
                    y: 38.042775951448036,
                    x: 30.970768490775686,
                    yScale: 0.8347948728981665,
                },
                62: {
                    zRotation: -0.31231752038002014,
                    y: 38.12000012006916,
                    x: 30.970768490775686,
                    yScale: 0.8483781652935481,
                },
                63: {
                    zRotation: -0.27741557359695435,
                    y: 38.274448978444916,
                    x: 30.816319892966682,
                    yScale: 0.8584344791153731,
                },
                64: {
                    zRotation: -0.23479770123958588,
                    y: 38.197224288690286,
                    x: 30.5846468659698,
                    yScale: 0.8384727320428622,
                },
                65: {
                    zRotation: -0.18311837315559387,
                    y: 38.12000012006916,
                    x: 30.352973969256293,
                    yScale: 0.8278159266811307,
                },
                66: {
                    zRotation: -0.1913759708404541,
                    y: 38.042775951448036,
                    x: 29.8896280455459,
                    yScale: 0.8370146913043524,
                },
                67: {
                    zRotation: -0.1764533817768097,
                    y: 37.50220520769963,
                    x: 29.657955148832393,
                    yScale: 0.8139096074185129,
                },
                68: {
                    zRotation: -0.180090993642807,
                    y: 37.50220572883314,
                    x: 29.50350655102339,
                    yScale: 0.8182115979113822,
                },
                69: {
                    zRotation: -0.20328423380851746,
                    y: 37.03885967483937,
                    x: 29.349057953214384,
                    yScale: 0.8488246950052553,
                },
                70: {
                    zRotation: -0.20517534017562866,
                    y: 36.498289973357984,
                    x: 29.19460935540538,
                    yScale: 0.8610264729645293,
                },
                71: {
                    zRotation: -0.17469623684883118,
                    y: 36.112168348552096,
                    x: 29.27183378459326,
                    yScale: 0.8702388254262634,
                },
                72: {
                    zRotation: -0.14845438301563263,
                    y: 35.880495321555216,
                    x: 29.426282382402263,
                    yScale: 0.8379644256527141,
                },
                73: {
                    zRotation: -0.17022107541561127,
                    y: 35.72604672374621,
                    x: 29.349057953214384,
                    yScale: 0.830374986438428,
                },
                74: {
                    zRotation: -0.13986127078533173,
                    y: 35.957719750743095,
                    x: 29.426282382402263,
                    yScale: 0.8550153950513419,
                },
                75: {
                    zRotation: -0.12436648458242416,
                    y: 35.957719750743095,
                    x: 29.81240400720815,
                    yScale: 0.8497166431556314,
                },
                76: {
                    zRotation: -0.14884012937545776,
                    y: 35.648822555125086,
                    x: 29.88962843639603,
                    yScale: 0.8606875346878828,
                },
                77: {
                    zRotation: -0.16193382441997528,
                    y: 35.26270119088595,
                    x: 30.198525762297418,
                    yScale: 0.8603735495421847,
                },
                78: {
                    zRotation: -0.19257107377052307,
                    y: 34.72213096827106,
                    x: 30.507422957915427,
                    yScale: 0.8877487505896617,
                },
                79: {
                    zRotation: -0.19257108867168427,
                    y: 34.64490653908318,
                    x: 30.66187155572443,
                    yScale: 0.8650630207385047,
                },
                80: {
                    zRotation: -0.19257110357284546,
                    y: 34.25878491427729,
                    x: 30.739095854628932,
                    yScale: 0.8713266607058251,
                },
                81: {
                    zRotation: -0.16738587617874146,
                    y: 33.718214691662396,
                    x: 30.739095854628932,
                    yScale: 0.8810694945060601,
                },
                82: {
                    zRotation: -0.2009669691324234,
                    y: 33.254868767952004,
                    x: 30.739095854628932,
                    yScale: 0.8703451035386426,
                },
                83: {
                    zRotation: -0.22235296666622162,
                    y: 33.17764446904751,
                    x: 30.584647126536552,
                    yScale: 0.9096649743742863,
                },
                84: {
                    zRotation: -0.20929312705993652,
                    y: 33.10042003985963,
                    x: 30.198525501730664,
                    yScale: 0.9172102152290992,
                },
                85: {
                    zRotation: -0.17783509194850922,
                    y: 32.55984975210305,
                    x: 30.12130120282616,
                    yScale: 0.9113161240593862,
                },
                86: {
                    zRotation: -0.2015528380870819,
                    y: 32.0965038609635,
                    x: 29.966852605017156,
                    yScale: 0.9104927717629127,
                },
                87: {
                    zRotation: -0.23369820415973663,
                    y: 31.78760658391838,
                    x: 29.580730980211268,
                    yScale: 0.905154115062649,
                },
                88: {
                    zRotation: -0.1869075447320938,
                    y: 31.24703641015975,
                    x: 29.19460935540538,
                    yScale: 0.914655196464668,
                },
                89: {
                    zRotation: -0.11003149300813675,
                    y: 30.629241953782046,
                    x: 28.962936328408496,
                    yScale: 0.933545120691849,
                },
                90: {
                    zRotation: -0.14163252711296082,
                    y: 29.702550106361265,
                    x: 28.962936328408496,
                    yScale: 0.9248947693129718,
                },
                91: {
                    zRotation: -0.19338572025299072,
                    y: 28.775858258940485,
                    x: 28.962936328408496,
                    yScale: 0.9408035520779885,
                },
                92: {
                    zRotation: -0.20269326865673065,
                    y: 28.158063867704463,
                    x: 28.885711899220617,
                    yScale: 0.9361429739806613,
                },
                93: {
                    zRotation: -0.1900949776172638,
                    y: 27.463044526147062,
                    x: 28.885711899220617,
                    yScale: 0.9442056639719818,
                },
                94: {
                    zRotation: -0.1591380536556244,
                    y: 26.690801276535286,
                    x: 28.885711899220617,
                    yScale: 0.9379688966072213,
                },
                95: {
                    zRotation: -0.2019750326871872,
                    y: 25.532436662684372,
                    x: 28.885711899220617,
                    yScale: 0.965050822597439,
                },
                96: {
                    zRotation: -0.2604011595249176,
                    y: 24.68296924445147,
                    x: 29.1173849262175,
                    yScale: 0.9819999589758405,
                },
                97: {
                    zRotation: -0.2572175860404968,
                    y: 23.061258576606793,
                    x: 29.580730719644514,
                    yScale: 0.9819999589758405,
                },
                98: {
                    zRotation: -0.24461883306503296,
                    y: 21.51677207738324,
                    x: 29.966852344450402,
                    yScale: 0.9904745271650411,
                },
                99: {
                    zRotation: -0.26607218384742737,
                    y: 20.049510267914318,
                    x: 30.352973969256293,
                    yScale: 0.9989491963790635,
                },
                100: {
                    zRotation: -0.2876419126987457,
                    y: 18.8911451329299,
                    x: 30.430198268160794,
                    yScale: 0.9989491963790635,
                },
                101: {
                    zRotation: -0.29619210958480835,
                    y: 18.11890240445163,
                    x: 30.507422567065298,
                    yScale: 0.9989491963790635,
                },
                102: {
                    zRotation: -0.31342700123786926,
                    y: 17.887229377454748,
                    x: 30.352973969256293,
                    yScale: 0.9989491963790635,
                },
                103: {
                    zRotation: -0.2882557213306427,
                    y: 16.188294540988945,
                    x: 30.352973969256293,
                    yScale: 0.9989491963790635,
                },
                104: {
                    zRotation: -0.25238898396492004,
                    y: 13.408220301560366,
                    x: 30.198525371447285,
                    yScale: 0.9989491963790635,
                },
                105: {
                    zRotation: -0.18359282612800598,
                    y: 9.006432788619579,
                    x: 29.889628175829277,
                    yScale: 0.9989491963790635,
                },
                106: {
                    zRotation: -0.18359282612800598,
                    y: 7.384721599641394,
                    x: 30.04407677363828,
                    yScale: 0.9989491963790635,
                },
                107: {
                    zRotation: -0.8401141166687012,
                    y: 6.766926166138363,
                    x: 30.43019839844417,
                    yScale: 0.9989491963790635,
                },
                108: {
                    zRotation: -1.1243841648101807,
                    y: 6.4580294916538605,
                    x: 31.27966594696045,
                    yScale: 0.9989491963790635,
                },
                109: {
                    zRotation: -1.3460869789123535,
                    y: 5.84023405815083,
                    x: 31.27966594696045,
                    yScale: 0.9989491963790635,
                },
                110: {
                    zRotation: -1.544252872467041,
                    y: 4.913541950163295,
                    x: 30.739095724345557,
                    yScale: 0.9989491963790635,
                },
                111: {
                    zRotation: -1.544252872467041,
                    y: 5.145214977160179,
                    x: 30.739095724345557,
                    yScale: 0.9989491963790635,
                },
                112: {
                    zRotation: -1.544252872467041,
                    y: 4.527419543657148,
                    x: 30.661871425441053,
                    yScale: 0.9989491963790635,
                },
                113: {
                    zRotation: -1.544252872467041,
                    y: 4.141297137151,
                    x: 30.198525501730664,
                    yScale: 0.9989491963790635,
                },
                114: {
                    zRotation: -1.544252872467041,
                    y: 4.450193811635503,
                    x: 29.889628175829277,
                    yScale: 0.9989491963790635,
                },
                115: {
                    zRotation: -1.544252872467041,
                    y: 4.681866838632387,
                    x: 30.198525501730664,
                    yScale: 0.9989491963790635,
                },
            },
            guy6Idle: {
                0: {
                    zRotation: -1.544252872467041,
                    y: 4.681866838632387,
                    x: 30.278954120281615,
                },
                1: {
                    zRotation: -1.544252872467041,
                    y: 4.681866838632387,
                    x: 30.278954120281615,
                },
                2: {
                    zRotation: -1.544252872467041,
                    y: 4.762296499450351,
                    x: 30.35938273883257,
                },
                3: {
                    zRotation: -1.544252872467041,
                    y: 4.681866838632387,
                    x: 30.43981135738352,
                },
            },
        };
        this.image = document.getElementById("guy6-png");
    }
    setPosition({ sixthGuyWall: { left, right, top } }) {
        this.position.x = (right - left) / 2 + left - 32;
        this.position.y = top - 58;
    }
}
const generateDiggingDirtParticles = (sixthGuy, timeIncrement) => {
    sixthGuy.timeUntilNextDirtParticle -= timeIncrement;
    if (sixthGuy.timeUntilNextDirtParticle <= 0) {
        sixthGuy.timeUntilNextDirtParticle = Math.random() * 0.1;
        sixthGuy.generatedDirtParticleCount++;
        generateDirtParticle(sixthGuy, {
            relativeX: 32 + Math.random() * 10 - 5,
            relativeY: 64 - 10,
        });
    }
};
const generateDirtParticle = (sixthGuy, { relativeX, relativeY, }) => {
    const size = Math.random() * 3;
    sixthGuy.dirtParticles.push({
        relativeX,
        relativeY: relativeY - size,
        size,
        velocity: {
            x: (Math.random() - 0.5) * 25,
            y: Math.random() * -100,
        },
        stuck: false,
    });
};
const generateConfettiParticle = (sixthGuy, timeIncrement) => {
    sixthGuy.timeUntilConfettiBurst.left -= timeIncrement;
    sixthGuy.timeUntilConfettiBurst.right -= timeIncrement;
    if (sixthGuy.timeUntilConfettiBurst.left <= 0) {
        generateConfettiBurst(sixthGuy, { relativeX: 0, relativeY: 32 }, false);
        sixthGuy.timeUntilConfettiBurst.left = Math.random() * 5 + 5;
    }
    if (sixthGuy.timeUntilConfettiBurst.right <= 0) {
        generateConfettiBurst(sixthGuy, { relativeX: 64, relativeY: 32 }, true);
        sixthGuy.timeUntilConfettiBurst.right = Math.random() * 5 + 5;
    }
};
const confettiColors = [
    "#0a84ff",
    "#30d158",
    "#5e5ce6",
    "#64d2ff",
    "#bf5aff",
    "#6c59ff",
];
const generateConfettiBurst = (sixthGuy, { relativeX, relativeY, }, left) => {
    for (let i = 0; i < 50; i++) {
        const velocity = Math.random() * -100;
        sixthGuy.confettiParticles.set(Math.random(), {
            relativeX,
            relativeY,
            color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
            stuck: false,
            stuckTime: 0,
            velocity: {
                x: (left ? 1 : -1) * velocity + (Math.random() - 0.5) * 20,
                y: velocity + -(Math.random() - 0.5) * 20,
                decreasing: true,
            },
        });
    }
};
const updateDirtParticle = (sixthGuy, timeIncrement, { sixthGuyWall: { right, left } }) => {
    for (const dirtParticle of sixthGuy.dirtParticles) {
        if (dirtParticle.stuck) {
            dirtParticle.relativeY = 59 - dirtParticle.size;
            continue;
        }
        dirtParticle.relativeX += dirtParticle.velocity.x * timeIncrement;
        dirtParticle.relativeY += dirtParticle.velocity.y * timeIncrement;
        dirtParticle.velocity.y += 50 * timeIncrement;
        if (dirtParticle.velocity.y >= 0 &&
            dirtParticle.relativeY >= 59 - dirtParticle.size + 1) {
            const absoluteX = sixthGuy.position.x + dirtParticle.relativeX;
            if (absoluteX <= right && absoluteX >= left) {
                dirtParticle.stuck = true;
                dirtParticle.relativeY = 59 - dirtParticle.size - 1;
            }
        }
    }
};
const updateConfettiParticles = (sixthGuy, timeIncrement, { sixthGuyWall: { right, left } }) => {
    const haveTooMany = sixthGuy.confettiParticles.size > 5000;
    for (const [key, confettiParticle] of sixthGuy.confettiParticles) {
        if (confettiParticle.stuck) {
            confettiParticle.relativeY = 58;
            confettiParticle.stuckTime += timeIncrement;
            if (confettiParticle.stuckTime > 10 ||
                (haveTooMany && confettiParticle.stuckTime > 1)) {
                sixthGuy.confettiParticles.delete(key);
            }
            continue;
        }
        confettiParticle.relativeX += confettiParticle.velocity.x * timeIncrement;
        if (confettiParticle.velocity.decreasing) {
            const goingRight = confettiParticle.velocity.x >= 0;
            confettiParticle.velocity.x += (goingRight ? -1 : 1) * 25 * timeIncrement;
            if ((goingRight && confettiParticle.velocity.x <= 0) ||
                (!goingRight && confettiParticle.velocity.x >= 0)) {
                confettiParticle.velocity.decreasing = false;
                confettiParticle.velocity.x = (goingRight ? 1 : -1) * 5;
            }
        }
        else {
            if (Math.random() < 0.1) {
                confettiParticle.velocity.x *= -1;
            }
        }
        confettiParticle.relativeY += confettiParticle.velocity.y * timeIncrement;
        if (confettiParticle.velocity.y < 0) {
            confettiParticle.velocity.y += 50 * timeIncrement;
            if (confettiParticle.velocity.y > 0) {
                confettiParticle.velocity.y = 15;
            }
        }
        if (confettiParticle.velocity.y >= 0 && confettiParticle.relativeY >= 58) {
            const absoluteX = sixthGuy.position.x + confettiParticle.relativeX;
            if (absoluteX <= right && absoluteX >= left) {
                confettiParticle.stuck = true;
                confettiParticle.relativeY = 58;
            }
        }
        if (confettiParticle.relativeY > 1000) {
            sixthGuy.confettiParticles.delete(key);
        }
    }
};
const drawDirtParticles = ({ position: { x, y }, dirtParticles }, context) => {
    context.fillStyle = "#714e1b";
    context.translate(x, y);
    for (const { relativeX, relativeY, size } of dirtParticles) {
        context.fillRect(relativeX, relativeY, size, size);
    }
    context.translate(-x, -y);
};
const drawConfettiParticles = ({ confettiParticles, position: { x, y } }, context) => {
    context.translate(x, y);
    for (const [, { relativeX, relativeY, color }] of confettiParticles) {
        context.fillStyle = color;
        context.fillRect(relativeX, relativeY, 2, 2);
    }
    context.translate(-x, -y);
};

  "use strict";
const batonColor = "rgb(255, 214, 10)";
class BatonState {
    constructor(character) {
        this.color = batonColor;
        this.batonParticles = new Map();
        this.timeSinceLastParticleGenerated = 0;
        this.lineWidth = 3;
        this.height = 10;
        this.character = character;
        this.position = {
            zRotation: 0,
            y: 0,
            x: 0,
            frameNumber: 0,
            velocity: {
                x: 0,
                y: 0,
                zRotation: 0,
            },
            relativeTo: character,
        };
    }
}
const batonAcceleration = 150;
const updateBatonPhysics = (baton, accelerationX, accelerationY, timeIncrement) => {
    baton.position.y += baton.position.velocity.y * timeIncrement;
    baton.position.velocity.y += accelerationY * timeIncrement;
    baton.position.x += baton.position.velocity.x * timeIncrement;
    baton.position.velocity.x += accelerationX * timeIncrement;
    baton.position.zRotation += baton.position.velocity.zRotation * timeIncrement;
};
const transferBatonBetweenCoordinatesSystems = (baton, toThisGuyCoordinates) => {
    baton.position.x +=
        baton.position.relativeTo.position.x - toThisGuyCoordinates.position.x;
    baton.position.y +=
        baton.position.relativeTo.position.y - toThisGuyCoordinates.position.y;
    baton.position.relativeTo = toThisGuyCoordinates;
};
const transferBatonPositionFromAnimatedStateToPhysicsBasedPosition = (baton, animatedStateName, frame) => {
    if (!baton.character) {
        debugger;
        return;
    }
    const animatedState = baton.character.batonPosition[animatedStateName][frame];
    baton.position.zRotation = animatedState.zRotation;
    baton.position.x = animatedState.x;
    baton.position.y = animatedState.y;
    baton.character = null;
};
const updateBatonParticles = (particles, timeIncrement) => {
    for (const [key, particle] of particles) {
        particle.size -= 1 * timeIncrement;
        if (particle.size < 0.9) {
            particles.delete(key);
            continue;
        }
        particle.position.x += particle.velocity.x * timeIncrement;
        particle.position.y += particle.velocity.y * timeIncrement;
    }
};
const generateBatonParticles = (particles, baton, referenceGuy) => {
    const absolute = absoluteBatonCoordinates(baton);
    const x = absolute.x - referenceGuy.position.x;
    const y = absolute.y - referenceGuy.position.y;
    const velocity = 20 * (Math.random() - 0.5);
    particles.set(Math.random(), {
        size: Math.random() * 2 + 1,
        position: {
            x: x +
                baton.height *
                    (2 * Math.random() - 1) *
                    Math.cos(baton.position.zRotation + Math.PI / 2),
            y: y +
                baton.height *
                    (2 * Math.random() - 1) *
                    Math.sin(baton.position.zRotation + Math.PI / 2),
        },
        velocity: {
            x: velocity * Math.cos(baton.position.zRotation),
            y: velocity * Math.sin(baton.position.zRotation),
        },
    });
};
const updateAndGenerateBatonParticles = (baton, referenceGuy, timeIncrement) => {
    updateBatonParticles(baton.batonParticles, timeIncrement);
    baton.timeSinceLastParticleGenerated += timeIncrement;
    if ((baton.character != null && baton.timeSinceLastParticleGenerated < 0.2) ||
        (baton.character == null && baton.timeSinceLastParticleGenerated < 0.017)) {
        return;
    }
    baton.timeSinceLastParticleGenerated = 0;
    generateBatonParticles(baton.batonParticles, baton, referenceGuy);
};
const absoluteBatonCoordinates = (baton) => {
    if (baton.character == null) {
        return {
            x: baton.position.x + baton.position.relativeTo.position.x,
            y: baton.position.y + baton.position.relativeTo.position.y,
        };
    }
    const { batonPosition, animState: { animation, frame }, } = baton.character;
    const batonAnimation = batonPosition[animation][frame];
    return {
        x: batonAnimation.x + baton.character.position.x,
        y: batonAnimation.y + baton.character.position.y,
    };
};
const drawBatonParticles = (color, particles, referenceCharacter, context) => {
    context.fillStyle = color;
    context.translate(referenceCharacter.position.x, referenceCharacter.position.y);
    for (const [, { position: { x, y }, size, },] of particles) {
        context.fillRect(x, y, size, size);
    }
    context.translate(-referenceCharacter.position.x, -referenceCharacter.position.y);
};
const drawBaton = (baton, referenceCharacter, context) => {
    drawBatonParticles(baton.color, baton.batonParticles, referenceCharacter, context);
    if (baton.character) {
        drawAnimatedBaton(baton, baton.character, context);
        return;
    }
    drawFreeBaton(baton, context);
};
const drawAnimatedBaton = ({ lineWidth, height, color }, { animState: { animation, frame }, batonPosition, position: { x, y }, }, context) => {
    const positions = batonPosition ? batonPosition[animation] : undefined;
    const frameInfo = positions ? positions[frame] : undefined;
    if (!frameInfo) {
        debugger;
        return;
    }
    const { zRotation, y: cy, x: cx, yScale = 1 } = frameInfo;
    drawBatonShape(context, yScale * lineWidth, yScale * height, zRotation, cy + y, cx + x, color);
};
const drawFreeBaton = ({ lineWidth, height, color, position: { x, y, zRotation, relativeTo: { position: { x: cx, y: cy }, }, }, }, context) => {
    drawBatonShape(context, lineWidth, height, zRotation, cy + y, cx + x, color);
};
const drawBatonShape = (context, lineWidth, height, zRotation, centerY, centerX, color) => {
    context.beginPath();
    const halfPi = Math.PI / 2;
    context.moveTo(centerX + Math.cos(zRotation + halfPi) * height, centerY + -Math.sin(zRotation + halfPi) * height);
    context.lineTo(centerX + Math.cos(zRotation + halfPi + Math.PI) * height, centerY + -Math.sin(zRotation + halfPi + Math.PI) * height);
    context.strokeStyle = color;
    context.lineWidth = lineWidth;
    context.stroke();
};

  "use strict";
const nextAnimationFrame = (character) => {
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
const goToNextAnimationOrLoop = (character) => {
    const { animState } = character;
    if (animState.nextAnimation.length <= 0) {
        return false;
    }
    animState.frame = 0;
    animState.reverse = false;
    const nextAnimationState = animState.nextAnimation.pop();
    if (nextAnimationState == "hide") {
        character.hide = true;
        return true;
    }
    animState.animation = nextAnimationState;
    return true;
};
const drawAnimatedCharacter = ({ framePositions, animState: { animation, frame }, image, hide, position: { x, y }, size: { w, h }, }, context) => {
    if (hide) {
        return;
    }
    const [sx, sy] = framePositions[animation][frame];
    context.drawImage(image, sx, sy, w, h, x, y, w, h);
};
const havePendingAnimations = ({ animState: { nextAnimation }, }) => nextAnimation.length > 0;

  "use strict";
const updateSnowFlakes = (snowFlakes, timeIncrement, width, height, snowBoxes, touches, mouse) => {
    const snowWalls = Object.values(snowBoxes).filter(({ top }) => top > 0 && top < height);
    const snowflakeFrictionComponent = timeIncrement * 3;
    for (const [key, snowFlake] of snowFlakes) {
        for (const [, input] of touches) {
            addTouchToSnowflakeVelocity(snowFlake, input);
        }
        if (mouse) {
            addTouchToSnowflakeVelocity(snowFlake, mouse);
        }
        const newY = snowFlake.y +
            timeIncrement * snowFlake.speed +
            timeIncrement * snowFlake.velocityY;
        let blocked = false;
        for (const wall of snowWalls) {
            if (!(snowFlake.y == wall.top ||
                (snowFlake.y < wall.top && newY >= wall.top))) {
                continue;
            }
            if (!(snowFlake.x >= wall.left && snowFlake.x <= wall.right)) {
                continue;
            }
            snowFlake.y = wall.top;
            blocked = true;
            snowFlake.stuckTime += timeIncrement;
            break;
        }
        if (!blocked) {
            snowFlake.y = newY;
            snowFlake.x +=
                timeIncrement * snowFlake.speedX + timeIncrement * snowFlake.velocityX;
            snowFlake.stuckTime = 0;
        }
        else {
            if (snowFlake.stuckTime > 10) {
                snowFlakes.delete(key);
                continue;
            }
        }
        snowFlake.velocityX = snowFlake.velocityX = 0
            ? 0
            : snowFlake.velocityX > 0
                ? Math.max(0, snowFlake.velocityX - snowflakeFrictionComponent)
                : Math.min(0, snowFlake.velocityX + snowflakeFrictionComponent);
        snowFlake.velocityY = snowFlake.velocityY = 0
            ? 0
            : snowFlake.velocityY > 0
                ? Math.max(0, snowFlake.velocityY - snowflakeFrictionComponent)
                : Math.min(0, snowFlake.velocityY + snowflakeFrictionComponent);
        if (snowFlake.y > height) {
            snowFlakes.delete(key);
        }
    }
    if (Math.random() < 0.2 && snowFlakes.size < 10000) {
        snowFlakes.set(Math.random(), {
            x: Math.random() * width,
            y: 40,
            speed: Math.random() * 30 + 20,
            speedX: Math.random() * 10 - 5,
            stuckTime: 0,
            size: Math.random() < 0.5 ? 2 : 1,
            velocityX: 0,
            velocityY: 0,
        });
    }
};
const addTouchToSnowflakeVelocity = (snowFlake, { left, right, bottom, top, difference }) => {
    if (difference == null) {
        return;
    }
    if (!(snowFlake.x >= left &&
        snowFlake.x <= right &&
        snowFlake.y >= top &&
        snowFlake.y <= bottom)) {
        return;
    }
    const speedLimit = 60;
    snowFlake.velocityY = Math.max(-speedLimit, Math.min(speedLimit, difference.y));
    snowFlake.velocityX = Math.max(-speedLimit, Math.min(speedLimit, difference.x * 4));
};
const drawSnowFlakes = (snowFlakes, context) => {
    context.fillStyle = "white";
    for (const [, snowFlake] of snowFlakes) {
        context.fillRect(snowFlake.x, snowFlake.y, snowFlake.size, snowFlake.size);
    }
};

  
  "use strict";
const animationDirector = (baton, characters, walls, height, timeIncrement, animationDirectorState) => {
    switch (animationDirectorState) {
        case "guy1": {
            const { firstGuy } = characters;
            const { animState: { animation, frame }, } = firstGuy;
            if (animation == guy1Animations.tossIdle &&
                !havePendingAnimations(firstGuy)) {
                const { firstGuyWall } = walls;
                if (firstGuyWall.top < height / 2) {
                    firstGuy.animState.nextAnimation.unshift(guy1Animations.idle, guy1Animations.drop);
                    const { look } = characters;
                    if (document.URL.indexOf("#") <= -1) {
                        look.hide = false;
                        look.animState = {
                            animation: guy1Animations.lookArrowShrink,
                            frame: 0,
                            reverse: false,
                            nextAnimation: [guy1Animations.lookArrow],
                        };
                    }
                }
            }
            const { firstGuyWall } = walls;
            if (havePendingAnimations(firstGuy) &&
                firstGuyWall.top < 60 &&
                firstGuy.animationHoldTime < 5) {
                firstGuy.animationHoldTime += timeIncrement;
                (firstGuy.animState.animation = guy1Animations.tossIdle),
                    (firstGuy.animState.nextAnimation = [
                        guy1Animations.idle,
                        guy1Animations.drop,
                    ]);
                firstGuy.animState.frame =
                    guy1FramePositions[guy1Animations.tossIdle].length - 10;
                return animationDirectorState;
            }
            if (animation != guy1Animations.drop || frame <= 10) {
                return animationDirectorState;
            }
            const { secondGuy, look } = characters;
            look.animState = {
                animation: guy1Animations.lookArrowShrink,
                frame: guy1FramePositions[guy1Animations.lookArrowShrink].length - 1,
                reverse: true,
                nextAnimation: ["hide"],
            };
            transferBatonPositionFromAnimatedStateToPhysicsBasedPosition(baton, guy1Animations.drop, 10);
            transferBatonBetweenCoordinatesSystems(baton, secondGuy);
            baton.position.frameNumber = 0;
            const framesLeftInCurrentAnimation = secondGuy.framePositions[secondGuy.animState.animation].length -
                secondGuy.animState.frame;
            const secondsUntilGrab = (framesLeftInCurrentAnimation + 11) * 0.0833333;
            const { y: goalY, zRotation: goalZRotation } = secondGuy.batonPosition[guy2Animations.grab][11];
            const velocityY = (goalY -
                0.5 * batonAcceleration * Math.pow(secondsUntilGrab, 2) -
                baton.position.y) /
                secondsUntilGrab;
            const zRotationVelocity = (goalZRotation - baton.position.zRotation) / secondsUntilGrab;
            baton.position.velocity = {
                x: 0,
                y: velocityY,
                zRotation: zRotationVelocity,
            };
            secondGuy.animState.nextAnimation.unshift(guy2Animations.batonIdle, guy2Animations.grab);
            return animationDirector(baton, characters, walls, height, timeIncrement, "drop1To2");
        }
        case "drop1To2": {
            const { secondGuy } = characters;
            if (baton.position.y < secondGuy.batonPosition[guy2Animations.grab][11].y) {
                updateBatonPhysics(baton, 0, batonAcceleration, timeIncrement);
                baton.position.frameNumber++;
                return animationDirectorState;
            }
            if (!(secondGuy.animState.animation == guy2Animations.grab &&
                secondGuy.animState.frame >= 11)) {
                baton.character = secondGuy;
                transferBatonPositionFromAnimatedStateToPhysicsBasedPosition(baton, guy2Animations.grab, 11);
                return animationDirectorState;
            }
            baton.character = secondGuy;
            return animationDirector(baton, characters, walls, height, timeIncrement, "guy2");
        }
        case "guy2": {
            const { secondGuy, thirdGuy } = characters;
            const { animState: { animation, frame }, } = secondGuy;
            if (secondGuy.animState.animation == guy2Animations.batonIdle &&
                !havePendingAnimations(secondGuy)) {
                const { secondGuyWall } = walls;
                if (secondGuyWall.top < height / 2) {
                    secondGuy.animState.nextAnimation.unshift(guy2Animations.idleAfter, guy2Animations.drop);
                }
            }
            if (!havePendingAnimations(thirdGuy) &&
                animation == guy2Animations.drop &&
                frame == 5) {
                thirdGuy.animState = {
                    animation: guy3Animations.grab,
                    frame: 0,
                    nextAnimation: [guy3Animations.grabIdle],
                    reverse: false,
                };
            }
            if (!(animation == guy2Animations.drop && frame >= 15)) {
                return animationDirectorState;
            }
            transferBatonPositionFromAnimatedStateToPhysicsBasedPosition(baton, guy2Animations.drop, 14);
            transferBatonBetweenCoordinatesSystems(baton, thirdGuy);
            baton.position.frameNumber = 0;
            baton.position.velocity = {
                x: thirdGuy.position.x - secondGuy.position.x,
                y: 150,
                zRotation: -Math.PI,
            };
            const goal = -100;
            const { seconds, x, y } = secondsUntilGoal(baton, goal, 0, batonAcceleration);
            createAllArmSegments(thirdGuy.armSegments, {
                x: x - 32,
                y: y - 32,
            });
            thirdGuy.armDrawFramesPerSecond = thirdGuy.armSegments.length / seconds;
            thirdGuy.drawArmSegments = true;
            return animationDirector(baton, characters, walls, height, timeIncrement, "drop2To3");
        }
        case "drop2To3": {
            updateBatonPhysics(baton, 0, batonAcceleration, timeIncrement);
            baton.position.frameNumber++;
            const { thirdGuy } = characters;
            thirdGuy.armSegmentsDrawFrame +=
                thirdGuy.armDrawFramesPerSecond * timeIncrement;
            if (thirdGuy.armSegmentsDrawFrame < thirdGuy.armSegments.length) {
                return animationDirectorState;
            }
            thirdGuy.armDrawFramesPerSecond = thirdGuy.armSegments.length / 3;
            thirdGuy.armSegmentsDrawFrame = thirdGuy.armSegments.length - 1;
            setBatonPositionToLastArmSegment(baton, thirdGuy.armSegments, thirdGuy.armSegmentsDrawFrame);
            return animationDirector(baton, characters, walls, height, timeIncrement, "grab3WaitForScroll");
        }
        case "grab3WaitForScroll": {
            if (walls.thirdGuyWall.top > height / 2) {
                return animationDirectorState;
            }
            return animationDirector(baton, characters, walls, height, timeIncrement, "grabBackwards3");
        }
        case "grabBackwards3": {
            const { thirdGuy } = characters;
            thirdGuy.armSegmentsDrawFrame -=
                thirdGuy.armDrawFramesPerSecond * timeIncrement;
            if (thirdGuy.armSegmentsDrawFrame >= 0) {
                setBatonPositionToLastArmSegment(baton, thirdGuy.armSegments, thirdGuy.armSegmentsDrawFrame);
                return animationDirectorState;
            }
            thirdGuy.drawArmSegments = false;
            thirdGuy.animState = {
                animation: guy3Animations.grabIdle,
                frame: 0,
                reverse: false,
                nextAnimation: [],
            };
            baton.character = thirdGuy;
            return animationDirector(baton, characters, walls, height, timeIncrement, "guy3");
        }
        case "guy3": {
            const { thirdGuy } = characters;
            if (thirdGuy.animState.animation == guy3Animations.grabIdle &&
                !havePendingAnimations(thirdGuy)) {
                if (walls.thirdGuyWall.top < height / 2) {
                    thirdGuy.animState.nextAnimation.unshift(guy3Animations.idleAfter, guy3Animations.drop);
                    return animationDirectorState;
                }
            }
            if (!(thirdGuy.animState.animation == guy3Animations.drop &&
                thirdGuy.animState.frame >= 7)) {
                return animationDirectorState;
            }
            const { fourthGuy, fifthGuy } = characters;
            transferBatonPositionFromAnimatedStateToPhysicsBasedPosition(baton, guy3Animations.drop, 6);
            transferBatonBetweenCoordinatesSystems(baton, fifthGuy);
            fourthGuy.animState = {
                animation: guy4Animations.avoid,
                frame: 0,
                nextAnimation: [guy4Animations.idleAfter],
                reverse: false,
            };
            baton.position.velocity = {
                x: 0,
                y: 80,
                zRotation: 0,
            };
            const { seconds } = secondsUntilGoal(baton, 32, 0, batonAcceleration);
            baton.position.velocity.zRotation =
                (0 - baton.position.zRotation) / seconds;
            return animationDirector(baton, characters, walls, height, timeIncrement, "drop3To5");
        }
        case "drop3To5": {
            updateBatonPhysics(baton, 0, batonAcceleration, timeIncrement);
            if (baton.position.y < 32) {
                return animationDirectorState;
            }
            const { fifthGuy } = characters;
            fifthGuy.batonRadius = Math.sqrt(Math.pow(baton.position.x - 32, 2) + Math.pow(baton.position.y - 32, 2));
            fifthGuy.originalRadius = fifthGuy.batonRadius;
            fifthGuy.angularVelocity = 2;
            return animationDirector(baton, characters, walls, height, timeIncrement, "physicsOrbit5");
        }
        case "physicsOrbit5": {
            const { fifthGuy } = characters;
            const finalRadius = 40;
            updateBatonOrbit(baton, finalRadius, false, 1, fifthGuy, timeIncrement);
            if (baton.position.zRotation >= Math.PI * 2) {
                baton.position.zRotation -= Math.PI * 2;
            }
            if (walls.fifthGuyWall.top > height / 2) {
                return animationDirectorState;
            }
            fifthGuy.throwZRotationGoal = Math.PI * 2 * 3;
            fifthGuy.angularVelocity = 5;
            return animationDirector(baton, characters, walls, height, timeIncrement, "physicsThrowLeft5");
        }
        case "physicsThrowLeft5": {
            const { fifthGuy } = characters;
            updateBatonOrbit(baton, 120, true, fifthGuy.angularVelocity, fifthGuy, timeIncrement);
            if (baton.position.zRotation < fifthGuy.throwZRotationGoal) {
                return animationDirectorState;
            }
            const { sixthGuy } = characters;
            transferBatonBetweenCoordinatesSystems(baton, sixthGuy);
            baton.position.velocity.zRotation = 15;
            baton.position.velocity.x = 0;
            baton.position.velocity.y = 600;
            return animationDirector(baton, characters, walls, height, timeIncrement, "physicsFallIntoTheGround");
        }
        case "physicsFallIntoTheGround": {
            updateBatonPhysics(baton, 0, batonAcceleration, timeIncrement);
            if (baton.position.y < 55) {
                return animationDirectorState;
            }
            const { sixthGuy } = characters;
            for (let i = 0; i < 250; i++) {
                generateDirtParticle(sixthGuy, {
                    relativeX: baton.position.x + Math.random() * 10 - 5,
                    relativeY: 64 - 10,
                });
            }
            baton.position.x = 1000000;
            baton.position.y = 1000000;
            return animationDirector(baton, characters, walls, height, timeIncrement, "waitForGuy6Scroll");
        }
        case "waitForGuy6Scroll": {
            const { sixthGuy } = characters;
            updateDirtParticle(sixthGuy, timeIncrement, walls);
            sixthGuy.timeSinceBatonCrashed += timeIncrement;
            if (sixthGuy.timeSinceBatonCrashed < 2.5 ||
                walls.sixthGuyWall.top > height / 2) {
                return animationDirectorState;
            }
            return animationDirector(baton, characters, walls, height, timeIncrement, "guy6Digging");
        }
        case "guy6Digging": {
            const { sixthGuy } = characters;
            generateDiggingDirtParticles(sixthGuy, timeIncrement);
            updateDirtParticle(sixthGuy, timeIncrement, walls);
            if (sixthGuy.generatedDirtParticleCount < 50) {
                return animationDirectorState;
            }
            sixthGuy.animState.animation = guy6Animations.climb;
            sixthGuy.hide = false;
            sixthGuy.animState.frame = 0;
            sixthGuy.animState.nextAnimation = [guy6Animations.idle];
            baton.character = sixthGuy;
            return animationDirector(baton, characters, walls, height, timeIncrement, "guy6Climb");
        }
        case "guy6Climb": {
            const { sixthGuy } = characters;
            updateDirtParticle(sixthGuy, timeIncrement, walls);
            if (sixthGuy.animState.animation != guy6Animations.idle) {
                return animationDirectorState;
            }
            const { crowdLeft, crowdRight } = characters;
            crowdLeft.animState.nextAnimation = [
                guy6CrowdAnimations.standIdle,
                guy6CrowdAnimations.stand,
            ];
            crowdRight.animState.nextAnimation = [
                guy6CrowdAnimations.standIdle,
                guy6CrowdAnimations.stand,
            ];
            return animationDirector(baton, characters, walls, height, timeIncrement, "final");
        }
        case "final": {
            const { sixthGuy } = characters;
            generateConfettiParticle(sixthGuy, timeIncrement);
            updateConfettiParticles(sixthGuy, timeIncrement, walls);
            updateDirtParticle(sixthGuy, timeIncrement, walls);
            return animationDirectorState;
        }
        default:
            neverDefault(animationDirectorState);
            return animationDirectorState;
    }
};
const neverDefault = (_x) => {
    debugger;
};
const drawAnimationDirectorDirectedState = (context, baton, characters, animationDirectorState) => {
    drawArmSegments(characters.thirdGuy.armSegments, characters.thirdGuy.armSegmentsDrawFrame, characters.thirdGuy.image, characters.thirdGuy.framePositions, characters.thirdGuy, context);
    switch (animationDirectorState) {
        case "physicsFallIntoTheGround":
        case "waitForGuy6Scroll":
        case "guy6Digging":
        case "guy6Climb":
        case "final":
            drawDirtParticles(characters.sixthGuy, context);
            if (animationDirectorState == "final") {
                drawConfettiParticles(characters.sixthGuy, context);
            }
            break;
        case "physicsThrowLeft5":
        case "physicsOrbit5":
            {
                const { fifthGuy } = characters;
                context.beginPath();
                const batonPosition = {
                    x: baton.position.x + fifthGuy.position.x,
                    y: baton.position.y + fifthGuy.position.y,
                };
                context.strokeStyle = "white";
                context.ellipse(batonPosition.x, batonPosition.y, 10, 10, 0, 0, 2 * Math.PI);
                context.lineWidth = 2;
                context.stroke();
                context.strokeStyle = "rgb(187,222,251)";
                drawLighting({
                    x: fifthGuy.position.x + 32,
                    y: fifthGuy.position.y + 32,
                }, batonPosition, fifthGuy.lightningSegments, context);
            }
            break;
        default:
            break;
    }
};
const secondsUntilGoal = (baton, goalY, accelerationX, accelerationY) => {
    const term2 = Math.pow(baton.position.velocity.y, 2) -
        2 * accelerationY * (baton.position.y - goalY);
    if (term2 < 0) {
        debugger;
        return {
            seconds: 0,
            x: baton.position.x,
            y: goalY,
        };
    }
    const s = Math.sqrt(term2);
    const maybeSeconds = (-baton.position.velocity.y + s) / accelerationY;
    const seconds = maybeSeconds >= 0
        ? maybeSeconds
        : (-baton.position.velocity.y - s) / accelerationY;
    const x = 0.5 * accelerationX * Math.pow(seconds, 2) +
        baton.position.velocity.x * seconds +
        baton.position.x;
    return {
        seconds,
        x,
        y: goalY,
    };
};

  "use strict";
const animationCanvasId = "animation-canvas";
const makeAnimationCanvas = (width, height, ratio) => {
    {
        const canvas = document.getElementById(animationCanvasId);
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
    context === null || context === void 0 ? void 0 : context.scale(ratio, ratio);
    return {
        canvas,
        context,
    };
};
const makeAnimationCanvasElement = (width, height, ratio) => {
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

  "use strict";
class FullScreenAnimation {
    constructor(characters, wallElements, baton, options = {}) {
        var _a, _b;
        this.snowFlakes = new Map();
        this.snowBoxes = [];
        this.lastFrameTime = null;
        this.timeSinceLastAnimationFrame = 0;
        this.touches = new Map();
        this.mouse = null;
        this.animationDirectorState = "guy1";
        this.updateStateAndDraw = (totalTimeElapsed) => {
            this.updateState(totalTimeElapsed);
            this.draw();
            requestAnimationFrame(this.updateStateAndDraw);
        };
        this.updateState = (totalTimeElapsed) => {
            const snowWalls = this.snowBoxes.map((a) => {
                const rect = a.getBoundingClientRect();
                return {
                    left: rect.left + 8,
                    width: rect.width,
                    right: rect.right - 8,
                    top: rect.top,
                    bottom: rect.bottom,
                };
            });
            const walls = wallElementsToWalls(this.wallElements);
            const timeDifference = this.lastFrameTime == null ? 0 : totalTimeElapsed - this.lastFrameTime;
            this.lastFrameTime = totalTimeElapsed;
            const timeIncrement = timeDifference / 1000;
            this.timeSinceLastAnimationFrame += timeIncrement;
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
            this.animationDirectorState = animationDirector(this.baton, this.characters, walls, this.height, timeIncrement, this.animationDirectorState);
            updateAndGenerateBatonParticles(this.baton, this.characters.firstGuy, timeIncrement);
            updateSnowFlakes(this.snowFlakes, timeIncrement, this.width, this.height, snowWalls, this.touches, this.mouse);
            for (const [_, touch] of this.touches) {
                touch.difference = null;
            }
            if (this.mouse) {
                this.mouse.difference = null;
            }
        };
        this.draw = () => {
            this.context.clearRect(0, 0, this.width, this.height);
            for (const c of this.characterList) {
                drawAnimatedCharacter(c, this.context);
            }
            drawAnimationDirectorDirectedState(this.context, this.baton, this.characters, this.animationDirectorState);
            drawBaton(this.baton, this.characters.firstGuy, this.context);
            drawSnowFlakes(this.snowFlakes, this.context);
        };
        this.setupMouseAndTouchListeners = () => {
            window.addEventListener("touchstart", ({ changedTouches }) => {
                for (const { identifier, clientX, clientY } of changedTouches) {
                    this.touches.set(identifier, setupTouch({
                        clientX,
                        clientY,
                    }));
                }
            }, false);
            window.addEventListener("touchmove", ({ changedTouches }) => {
                for (const { identifier, clientX, clientY } of changedTouches) {
                    const touchInfo = this.touches.get(identifier);
                    if (!touchInfo) {
                        continue;
                    }
                    this.touches.set(identifier, setupTouch({
                        clientX,
                        clientY,
                        input: touchInfo,
                    }));
                }
            }, false);
            window.addEventListener("touchcancel", this.deleteTouch, false);
            window.addEventListener("touchend", this.deleteTouch, false);
            window.addEventListener("mouseenter", ({ clientX, clientY }) => {
                this.mouse = setupTouch({
                    clientX,
                    clientY,
                });
            }, false);
            window.addEventListener("mousemove", ({ clientX, clientY }) => {
                var _a;
                this.mouse = setupTouch({
                    clientX,
                    clientY,
                    input: (_a = this.mouse) !== null && _a !== void 0 ? _a : undefined,
                });
            }, false);
            window.addEventListener("mouseenter", ({ clientX, clientY }) => {
                this.mouse = setupTouch({
                    clientX,
                    clientY,
                });
            }, false);
            window.addEventListener("mouseleave", () => {
                this.mouse = null;
            });
        };
        this.deleteTouch = ({ changedTouches }) => {
            for (const { identifier } of changedTouches) {
                this.touches.delete(identifier);
            }
        };
        this.characters = characters;
        this.characterList = Object.values(this.characters);
        this.wallElements = wallElements;
        this.baton = baton;
        const ratio = window.devicePixelRatio || 1;
        this.width = window.innerWidth > 0 ? window.innerWidth : screen.width;
        this.height = window.innerHeight > 0 ? window.innerHeight : screen.height;
        const maybeContext = (_a = options.context) !== null && _a !== void 0 ? _a : makeAnimationCanvas(this.width, this.height, ratio);
        if (!maybeContext) {
            throw new Error("Could not make Animation canvas");
        }
        this.context = maybeContext.context;
        this.context.imageSmoothingEnabled = false;
        this.context.fillStyle = "white";
        const snowBoxClass = "snow-box";
        this.snowBoxes = (_b = options.snowBoxes) !== null && _b !== void 0 ? _b : Array.from(document.getElementsByClassName(snowBoxClass));
        this.setupMouseAndTouchListeners();
        requestAnimationFrame(this.updateStateAndDraw);
    }
}
const wallElementsToWalls = (elements) => {
    const out = {};
    for (const [key, value] of Object.entries(elements)) {
        const rect = value.getBoundingClientRect();
        out[key] = {
            left: rect.left + 8,
            width: rect.width,
            right: rect.right - 8,
            top: rect.top,
            bottom: rect.bottom,
        };
    }
    return out;
};
const setupTouch = ({ clientX, clientY, input: maybeInput, }) => {
    const touchWidth = 20;
    const input = maybeInput !== null && maybeInput !== void 0 ? maybeInput : {
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
let animationState = null;
window.onload = () => {
    const getWallBox = (id) => { var _a; return (_a = document.getElementById(id)) !== null && _a !== void 0 ? _a : document.createElement("div"); };
    const characters = {
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
    animationState = new FullScreenAnimation(characters, {
        firstGuyWall: getWallBox("first-guy"),
        secondGuyWall: getWallBox("second-guy"),
        thirdGuyWall: getWallBox("third-guy"),
        fourthGuyWall: getWallBox("fourth-guy"),
        fifthGuyWall: getWallBox("fifth-guy"),
        sixthGuyWall: getWallBox("sixth-guy"),
    }, new BatonState(characters.firstGuy));
};

  