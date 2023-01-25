import { GaugeList } from './components/GaugeList';
import { useVotingGauges } from '../../lib/global/gauges/useVotingGauges';
import { Skeleton } from '@chakra-ui/react';
import { VotingSubheader } from './components/VotingSubheader';
import { useUserVeLockInfoQuery } from './lib/useUserVeLockInfoQuery';
import { useEffect, useState } from 'react';
import { VotingGaugeWithVotes } from '~/lib/services/staking/types';
import { UserDataProvider, useUserData } from '~/lib/user/useUserData';
import { networkConfig } from '~/lib/config/network-config';
import { useUserAccount } from '~/lib/user/useUserAccount';
import { numberFormatUSDValue } from '~/lib/util/number-formats';
import { tokenFormatAmount } from '~/lib/services/token/token-util';
import { bnum } from '@balancer-labs/sor';
import { fNum2, FNumFormats } from '~/lib/util/useNumber';
import { differenceInDays, format } from 'date-fns';
import { PRETTY_DATE_FORMAT } from './constants';
import { GqlPoolUnion } from '~/apollo/generated/graphql-codegen-generated';
import { VotingHeader } from './components/VotingHeader';

interface Props {
  pool: GqlPoolUnion;
}
export function VotingContainer() {
  const [pool, setPool] = useState<GqlPoolUnion>();
  const [hasLock, setHasLock] = useState<boolean>(false);
  const [hasExpiredLock, setExpiredHasLock] = useState<boolean>(false);
  const [activeVotingGauge, setActiveVotingGauge] = useState<VotingGaugeWithVotes | null>(null);
  const [userPoolBalance, setUserPoolBalance] = useState<{
    balance: string;
    usdValue: string;
  }>({
    balance: '0',
    usdValue: '0',
  });
  const [lockInfoDisplay, setLockInfoDisplay] = useState<{
    lockedUntilDays: number;
    lockedUntilDate: string;
    veBalance: string;
    percentOwned: string;
  }>({
    lockedUntilDays: 0,
    lockedUntilDate: '-',
    veBalance: '0',
    percentOwned: '0',
  });

  const {
    isLoading: isLoadingGauges,
    votingGauges,
    refetch: refetchVotingGauges,
  } = useVotingGauges();

  const { isConnected } = useUserAccount();
  const { userLockInfo } = useUserVeLockInfoQuery();
  const { loading: loadingBalances, bptBalanceForPool, usdBalanceForPool } = useUserData();
  // const { data: mainPoolData, loading: loadingMainPool } = useGetPoolQuery({
  //   variables: {
  //     id: networkConfig.balancer.votingEscrow.lockablePoolId,
  //   },
  // });

  useEffect(() => {
    if (!loadingBalances && isConnected) {
      setUserPoolBalance({
        balance: tokenFormatAmount(
          bptBalanceForPool(networkConfig.balancer.votingEscrow.lockablePoolId),
        ),
        usdValue: numberFormatUSDValue(
          usdBalanceForPool(networkConfig.balancer.votingEscrow.lockablePoolId),
        ),
      });
    }
  }, [loadingBalances, isConnected]);

  // set user lock info
  useEffect(() => {
    if (isConnected && userLockInfo) {
      if (userLockInfo.hasExistingLock && !userLockInfo.isExpired) {
        setHasLock(true);

        const percentOwned = fNum2(
          bnum(userLockInfo.lockedAmount).div(userLockInfo.totalSupply).toString(),
          {
            style: 'percent',
            maximumFractionDigits: 4,
          },
        );
        const lockedUntilDays = differenceInDays(new Date(userLockInfo.lockedEndDate), new Date());
        const veBalance = fNum2(userLockInfo.lockedAmount, FNumFormats.token);
        const lockedUntilDate = format(userLockInfo.lockedEndDate, PRETTY_DATE_FORMAT);

        setLockInfoDisplay({
          lockedUntilDays,
          percentOwned,
          veBalance,
          lockedUntilDate,
        });
      }

      if (userLockInfo.hasExistingLock && userLockInfo.isExpired) {
        setExpiredHasLock(true);
      }
    }
  }, [isConnected, userLockInfo]);

  function setActiveGaugeVote(votingGauge: VotingGaugeWithVotes) {
    setActiveVotingGauge(votingGauge);
  }

  function handleModalClose() {
    setActiveVotingGauge(null);
    refetchVotingGauges();
  }

  function handleVoteSuccess() {
    refetchVotingGauges();
  }

  return (
    <UserDataProvider>
      <VotingHeader />
      <VotingSubheader />
      <Skeleton isLoaded={!isLoadingGauges}>
        <GaugeList votingGauges={votingGauges} />
      </Skeleton>
    </UserDataProvider>
  );
}
