export const LoadingSpinner = () => (
  <div className="spin">
    <Circle />
  </div>
);

export const Circle = () => (
  /**
   * @MergeTask Replace with a circle
   */
  <div
    style={{
      width: 15,
      height: 15,
      backgroundColor: "#ff453a",
    }}
  ></div>
);
