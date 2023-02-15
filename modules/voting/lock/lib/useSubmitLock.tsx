import { networkConfig } from '~/lib/config/network-config';
import { useSubmitTransaction } from '~/lib/util/useSubmitTransaction';
import veAbi from '../../../../lib/abi/VotingEscrow.json';
import { toUtcTime } from '~/lib/util/time';
import { UseContractWriteMutationArgs } from 'wagmi/dist/declarations/src/hooks/contracts/useContractWrite';

export interface LockActionStep {
  id: string;
  toastText: string;
  walletText: string;
  functionName: string;
  args: any[];
  submitLock?: (
    config: UseContractWriteMutationArgs & { toastText: string; walletText?: string | undefined },
  ) => void;
}

export interface SubmitLockParams {
  args: any[];
  toastText: string;
  walletText: string;
}

export function useSubmitLock() {
  function parseDate(lockEndDate: string) {
    return (toUtcTime(new Date(lockEndDate)) / 1000).toString();
  }

  function getSubmitLockAction(actionStep: LockActionStep) {
    const { submit: submitLock, ...query } = useSubmitTransaction({
      config: {
        addressOrName: networkConfig.balancer.votingEscrow.veAddress,
        contractInterface: veAbi,
        functionName: actionStep.functionName,
      },
      transactionType: 'STAKE',
    });

    return {
      submitLock,
      query,
    };
  }

  return {
    parseDate,
    getSubmitLockAction,
  };
}
