import { addDays, isThursday, nextThursday, previousThursday, startOfDay } from 'date-fns';
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

  let lockEndDateTimestamp = 0;
  let isValidLockEndDate = false;

  if (lockEndDate) {
    lockEndDateTimestamp = startOfDay(new Date(Number(lockEndDate))).getTime();
    isValidLockEndDate =
      lockEndDateTimestamp >= minLockEndDateTimestamp &&
      lockEndDateTimestamp <= maxLockEndDateTimestamp;
  }

  let isExtendedLockEndDate = false;
  if (veBalLockInfo?.hasExistingLock && isValidLockEndDate) {
    isExtendedLockEndDate = true;
  } else {
    isExtendedLockEndDate = false;
  }

  return {
    todaysDate: toUtcTime(new Date()),
    isValidLockEndDate,
    isExtendedLockEndDate,
    minLockEndDateTimestamp,
    maxLockEndDateTimestamp,
  };
}
