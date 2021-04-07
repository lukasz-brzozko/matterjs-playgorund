type ShouldCanvasResetParams = {
  currentHeight: number,
  currentWidth: number,
  previousHeight: number,
  previousWidth: number,
};

const shouldCanvasReset = (
  {
    currentHeight,
    currentWidth,
    previousHeight,
    previousWidth,
  }:
  ShouldCanvasResetParams,
): boolean => {
  const widthHasChanged: boolean = previousWidth !== currentWidth;
  const heightHasChanged: boolean = previousHeight !== currentHeight;
  if (
    (widthHasChanged || heightHasChanged)
      && (
        (Math.abs(previousHeight - currentHeight) > 5)
        || (Math.abs(previousWidth - currentWidth) > 0)
      )

  ) {
    return true;
  }

  return false;
};
export default shouldCanvasReset;
