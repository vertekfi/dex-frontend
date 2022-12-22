import { useQuery } from 'react-query';
import { useProvider } from 'wagmi';
import { GqlPoolStaking } from '~/apollo/generated/graphql-codegen-generated';
import { gaugeStakingService } from '~/lib/services/staking/gauge-staking.service';
import { useNetworkConfig } from '~/lib/global/useNetworkConfig';

export function useStakingTotalStakedBalance(poolAddress: string, staking: GqlPoolStaking) {
  const provider = useProvider();

  return useQuery(
    ['useStakingTotalStakedBalance', poolAddress, staking.id],
    () => {
      switch (staking.type) {
        case 'GAUGE':
          return gaugeStakingService.getGaugeTokenBalance({
            tokenAddress: poolAddress,
            provider,
            decimals: 18,
            gaugeAddress: staking.gauge?.gaugeAddress || '',
          });
      }
    },
    { refetchInterval: 30000 },
  );
}
