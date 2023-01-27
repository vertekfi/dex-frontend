import { Text, GridItem, Box, Button, Flex } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { FormControl, FormLabel, Input } from '@chakra-ui/react';
import { LockPreview } from './LockPreview';
import 'react-datepicker/dist/react-datepicker.css';
import { useUserVeLockInfoQuery } from '../../lib/useUserVeLockInfoQuery';
import { useUserData } from '~/lib/user/useUserData';
import { networkConfig } from '~/lib/config/network-config';
import { useVeVRTK } from '../../lib/useVeVRTK';
import { useLockState } from './lib/useLockState';
import { useLockAmount } from './lib/useLockAmount';
import { VeBalLockInfo } from '~/lib/services/balancer/contracts/veBAL';
import { useLockEndDate } from './lib/useLockEndDate';
import { LockType } from './types';
import { LockEndDate } from './LockEndDate';

interface Props {
  // lockablePool: Pool;
  // lockablePoolTokenInfo: TokenInfo;
  veBalLockInfo?: VeBalLockInfo;
}

export function LockFormInner(props: Props) {
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  const [lockablePoolBptBalance, setLockablePoolBptBalance] = useState<string>();
  const [submissionDisabled, setSubmissionDisabled] = useState<string>();
  const [expectedVeBalAmount, setExpectedVeBalAmount] = useState<string>();
  const [lockType, setLockType] = useState<LockType>();

  const { data: userLockInfo } = useUserVeLockInfoQuery();
  const { loading: loadingBalances, bptBalanceForPool, usdBalanceForPool } = useUserData();
  const { lockablePoolId } = useVeVRTK();

  const { lockEndDate, lockAmount } = useLockState();

  const { isValidLockAmount, isIncreasedLockAmount, totalLpTokens } = useLockAmount(
    props.veBalLockInfo,
  );

  const {
    minLockEndDateTimestamp,
    maxLockEndDateTimestamp,
    isValidLockEndDate,
    isExtendedLockEndDate,
  } = useLockEndDate(props.veBalLockInfo);

  const handleOpenModal = () => setShowPreviewModal(true);

  useEffect(() => {}, []);

  function handleClosePreviewModal() {
    setShowPreviewModal(false);
  }

  function handleShowPreviewModal() {
    if (submissionDisabled) return;
    setShowPreviewModal(true);
  }

  return (
    <GridItem
      boxShadow={{ base: 'none', md: '0 12px 12px #000' }}
      width={{ base: '90%', lg: 'auto' }}
      m={{ base: '2', md: '2' }}
      bgGradient="linear-gradient(90deg, #302B84 0%, #362BA8 80%, #4132D0 100%)"
      borderRadius="12px"
    >
      <Box
        padding="2"
        borderRadius="12px"
        mb="6"
        bgGradient="linear-gradient(90deg, #302B84 0%, #362BA8 80%, #4132D0 100%)"
      >
        <Text align="left" padding="1" mb="4" fontWeight="bold" color="white" fontSize="1.2rem">
          Lock to get veVRTK
        </Text>
        <Text align="left" paddingX="3" mb="0" fontWeight="normal" color="white" fontSize="1rem">
          How much do you want to lock?
        </Text>
        <Box
          padding="2"
          bgColor="black"
          boxShadow="0 12px 12px rgba(0, 0, 0, 0.5)"
          borderRadius="12px"
          mb="6"
        >
          <FormControl mb="8">
            <Input
              focusBorderColor="vertek.neonpurple.500"
              id="voteWeight"
              name="voteWeight"
              type="number"
              // value={voteWeight}
              // onChange={(event) => setVoteWeight(event.target.value)}
              autoComplete="off"
              autoCorrect="off"
              spellCheck={false}
              step="any"
              placeholder="0.00"
              // validateOn="input"
              // rules={inputRules}
              // disabled={voteInputDisabled || transactionInProgress || voteState.receipt}
              size="md"
            />
            <FormLabel mt="2" mb="4" color="white">
              {bptBalanceForPool(networkConfig.balancer.votingEscrow.lockablePoolId)} shares
              available
            </FormLabel>
          </FormControl>
        </Box>
        <Text
          align="left"
          paddingX="3"
          mb="0"
          fontWeight="normal"
          color="white"
          fontSize="1rem"
          textDecoration="uppercase"
        >
          Lock until
        </Text>
        <LockEndDate
          veBalLockInfo={userLockInfo}
          minLockEndDateTimestamp={minLockEndDateTimestamp}
          maxLockEndDateTimestamp={maxLockEndDateTimestamp}
        />
        <Box
          borderRadius="12px"
          p="4"
          bgColor="black"
          mb="6"
          boxShadow="0 12px 12px rgba(0, 0, 0, 1)"
        >
          <Flex align="center">
            <Text fontSize="0.9rem" mr="auto">
              Total Voting Escrow
            </Text>
            <Text fontSize="0.9rem" ml="auto">
              NEXT
            </Text>
          </Flex>
        </Box>

        <Button
          onClick={handleOpenModal}
          variant="stayblack"
          mb="4"
          boxShadow="0 12px 12px rgba(0, 0, 0, 1)"
          width={{ base: '90%', lg: '100%' }}
        >
          Preview
        </Button>
        {showPreviewModal && (
          <LockPreview isOpen={showPreviewModal} onClose={() => setShowPreviewModal(false)} />
        )}
      </Box>
    </GridItem>
  );
}
