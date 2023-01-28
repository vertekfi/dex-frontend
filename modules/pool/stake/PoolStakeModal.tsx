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
  Text, Button
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { numberFormatUSDValue } from '~/lib/util/number-formats';
import { usePoolUserBptBalance } from '~/modules/pool/lib/usePoolUserBptBalance';
import { Modal, ModalBody, ModalCloseButton, ModalContent } from '@chakra-ui/modal';
import { capitalize } from 'lodash';
import { tokenFormatAmount } from '~/lib/services/token/token-util';
import { useApproveToken } from '~/lib/util/useApproveToken';
import { useStakingDeposit } from '~/lib/global/useStakingDeposit';
import { usePoolUserStakingAllowance } from '~/modules/pool/stake/lib/usePoolUserStakingAllowance';
import {
  BeetsTransactionStepsSubmit,
  TransactionStep,
} from '~/components/button/BeetsTransactionStepsSubmit';
import { BeetsBox } from '~/components/box/BeetsBox';
import { oldBnumScaleAmount, oldBnumToHumanReadable } from '~/lib/services/pool/lib/old-big-number';
import { CardRow } from '~/components/card/CardRow';
import { useNetworkConfig } from '~/lib/global/useNetworkConfig';
import { usePool } from '~/modules/pool/lib/usePool';
import { useUserSyncBalanceMutation } from '~/apollo/generated/graphql-codegen-generated';
import { useDisclosure } from '@chakra-ui/react';



export function PoolStakeModal() {
  const networkConfig = useNetworkConfig();
  const [percent, setPercent] = useState(100);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    userWalletBptBalance,
    hasBptInWallet,
    isLoading: isLoadingBalances,
    isRefetching: isRefetchingBalances,
    refetch: refetchBptBalances,
  } = usePoolUserBptBalance();

  const { pool, bptPrice } = usePool();

  const {
    hasApprovalToStakeAmount,
    isLoading: isLoadingAllowances,
    refetch: refetchAllowances,
    isRefetching,
  } = usePoolUserStakingAllowance();

  const [userSyncBalance] = useUserSyncBalanceMutation();
  const amount = oldBnumToHumanReadable(
    oldBnumScaleAmount(userWalletBptBalance).times(percent).div(100),
  );

  const usdValue = bptPrice * parseFloat(amount);
  const hasValue = hasBptInWallet && amount !== '' && percent !== 0;
  const amountIsValid = !hasValue || parseFloat(userWalletBptBalance) >= parseFloat(amount);

  const { approve, ...approveQuery } = useApproveToken(pool);
  const { stake, ...stakeQuery } = useStakingDeposit(pool.staking || null);
  const [steps, setSteps] = useState<TransactionStep[] | null>(null);
  const loading = isLoadingAllowances || isLoadingBalances;

  useEffect(() => {
    if (!loading) {
      const hasApproval = hasApprovalToStakeAmount(userWalletBptBalance);

      setSteps([
        ...(!hasApproval
          ? [
              {
                id: 'approve',
                type: 'other' as const,
                buttonText: 'Approve VPT',
                tooltipText: 'Approve VPT',
              },
            ]
          : []),
        {
          id: 'stake',
          type: 'other',
          buttonText: 'Stake VPT',
          tooltipText: 'Stake your VPT to earn additional rewards.',
        },
      ]);
    }
  }, [loading, isOpen]);

  useEffect(() => {
    if (isOpen && userWalletBptBalance) {
      setPercent(100);
    }
  }, [isOpen]);

  return (
    <>
    <Button 
    mb={{ base:'3', md:'0'}}
    variant="vertekdark" 
    alignSelf={{ base:'flex-end', md:'auto' }}
    onClick={onOpen} 
    width={{ base: '75%', md: '140px' }} 
    mr={{ base:'none', md:'2' }}
    _hover={{ 
      boxShadow: '0 0 10px #5BC0F8, 0 0 20px #4A4AF6', 
      background: 'vertek.slate.900', 
      color: 'white', 
      borderWidth: '2px', 
      borderColor: 'vertek.neonpurple.500', 
      transform: 'scale(1.01)' 
      }}
    >
        Stake
  </Button>
  <Modal
    isOpen={isOpen}
    onClose={() => {
      approveQuery.reset();
      stakeQuery.reset();
      onClose();
    }}
    size="xl"
  >
      <ModalOverlay  bg=
      {`radial-gradient(circle at center, 
          #4132D0 0%, 
          rgba(0,0,0, 0.8) 70% )`}
      />
      <ModalContent bgColor="rgba(0, 0, 0, 0.8)"
        boxShadow="0 0 10px #5BC0F8, 0 0 20px #4A4AF6"
        borderRadius="16px"
        mb="2"
        padding="4">
        <ModalCloseButton />
        <ModalHeader className="bg">
          <Heading size="md" noOfLines={1}>
            {capitalize(networkConfig.farmTypeName)}
          </Heading>
          <Text color="gray.200" fontSize="md">
            Stake your VPT tokens to earn additional rewards
          </Text>
        </ModalHeader>
        <ModalBody className="bg" pt="4" pb="6">
          <Text mb="4">
            Drag the slider to configure the amount you would like to stake. To maximize your
            rewards, stake all of your VPT into the {networkConfig.farmTypeName}.
          </Text>
          <Slider mt="8" aria-label="slider-ex-1" value={percent} onChange={setPercent}>
            <SliderTrack bg="gray.100">
              <SliderFilledTrack bg="vertek.neonpurple.500" />
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
                      {tokenFormatAmount(amount)} VPT
                    </Box>
                  </>
                )}
              </Box>
            </CardRow>
          </BeetsBox>

          <BeetsTransactionStepsSubmit
            isLoading={loading || steps === null}
            loadingButtonText="Loading balances..."
            completeButtonText="Return to pool"
            onCompleteButtonClick={() => {
              onClose();
            }}
            onSubmit={(id) => {
              if (id === 'approve') {
                approve(pool.staking?.address || '');
              } else if (id === 'stake') {
                stake(amount || '0');
              }
            }}
            onConfirmed={async (id) => {
              if (id === 'approve') {
                refetchAllowances();
              } else if (id === 'stake') {
                refetchBptBalances();
                userSyncBalance({ variables: { poolId: pool.id } });
              }
            }}
            steps={steps || []}
            queries={[
              { ...stakeQuery, id: 'stake' },
              { ...approveQuery, id: 'approve' },
            ]}
            isDisabled={!hasValue || !amountIsValid}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
    </>
  );
}
