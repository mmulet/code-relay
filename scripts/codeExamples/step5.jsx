export const LoadingSpinner = () => (
  <div
    style={{
      width: 50,
      height: 50,
      position: "relative",
    }}
  >
    {[0, 1, 2, 3, 4].map((index) => (
      <div
        className="spin"
        style={{
          width: 50,
          height: 50,
          position: "absolute",
          animationDelay: `${
            index / 1.65
          }s`,
        }}
        key={index}
      >
        <Circle />
      </div>
    ))}
  </div>
);

export const Circle = () => (
  <div
    style={{
      width: 15,
      height: 15,
      backgroundColor: "#ff453a",
      borderRadius: "50%",
    }}
  ></div>
);
