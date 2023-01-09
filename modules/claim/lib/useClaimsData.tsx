import { useEffect, useState } from 'react';
import { LiquidityGauge } from '~/apollo/generated/graphql-codegen-generated';
import { useGetGaugesQuery } from '~/lib/global/gauges/useGetGaugesQuery';
import { gaugesDecorator } from '~/lib/services/staking/gauges.decorator';
import { SubgraphGauge } from '~/lib/services/staking/types';
import { useUserAccount } from '~/lib/user/useUserAccount';
import { RewardGauge } from '../types';

export function useClaimsData() {
  const [gaugePoolIds, setGaugePoolIds] = useState<string[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [rewardGauges, setRewardGauges] = useState<RewardGauge[]>();

  const { isConnected, userAddress } = useUserAccount();

  // Fetch subgraph liquidity gauges
  const { gauges, isLoading: isLoadingGauges, refetchGauges } = useGetGaugesQuery();

  const setGaugeData = async () => {
    if (userAddress) {
      const ids: string[] = [];
      gauges.forEach((g) => {
        if (g) {
          ids.push(g.id);
        }
      });
      setGaugePoolIds(ids);

      const decoratedGauges = await gaugesDecorator.decorate(
        gauges as SubgraphGauge[],
        userAddress,
      );

      console.log(decoratedGauges);
      setRewardGauges(decoratedGauges as RewardGauge[]);
    }
  };

  useEffect(() => {
    if (isConnected && gauges?.length) {
      setGaugeData();
    }
  }, [gauges, isConnected, userAddress]);

  useEffect(() => {
    if (gaugePoolIds?.length) {
    }
  }, [gaugePoolIds]);

  return {
    gauges,
    rewardGauges,
    isLoading,
  };
}
