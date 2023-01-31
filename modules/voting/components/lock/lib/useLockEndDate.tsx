import { addDays, isThursday, nextThursday, previousThursday, startOfDay } from 'date-fns';
import { useEffect, useState } from 'react';
import { VeBalLockInfo } from '~/lib/services/balancer/contracts/veBAL';
import { toUtcTime } from '~/lib/util/time';
import { MAX_LOCK_PERIOD_IN_DAYS, MIN_LOCK_PERIOD_IN_DAYS } from '~/modules/voting/constants';
import { useLockState } from './useLockState';

function getMaxLockEndDateTimestamp(date: number) {
  const maxLockTimestamp = addDays(date, MAX_LOCK_PERIOD_IN_DAYS);

  const timestamp = isThursday(maxLockTimestamp)
    ? maxLockTimestamp
    : previousThursday(maxLockTimestamp);

  return startOfDay(timestamp).getTime();
}

export function useLockEndDate(veBalLockInfo?: VeBalLockInfo) {
  const [lockEndDateTimestamp, setLockEndDateTimestamp] = useState<number>();
  const [isValidLockEndDate, setIsValidLockEndDate] = useState<boolean>();
  const [isExtendedLockEndDate, setIsExtendedLockEndDate] = useState<boolean>();

  const todaysDate = toUtcTime(new Date());

  const minLockEndDateTimestamp = startOfDay(
    nextThursday(
      addDays(
        veBalLockInfo?.hasExistingLock ? veBalLockInfo.lockedEndDate : todaysDate,
        MIN_LOCK_PERIOD_IN_DAYS,
      ),
    ),
  ).getTime();

  const maxLockEndDateTimestamp = getMaxLockEndDateTimestamp(todaysDate);

  const { lockEndDate } = useLockState();

  useEffect(() => {
    lockEndDate === '' ? setLockEndDateTimestamp(0) : startOfDay(new Date(lockEndDate)).getTime();
  }, [lockEndDate]);

  useEffect(() => {
    if (lockEndDateTimestamp && lockEndDateTimestamp !== 0) {
      setIsValidLockEndDate(
        lockEndDateTimestamp >= minLockEndDateTimestamp &&
          lockEndDateTimestamp <= maxLockEndDateTimestamp,
      );
    }
  }, [lockEndDateTimestamp]);

  useEffect(() => {
    if (veBalLockInfo?.hasExistingLock && isValidLockEndDate) {
      setIsExtendedLockEndDate(true);
    } else {
      setIsExtendedLockEndDate(false);
    }
  }, [isValidLockEndDate, veBalLockInfo]);

  return {
    isValidLockEndDate,
    isExtendedLockEndDate,
    minLockEndDateTimestamp,
    maxLockEndDateTimestamp,
  };
}
