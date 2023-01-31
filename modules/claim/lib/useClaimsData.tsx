import { useEffect, useState } from 'react';
import { LiquidityGauge } from '~/apollo/generated/graphql-codegen-generated';
import { useGetGaugesQuery } from '~/lib/global/gauges/useGetGaugesQuery';
import { gaugesDecorator } from '~/lib/services/staking/gauges.decorator';
import { SubgraphGauge } from '~/lib/services/staking/types';
import { useUserAccount } from '~/lib/user/useUserAccount';
import { useProtocolRewardsQuery } from './useProtocolRewardsQuery';

export function useClaimsData() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [rewardGauges, setRewardGauges] = useState<LiquidityGauge[]>();

  const { isConnected, userAddress } = useUserAccount();
  // Fetch subgraph liquidity gauges
  const { gauges, isLoading: isLoadingGauges, refetchGauges } = useGetGaugesQuery();
  const { data: protocolRewardsData, isLoading: isLoadingProtocolRewards } =
    useProtocolRewardsQuery();

  const setGaugeData = async () => {
    if (userAddress) {
      const decoratedGauges = await gaugesDecorator.decorate(
        gauges as SubgraphGauge[],
        userAddress,
      );

      setRewardGauges(decoratedGauges as LiquidityGauge[]);
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

  return {
    gauges,
    rewardGauges,
    protocolRewardsData,
    isLoading,
    refetchGauges,
  };
}
