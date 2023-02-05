import { SimpleGrid, Text } from '@chakra-ui/react';
import { StakingCard } from './StakingCard';
import { useRewardPools } from './lib/useRewardPoolStaking';
import { UserTokenBalancesProvider } from '~/lib/user/useUserTokenBalances';

export function StakingContainer() {
  const { pools } = useRewardPools();

  // dummy numbers
  const p = {
    __typename: 'RewardPool',
    // address: '0xFeC15cAaf2C07c75D31974D4206ac907AA1B1fDf',
    address: '0x9b5c9187561d44a7548dc3680475bfdf8c6f86e2',
    poolId: 0,
    amountStaked: '0',
    amountStakedValue: '0',
    aprs: {
      apr: '0',
      daily: '0',
    },
    blocksRemaining: '1000',
    daysRemaining: '30',
    endBlock: 100000000,
    isPartnerPool: false,
    rewardToken: {
      // address: '0x7faA8158FaA037CC7516eF1f6864af44d75654AE',
      address: '0x50d8D7F7CcEA28cc1C9dDb996689294dC62569cA',
      logoURI: 'LSHARE.png',
      name: 'LSHARE',
      price: 300,
      rewardPerBlock: 100,
      symbol: 'LSHARE',
    },
    startBlock: 1000,
    userInfo: {
      amountDeposited: '100',
      amountDepositedFull: '0',
      depositValue: '100',
      hasPendingRewards: false,
      pendingRewardValue: '0',
      pendingRewards: '0',
      percentageOwned: '0',
      // poolAddress: '0xFeC15cAaf2C07c75D31974D4206ac907AA1B1fDf',
      poolAddress: '0x9b5c9187561d44a7548dc3680475bfdf8c6f86e2',
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
        <StakingCard key={p?.address} pool={p} />;
      </SimpleGrid>
    </UserTokenBalancesProvider>
  );
}
