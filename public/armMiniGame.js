"use strict";

  
/**
   * Hello! Here is the code un-minified so,
   * you can play around with it. 
   * 
   * To the Attention of Contributors:
   * This file is generated. Do not modify by hand.
   * Modify ./scripts/src/fileGenerators/ArmMiniGameJS
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

  const guy1 = null;
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
const armColors = [
    "#0a84ff",
    "#30d158",
    "#5e5ce6",
    "#64d2ff",
    "#bf5aff",
    "#6c59ff",
    "#7986cb",
    "#64b5f6",
    "#4db6ac",
    "#81c784",
    "#aed581",
];
const batonColors = [
    batonColor,
    "#ff9f0a",
    "#ff375f",
    "#ff453a",
    "#ef5350",
    "#fff176",
    "#ffd54f",
    "#ff7043",
    "#ffa000",
];
class ArmMiniGame {
    constructor(thirdGuy, thirdWall, options = {}) {
        var _a;
        this.lastFrameTime = null;
        this.timeSinceLastAnimationFrame = 0;
        this.arms = new Map();
        this.colors = [];
        this.batons = new Map();
        this.destroyedBatonParticles = new Map(batonColors.map((color) => [color, new Map()]));
        this.playButtonPosition = {
            x: 0,
            y: 0,
        };
        this.gameState = "neverStarted";
        this.timeLeft = 30;
        this.score = 0;
        this.touches = new Map();
        this.updateStateAndDraw = (totalTimeElapsed) => {
            this.updateState(totalTimeElapsed);
            this.draw();
            requestAnimationFrame(this.updateStateAndDraw);
        };
        this.updateState = (totalTimeElapsed) => {
            const rect = this.thirdWall.getBoundingClientRect();
            const thirdWall = {
                left: rect.left + 8,
                width: rect.width,
                right: rect.right - 8,
                top: rect.top,
                bottom: rect.bottom,
            };
            const timeDifference = this.lastFrameTime == null ? 0 : totalTimeElapsed - this.lastFrameTime;
            this.lastFrameTime = totalTimeElapsed;
            const timeIncrement = timeDifference / 1000;
            this.timeLeft -= timeIncrement;
            this.timeSinceLastAnimationFrame += timeIncrement;
            if (this.timeSinceLastAnimationFrame > 0.08333333) {
                this.timeSinceLastAnimationFrame = 0;
                nextAnimationFrame(this.thirdGuy);
                nextArmAnimationFrame(this.thirdGuy);
            }
            this.thirdGuy.position.x =
                (thirdWall.right - thirdWall.left) / 2 + thirdWall.left;
            this.thirdGuy.position.y = thirdWall.top - 45;
            this.updateArmSegments(timeIncrement);
            this.playButtonPosition.x = rect.left + 25;
            this.playButtonPosition.y = rect.top + 45;
            if (this.gameState == "neverStarted") {
                return;
            }
            updateMiniGameBatons(this.arms, this.batons, this.thirdGuy, timeIncrement);
            for (const [, colorMap] of this.destroyedBatonParticles) {
                updateBatonParticles(colorMap, timeIncrement);
            }
            generateMiniGameBaton(this.gameState, this.timeLeft, this.batons, this.thirdGuy, this.width);
            this.checkForGameOver();
        };
        this.checkForGameOver = () => {
            if (this.gameState != "playing" || this.timeLeft > 0) {
                return;
            }
            this.timeLeft = 0;
            this.gameState = "over";
            for (const [, arm] of this.arms) {
                arm.dying = true;
                if (arm.caughtBaton) {
                    this.destroyBaton(arm.caughtBaton);
                    arm.caughtBaton = null;
                }
            }
            this.animationCanvas.style.pointerEvents = "none";
            this.animationCanvas.style.touchAction = "unset";
            for (const [, baton] of this.batons) {
                this.destroyBaton(baton);
            }
            this.batons.clear();
        };
        this.destroyBaton = (baton) => {
            const m = this.destroyedBatonParticles.get(baton.color);
            if (!m) {
                debugger;
                return;
            }
            for (const [particleKey, particle] of baton.batonParticles) {
                m.set(particleKey, particle);
            }
            for (let i = 0; i < 50; i++) {
                generateBatonParticles(m, baton, this.thirdGuy);
            }
        };
        this.draw = () => {
            this.context.clearRect(0, 0, this.width, this.height);
            this.drawStartButton();
            drawAnimatedCharacter(this.thirdGuy, this.context);
            if (this.gameState == "neverStarted") {
                return;
            }
            for (const [, { segments, drawFrame, colorIndex, caughtBaton }] of this
                .arms) {
                const color = this.colors[colorIndex];
                drawArmSegments(segments, drawFrame, color.image, color.framePositions, this.thirdGuy, this.context);
                if (caughtBaton) {
                    drawBaton(caughtBaton, this.thirdGuy, this.context);
                }
            }
            for (const [, baton] of this.batons) {
                drawBaton(baton, this.thirdGuy, this.context);
            }
            for (const [color, particles] of this.destroyedBatonParticles) {
                drawBatonParticles(color, particles, this.thirdGuy, this.context);
            }
            this.context.font = "36px monospace";
            this.context.fillStyle = batonColor;
            this.context.fillText(this.score.toString(), this.thirdGuy.position.x, this.thirdGuy.position.y);
            const a = Math.round(this.timeLeft);
            const b = Math.round((this.timeLeft * 10) % 10);
            const timeText = this.gameState == "over"
                ? "game over"
                : `${a < 10 ? `0${a}` : a}:${b == 10 ? "0" : b}`;
            this.context.fillText(timeText, 0, 100);
        };
        this.drawStartButton = () => {
            const text = {
                neverStarted: "Start",
                over: "Play again",
                playing: "Playing!",
            };
            this.context.font = "36px monospace";
            this.context.fillStyle = batonColor;
            this.context.fillText(text[this.gameState], this.playButtonPosition.x, this.playButtonPosition.y);
        };
        this.updateArmSegments = (timeIncrement) => {
            var _a, _b;
            for (const [key, arm] of this.arms) {
                if (!arm.dying) {
                    if (arm.caughtBaton) {
                        arm.drawFrame = Math.max(0, arm.drawFrame - 150 * timeIncrement);
                        if (arm.drawFrame == 0) {
                            this.arms.delete(key);
                            this.score++;
                            continue;
                        }
                        setBatonPositionToLastArmSegment(arm.caughtBaton, arm.segments, arm.drawFrame);
                        updateAndGenerateBatonParticles(arm.caughtBaton, this.thirdGuy, timeIncrement);
                        continue;
                    }
                    arm.livingTime += timeIncrement;
                    if (arm.livingTime > 2) {
                        arm.dying = true;
                        let minY = Infinity;
                        for (let i = 0; i < arm.drawFrame; i++) {
                            minY = Math.min(minY, arm.segments[i].position.y);
                        }
                        arm.dyingYThreshold = minY;
                    }
                    arm.drawFrame = Math.min(arm.segments.length - 1, arm.drawFrame + 300 * timeIncrement);
                    continue;
                }
                let minY = Infinity;
                let boolSomethingIsDying = false;
                for (let i = 0; i < arm.drawFrame; i++) {
                    const segment = arm.segments[i];
                    if (segment.position.y < arm.dyingYThreshold) {
                        segment.dying = true;
                    }
                    if (!segment.dying) {
                        continue;
                    }
                    const velocity = (_a = segment.velocity) !== null && _a !== void 0 ? _a : 10;
                    const velocityX = (_b = segment.velocityX) !== null && _b !== void 0 ? _b : 50 * (Math.random() - 0.5);
                    segment.position.y += velocity * timeIncrement;
                    segment.position.x += velocityX * timeIncrement;
                    segment.velocity = velocity + Math.random() * 150 * timeIncrement;
                    segment.velocityX = velocityX;
                    minY = Math.min(segment.position.y, minY);
                    boolSomethingIsDying = true;
                }
                if (boolSomethingIsDying &&
                    minY + this.thirdGuy.position.y > this.height) {
                    this.arms.delete(key);
                    continue;
                }
                arm.dyingYThreshold += arm.dyingYThresholdVelocity * timeIncrement;
                arm.dyingYThresholdVelocity += 150 * timeIncrement;
            }
        };
        this.onClick = (clientX, clientY) => {
            if (this.gameState != "playing" ||
                Array.from(this.arms.values()).filter(({ dying }) => !dying).length > 3) {
                return;
            }
            const x = clientX - this.thirdGuy.position.x;
            const y = clientY - this.thirdGuy.position.y;
            if (y > 32) {
                return;
            }
            const freshColors = this.colors.filter((_color, index) => {
                for (const [, { colorIndex }] of this.arms) {
                    if (index == colorIndex) {
                        return false;
                    }
                }
                return true;
            });
            const newArm = {
                segments: [],
                dying: false,
                drawFrame: 0,
                colorIndex: Math.floor(Math.random() * freshColors.length),
                dyingYThreshold: 10,
                caughtBaton: null,
                livingTime: 0,
                dyingYThresholdVelocity: 10,
            };
            createAllArmSegments(newArm.segments, {
                x: x - 32,
                y: y - 32,
            });
            this.arms.set(Math.random(), newArm);
        };
        this.setupMouseAndTouchListeners = () => {
            window.addEventListener("click", ({ clientX, clientY }) => this.onClick(clientX, clientY));
            window.addEventListener("touchstart", ({ changedTouches }) => {
                for (const touch of changedTouches) {
                    this.touches.set(touch.identifier, {
                        x: touch.clientX - this.thirdGuy.position.x,
                        y: touch.clientY - this.thirdGuy.position.y,
                    });
                }
            });
            window.addEventListener("touchend", ({ changedTouches }) => {
                let clicked = false;
                for (const touch of changedTouches) {
                    const oldTouch = this.touches.get(touch.identifier);
                    this.touches.delete(touch.identifier);
                    if (clicked || !oldTouch) {
                        continue;
                    }
                    const newX = touch.clientX - this.thirdGuy.position.x;
                    const newY = touch.clientY - this.thirdGuy.position.y;
                    if (Math.sqrt(Math.pow(newX - oldTouch.x, 2) + Math.pow(newY - oldTouch.y, 2)) > 10) {
                        continue;
                    }
                    clicked = true;
                    this.onClick(touch.clientX, touch.clientY);
                }
            });
        };
        this.onStart = () => {
            switch (this.gameState) {
                case "neverStarted":
                    this.gameState = "playing";
                    this.animationCanvas.style.pointerEvents = "auto";
                    this.animationCanvas.style.touchAction = "pan-x pan-y";
                    return;
                case "playing":
                    return;
                case "over":
                    this.gameState = "playing";
                    this.animationCanvas.style.pointerEvents = "auto";
                    this.animationCanvas.style.touchAction = "pan-x pan-y";
                    this.timeLeft = 30;
                    this.score = 0;
            }
        };
        this.thirdGuy = thirdGuy;
        this.thirdWall = thirdWall;
        this.thirdGuy.animState = {
            animation: guy3Animations.grabIdle,
            frame: 0,
            reverse: false,
            nextAnimation: [],
        };
        this.thirdGuy.drawArmSegments = true;
        const ratio = window.devicePixelRatio || 1;
        this.width = window.innerWidth > 0 ? window.innerWidth : screen.width;
        this.height = window.innerHeight > 0 ? window.innerHeight : screen.height;
        const maybeContext = (_a = options.context) !== null && _a !== void 0 ? _a : makeAnimationCanvas(this.width, this.height, ratio);
        if (!maybeContext) {
            throw new Error("Could not make Animation canvas");
        }
        this.context = maybeContext.context;
        this.animationCanvas = maybeContext.canvas;
        this.context.imageSmoothingEnabled = false;
        createTintedSpriteSheets(this.colors, this.thirdGuy, Object.values(guy3ArmSegmentType), armColors);
        this.setupMouseAndTouchListeners();
        requestAnimationFrame(this.updateStateAndDraw);
    }
}
const generateMiniGameBaton = (gameState, timeLeft, batons, referenceGuy, width) => {
    if (gameState != "playing" || Math.random() > 0.1) {
        return;
    }
    const goingDown = timeLeft > 18 ? true : Math.random() < 0.5;
    batons.set(Math.random(), {
        character: null,
        color: batonColors[Math.floor(Math.random() * batonColors.length)],
        position: {
            zRotation: 0,
            y: goingDown ? 0 - referenceGuy.position.y : 200,
            x: width * Math.random() - referenceGuy.position.x,
            frameNumber: 0,
            velocity: {
                x: 20 * (Math.random() - 0.5),
                y: (goingDown ? 1 : -1) * 30 * Math.random(),
                zRotation: Math.random() * 2,
            },
            relativeTo: referenceGuy,
        },
        batonParticles: new Map(),
        timeSinceLastParticleGenerated: 0,
        lineWidth: 3,
        height: 10,
    });
};
const updateMiniGameBatons = (arms, batons, referenceGuy, timeIncrement) => {
    const rectHitBoxes = getArmHitBoxes(arms);
    for (const [batonKey, baton] of batons) {
        const oldY = baton.position.y;
        const goingDown = baton.position.velocity.y > 0;
        updateBatonPhysics(baton, 0, (goingDown ? 1 : -1) * 150, timeIncrement);
        const x = baton.position.x;
        for (const [rectHitBoxKey, box] of rectHitBoxes) {
            if (!(x > box.left &&
                x < box.right &&
                ((goingDown &&
                    ((oldY < box.top && baton.position.y > box.top) ||
                        (oldY < box.bottom && baton.position.y > box.bottom))) ||
                    (!goingDown &&
                        ((oldY > box.bottom && baton.position.y < box.bottom) ||
                            (oldY > box.top && baton.position.y < box.top)))))) {
                continue;
            }
            box.arm.caughtBaton = baton;
            rectHitBoxes.delete(rectHitBoxKey);
            batons.delete(batonKey);
            break;
        }
        if (baton.position.y > 500 || baton.position.y < -2000) {
            batons.delete(batonKey);
            continue;
        }
        updateAndGenerateBatonParticles(baton, referenceGuy, timeIncrement);
    }
};
const createTintedSpriteSheets = (spriteSheets, original, animationsNames, colors) => {
    spriteSheets.push({
        image: original.image,
        framePositions: original.framePositions,
    });
    for (const color of colors) {
        const canvas = document.createElement("canvas");
        const width = animationsNames.length * 64;
        const height = 128 * 4;
        canvas.width = width;
        canvas.height = height;
        const context = canvas.getContext("2d");
        if (!context) {
            continue;
        }
        const framePositions = {};
        for (let i = 0; i < animationsNames.length; i++) {
            const type = animationsNames[i];
            const thisTypeFramePositions = [];
            for (let frame = 0; frame < 4; frame++) {
                const [x, y] = original.framePositions[type][frame];
                const dx = i * 64;
                const dy = frame * 64;
                context.drawImage(original.image, x, y, 64, 64, dx, dy, 64, 64);
                thisTypeFramePositions.push([dx, dy]);
            }
            framePositions[type] = thisTypeFramePositions;
        }
        context.globalCompositeOperation = "source-in";
        context.fillStyle = color;
        context.fillRect(0, 0, width, height);
        spriteSheets.push({
            image: canvas,
            framePositions,
        });
    }
};
const getArmHitBoxes = (arms) => {
    const rectHitBoxes = new Map();
    const boxSize = 15;
    for (const [, arm] of arms) {
        if (arm.dying || arm.caughtBaton) {
            continue;
        }
        const segment = arm.segments[Math.floor(arm.drawFrame)];
        if (!segment) {
            continue;
        }
        const { position } = segment;
        rectHitBoxes.set(Math.random(), {
            left: position.x + 32 - boxSize,
            right: position.x + 32 + boxSize,
            top: position.y + 32 - boxSize,
            bottom: position.y + 32 + boxSize,
            arm,
        });
    }
    return rectHitBoxes;
};
let armMiniGame = null;
const start = () => {
    if (!armMiniGame) {
        return;
    }
    armMiniGame.onStart();
};
window.onload = () => {
    var _a;
    const thirdGuyId = "third-guy";
    armMiniGame = new ArmMiniGame(new Guy3(), (_a = document.getElementById(thirdGuyId)) !== null && _a !== void 0 ? _a : document.createElement("div"));
};


  