function getFatorialFrom(value) {
  //5! => 5 * 4 * 3 * 2 * 1
  if (value <= 1) {
    return 1;
  }

  return value * getFatorialFrom(value - 1);
}

export function getCalculationsFrom(value) {
  const square = value ** 2;
  const squareRoot = Math.sqrt(value);
  const fatorial = getFatorialFrom(value);

  return { square, squareRoot, fatorial };
}
