import { useEffect, useState } from 'react';
import { useGetGaugesQuery } from '~/lib/global/gauges/useGetGaugesQuery';
import { gaugesDecorator } from '~/lib/services/staking/gauges.decorator';
import { Gauge, SubgraphGauge } from '~/lib/services/staking/types';
import { useUserAccount } from '~/lib/user/useUserAccount';
import { useProtocolRewardsQuery } from './useProtocolRewardsQuery';

export function useClaimsData() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [rewardGauges, setRewardGauges] = useState<Gauge[]>();

  const { isConnected, userAddress } = useUserAccount();
  // Fetch subgraph liquidity gauges
  const { gauges, isLoading: isLoadingGauges, refetchGauges } = useGetGaugesQuery();
  const { data: protocolRewardsData, isLoading: isLoadingProtocolRewards } =
    useProtocolRewardsQuery();

  // TODO: Need this on an interval to refresh data

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
    if (isConnected && gauges?.length) {
      setGaugeData();
    }
  }, [gauges, isConnected, userAddress]);

  useEffect(() => {
    if (isLoadingProtocolRewards || isLoadingGauges) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [isLoadingGauges, isLoadingProtocolRewards]);

  async function refetchClaimsData() {
    const decoratedGauges = await gaugesDecorator.decorate(
      gauges as SubgraphGauge[],
      userAddress || '',
    );

    setRewardGauges(decoratedGauges as Gauge[]);
  }

  return {
    gauges,
    rewardGauges,
    protocolRewardsData,
    isLoading,
    refetchGauges,
    refetchClaimsData,
  };
}
