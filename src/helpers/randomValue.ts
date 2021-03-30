const randomValue = (min: number, max: number, float = false): number => {
  const randomNumber = Math.random() * max;
  if (float) {
    const floatNumber = parseFloat(randomNumber.toFixed(2));

    return (floatNumber + min);
  }

  return Math.floor(randomNumber) + min;
};
export default randomValue;
