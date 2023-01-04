import { parseUnits } from 'ethers/lib/utils';
import { tokenFormatAmount } from '~/lib/services/token/token-util';
import { useSubmitTransaction } from '~/lib/util/useSubmitTransaction';
import { useRewardPools } from './useRewardPoolStaking';

export function useRewardPoolWithdraw(address: string) {
  const { refetchPools } = useRewardPools();

  const { submitAsync, ...rest } = useSubmitTransaction({
    config: {
      addressOrName: address,
      contractInterface: ['function withdraw(uint256) external'],
      functionName: 'withdraw(uint256)',
    },
    transactionType: 'UNSTAKE',
  });

  async function withdrawFromPool(amount: string) {
    await submitAsync({
      args: [parseUnits(amount, 18)],
      toastText: `Deposit VRTK into staking pool`,
      walletText: `Deposit ${tokenFormatAmount(amount)} VRTK into staking pool`,
    });

    refetchPools();
  }

  return {
    withdrawFromPool,
    ...rest,
  };
}
