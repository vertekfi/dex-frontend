import { Box } from '@chakra-ui/react';
import {
  BeetsTransactionStepsSubmit,
  TransactionStep,
} from '~/components/button/BeetsTransactionStepsSubmit';
import { networkConfig } from '~/lib/config/network-config';
import { TokenBase } from '~/lib/services/token/token-types';
import { useUserAccount } from '~/lib/user/useUserAccount';
import { useUserTokenBalances } from '~/lib/user/useUserTokenBalances';
import { useAllowances } from '~/lib/util/useAllowances';
import { useApproveToken } from '~/lib/util/useApproveToken';
import { useUserVeData } from '~/modules/voting/lib/useUserVeData';

import { useEffect, useState } from 'react';
import { useSubmitLock } from '../../lib/useSubmitLock';
import { LockType } from '../../types';
import { useUserSyncBalanceMutation } from '~/apollo/generated/graphql-codegen-generated';
import { usePoolUserBptBalance } from '~/modules/pool/lib/usePoolUserBptBalance';
import { usePoolUserTokenBalancesInWallet } from '~/modules/pool/lib/usePoolUserTokenBalancesInWallet';

type Props = {
  lockAmount: string;
  lockEndDate: string;
  lockType: LockType[];
  onSuccess: () => void;
};

export function LockActions(props: Props) {
  const [steps, setSteps] = useState<TransactionStep[] | null>(null);

  const { userAddress } = useUserAccount();
  const { submitLock, ...lockingTxData } = useSubmitLock(
    props.lockType[0],
    props.lockEndDate,
    props.lockAmount,
  );

  const { refetchUserVeData } = useUserVeData();
  // const { refetch: refetchUserBptBalance } = usePoolUserBptBalance();
  // const [userSyncBalance] = useUserSyncBalanceMutation();

  const vrtkBnbInfo: TokenBase = {
    address: networkConfig.balancer.votingEscrow.lockPoolAddress,
    symbol: 'VRTK-BNB',
    decimals: 18,
    name: 'VRTK-BNB VPT',
  };

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

  const loading = isLoadingAllowances;

  useEffect(() => {
    if (!loading) {
      const hasApproval = hasApprovalForAmount(
        networkConfig.balancer.votingEscrow.veAddress,
        props.lockAmount,
      );

      setSteps([
        ...(!hasApproval
          ? [
              {
                id: 'approve',
                type: 'other' as const,
                buttonText: 'Approve VRTK-BNB',
                tooltipText: 'Approve VRTK-BNB',
              },
            ]
          : []),
        {
          id: 'stake',
          type: 'other',
          buttonText: 'Lock VRTK-BNB',
          tooltipText: 'Lock VRTK-BNB to earn protocol fees and boosted rewards.',
        },
      ]);
    }
  }, [loading]);

  return (
    <Box>
      <BeetsTransactionStepsSubmit
        isLoading={loading || steps === null}
        loadingButtonText="Loading balances..."
        completeButtonText="Deposit complete"
        onCompleteButtonClick={() => {
          props.onSuccess();
        }}
        onSubmit={(id) => {
          if (id === 'approve') {
            approve(networkConfig.balancer.votingEscrow.veAddress);
          } else if (id === 'stake') {
            submitLock();
          }
        }}
        onConfirmed={async (id) => {
          if (id === 'approve') {
            refetchAllowances();
          } else if (id === 'stake') {
            refetchUserVeData();
            // refetchUserBptBalance();
            // userSyncBalance({
            //   variables: { poolId: networkConfig.balancer.votingEscrow.lockablePoolId },
            // });
          }
        }}
        steps={steps || []}
        queries={[
          { ...lockingTxData, id: 'stake' },
          { ...approveQuery, id: 'approve' },
        ]}
      />
    </Box>
  );
}
