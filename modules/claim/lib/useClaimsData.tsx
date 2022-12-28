import { useEffect, useState } from 'react';
import {
  useGetPoolsForGaugesLazyQuery,
  useGetPoolsForGaugesQuery,
} from '~/apollo/generated/graphql-codegen-generated';
import { useGetGaugesQuery } from '~/lib/global/gauges/useGetGaugesQuery';
import { gaugesDecorator } from '~/lib/services/staking/gauges.decorator';
import { Gauge, SubgraphGauge } from '~/lib/services/staking/types';
import { useUserAccount } from '~/lib/user/useUserAccount';
import { useProtocolRewardsQuery } from './useProtocolRewardsQuery';

export function useClaimsData() {
  const [gaugePoolIds, setGaugePoolIds] = useState<string[]>();
  const [gaugePools, setGaugePools] = useState<Gauge[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { isConnected, userAddress } = useUserAccount();
  const { protocolRewards } = useProtocolRewardsQuery();

  //   Fetch subgraph liquidity gauges
  const { gauges, isLoading: loadingGauges, refetchGauges } = useGetGaugesQuery();
  const getGaugePoolsQuery = useGetPoolsForGaugesLazyQuery();
  //   // Decorate subgraph gauges with current account's claim data, e.g. reward values
  //   const gaugesQuery = useGaugesDecorationQuery(subgraphGaugesQuery.data);

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
      setGaugePools(decoratedGauges);
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

  //   // Fetch pools associated with gauges
  //   const gaugePoolQueryEnabled = computed(
  //     (): boolean => gaugePoolIds?.value && gaugePoolIds.value?.length > 0
  //   );
  //   // Get associated pool info for all gauges
  //   const gaugePoolQuery = useGraphQuery<GaugePoolQueryResponse>(
  //     subgraphs.balancer,
  //     ['claim', 'gauge', 'pools'],
  //     () => ({
  //       pools: {
  //         __args: {
  //           where: { id_in: gaugePoolIds.value }
  //         },
  //         id: true,
  //         address: true,
  //         poolType: true,
  //         tokensList: true,
  //         tokens: {
  //           address: true,
  //           weight: true
  //         }
  //       }
  //     }),
  //     reactive({ enabled: gaugePoolQueryEnabled })
  //   );
  //   /**
  //    * COMPUTED
  //    */
  //   const gaugePools = computed((): GaugePool[] => gaugePoolQuery.data.value?.pools || []);
  //   const isLoading = computed(
  //     (): boolean => isQueryLoading(gaugePoolQuery) || isQueryLoading(protocolRewardsQuery)
  //   );
  return {
    gauges,
    gaugePools,
    protocolRewards,
    isLoading,
  };
}
