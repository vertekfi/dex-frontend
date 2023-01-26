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
      contractInterface: ['function deposit(uint256,uint256) external'],
      functionName: 'deposit(uint256,uint256)',
      // contractInterface: ['function deposit(uint256) external'],
      // functionName: 'deposit(uint256)',
    },
    transactionType: 'STAKE',
  });

  async function depositToPool(amount: string) {
    await submitAsync({
      // args: [parseUnits(amount, 18)],
      // testing with pool 0
      args: [parseUnits(amount, 18),0],
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
