import { useSubmitTransaction } from '~/lib/util/useSubmitTransaction';
import BeethovenxMasterChefAbi from '~/lib/abi/BeethovenxMasterChef.json';
import { AmountHumanReadable } from '~/lib/services/token/token-types';
import { parseUnits } from 'ethers/lib/utils';
import { GqlPoolStaking } from '~/apollo/generated/graphql-codegen-generated';
import LiquidityGaugeV5 from '~/lib/abi/LiquidityGaugeV5.json';
import { tokenFormatAmount } from '~/lib/services/token/token-util';
import { useNetworkConfig } from '~/lib/global/useNetworkConfig';

export function useStakingDeposit(staking: GqlPoolStaking | null) {
  const networkConfig = useNetworkConfig();
  const { submit, submitAsync, ...rest } = useSubmitTransaction({
    config: {
      addressOrName: staking?.address || '',
      contractInterface: staking?.type === 'GAUGE' ? LiquidityGaugeV5 : BeethovenxMasterChefAbi,
      functionName: 'deposit(uint256)',
    },
    transactionType: 'STAKE',
  });

  function stake(amount: AmountHumanReadable) {
    if (staking) {
      return submit({
        args: [parseUnits(amount, 18)],
        toastText: `Stake BPT into ${networkConfig.farmTypeName}`,
        walletText: `Stake ${tokenFormatAmount(amount)} BPT into ${networkConfig.farmTypeName}`,
      });
    } else {
      console.log('GqlPoolStaking not provided');
    }
  }

  return {
    stake,
    ...rest,
  };
}
