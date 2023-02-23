import { useState } from 'react';
import { LiquidityGauge } from '~/apollo/generated/graphql-codegen-generated';

export function useBribeState() {
  const [selectedGauge, setSelectedGauge] = useState<LiquidityGauge>();
  const [bribeAmount, setBribeAmount] = useState<number>();

  const isBribeStateValid = !!selectedGauge && !!bribeAmount;

  return {
    bribeAmount,
    selectedGauge,

    setBribeAmount,
    setSelectedGauge,

    isBribeStateValid,
  };
}
