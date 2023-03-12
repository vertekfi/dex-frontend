import { useNetworkConfig } from '~/lib/global/useNetworkConfig';
import { useSubmitTransaction } from '~/lib/util/useSubmitTransaction';
import orchardAbi from '~/lib/abi/MerkleOrchard.json';

export function useBribeClaim() {
  const networkConfig = useNetworkConfig();

  const { submit, submitAsync, ...rest } = useSubmitTransaction({
    config: {
      addressOrName: networkConfig.vertek.bribeRewardClaims,
      contractInterface: orchardAbi,
      functionName: 'claimDistributions',
    },
    transactionType: 'HARVEST',
  });

  async function claimBribes(claimer: string, structs: any[], tokens: string[]) {
    return submitAsync({
      args: [claimer, structs, tokens],
      toastText: 'Claim bribe rewards',
    });
  }

  return {
    claimBribes,
    txState: rest,
  };
}
