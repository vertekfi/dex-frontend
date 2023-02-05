import { useSubmitTransaction } from '~/lib/util/useSubmitTransaction';
import { useRewardPools } from './useRewardPoolStaking';
import StakingNFTPools from '~/lib/abi/StakingNFTPools.json';

export function useRewardPoolWithdrawNft(address: string) {
  const { refetchPools } = useRewardPools();

  const { submitAsync, ...rest } = useSubmitTransaction({
    config: {
      addressOrName: address,
      contractInterface: StakingNFTPools,
      functionName: 'withdraw(uint256,uint256,uint256[])',
    },
    transactionType: 'UNSTAKE',
  });

  async function withdrawFromPool(poolId: number, amount: number, tokenId: number) {
    await submitAsync({
      args: [poolId, amount, [tokenId]],
      toastText: `Withdrew NFT into staking pool`,
      walletText: `Withdraw ${tokenId} VRTK from staking pool`,
    });

    refetchPools();
  }

  return {
    withdrawFromPool,
    ...rest,
  };
}
