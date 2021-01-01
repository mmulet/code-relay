interface MouseOrTouchInput {
  left: number;
  right: number;
  top: number;
  bottom: number;
  clientX: number;
  clientY: number;
  difference: {
    x: number;
    y: number;
  } | null;
}
