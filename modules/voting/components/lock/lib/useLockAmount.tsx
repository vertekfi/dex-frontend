import { useEffect, useState } from 'react';
import { VeBalLockInfo } from '~/lib/services/balancer/contracts/veBAL';
import { bnum } from '~/lib/util/big-number.utils';
import { useLockState } from './useLockState';

export function useLockAmount(veBalLockInfo?: VeBalLockInfo) {
  const [isValidLockAmount, setIsValidLockAmount] = useState<boolean>();
  const [isIncreasedLockAmount, setIsIncreasedLockAmount] = useState<boolean>();
  const [totalLpTokens, setTotalLpTokens] = useState<string>();

  const { lockAmount } = useLockState();

  useEffect(() => {
    if (lockAmount) {
      setIsValidLockAmount(bnum(lockAmount || '0').gt(0));
    }
  }, [lockAmount]);

  useEffect(() => {
    if (veBalLockInfo && isValidLockAmount) {
      setIsIncreasedLockAmount(veBalLockInfo.hasExistingLock && isValidLockAmount);
    }
  }, [veBalLockInfo, isValidLockAmount]);

  useEffect(() => {
    if (veBalLockInfo) {
      const amount = veBalLockInfo.hasExistingLock
        ? bnum(veBalLockInfo.lockedAmount)
            .plus(lockAmount || '0')
            .toString()
        : lockAmount || '0';
      setTotalLpTokens(amount);
    }
  }, [veBalLockInfo, lockAmount]);

  return {
    isValidLockAmount,
    isIncreasedLockAmount,
    totalLpTokens,
  };
}
