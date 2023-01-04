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
import { BeetsBox } from '~/components/box/BeetsBox';
import { CardRow } from '~/components/card/CardRow';
import { tokenFormatAmount } from '~/lib/services/token/token-util';
import { numberFormatUSDValue } from '~/lib/util/number-formats';
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
  const amount = oldBnumToHumanReadable(
    oldBnumScaleAmount(getUserBalance(userVrtkBalance)).times(percent).div(100),
  );

  const hasValue = amount !== '' && percent !== 0;
  const amountIsValid = !hasValue || parseFloat(userVrtkBalance) >= parseFloat(amount);
  const loading = isLoadingBalances || isLoadingAllowances;

  useEffect(() => {
    if (!loading) {
      const hasApproval = hasApprovalForAmount(vrtkAddress, userVrtkBalance);
      console.log(hasApproval);
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
    // console.log(inputAmount);
  }, [inputAmount]);

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
          {/* <Heading size="md" noOfLines={1}>
            {capitalize(networkConfig.farmTypeName)}
          </Heading> */}
          <Text color="gray.200" fontSize="md">
            Stake your VRTK to earn additional rewards
          </Text>
        </ModalHeader>
        <ModalBody className="bg" pt="4" pb="6">
          {/* <Text mb="4">Drag the slider to configure the amount you would like to stake.</Text>
          <Slider mt="8" aria-label="slider-ex-1" value={percent} onChange={setPercent}>
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb boxSize={4} />
            <SliderMark
              value={percent}
              textAlign="center"
              bg="beets.base.500"
              color="white"
              mt="-10"
              ml="-30px"
              w="12"
              fontSize="md"
              width="60px"
              borderRadius="md"
            >
              {percent}%
            </SliderMark>
          </Slider>

          <BeetsBox mt="4" p="2" mb="8">
            <CardRow mb="0">
              <Box flex="1">
                <Text>Amount to stake</Text>
              </Box>
              <Box display="flex" flexDirection="column" alignItems="flex-end">
                {isLoadingBalances || isRefetchingBalances ? (
                  <>
                    <Skeleton height="20px" width="60px" mb="2" />
                    <Skeleton height="20px" width="40px" />
                  </>
                ) : (
                  <>
                    <Box textAlign="right">{numberFormatUSDValue(usdValue)}</Box>
                    <Box textAlign="right" color="gray.200">
                      {tokenFormatAmount(amount)} VRTK
                    </Box>
                  </>
                )}
              </Box>
            </CardRow>
          </BeetsBox> */}

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
            completeButtonText="Return to pool"
            onCompleteButtonClick={() => {
              onClose();
            }}
            onSubmit={(id) => {
              if (id === 'approve') {
                approve(pool.address);
              } else if (id === 'stake') {
                depositToPool(amount || '0');
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
