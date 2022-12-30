import { useEffect, useState } from 'react';
import { useGetGaugesQuery } from '~/lib/global/gauges/useGetGaugesQuery';
import { gaugesDecorator } from '~/lib/services/staking/gauges.decorator';
import { Gauge, SubgraphGauge } from '~/lib/services/staking/types';
import { useUserAccount } from '~/lib/user/useUserAccount';
import { useProtocolRewardsQuery } from './useProtocolRewardsQuery';

export function useClaimsData() {
  const [gaugePoolIds, setGaugePoolIds] = useState<string[]>();
  //  The pools are already attached to the gauges from the backend now
  // const [gaugePools, setGaugePools] = useState<Gauge[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { isConnected, userAddress } = useUserAccount();
  //const { protocolRewards, isLoading: isProtocolRewardsLoading } = useProtocolRewardsQuery();

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
      // setGaugePools(decoratedGauges);
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

  // useEffect(() => {
  //   if (isLoadingGauges || isProtocolRewardsLoading) {
  //     setIsLoading(true);
  //   }

  //   if (!isLoadingGauges && !isProtocolRewardsLoading) {
  //     setIsLoading(false);
  //   }
  // }, [isProtocolRewardsLoading, isLoadingGauges]);
  return {
    gauges,
    // protocolRewards,
    isLoading,
  };
}
