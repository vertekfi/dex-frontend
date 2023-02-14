import { GridItem, SimpleGrid, Text } from '@chakra-ui/react';
import { StakingCard } from './StakingCard';
import { networkConfig } from '~/lib/config/network-config';

export function StakingContainer() {

  // dummy pools
  const pools = [
    {
    __typename: 'RewardPool',
    address: networkConfig.nft.nftStakingContract.toLowerCase(),
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
    address: networkConfig.nft.nftStakingContract.toLowerCase(),
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
    <>
      <Text color="white" fontWeight="bold" mt="-8" mb="4">
        Stake VRTK to earn rewards
      </Text>
      <SimpleGrid columns={{ sm: 1, md: 2, xl: 3 }} paddingX={8} paddingY={4} spacing={35}>
        {
          pools.map((p) => {
            return (
                <StakingCard key={p?.rewardToken.address} pool={p} />
            );
          })}
      </SimpleGrid>
    </>
  );
}
