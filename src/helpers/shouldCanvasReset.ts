type ShouldCanvasResetParams = {
  previousHeight: number,
  previousWidth: number,
  largeScreen: number
};

const shouldCanvasReset = (
  {
    largeScreen,
    previousHeight,
    previousWidth,
  }:
  ShouldCanvasResetParams,
): boolean => {
  const widthHasChanged: boolean = previousWidth !== window.innerWidth;
  const heightHasChanged: boolean = previousHeight !== window.innerHeight;
  const windowDimensionIsGreaterThan = (
    breakpoint: number,
    windowDimension: number,
  ): boolean => (windowDimension > breakpoint);
  if (
    (
      (widthHasChanged || heightHasChanged)
            && (
              !windowDimensionIsGreaterThan(largeScreen, window.innerWidth)
                && (Math.abs(previousHeight - window.innerHeight) > 70)
            )
    )
        || (
          (widthHasChanged || heightHasChanged)
            && windowDimensionIsGreaterThan(largeScreen, window.innerWidth)
        )
        || (
          (widthHasChanged || heightHasChanged)
            && !windowDimensionIsGreaterThan(largeScreen, window.innerWidth)
            && windowDimensionIsGreaterThan(largeScreen, previousWidth)
        )

  ) {
    return true;
  }

  return false;
};
export default shouldCanvasReset;
