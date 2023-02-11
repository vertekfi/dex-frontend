import { useSubmitTransaction } from '~/lib/util/useSubmitTransaction';

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
    await submitAsync({
      toastText: 'Claim gauge rewards',
    });
  }

  return {
    doClaim,
    txState,
  };
}
