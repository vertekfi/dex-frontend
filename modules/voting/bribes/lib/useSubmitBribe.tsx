import { BigNumber } from 'ethers';
import { networkConfig } from '~/lib/config/network-config';
import { useSubmitTransaction } from '~/lib/util/useSubmitTransaction';

export function useSubmitBribe() {
  const { submit, ...rest } = useSubmitTransaction({
    config: {
      addressOrName: '',
      contractInterface: [''],
      functionName: 'vote_for_gauge_weights',
    },
    transactionType: 'VOTE',
  });

  function submitBribeForGauge(gaugeAddress: string, amount: BigNumber) {
    return submit({
      args: [gaugeAddress, amount],
      toastText: `Bribing gauge`,
      walletText: `Bribing gauge`,
    });
  }

  return {
    submitBribeForGauge,
    ...rest,
  };
}
