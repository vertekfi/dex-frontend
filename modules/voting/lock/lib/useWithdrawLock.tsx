import { networkConfig } from '~/lib/config/network-config';
import { useSubmitTransaction } from '~/lib/util/useSubmitTransaction';
import veAbi from '../../../../lib/abi/VotingEscrow.json';

export function useWithdrawLock() {
  const { submit, ...query } = useSubmitTransaction({
    config: {
      addressOrName: networkConfig.balancer.votingEscrow.veAddress,
      contractInterface: veAbi,
      functionName: 'withdraw',
    },
    transactionType: 'UNSTAKE',
  });

  function withdrawLock() {
    return submit({
      args: [],
      toastText: `Unlock veVRTK`,
      walletText: `Unlock veVRTK`,
    });
  }

  return {
    withdrawLock,
    query,
  };
}
