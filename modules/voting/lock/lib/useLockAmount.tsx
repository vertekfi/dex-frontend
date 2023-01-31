import { VeBalLockInfo } from '~/lib/services/balancer/contracts/veBAL';
import { bnum } from '~/lib/util/big-number.utils';

import { useLockState } from './useLockState';

export default function useLockAmount(veBalLockInfo?: VeBalLockInfo) {
  const { lockAmount } = useLockState();

  const isValidLockAmount = bnum(lockAmount || '0').gt(0);
  const isIncreasedLockAmount = veBalLockInfo?.hasExistingLock && isValidLockAmount;

  let totalLpTokens;
  if (veBalLockInfo?.hasExistingLock) {
    totalLpTokens = bnum(veBalLockInfo?.lockedAmount)
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
