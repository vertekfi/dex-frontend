import { parseUnits } from 'ethers/lib/utils';
import { RewardPool } from '~/apollo/generated/graphql-codegen-generated';
import { tokenFormatAmount } from '~/lib/services/token/token-util';
import { useSubmitTransaction } from '~/lib/util/useSubmitTransaction';
import { useRewardPools } from './useRewardPoolStaking';

export function useRewardPoolDeposit(pool: RewardPool) {
  const { refetchPools } = useRewardPools();

  const { submitAsync, ...rest } = useSubmitTransaction({
    config: {
      addressOrName: pool.address,
      contractInterface: ['function deposit(uint _pid, uint _amount) external nonReentrant'],
      functionName: 'deposit(uint256,uint256)',
    },
    transactionType: 'STAKE',
  });

  async function depositToPool(poolId: number, amount: string) {
    await submitAsync({
      args: [poolId, parseUnits(amount, 18)],
      toastText: `Deposit VRTK into staking pool`,
      walletText: `Deposit ${tokenFormatAmount(amount)} VRTK into staking pool`,
    });

    refetchPools();
  }

  return {
    depositToPool,
    ...rest,
  };
}
