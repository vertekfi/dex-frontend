import { useNetworkConfig } from '~/lib/global/useNetworkConfig';
import { useSubmitTransaction } from '~/lib/util/useSubmitTransaction';

export function useProtocolRewardClaim() {
  const networkConfig = useNetworkConfig();

  const { submitAsync, ...rest } = useSubmitTransaction({
    config: {
      addressOrName: networkConfig.balancer.feeDistOne || '',
      contractInterface: ['function claimTokens() external'],
      functionName: 'claimTokens',
    },
    transactionType: 'HARVEST',
  });

  function claimProtocolRewards() {
    return submitAsync({
      args: [],
      toastText: 'Claim pending rewards',
    });
  }

  return {
    claimProtocolRewards,
    txState: rest,
  };
}
