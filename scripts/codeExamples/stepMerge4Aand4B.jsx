export const LoadingSpinner = () => {
  /**
   * @Task Increase number of dots
   */
  return (
    <div className="spin">
      <Circle />
    </div>
  );
};

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
