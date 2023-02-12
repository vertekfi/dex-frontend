import { useSubmitTransaction } from '~/lib/util/useSubmitTransaction';
import { AmountHumanReadable } from '~/lib/services/token/token-types';
import { parseUnits } from 'ethers/lib/utils';
import { GqlPoolStaking } from '~/apollo/generated/graphql-codegen-generated';

export function useStakingWithdraw(staking?: GqlPoolStaking | null) {
  // console.log(staking);

  const { submit, submitAsync, ...rest } = useSubmitTransaction({
    config: {
      addressOrName: staking?.address || '',
      contractInterface: ['function withdraw(uint, bool) external'],
      functionName: 'withdraw',
    },
    transactionType: 'UNSTAKE',
  });

  function withdraw(amount: AmountHumanReadable) {
    if (staking) {
      return submit({
        args: [parseUnits(amount, 18), true],
        toastText: 'Withdraw and claim rewards',
      });
    }
  }

  return {
    withdraw,
    ...rest,
  };
}
