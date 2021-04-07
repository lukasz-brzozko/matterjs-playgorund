type ShouldCanvasResetParams = {
  currentHeight: number,
  currentWidth: number,
  largeScreen: number,
  previousHeight: number,
  previousWidth: number,
};

const shouldCanvasReset = (
  {
    currentHeight,
    currentWidth,
    largeScreen,
    previousHeight,
    previousWidth,
  }:
  ShouldCanvasResetParams,
): boolean => {
  const widthHasChanged: boolean = previousWidth !== currentWidth;
  const heightHasChanged: boolean = previousHeight !== currentHeight;
  const windowDimensionIsGreaterThan = (
    breakpoint: number,
    windowDimension: number,
  ): boolean => (windowDimension > breakpoint);
  if (
    (
      (widthHasChanged || heightHasChanged)
            && (
              !windowDimensionIsGreaterThan(largeScreen, currentWidth)
                && (Math.abs(previousHeight - currentHeight) > 100)
            )
    )
        || (
          (widthHasChanged || heightHasChanged)
            && windowDimensionIsGreaterThan(largeScreen, currentWidth)
        )
        || (
          (widthHasChanged || heightHasChanged)
            && !windowDimensionIsGreaterThan(largeScreen, currentWidth)
            && windowDimensionIsGreaterThan(largeScreen, previousWidth)
        )

  ) {
    return true;
  }

  return false;
};
export default shouldCanvasReset;
