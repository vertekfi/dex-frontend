import { useState } from 'react';

export function useLockState() {
  const [lockAmount, setLockAmount] = useState<string>();
  const [lockEndDate, setLockEndDate] = useState<number>();

  function resetLockState() {
    setLockAmount('');
    setLockEndDate(0);
  }

  return {
    lockAmount,
    lockEndDate,
    setLockAmount,
    setLockEndDate,
    resetLockState,
  };
}
