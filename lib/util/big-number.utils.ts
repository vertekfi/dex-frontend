import BigNumber from 'bignumber.js';

export function bnum(val: string | number | BigNumber): BigNumber {
  const number = typeof val === 'string' ? val : val ? val.toString() : '0';
  return new BigNumber(number);
}

export function scale(input: BigNumber | string, decimalPlaces: number): BigNumber {
  const unscaled = typeof input === 'string' ? new BigNumber(input) : input;
  const scalePow = new BigNumber(decimalPlaces.toString());
  const scaleMul = new BigNumber(10).pow(scalePow);
  return unscaled.times(scaleMul);
}

export function scaleDown(input: BigNumber, decimalPlaces: number): BigNumber {
  const scalePow = new BigNumber(decimalPlaces.toString());
  const scaleMul = new BigNumber(10).pow(scalePow);
  return input.dividedBy(scaleMul);
}
