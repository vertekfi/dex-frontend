import { ModalHeader, ModalOverlay, Text } from '@chakra-ui/react';
import { Modal, ModalBody, ModalCloseButton, ModalContent } from '@chakra-ui/modal';
import { useEffect, useState } from 'react';
import { RewardPool } from '~/apollo/generated/graphql-codegen-generated';
import {
  BeetsTransactionStepsSubmit,
  TransactionStep,
} from '~/components/button/BeetsTransactionStepsSubmit';
import { networkConfig } from '~/lib/config/network-config';
import { TokenBase } from '~/lib/services/token/token-types';
import { BeetsTokenInputWithSlider } from '~/components/inputs/BeetsTokenInputWithSlider';
import { useRewardPoolWithdraw } from '../lib/useRewardPoolWithdraw';

interface Props {
  isOpen: boolean;
  onOpen(): void;
  onClose(): void;
  pool: RewardPool;
}

export function RewardPoolWithdrawModal({ isOpen, onOpen, onClose, pool }: Props) {
  const [withdrawAmount, setWithdrawAmount] = useState('0');
  const [steps, setSteps] = useState<TransactionStep[] | null>(null);

  const { withdrawFromPool, ...withdrawQuery } = useRewardPoolWithdraw(pool.address);

  const vrtkAddress = networkConfig.beets.address;
  const vrtkInfo: TokenBase = {
    address: vrtkAddress,
    symbol: 'VRTK',
    decimals: 18,
    name: 'Vertek',
  };

  useEffect(() => {
    if (!isOpen) {
      setSteps([
        {
          id: 'unstake',
          type: 'other',
          buttonText: 'Unstake VRTK',
          tooltipText: 'Unstake VRTK.',
        },
      ]);
    }
  }, [isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        withdrawQuery.reset();
        onClose();
      }}
      size="xl"
    >
      <ModalOverlay />
      <ModalContent backgroundColor="black">
        <ModalCloseButton />
        <ModalHeader className="bg">
          <Text color="gray.200" fontSize="md">
            Unstake VRTK
          </Text>
        </ModalHeader>
        <ModalBody className="bg" pt="4" pb="6">
          <BeetsTokenInputWithSlider
            tokenOptions={[]}
            selectedTokenOption={vrtkInfo}
            balance={pool.userInfo?.amountDeposited || '0'}
            setInputAmount={(amount) => setWithdrawAmount(amount)}
            value={withdrawAmount}
            setSelectedTokenOption={() => null}
            mb="4"
          />

          <BeetsTransactionStepsSubmit
            isLoading={steps === null}
            loadingButtonText="Loading balances..."
            completeButtonText="Withdraw complete"
            onCompleteButtonClick={() => {
              onClose();
            }}
            onSubmit={(id) => {
              withdrawFromPool(withdrawAmount);
            }}
            onConfirmed={async (id) => {}}
            steps={steps || []}
            queries={[{ ...withdrawQuery, id: 'unstake' }]}
            isDisabled={parseInt(pool.userInfo?.amountDeposited || '0') > 0 === false}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
