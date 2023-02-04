import { networkConfig } from '~/lib/config/network-config';
import { useSubmitTransaction } from '~/lib/util/useSubmitTransaction';
import { format } from 'date-fns';
import { PRETTY_DATE_FORMAT } from '../../constants';
import { LockType } from '../types';
import veAbi from '../../../../lib/abi/VotingEscrow.json';
import { parseUnits } from '@ethersproject/units';
import { toUtcTime } from '~/lib/util/time';

export interface LockActionStep {
  toastText: string;
  walletText: string;
  functionName: string;
  args: any[];
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
    // const { submit, ...rest } = useSubmitTransaction({
    //   config: {
    //     addressOrName: networkConfig.balancer.votingEscrow.veAddress,
    //     contractInterface: veAbi,
    //     functionName: actionStep.functionName,
    //   },
    //   transactionType: 'STAKE',
    // });

    return {
      getLockTxSubmit: () => {
        const { submit, ...rest } = useSubmitTransaction({
          config: {
            addressOrName: networkConfig.balancer.votingEscrow.veAddress,
            contractInterface: veAbi,
            functionName: actionStep.functionName,
          },
          transactionType: 'STAKE',
        });

        return {
          submit,
          rest,
        };
      },
      submitLock: (submit: (params: SubmitLockParams) => void, params: SubmitLockParams) => {
        return submit({
          args: params.args,
          toastText: params.toastText,
          walletText: params.walletText,
        });
      },
    };
  }

  return {
    parseDate,
    getSubmitLockAction,
  };
}
