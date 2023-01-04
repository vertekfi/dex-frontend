import { parseUnits } from 'ethers/lib/utils';
import { RewardPool } from '~/apollo/generated/graphql-codegen-generated';
import { tokenFormatAmount } from '~/lib/services/token/token-util';
import { useSubmitTransaction } from '~/lib/util/useSubmitTransaction';

export function useRewardPoolDeposit(pool: RewardPool) {
  const { submit, ...rest } = useSubmitTransaction({
    config: {
      addressOrName: pool.address,
      contractInterface: ['function deposit(uint256) external'],
      functionName: 'deposit(uint256)',
    },
    transactionType: 'STAKE',
  });

  // const {
  //   submitAsync: withdraw,
  //   isPending: isWithdrawPending,
  //   isFailed: isWithdrawFailed,
  // } = useSubmitTransaction({
  //   config: {
  //     addressOrName: pool.address,
  //     contractInterface: ['function withdraw(uint256) external'],
  //     functionName: 'withdraw(uint256)',
  //   },
  //   transactionType: 'UNSTAKE',
  // });

  // const {
  //   submitAsync: claim,
  //   isPending: isClaimPending,
  //   isFailed: isClaimFailed,
  // } = useSubmitTransaction({
  //   config: {
  //     addressOrName: pool.address,
  //     contractInterface: ['function withdraw(uint256) external'],
  //     functionName: 'withdraw(uint256)',
  //   },
  //   transactionType: 'HARVEST',
  // });

  function depositToPool(amount: string) {
    return submit({
      args: [parseUnits(amount, 18)],
      toastText: `Deposit VRTK into staking pool`,
      walletText: `Deposit ${tokenFormatAmount(amount)} VRTK into staking pool`,
    });
  }

  // function withdrawFromPool(amount: string) {
  //   return withdraw({
  //     args: [parseUnits(amount, 18)],
  //     toastText: `Withdraw VRTK from staking pool`,
  //     walletText: `Withdraw ${tokenFormatAmount(amount)} VRTK from staking pool`,
  //   });
  // }

  // function claimRewards() {
  //   return claim({
  //     toastText: `Claim ${pool.rewardToken.symbol} from staking pool`,
  //     walletText: `Claim ${tokenFormatAmount(
  //       pool.userInfo?.pendingRewards || 0,
  //     )} from staking pool`,
  //   });
  // }

  // Refetch data after any of these?

  return {
    depositToPool,
    ...rest,
  };
}
