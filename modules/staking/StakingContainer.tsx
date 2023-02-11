import { SimpleGrid, Text } from '@chakra-ui/react';
import { StakingCard } from './StakingCard';
import { useRewardPools } from './lib/useRewardPoolStaking';
import { UserTokenBalancesProvider } from '~/lib/user/useUserTokenBalances';

export function StakingContainer() {
  const { pools } = useRewardPools();

  // dummy numbers
  const p = {
    __typename: 'RewardPool',
    address: '0x19bBBb12A638e7C460962606f27C878E4B91e232',
    poolId: 0,
    isPartnerPool: false,
    rewardToken: {
      address: '0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3',
      logoURI: 'LSHARE.png',
      name: 'LSHARE',
      symbol: 'DAI',
    },
  };

  return (
    <UserTokenBalancesProvider>
      <Text color="white" fontWeight="bold" mt="-8" mb="4">
        Stake VRTK to earn rewards
      </Text>
      <SimpleGrid columns={{ sm: 1, md: 2, xl: 3 }} paddingX={8} paddingY={4} spacing={35}>
        {/* {pools.length &&
          pools.map((p) => {
            return <StakingCard key={p?.address} pool={p} />;
          })} */}
        <StakingCard key={p?.address} pool={p} />
      </SimpleGrid>
    </UserTokenBalancesProvider>
  );
}
