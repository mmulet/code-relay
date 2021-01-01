export const LoadingSpinner = () => (
  /**
   * @TaskInProgress:
   *      Make this circle spin
   *      using css animations
   */
  <Circle />
);

export const Circle = () => (
  <div
    style={{
      width: 25,
      height: 25,
      backgroundColor: "#ff453a",
      borderRadius: "50%",
    }}
  ></div>
);
