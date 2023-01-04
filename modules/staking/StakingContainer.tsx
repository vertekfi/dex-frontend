import { SimpleGrid } from '@chakra-ui/react';
import { StakingCard } from './StakingCard';
import { useRewardPools } from './lib/useRewardPoolStaking';
import { UserTokenBalancesProvider } from '~/lib/user/useUserTokenBalances';

export function StakingContainer() {
  const { pools } = useRewardPools();

  return (
    <UserTokenBalancesProvider>
      <SimpleGrid columns={{ sm: 1, md: 2, xl: 3 }} paddingX={8} paddingY={4} spacing={35}>
        {pools.length &&
          pools.map((p) => {
            return <StakingCard key={p?.address} pool={p} />;
          })}
      </SimpleGrid>
    </UserTokenBalancesProvider>
  );
}
