import { useState } from 'react';
import { bnum } from '~/lib/util/big-number.utils';

export default function useLockAmount(veBalLockInfo?: {
  hasExistingLock: boolean;
  lockedAmount?: string;
}) {
  const [lockAmount, setLockAmount] = useState<string>('');

  const isValidLockAmount = lockAmount && Number(lockAmount) > 0;
  const isIncreasedLockAmount = veBalLockInfo?.hasExistingLock && isValidLockAmount;

  let totalLpTokens = '';
  if (veBalLockInfo?.hasExistingLock && veBalLockInfo?.lockedAmount) {
    totalLpTokens = bnum(veBalLockInfo.lockedAmount)
      .plus(lockAmount || '0')
      .toString();
  } else {
    totalLpTokens = lockAmount || '0';
  }

  function resetLockAmount() {
    setLockAmount('');
  }

  return {
    lockAmount,

    isValidLockAmount,
    isIncreasedLockAmount,
    totalLpTokens,

    setLockAmount,
    resetLockAmount,
  };
}
