import { useQuery } from 'react-query';
import { GqlPoolStaking, GqlPoolStakingGauge } from '~/apollo/generated/graphql-codegen-generated';
import { useProvider } from 'wagmi';
import { useGetTokens } from '~/lib/global/useToken';
import { StakingPendingRewardAmount } from '~/lib/services/staking/types';
import { gaugeStakingService } from '~/lib/services/staking/gauge-staking.service';
import { useUserAccount } from '~/lib/user/useUserAccount';
import { useRef } from 'react';

export function useStakingPendingRewards(stakingItems: GqlPoolStaking[], hookName: string) {
  const provider = useProvider();
  const { userAddress } = useUserAccount();
  const { tokens } = useGetTokens();
  const stakingIds = stakingItems.map((staking) => staking.id);
  const isHardRefetch = useRef(false);

  const query = useQuery(
    ['useStakingPendingRewards', hookName, userAddress, stakingIds],
    async () => {
      let pendingRewards: StakingPendingRewardAmount[] = [];

      const gauges = stakingItems
        .filter((staking) => staking.gauge)
        .map((staking) => staking.gauge) as GqlPoolStakingGauge[];

      if (gauges.length > 0) {
        const gaugePendingRewards = await gaugeStakingService.getPendingRewards({
          gauges,
          provider,
          tokens,
          userAddress: userAddress || '',
        });
        pendingRewards = [...pendingRewards, ...gaugePendingRewards];
      }

      return pendingRewards;
    },
    { enabled: !!userAddress && stakingItems.length > 0, refetchInterval: 15000 },
  );

  async function hardRefetch() {
    isHardRefetch.current = true;
    await query.refetch();
    isHardRefetch.current = false;
  }

  return {
    ...query,
    hardRefetch,
  };
}
