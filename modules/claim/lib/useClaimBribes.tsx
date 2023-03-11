import { useNetworkConfig } from '~/lib/global/useNetworkConfig';
import { useSubmitTransaction } from '~/lib/util/useSubmitTransaction';

import orchardAbi from '~/lib/abi/MerkleOrchard.json';

export function useBribeClaim() {
  const networkConfig = useNetworkConfig();

  const { submit, ...rest } = useSubmitTransaction({
    config: {
      addressOrName: networkConfig.vertek.bribeRewardClaims,
      contractInterface: orchardAbi,
      functionName: 'claimDistributions',
    },
    transactionType: 'HARVEST',
  });

  function claimBribes(claimer: string, structs: any[], tokens: string[]) {
    return submit({
      args: [claimer, structs, tokens],
      toastText: 'Claim bribe rewards',
    });
  }

  return {
    claimBribes,
    txState: rest,
  };
}
