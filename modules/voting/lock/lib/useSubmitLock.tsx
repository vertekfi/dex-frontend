import { networkConfig } from '~/lib/config/network-config';
import { useSubmitTransaction } from '~/lib/util/useSubmitTransaction';
import { format } from 'date-fns';
import { PRETTY_DATE_FORMAT } from '../../constants';
import { LockType } from '../types';
import veAbi from '../../../../lib/abi/VotingEscrow.json';
import { parseUnits } from '@ethersproject/units';
import { toUtcTime } from '~/lib/util/time';

function parseDate(lockEndDate: string) {
  return (toUtcTime(new Date(lockEndDate)) / 1000).toString();
}

export function useSubmitLock(lockType: LockType, lockEndDate: string, lockAmount: string) {
  let label = '';
  let functionName = '';
  let args: any[] = [];

  switch (lockType) {
    case LockType.CREATE_LOCK:
      label = `Confirm lock until ${format(new Date(lockEndDate), PRETTY_DATE_FORMAT)}`;
      functionName = 'create_lock';
      args = [parseUnits(lockAmount, 18), parseDate(lockEndDate)];
      break;
    case LockType.EXTEND_LOCK:
      label = `Extend lock period`;
      functionName = 'increase_unlock_time';
      args = [parseDate(lockEndDate)];
      break;
    case LockType.INCREASE_AMOUNT:
      label = `Increase lock amount`;
      functionName = 'increase_amount';
      args = [parseUnits(lockAmount, 18)];
      break;
  }

  const { submit, ...rest } = useSubmitTransaction({
    config: {
      addressOrName: networkConfig.balancer.votingEscrow.veAddress,
      contractInterface: veAbi,
      functionName,
    },
    transactionType: 'STAKE',
  });

  function submitLock() {
    return submit({
      args,
      toastText: label,
      walletText: `veVRTK Lock`,
    });
  }

  return {
    submitLock,
    ...rest,
  };
}
