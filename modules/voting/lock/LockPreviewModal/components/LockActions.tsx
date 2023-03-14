import {
  BeetsTransactionStepsSubmit,
  TransactionStep,
} from '~/components/button/BeetsTransactionStepsSubmit';
import { networkConfig } from '~/lib/config/network-config';
import { TokenBase } from '~/lib/services/token/token-types';
import { useUserAccount } from '~/lib/user/useUserAccount';
import { useAllowances } from '~/lib/util/useAllowances';
import { useApproveToken } from '~/lib/util/useApproveToken';

import { LockActionStep, useSubmitLock } from '../../lib/useSubmitLock';
import { LockType } from '../../types';
import { PRETTY_DATE_FORMAT } from '~/modules/voting/constants';
import { parseUnits } from '@ethersproject/units';
import { format } from 'date-fns';
import { SubmitTransactionQuery } from '~/lib/util/useSubmitTransaction';

type Props = {
  lockAmount: string;
  lockEndDate: string;
  lockType: LockType[];
  onSuccess: () => void;
  onClose: () => void;
};

export function LockActions(props: Props) {
  const vrtkBnbInfo: TokenBase = {
    address: networkConfig.balancer.votingEscrow.lockPoolAddress,
    symbol: 'VRTK-BNB',
    decimals: 18,
    name: 'VRTK-BNB VPT',
  };

  const { userAddress } = useUserAccount();
  const { parseDate, getSubmitLockAction } = useSubmitLock();

  const {
    isLoading: isLoadingAllowances,
    hasApprovalForAmount,
    refetch: refetchAllowances,
  } = useAllowances(
    userAddress || null,
    [vrtkBnbInfo],
    networkConfig.balancer.votingEscrow.veAddress,
  );

  const { approve, ...approveQuery } = useApproveToken(vrtkBnbInfo);

  const txStateInfos: (Omit<SubmitTransactionQuery, 'submit' | 'submitAsync'> & {
    id: string;
  })[] = [];
  const txSteps: TransactionStep[] = [];
  const lockTxSteps: LockActionStep[] = [];

  const hasApproval = hasApprovalForAmount(
    networkConfig.balancer.votingEscrow.lockPoolAddress,
    props.lockAmount,
  );

  if (!hasApproval) {
    txSteps.push({
      id: 'approve',
      type: 'other' as const,
      buttonText: 'Approve VRTK-BNB',
      tooltipText: 'Approve VRTK-BNB',
    });

    txStateInfos.push({
      ...approveQuery,
      id: 'approve',
    });
  }

  props.lockType.map((lockType): TransactionStep => {
    let toastText = '';
    let functionName = '';
    let buttonText = '';
    let tooltipText = '';
    let args: any[] = [];

    switch (lockType) {
      case LockType.CREATE_LOCK:
        toastText = `Confirm lock until ${format(new Date(props.lockEndDate), PRETTY_DATE_FORMAT)}`;
        buttonText = toastText = tooltipText = 'Lock VRTK-BNB';
        functionName = 'create_lock';
        args = [parseUnits(props.lockAmount, 18), parseDate(props.lockEndDate)];
        break;
      case LockType.EXTEND_LOCK:
        toastText = `Extend veVRTK lock period`;
        buttonText = tooltipText = toastText;
        functionName = 'increase_unlock_time';
        args = [parseDate(props.lockEndDate)];
        break;
      case LockType.INCREASE_AMOUNT:
        toastText = `Increase veVRTK lock amount`;
        buttonText = tooltipText = toastText;
        functionName = 'increase_amount';
        args = [parseUnits(props.lockAmount, 18)];
        break;
    }
    const id = functionName;
    const actionStep: LockActionStep = {
      id,
      toastText,
      walletText: toastText,
      functionName,
      args,
    };

    const { submitLock, query } = getSubmitLockAction(actionStep);

    actionStep.submitLock = submitLock;
    lockTxSteps.push(actionStep);

    txStateInfos.push({
      ...query,
      id,
    });

    const step: TransactionStep = {
      id,
      type: 'other' as const,
      buttonText,
      tooltipText,
    };

    txSteps.push(step);

    return step;
  });

  return (
    <BeetsTransactionStepsSubmit
      isLoading={isLoadingAllowances || !txSteps.length}
      loadingButtonText="Awaiting confirmation.."
      completeButtonText="Lock complete"
      onCompleteButtonClick={() => { props.onClose(); }}
      onSubmit={(id) => {
        if (id === 'approve') {
          approve(networkConfig.balancer.votingEscrow.veAddress);
        } else {
          const step: any = lockTxSteps.find((st) => st.id === id);
          step.submitLock({
            args: step.args,
            toastText: step.toastText,
            walletText: step.walletText,
          });
        }
      }}
      onConfirmed={async (id) => {
        if (id === 'approve') {
          refetchAllowances();
        } else if (id === 'stake') {
          props.onSuccess();
        }
      }}
      steps={txSteps}
      queries={txStateInfos}
    />
  );
}
