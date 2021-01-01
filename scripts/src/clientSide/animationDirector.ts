type AnimationDirectorState =
  | "guy1"
  | "drop1To2"
  | "guy2"
  | "drop2To3"
  | "grab3WaitForScroll"
  | "grabBackwards3"
  | "guy3"
  | "drop3To5"
  | "physicsOrbit5"
  | "physicsThrowLeft5"
  | "physicsFallIntoTheGround"
  | "waitForGuy6Scroll"
  | "guy6Digging"
  | "guy6Climb"
  | "final";

/**
 * The animation director is the function that will
 * coordinate all the state,position,
 * and animation changes. This is the core of the animation.
 * This function could be considered, the *script* of the
 * animation
 */
const animationDirector = (
  baton: Baton,
  characters: Characters,
  walls: Walls,
  height: number,
  timeIncrement: number,
  animationDirectorState: AnimationDirectorState
): AnimationDirectorState => {
  switch (animationDirectorState) {
    case "guy1": {
      /**
       * We will convert to the first drop after guy1 drops the baton
       */
      const { firstGuy } = characters;
      const {
        animState: { animation, frame },
      } = firstGuy;

      if (
        animation == guy1Animations.tossIdle &&
        !havePendingAnimations(firstGuy)
      ) {
        const { firstGuyWall } = walls;
        if (firstGuyWall.top < height / 2) {
          firstGuy.animState.nextAnimation.unshift(
            guy1Animations.idle,
            guy1Animations.drop
          );
          const { look } = characters;
          if (document.URL.indexOf("#") <= -1) {
            /**
             * Show the look only if the user comes from the main page.
             * If they come from an anchor or fragment, don't bother
             * them with the look
             */
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
      /**
       * So we will drop(have Pending Animation), but the animation will
       * not yet be visible. (firstWall.top < 60).
       * Hold the animation up, to give the user some time to realize, that
       * they have to scroll up to see something. But, if it takes too
       * much time, play the animation anyways.
       */
      if (
        havePendingAnimations(firstGuy) &&
        firstGuyWall.top < 60 &&
        firstGuy.animationHoldTime < 5
      ) {
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

      /**
       * 10 is the last frame position, check guy1.ts batonPositions
       */
      if (animation != guy1Animations.drop || frame <= 10) {
        return animationDirectorState;
      }

      const { secondGuy, look } = characters;
      look.animState = {
        animation: guy1Animations.lookArrowShrink,
        frame: guy1FramePositions[guy1Animations.lookArrowShrink]!.length - 1,
        reverse: true,
        nextAnimation: ["hide"],
      };
      transferBatonPositionFromAnimatedStateToPhysicsBasedPosition(
        baton,
        guy1Animations.drop,
        10
      );
      transferBatonBetweenCoordinatesSystems(baton, secondGuy);
      baton.position.frameNumber = 0;

      /*
       * we are going to play with the animation timing
       * such that, the baton will fall
       * directly into the second guy's hand
       */
      const framesLeftInCurrentAnimation =
        secondGuy.framePositions[secondGuy.animState.animation].length -
        secondGuy.animState.frame;
      const secondsUntilGrab = (framesLeftInCurrentAnimation + 11) * 0.0833333;
      /**
       * 11 is the frame where he catches it
       */
      const { y: goalY, zRotation: goalZRotation } = secondGuy.batonPosition![
        guy2Animations.grab
      ]![11]!;
      const velocityY =
        (goalY -
          0.5 * batonAcceleration * Math.pow(secondsUntilGrab, 2) -
          baton.position.y) /
        secondsUntilGrab;

      const zRotationVelocity =
        (goalZRotation - baton.position.zRotation) / secondsUntilGrab;
      baton.position.velocity = {
        x: 0,
        y: velocityY,
        zRotation: zRotationVelocity,
      };

      secondGuy.animState.nextAnimation.unshift(
        guy2Animations.batonIdle,
        guy2Animations.grab
      );

      return animationDirector(
        baton,
        characters,
        walls,
        height,
        timeIncrement,
        "drop1To2"
      );
    }
    case "drop1To2": {
      const { secondGuy } = characters;

      if (
        baton.position.y < secondGuy.batonPosition![guy2Animations.grab]![11]!.y
      ) {
        updateBatonPhysics(baton, 0, batonAcceleration, timeIncrement);
        baton.position.frameNumber++;
        return animationDirectorState;
      }

      if (
        !(
          secondGuy.animState.animation == guy2Animations.grab &&
          secondGuy.animState.frame >= 11
        )
      ) {
        /**
         * If we are are the desired position but
         * the animation is not there yet,
         * then just wait
         */
        baton.character = secondGuy;
        transferBatonPositionFromAnimatedStateToPhysicsBasedPosition(
          baton,
          guy2Animations.grab,
          11
        );
        return animationDirectorState;
      }
      baton.character = secondGuy;
      return animationDirector(
        baton,
        characters,
        walls,
        height,
        timeIncrement,
        "guy2"
      );
    }
    case "guy2": {
      /**
       * We will convert to the first drop after guy1 drops the baton
       */
      const { secondGuy, thirdGuy } = characters;

      const {
        animState: { animation, frame },
      } = secondGuy;

      if (
        secondGuy.animState.animation == guy2Animations.batonIdle &&
        !havePendingAnimations(secondGuy)
      ) {
        const { secondGuyWall } = walls;
        if (secondGuyWall.top < height / 2) {
          secondGuy.animState.nextAnimation.unshift(
            guy2Animations.idleAfter,
            guy2Animations.drop
          );
        }
      }

      if (
        !havePendingAnimations(thirdGuy) &&
        animation == guy2Animations.drop &&
        frame == 5
      ) {
        /**
         * Start the grab animation
         */
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
      transferBatonPositionFromAnimatedStateToPhysicsBasedPosition(
        baton,
        guy2Animations.drop,
        14
      );
      transferBatonBetweenCoordinatesSystems(baton, thirdGuy);
      baton.position.frameNumber = 0;
      baton.position.velocity = {
        x: thirdGuy.position.x - secondGuy.position.x,
        y: 150,
        zRotation: -Math.PI,
      };
      const goal = -100;
      const { seconds, x, y } = secondsUntilGoal(
        baton,
        goal,
        0,
        batonAcceleration
      );
      createAllArmSegments(thirdGuy.armSegments, {
        x: x - 32,
        y: y - 32,
      });
      thirdGuy.armDrawFramesPerSecond = thirdGuy.armSegments.length / seconds;
      thirdGuy.drawArmSegments = true;
      return animationDirector(
        baton,
        characters,
        walls,
        height,
        timeIncrement,
        "drop2To3"
      );
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

      /**
       * Let's reverse the whole thing in one second
       */
      thirdGuy.armDrawFramesPerSecond = thirdGuy.armSegments.length / 3;
      thirdGuy.armSegmentsDrawFrame = thirdGuy.armSegments.length - 1;

      setBatonPositionToLastArmSegment(
        baton,
        thirdGuy.armSegments,
        thirdGuy.armSegmentsDrawFrame
      );
      return animationDirector(
        baton,
        characters,
        walls,
        height,
        timeIncrement,
        "grab3WaitForScroll"
      );
    }
    case "grab3WaitForScroll": {
      if (walls.thirdGuyWall.top > height / 2) {
        return animationDirectorState;
      }
      return animationDirector(
        baton,
        characters,
        walls,
        height,
        timeIncrement,
        "grabBackwards3"
      );
    }
    case "grabBackwards3": {
      const { thirdGuy } = characters;

      thirdGuy.armSegmentsDrawFrame -=
        thirdGuy.armDrawFramesPerSecond * timeIncrement;
      if (thirdGuy.armSegmentsDrawFrame >= 0) {
        setBatonPositionToLastArmSegment(
          baton,
          thirdGuy.armSegments,
          thirdGuy.armSegmentsDrawFrame
        );
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
      return animationDirector(
        baton,
        characters,
        walls,
        height,
        timeIncrement,
        "guy3"
      );
    }
    case "guy3": {
      const { thirdGuy } = characters;

      if (
        thirdGuy.animState.animation == guy3Animations.grabIdle &&
        !havePendingAnimations(thirdGuy)
      ) {
        if (walls.thirdGuyWall.top < height / 2) {
          thirdGuy.animState.nextAnimation.unshift(
            guy3Animations.idleAfter,
            guy3Animations.drop
          );
          return animationDirectorState;
        }
      }
      if (
        !(
          thirdGuy.animState.animation == guy3Animations.drop &&
          thirdGuy.animState.frame >= 7
        )
      ) {
        return animationDirectorState;
      }
      const { fourthGuy, fifthGuy } = characters;

      transferBatonPositionFromAnimatedStateToPhysicsBasedPosition(
        baton,
        guy3Animations.drop,
        6
      );
      /**
       * We skip the fourth guy because
       * he nopes out
       */
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

      /**
       * Z rotation should be 0 at the goal
       */
      baton.position.velocity.zRotation =
        (0 - baton.position.zRotation) / seconds;

      return animationDirector(
        baton,
        characters,
        walls,
        height,
        timeIncrement,
        "drop3To5"
      );
    }
    case "drop3To5": {
      /**
       * guy5 is tele-kinetic. Physics wise, this means
       * he should exert a gravitational force on the baton
       * then orbit him, All baton coordinates
       */
      updateBatonPhysics(baton, 0, batonAcceleration, timeIncrement);

      if (baton.position.y < 32) {
        return animationDirectorState;
      }
      const { fifthGuy } = characters;

      /**
       * We are orbiting the fifth guy,
       * so convert everything to polar coordinates.
       * 32 is the center of the sprite,
       * it's where the psychic guy's head is,
       * that's where we should orbit
       */
      fifthGuy.batonRadius = Math.sqrt(
        Math.pow(baton.position.x - 32, 2) + Math.pow(baton.position.y - 32, 2)
      );
      fifthGuy.originalRadius = fifthGuy.batonRadius;
      fifthGuy.angularVelocity = 2;
      return animationDirector(
        baton,
        characters,
        walls,
        height,
        timeIncrement,
        "physicsOrbit5"
      );
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
      fifthGuy.angularVelocity = 5; //15;

      return animationDirector(
        baton,
        characters,
        walls,
        height,
        timeIncrement,
        "physicsThrowLeft5"
      );
    }
    case "physicsThrowLeft5": {
      const { fifthGuy } = characters;

      updateBatonOrbit(
        baton,
        120,
        true,
        fifthGuy.angularVelocity,
        fifthGuy,
        timeIncrement
      );

      if (baton.position.zRotation < fifthGuy.throwZRotationGoal) {
        return animationDirectorState;
      }
      const { sixthGuy } = characters;
      transferBatonBetweenCoordinatesSystems(baton, sixthGuy);

      baton.position.velocity.zRotation = 15;
      baton.position.velocity.x = 0; //-600;
      baton.position.velocity.y = 600;
      return animationDirector(
        baton,
        characters,
        walls,
        height,
        timeIncrement,
        "physicsFallIntoTheGround"
      );
    }
    case "physicsFallIntoTheGround": {
      updateBatonPhysics(baton, 0, batonAcceleration, timeIncrement);
      /**
       * 64 plus some room
       */
      if (baton.position.y < 55) {
        return animationDirectorState;
      }

      const { sixthGuy } = characters;

      /**
       * The impact crater
       */
      for (let i = 0; i < 250; i++) {
        generateDirtParticle(sixthGuy, {
          relativeX: baton.position.x + Math.random() * 10 - 5,
          relativeY: 64 - 10,
        });
      }
      baton.position.x = 1000000;
      baton.position.y = 1000000;

      return animationDirector(
        baton,
        characters,
        walls,
        height,
        timeIncrement,
        "waitForGuy6Scroll"
      );
    }
    case "waitForGuy6Scroll": {
      const { sixthGuy } = characters;

      updateDirtParticle(sixthGuy, timeIncrement, walls);
      sixthGuy.timeSinceBatonCrashed += timeIncrement;
      if (
        sixthGuy.timeSinceBatonCrashed < 2.5 ||
        walls.sixthGuyWall.top > height / 2
      ) {
        return animationDirectorState;
      }
      return animationDirector(
        baton,
        characters,
        walls,
        height,
        timeIncrement,
        "guy6Digging"
      );
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
      return animationDirector(
        baton,
        characters,
        walls,
        height,
        timeIncrement,
        "guy6Climb"
      );
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
      return animationDirector(
        baton,
        characters,
        walls,
        height,
        timeIncrement,
        "final"
      );
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
const neverDefault = (_x: never) => {
  debugger;
};

const drawAnimationDirectorDirectedState = (
  context: CanvasRenderingContext2D,
  baton: Baton,
  characters: Characters,
  animationDirectorState: AnimationDirectorState
) => {
  drawArmSegments(
    characters.thirdGuy.armSegments,
    characters.thirdGuy.armSegmentsDrawFrame,
    characters.thirdGuy.image,
    characters.thirdGuy.framePositions,
    characters.thirdGuy,
    context
  );
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

        context.ellipse(
          batonPosition.x,
          batonPosition.y,
          10,
          10,
          0,
          0,
          2 * Math.PI
        );
        context.lineWidth = 2;
        context.stroke();
        context.strokeStyle = "rgb(187,222,251)";
        drawLighting(
          {
            x: fifthGuy.position.x + 32,
            y: fifthGuy.position.y + 32,
          },
          batonPosition,
          fifthGuy.lightningSegments,
          context
        );
      }
      break;

    default:
      break;
  }
};

/**
 * Find the number of seconds to the goalY,
 * as well as the x positions at the goal
 * using the kinematic equations
 */
const secondsUntilGoal = (
  baton: Baton,
  goalY: number,
  accelerationX: number,
  accelerationY: number
) => {
  const term2 =
    Math.pow(baton.position.velocity.y, 2) -
    2 * accelerationY * (baton.position.y - goalY);
  if (term2 < 0) {
    debugger;
    /**
     * something is seriously wrong
     * let's just return junk data
     */
    return {
      seconds: 0,
      x: baton.position.x,
      y: goalY,
    };
  }
  const s = Math.sqrt(term2);
  const maybeSeconds = (-baton.position.velocity.y + s) / accelerationY;
  const seconds =
    maybeSeconds >= 0
      ? maybeSeconds
      : (-baton.position.velocity.y - s) / accelerationY;

  const x =
    0.5 * accelerationX * Math.pow(seconds, 2) +
    baton.position.velocity.x * seconds +
    baton.position.x;
  return {
    seconds,
    x,
    y: goalY,
  };
};
