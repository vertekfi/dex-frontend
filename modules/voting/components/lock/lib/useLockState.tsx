import { useState } from 'react';

type LockState = {
  lockAmount: string;
  lockEndDate: string;
};

export function useLockState() {
  const [lockState, setLockState] = useState<LockState>({
    lockAmount: '',
    lockEndDate: '',
  });

  function resetLockState() {
    setLockState({
      lockAmount: '',
      lockEndDate: lockState.lockEndDate || '',
    });
  }

  function setLockEndDate(lockEndDate: string) {
    setLockState({
      lockAmount: lockState.lockAmount,
      lockEndDate,
    });
  }

  return {
    ...lockState,
    resetLockState,
    setLockEndDate,
  };
}
