import { SimpleGrid } from '@chakra-ui/react';
import { StakingCard } from './StakingCard';
import { useRewardPools } from './useRewardPoolStaking';

export function StakingContainer() {
  const { pools } = useRewardPools();
  // console.log(pools);

  return (
    <SimpleGrid columns={{ sm: 1, md: 2, xl: 3 }} paddingX={8} paddingY={4} spacing={35}>
      {pools.length &&
        pools.map((p) => {
          return <StakingCard key={p?.address} pool={p} />;
        })}
    </SimpleGrid>
  );
}
