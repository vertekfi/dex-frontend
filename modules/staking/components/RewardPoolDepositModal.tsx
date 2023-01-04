import {
  Box,
  Heading,
  ModalHeader,
  ModalOverlay,
  Skeleton,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
  Text,
} from '@chakra-ui/react';
import { Modal, ModalBody, ModalCloseButton, ModalContent } from '@chakra-ui/modal';
import { useEffect, useState } from 'react';
import { RewardPool } from '~/apollo/generated/graphql-codegen-generated';
import {
  BeetsTransactionStepsSubmit,
  TransactionStep,
} from '~/components/button/BeetsTransactionStepsSubmit';
import { networkConfig } from '~/lib/config/network-config';
import { oldBnumToHumanReadable, oldBnumScaleAmount } from '~/lib/services/pool/lib/old-big-number';
import { TokenBase } from '~/lib/services/token/token-types';
import { useUserAccount } from '~/lib/user/useUserAccount';
import { useUserTokenBalances } from '~/lib/user/useUserTokenBalances';
import { useAllowances } from '~/lib/util/useAllowances';
import { useRewardPoolDeposit } from '../lib/useRewardPoolDeposit';
import { useApproveToken } from '~/lib/util/useApproveToken';
import { BeetsTokenInputWithSlider } from '~/components/inputs/BeetsTokenInputWithSlider';

interface Props {
  isOpen: boolean;
  onOpen(): void;
  onClose(): void;
  pool: RewardPool;
}

export function RewardPoolDepositModal({ isOpen, onOpen, onClose, pool }: Props) {
  const [inputAmount, setInputAmount] = useState('');
  const [percent, setPercent] = useState(100);
  const [steps, setSteps] = useState<TransactionStep[] | null>(null);

  const { userAddress } = useUserAccount();
  const { depositToPool, ...depositQuery } = useRewardPoolDeposit(pool);

  const vrtkAddress = networkConfig.beets.address;
  const vrtkInfo: TokenBase = {
    address: vrtkAddress,
    symbol: 'VRTK',
    decimals: 18,
    name: 'Vertek',
  };

  const {
    isLoading: isLoadingAllowances,
    hasApprovalForAmount,
    refetch: refetchAllowances,
  } = useAllowances(userAddress || null, [vrtkInfo], pool.address);

  const {
    getUserBalance,
    isLoading: isLoadingBalances,
    isRefetching: isRefetchingBalances,
    refetch: refetchTokenBalances,
  } = useUserTokenBalances();
  const { approve, ...approveQuery } = useApproveToken(vrtkInfo);

  const userVrtkBalance = getUserBalance(vrtkAddress.toLowerCase());
  const userAmount = oldBnumToHumanReadable(
    oldBnumScaleAmount(getUserBalance(userVrtkBalance)).times(percent).div(100),
  );

  const hasValue = userAmount !== '' && percent !== 0;
  const amountIsValid = !hasValue || parseFloat(userVrtkBalance) >= parseFloat(userAmount);
  const loading = isLoadingBalances || isLoadingAllowances;

  useEffect(() => {
    if (!loading) {
      const hasApproval = hasApprovalForAmount(vrtkAddress, userVrtkBalance);

      setSteps([
        ...(!hasApproval
          ? [
              {
                id: 'approve',
                type: 'other' as const,
                buttonText: 'Approve VRTK',
                tooltipText: 'Approve VRTK',
              },
            ]
          : []),
        {
          id: 'stake',
          type: 'other',
          buttonText: 'Stake VRTK',
          tooltipText: 'Stake your VRTK to earn additional rewards.',
        },
      ]);
    }
  }, [loading, isOpen]);

  useEffect(() => {
    if (isOpen && userVrtkBalance) {
      setPercent(100);
    }
  }, [isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        approveQuery.reset();
        depositQuery.reset();
        onClose();
      }}
      size="xl"
    >
      <ModalOverlay />
      <ModalContent backgroundColor="black">
        <ModalCloseButton />
        <ModalHeader className="bg">
          <Text color="gray.200" fontSize="md">
            Stake your VRTK to earn additional rewards
          </Text>
        </ModalHeader>
        <ModalBody className="bg" pt="4" pb="6">
          <BeetsTokenInputWithSlider
            tokenOptions={[]}
            selectedTokenOption={vrtkInfo}
            balance={userVrtkBalance}
            setInputAmount={(amount) => setInputAmount(amount)}
            value={inputAmount}
            setSelectedTokenOption={() => null}
            mb="4"
          />

          <BeetsTransactionStepsSubmit
            isLoading={loading || steps === null}
            loadingButtonText="Loading balances..."
            completeButtonText="Deposit complete"
            onCompleteButtonClick={() => {
              onClose();
            }}
            onSubmit={(id) => {
              if (id === 'approve') {
                approve(pool.address);
              } else if (id === 'stake') {
                depositToPool(inputAmount || '0');
              }
            }}
            onConfirmed={async (id) => {
              if (id === 'approve') {
                refetchAllowances();
              } else if (id === 'stake') {
                refetchTokenBalances();
              }
            }}
            steps={steps || []}
            queries={[
              { ...depositQuery, id: 'stake' },
              { ...approveQuery, id: 'approve' },
            ]}
            isDisabled={!hasValue || !amountIsValid}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
