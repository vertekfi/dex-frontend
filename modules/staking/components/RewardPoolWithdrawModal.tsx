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
import StakingNFTPools from '../../../lib/abi/StakingNFTPools.json';
import { readContract, getAccount } from '@wagmi/core';
import { formatUnits } from 'ethers/lib/utils';

interface Props {
  isOpen: boolean;
  onOpen(): void;
  onClose(): void;
  pool: RewardPool;
}

export function RewardPoolWithdrawModal({ isOpen, onOpen, onClose, pool }: Props) {
  const [withdrawAmount, setWithdrawAmount] = useState('0');
  const [steps, setSteps] = useState<TransactionStep[] | null>(null);
  const [userTokens, setUserTokens] = useState<string>();

  const { withdrawFromPool, ...withdrawQuery } = useRewardPoolWithdraw(pool.address);
  const account = getAccount()
  const vrtkAddress = networkConfig.beets.address;
  const vrtkInfo: TokenBase = {
    address: vrtkAddress,
    // address: '0x50d8D7F7CcEA28cc1C9dDb996689294dC62569cA',
    symbol: 'VRTK',
    // symbol: 'LSHARE',
    decimals: 18,
    name: 'Vertek',
    // name: 'Lshare',
  };

  useEffect(() => {
    if(!account.address) return;
    readContract({
      addressOrName: '0xDBC838Ee888407815889d5603bc679A81715F928',
      // addressOrName: '0x9b5c9187561d44a7548dc3680475bfdf8c6f86e2',
      contractInterface: StakingNFTPools,
      chainId: 56,
      functionName: 'balanceOf',
      args: [account.address],
    }).then((res) => {
      setUserTokens(parseFloat(formatUnits(res.toString(), 18)).toFixed(2));
    });
  }, [account]);

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
            balance={userTokens || '0'}
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
              withdrawFromPool(pool.poolId, withdrawAmount);
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
