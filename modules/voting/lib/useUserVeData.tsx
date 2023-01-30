import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { useUserData } from '~/lib/user/useUserData';
import { networkConfig } from '~/lib/config/network-config';
import { useUserAccount } from '~/lib/user/useUserAccount';
import { differenceInDays, format } from 'date-fns';
import { PRETTY_DATE_FORMAT } from '../constants';
import { numberFormatUSDValue } from '~/lib/util/number-formats';
import { tokenFormatAmount } from '~/lib/services/token/token-util';
import { useGetUserVeLockInfoQuery } from '~/apollo/generated/graphql-codegen-generated';

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
  } = useGetUserVeLockInfoQuery({
    pollInterval: 10000,
  });

  useEffect(() => {
    if (veError) {
      console.log(veError);
    }
  }, [veError]);

  useEffect(() => {
    if (isConnected && !isLoadingUserBalances) {
      setUserLockablePoolBalance(
        tokenFormatAmount(bptBalanceForPool(networkConfig.balancer.votingEscrow.lockablePoolId)),
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

  return {
    isLoadingUserVeData,
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
