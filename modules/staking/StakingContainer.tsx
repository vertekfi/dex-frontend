import { GridItem, SimpleGrid, Text } from '@chakra-ui/react';
import { StakingCard } from './StakingCard';
import { useRewardPools } from './lib/useRewardPoolStaking';
import { UserTokenBalancesProvider } from '~/lib/user/useUserTokenBalances';

export function StakingContainer() {
  const { pools } = useRewardPools();

  return (
    <>
      <Text color="white" fontWeight="bold" mt="-8" mb="4">
        Stake VRTK to earn rewards
      </Text>
      <SimpleGrid columns={{ sm: 1, md: 2, xl: 3 }} paddingX={8} paddingY={4} spacing={35}>
        {pools.length &&
          pools.map((p) => {
            return (
              <GridItem
                className="blk"
                boxShadow="0 0 10px #5BC0F8, 0 0 20px #4A4AF6"
                borderRadius="18px"
                maxW="550px"
                color="white"
                mb="auto"
              >
                <StakingCard key={p?.address} pool={p} />
              </GridItem>
            );
          })}
      </SimpleGrid>
    </>
  );
}
