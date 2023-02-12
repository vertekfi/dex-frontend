import { SimpleGrid, Text } from '@chakra-ui/react';
import { StakingCard } from './StakingCard';
import { useRewardPools } from './lib/useRewardPoolStaking';
import { UserTokenBalancesProvider } from '~/lib/user/useUserTokenBalances';

export function StakingContainer() {
  // const { pools } = useRewardPools();

  // dummy numbers
  const pools = [
    {
    __typename: 'RewardPool',
    address: '0xDBC838Ee888407815889d5603bc679A81715F928',
    poolId: 0,
    isPartnerPool: false,
    rewardToken: {
      address: '0x50d8d7f7ccea28cc1c9ddb996689294dc62569ca',
      logoURI: 'LSHARE.png',
      name: 'LSHARE',
      symbol: 'LSHARE',
    },
  },
    {
    __typename: 'RewardPool',
    address: '0xDBC838Ee888407815889d5603bc679A81715F928',
    poolId: 1,
    isPartnerPool: false,
    rewardToken: {
      address: '0x3CC9E655B6c4f530DFc1b1fC51CeEa65c6344716',
      logoURI: 'LION.png',
      name: 'LION',
      symbol: 'LION',
    },
  }
]

  return (
    <UserTokenBalancesProvider>
      <Text color="white" fontWeight="bold" mt="-8" mb="4">
        Stake VRTK to earn rewards
      </Text>
      <SimpleGrid columns={{ sm: 1, md: 2, xl: 3 }} paddingX={8} paddingY={4} spacing={35}>
        {
          pools.map((p) => {
            return <StakingCard key={p?.address} pool={p} />;
          })}
        {/* <StakingCard key={p?.address} pool={p} /> */}
      </SimpleGrid>
    </UserTokenBalancesProvider>
  );
}
