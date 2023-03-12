import { useEffect, useState } from 'react';
import {
  useGetUserBribeClaimsLazyQuery,
  useGetUserProtocolRewardsQuery,
} from '~/apollo/generated/graphql-codegen-generated';
import { useGetGaugesQuery } from '~/lib/global/gauges/useGetGaugesQuery';
import { gaugesDecorator } from '~/lib/services/staking/gauges.decorator';
import { Gauge, SubgraphGauge } from '~/lib/services/staking/types';
import { useUserAccount } from '~/lib/user/useUserAccount';
// import { useProtocolRewardsQuery } from './useProtocolRewardsQuery';

export function useClaimsData() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [rewardGauges, setRewardGauges] = useState<Gauge[]>([]);
  const [protocolData, setProtocolData] = useState<any[]>([]);

  const { isConnected, userAddress } = useUserAccount();
  const { gauges, isLoading: isLoadingGauges, refetchGauges } = useGetGaugesQuery();
  const [
    getUserBribeClaims,
    { loading: isLoadingClaims, data: bribeClaims, refetch: refetchBribeRewards },
  ] = useGetUserBribeClaimsLazyQuery();

  const {
    data: protocolRewardsData,
    loading: isLoadingProtocolRewards,
    refetch: refetchProtocolRewards,
  } = useGetUserProtocolRewardsQuery({
    pollInterval: 15000,
  });

  const setGaugeData = async () => {
    if (userAddress) {
      const decoratedGauges = await gaugesDecorator.decorate(
        gauges as SubgraphGauge[],
        userAddress,
      );

      setRewardGauges(decoratedGauges as Gauge[]);
    }
  };

  useEffect(() => {
    if (!isLoadingProtocolRewards && protocolRewardsData) {
      setProtocolData(protocolRewardsData.protocolRewards);
    }
  }, [isLoadingProtocolRewards]);

  useEffect(() => {
    if (!isLoadingProtocolRewards && protocolRewardsData) {
      setProtocolData(protocolRewardsData.protocolRewards);
    }
  }, [isLoadingProtocolRewards]);

  useEffect(() => {
    if (isConnected && gauges?.length) {
      setGaugeData();
    }
  }, [gauges, isConnected, userAddress]);

  useEffect(() => {
    if (isLoadingProtocolRewards || isLoadingGauges || isLoadingClaims) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [isLoadingGauges, isLoadingProtocolRewards]);

  async function refetchClaimsData() {
    refetchGauges();
    refetchProtocolRewards();
  }

  return {
    gauges,
    rewardGauges,
    protocolData,
    bribeClaims,
    isLoading,
    refetchGauges,
    refetchClaimsData,
    refetchProtocolRewards,
    getUserBribeClaims,
    refetchBribeRewards,
  };
}
