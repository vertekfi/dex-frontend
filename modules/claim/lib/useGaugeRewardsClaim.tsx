import { Contract } from 'ethers';
import { useSubmitTransaction } from '~/lib/util/useSubmitTransaction';
import { getAccountSigner } from '~/lib/util/web3';

export function useGaugeRewardsClaim(gaugeAddress: string) {
  const contractInterface = ['function claim_rewards() external'];

  const { submitAsync, ...txState } = useSubmitTransaction({
    config: {
      addressOrName: gaugeAddress,
      contractInterface,
      functionName: 'claim_rewards',
    },
    transactionType: 'HARVEST',
  });

  async function doClaim() {
    const gauge = new Contract(gaugeAddress, contractInterface, await getAccountSigner());
    await submitAsync({
      toastText: 'Claim gauge rewards',
    });
  }

  return {
    doClaim,
    txState,
  };
}
