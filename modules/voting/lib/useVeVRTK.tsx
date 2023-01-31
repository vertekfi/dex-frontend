import { differenceInSeconds, sub } from 'date-fns';
import { networkConfig } from '~/lib/config/network-config';
import { useGetTokens } from '~/lib/global/useToken';
import { getPreviousThursday, oneYearInSecs } from '~/lib/util/time';
import { useUserBalances } from '~/lib/user/useUserBalances';
import { bnum } from '~/lib/util/big-number.utils';
import { useState } from 'react';

/**
 * @summary Calculate expected veBAL given BPT being locked and lock time in seconds.
 * @param {string} bpt - BPT amount being locked up
 * @param {str} lockDateStr - Date in string format used to create Date of lock
 */
export function expectedVeBal(bpt: string, lockDateStr: string): string {
  const now = new Date();
  const lockDate = new Date(lockDateStr);
  const previousThursdayBeforeLockDate = getPreviousThursday(lockDate);
  const lockTime = differenceInSeconds(previousThursdayBeforeLockDate, now);

  return bnum(bpt).times(lockTime).div(oneYearInSecs).toString();
}

/**
 * @summary Get date object of previous epoch given number of weeks to go back.
 * @param {number} weeksToGoBack - Number of weeks to go back for epoch, if 0
 * gets the immediate epoch in the past. If 1, gets the week before that and so on.
 */
export function getPreviousEpoch(weeksToGoBack = 0): Date {
  const now = new Date();
  const todayAtMidnightUTC = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());

  let daysSinceThursday = now.getDay() - 4;
  if (daysSinceThursday < 0) daysSinceThursday += 7;

  daysSinceThursday = daysSinceThursday + weeksToGoBack * 7;

  return sub(todayAtMidnightUTC, {
    days: daysSinceThursday,
  });
}

export function useVeVRTK() {
  const [showRedirectModal, setShowRedirectModal] = useState<Boolean>();

  const { getToken } = useGetTokens();
  const { getUserBalance } = useUserBalances([]);

  return {
    veBalBalance: getUserBalance(networkConfig.balancer.votingEscrow.veAddress),
    lockablePoolId: networkConfig.balancer.votingEscrow.lockablePoolId,
    veBalTokenInfo: getToken(networkConfig.balancer.votingEscrow.veAddress),
    setShowRedirectModal,
  };
}
