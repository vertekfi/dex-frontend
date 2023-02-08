import { useNetworkConfig } from '~/lib/global/useNetworkConfig';
import { useSubmitTransaction } from '~/lib/util/useSubmitTransaction';

export function useVrtkClaim(gaugeAddress: string) {
  const networkConfig = useNetworkConfig();

  const { submit, submitAsync, ...rest } = useSubmitTransaction({
    config: {
      addressOrName: networkConfig.balancer.balMinter,
      contractInterface: ['function mint(address) external'],
      functionName: 'mint',
    },
    transactionType: 'HARVEST',
  });

  function claim() {
    return submit({
      args: [gaugeAddress],
      toastText: 'Claim pending rewards',
    });
  }

  return {
    claim,
    txState: rest,
  };
}
