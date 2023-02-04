import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { useUserData } from '~/lib/user/useUserData';
import { networkConfig } from '~/lib/config/network-config';
import { useUserAccount } from '~/lib/user/useUserAccount';
import { differenceInDays, differenceInSeconds, format, sub } from 'date-fns';
import { PRETTY_DATE_FORMAT } from '../constants';
import { numberFormatUSDValue } from '~/lib/util/number-formats';
import { tokenFormatAmount } from '~/lib/services/token/token-util';
import {
  useGetPoolQuery,
  useGetUserVeLockInfoQuery,
} from '~/apollo/generated/graphql-codegen-generated';
import { bnum } from '~/lib/util/big-number.utils';
import { getPreviousThursday, oneYearInSecs } from '~/lib/util/time';

export function _useUserVotingData() {
  const [userLockablePoolBalance, setUserLockablePoolBalance] = useState<string>();
  const [userLockablePoolBalanceUSD, setUserLockablePoolBalanceUSD] = useState<string>();
  const [lockedUntilDays, setLockedUntilDays] = useState<number>();
  const [lockedUntilDate, setLockedUntilDate] = useState<string>();
  const [lockedBalance, setLockedBalance] = useState<string>();
  const [lockedBalanceUSD, setLockedBalanceUSD] = useState<string>();
  const [hasExistingLock, setHasExistingLock] = useState<boolean>();
  const [currentVeBalance, setcurrentVeBalance] = useState<string>();

  const { isConnected } = useUserAccount();

  const {
    loading: isLoadingUserBalances,
    bptBalanceForPool,
    usdBalanceForPool,
    usdBalanceForPoolAmount,
  } = useUserData();

  const {
    data: userVeLockInfo,
    loading: isLoadingUserVeData,
    error: veError,
    refetch: refetchUserVeData,
  } = useGetUserVeLockInfoQuery({
    pollInterval: 10000,
  });

  const { loading: isLoadingPool, data: poolData } = useGetPoolQuery({
    variables: {
      id: networkConfig.balancer.votingEscrow.lockablePoolId,
    },
  });

  useEffect(() => {
    if (veError) {
      console.log(veError);
    }
  }, [veError]);

  useEffect(() => {
    if (isConnected && !isLoadingUserBalances) {
      setUserLockablePoolBalance(
        bptBalanceForPool(networkConfig.balancer.votingEscrow.lockablePoolId),
      );
      setUserLockablePoolBalanceUSD(
        numberFormatUSDValue(usdBalanceForPool(networkConfig.balancer.votingEscrow.lockablePoolId)),
      );
    }
  }, [isConnected, isLoadingUserBalances]);

  // Set UI format of user current lock time
  useEffect(() => {
    if (isConnected && !isLoadingUserVeData && userVeLockInfo?.userGetVeLockInfo) {
      const endDate = Number(userVeLockInfo.userGetVeLockInfo.lockEndDate);
      const hasLock = endDate > 0;
      const lockedUntilDays = !hasLock ? 0 : differenceInDays(new Date(endDate), new Date());
      const lockedUntilDate = !hasLock ? '-' : format(endDate, PRETTY_DATE_FORMAT);
      setLockedUntilDays(lockedUntilDays);
      setLockedUntilDate(lockedUntilDate);
      setLockedBalanceUSD(
        !hasLock
          ? '0'
          : numberFormatUSDValue(
              usdBalanceForPoolAmount(
                networkConfig.balancer.votingEscrow.lockablePoolId,
                userVeLockInfo.userGetVeLockInfo.lockedAmount,
              ),
            ),
      );
      setLockedBalance(userVeLockInfo?.userGetVeLockInfo.lockedAmount);
      setHasExistingLock(hasLock);
      setcurrentVeBalance(tokenFormatAmount(userVeLockInfo?.userGetVeLockInfo.currentBalance));
    }
  }, [userVeLockInfo, isLoadingUserVeData, isConnected]);

  /**
   * ~summary Calculate expected veBAL given BPT being locked and lock time in seconds.
   * ~param {string} bpt - BPT amount being locked up
   * ~param {str} lockDateStr - Date in string format used to create Date of lock
   */
  function expectedVeBal(bpt: string, lockDateStr: string): string {
    const now = new Date();
    const lockDate = new Date(lockDateStr);
    const previousThursdayBeforeLockDate = getPreviousThursday(lockDate);
    const lockTime = differenceInSeconds(previousThursdayBeforeLockDate, now);

    return bnum(bpt).times(lockTime).div(oneYearInSecs).toString();
  }

  /**
   * ~summary Get date object of previous epoch given number of weeks to go back.
   * ~param {number} weeksToGoBack - Number of weeks to go back for epoch, if 0
   * gets the immediate epoch in the past. If 1, gets the week before that and so on.
   */
  function getPreviousEpoch(weeksToGoBack = 0): Date {
    const now = new Date();
    const todayAtMidnightUTC = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());

    let daysSinceThursday = now.getDay() - 4;
    if (daysSinceThursday < 0) daysSinceThursday += 7;

    daysSinceThursday = daysSinceThursday + weeksToGoBack * 7;

    return sub(todayAtMidnightUTC, {
      days: daysSinceThursday,
    });
  }

  return {
    isLoadingUserVeData: isLoadingUserVeData || isLoadingPool,
    lockablePool: poolData?.pool,
    userLockablePoolBalance,
    userLockablePoolBalanceUSD,
    hasExistingLock,
    lockedUntilDays,
    lockedUntilDate,
    lockedBalance,
    lockedBalanceUSD,
    currentVeBalance,
    percentOwned: userVeLockInfo?.userGetVeLockInfo.percentOwned,
    lockEndDate: Number(userVeLockInfo?.userGetVeLockInfo.lockEndDate),
    isExpired: userVeLockInfo?.userGetVeLockInfo.isExpired,

    refetchUserVeData,
    expectedVeBal,
    getPreviousEpoch,
  };
}

export const UserVotingDataContext = createContext<ReturnType<typeof _useUserVotingData> | null>(
  null,
);

export function UserVeDataProvider(props: { children: ReactNode }) {
  const value = _useUserVotingData();

  return (
    <UserVotingDataContext.Provider value={value}>{props.children}</UserVotingDataContext.Provider>
  );
}

export function useUserVeData() {
  return useContext(UserVotingDataContext) as ReturnType<typeof _useUserVotingData>;
}
