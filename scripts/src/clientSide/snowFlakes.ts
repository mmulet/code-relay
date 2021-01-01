const updateSnowFlakes = (
  snowFlakes: Map<number, SnowFlake>,
  timeIncrement: number,
  width: number,
  height: number,
  snowBoxes: Wall[],
  touches: Map<number, MouseOrTouchInput>,
  mouse: MouseOrTouchInput | null
) => {
  const snowWalls = (Object.values(snowBoxes) as Wall[]).filter(
    ({ top }) => top > 0 && top < height
  );

  const snowflakeFrictionComponent = timeIncrement * 3;

  for (const [key, snowFlake] of snowFlakes) {
    for (const [, input] of touches) {
      addTouchToSnowflakeVelocity(snowFlake, input);
    }
    if (mouse) {
      addTouchToSnowflakeVelocity(snowFlake, mouse);
    }

    const newY =
      snowFlake.y +
      timeIncrement * snowFlake.speed +
      timeIncrement * snowFlake.velocityY;
    let blocked = false;

    for (const wall of snowWalls) {
      if (
        !(
          snowFlake.y == wall.top ||
          (snowFlake.y < wall.top && newY >= wall.top)
        )
      ) {
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
    } else {
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

const addTouchToSnowflakeVelocity = (
  snowFlake: SnowFlake,
  { left, right, bottom, top, difference }: MouseOrTouchInput
) => {
  if (difference == null) {
    return;
  }
  if (
    !(
      snowFlake.x >= left &&
      snowFlake.x <= right &&
      snowFlake.y >= top &&
      snowFlake.y <= bottom
    )
  ) {
    return;
  }
  const speedLimit = 60;
  snowFlake.velocityY = Math.max(
    -speedLimit,
    Math.min(speedLimit, difference.y)
  );
  snowFlake.velocityX = Math.max(
    -speedLimit,
    Math.min(speedLimit, difference.x * 4)
  );
};

const drawSnowFlakes = (
  snowFlakes: Map<number, SnowFlake>,
  context: CanvasRenderingContext2D
) => {
  context.fillStyle = "white";
  for (const [, snowFlake] of snowFlakes) {
    context.fillRect(snowFlake.x, snowFlake.y, snowFlake.size, snowFlake.size);
  }
};
