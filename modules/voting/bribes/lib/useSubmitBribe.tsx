import { BigNumber } from 'ethers';
import { networkConfig } from '~/lib/config/network-config';
import { useSubmitTransaction } from '~/lib/util/useSubmitTransaction';

export function useSubmitBribe() {
  const { submit, ...txState } = useSubmitTransaction({
    config: {
      addressOrName: networkConfig.vertek.bribeManager,
      contractInterface: [
        'function addBribe(address token, uint256 amount, address gauge) external',
      ],
      functionName: 'addBribe',
    },
    transactionType: 'BRIBE',
  });

  function submitBribeForGauge(
    token: string,
    gaugeAddress: string,
    amount: BigNumber,
    // protocolId: string,
  ) {
    return submit({
      args: [token, gaugeAddress, amount],
      toastText: `Bribing gauge`,
      walletText: `Bribing gauge`,
    });
  }

  return {
    submitBribeForGauge,
    txState,
  };
}
