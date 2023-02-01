import { bnum } from '~/lib/util/big-number.utils';

import { useLockState } from './useLockState';

export default function useLockAmount(veBalLockInfo: {
  hasExistingLock: boolean;
  lockedAmount?: string;
}) {
  const { lockAmount } = useLockState();

  const isValidLockAmount = bnum(lockAmount || '0').gt(0);
  const isIncreasedLockAmount = veBalLockInfo?.hasExistingLock && isValidLockAmount;

  let totalLpTokens;
  if (veBalLockInfo.hasExistingLock && veBalLockInfo.lockedAmount) {
    totalLpTokens = bnum(veBalLockInfo.lockedAmount)
      .plus(lockAmount || '0')
      .toString();
  } else {
    totalLpTokens = lockAmount || '0';
  }

  return {
    isValidLockAmount,
    isIncreasedLockAmount,
    totalLpTokens,
  };
}
