import { addDays, isThursday, nextThursday, previousThursday, startOfDay } from 'date-fns';
import { useState } from 'react';
import { toUtcTime } from '~/lib/util/time';
import { MAX_LOCK_PERIOD_IN_DAYS, MIN_LOCK_PERIOD_IN_DAYS } from '~/modules/voting/constants';

function getMaxLockEndDateTimestamp(date: number) {
  const maxLockTimestamp = addDays(date, MAX_LOCK_PERIOD_IN_DAYS);

  const timestamp = isThursday(maxLockTimestamp)
    ? maxLockTimestamp
    : previousThursday(maxLockTimestamp);

  return startOfDay(timestamp).getTime();
}

export function useLockEndDate(veBalLockInfo: { hasExistingLock: boolean; lockedEndDate: number }) {
  const [lockDate, setLockDate] = useState<string>('');

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

  let isValidLockEndDate = false;
  if (lockDate) {
    console.log('lock date changed: ' + lockDate);
    const lockEndDateTimestamp = startOfDay(new Date(Number(lockDate))).getTime();
    isValidLockEndDate =
      lockEndDateTimestamp >= minLockEndDateTimestamp &&
      lockEndDateTimestamp <= maxLockEndDateTimestamp;

    console.log('lockEndDateTimestamp: ' + lockEndDateTimestamp);
    console.log('minLockEndDateTimestamp: ' + minLockEndDateTimestamp);
    console.log('maxLockEndDateTimestamp: ' + maxLockEndDateTimestamp);
    console.log('lock date valid?: ' + isValidLockEndDate);
  }

  let isExtendedLockEndDate = false;
  if (veBalLockInfo?.hasExistingLock && isValidLockEndDate) {
    isExtendedLockEndDate = true;
  } else {
    isExtendedLockEndDate = false;
  }

  return {
    lockDate,
    setLockDate,
    todaysDate: toUtcTime(new Date()),
    isValidLockEndDate,
    isExtendedLockEndDate,
    minLockEndDateTimestamp,
    maxLockEndDateTimestamp,
  };
}
