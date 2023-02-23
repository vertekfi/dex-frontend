import { useState } from 'react';

export function useBribeState() {
  const [selectedGaugeAddress, setSelectedGaugeAddress] = useState<string>();
  const [bribeAmount, setBribeAmount] = useState<number>();

  const isBribeStateValid = !!selectedGaugeAddress && !!bribeAmount;

  return {
    setBribeAmount,
    setSelectedGaugeAddress,

    isBribeStateValid,
  };
}
