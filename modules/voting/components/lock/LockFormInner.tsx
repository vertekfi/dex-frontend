import { Text, GridItem, Box, Button, Flex } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { LockPreview } from './LockPreviewModal/LockPreviewModal';
import 'react-datepicker/dist/react-datepicker.css';
import { networkConfig } from '~/lib/config/network-config';
import { expectedVeBal, useVeVRTK } from '../../lib/useVeVRTK';
import { useLockState } from './lib/useLockState';
import { useLockAmount } from './lib/useLockAmount';
import { VeBalLockInfo } from '~/lib/services/balancer/contracts/veBAL';
import { useLockEndDate } from './lib/useLockEndDate';
import { LockType } from './types';
import 'react-datepicker/dist/react-datepicker.css';
import { LockAmount } from './LockAmount';
import { useGetPoolQuery } from '~/apollo/generated/graphql-codegen-generated';
import { bnum } from '~/lib/util/big-number.utils';
import { LockEndDate } from './LockEndDate';

interface Props {
  // lockablePool: Pool;
  // lockablePoolTokenInfo: TokenInfo;
  lockablePoolBptBalance: string;
  veBalLockInfo?: VeBalLockInfo;
}

export function LockFormInner(props: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submissionDisabled, setSubmissionDisabled] = useState<boolean>();
  const [expectedVeBalAmount, setExpectedVeBalAmount] = useState<string>();
  const [lockType, setLockType] = useState<LockType[]>([]);

  const { veBalTokenInfo } = useVeVRTK();
  const { lockEndDate } = useLockState();
  const { isValidLockAmount, isIncreasedLockAmount, totalLpTokens } = useLockAmount(
    props.veBalLockInfo,
  );

  const {
    minLockEndDateTimestamp,
    maxLockEndDateTimestamp,
    isValidLockEndDate,
    isExtendedLockEndDate,
  } = useLockEndDate(props.veBalLockInfo);

  const { data: lockablePool } = useGetPoolQuery({
    variables: {
      id: networkConfig.balancer.votingEscrow.lockablePoolId,
    },
  });

  useEffect(() => {
    if (props.veBalLockInfo?.hasExistingLock && !props.veBalLockInfo?.isExpired) {
      if (isIncreasedLockAmount && isExtendedLockEndDate) {
        setLockType([LockType.INCREASE_LOCK, LockType.EXTEND_LOCK]);
      } else if (isExtendedLockEndDate) {
        setLockType([LockType.EXTEND_LOCK]);
      } else if (isIncreasedLockAmount) {
        setLockType([LockType.INCREASE_LOCK]);
      } else {
        setLockType([LockType.INCREASE_LOCK]);
      }
    }
  }, [props.veBalLockInfo]);

  useEffect(() => {
    if (submissionDisabled) {
      setExpectedVeBalAmount('0');
      return;
    }

    if (totalLpTokens && totalLpTokens) {
      setExpectedVeBalAmount(expectedVeBal(totalLpTokens, lockEndDate));
    }
  }, [totalLpTokens, lockEndDate]);

  useEffect(() => {
    if (props.veBalLockInfo?.hasExistingLock && !props.veBalLockInfo?.isExpired) {
      setSubmissionDisabled(!isIncreasedLockAmount && !isExtendedLockEndDate);
    } else {
      const disabled =
        !bnum(props.lockablePoolBptBalance).gt(0) || !isValidLockAmount || !isValidLockEndDate;

      setSubmissionDisabled(disabled);
    }
  }, [props.veBalLockInfo, props.lockablePoolBptBalance]);

  function handleClosePreviewModal() {
    setIsModalOpen(false);
  }

  function handleShowPreviewModal() {
    // if (submissionDisabled) return;
    setIsModalOpen(true);
  }

  return (
    <GridItem
      width={{ base: '90%', md: 'auto' }}
      mt={{ base: '3rem', md: 'auto' }}
      bgColor="vertek.slate.900"
      borderRadius="16px"
      boxShadow="0 0 10px #5BC0F8, 0 0 20px #4A4AF6"
    >
      <Text align="left" padding="2" mb="4" fontWeight="bold" color="white" fontSize="1.2rem">
        Lock to get veVRTK
      </Text>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="space-between"
        marginX="2"
        mb="6"
        paddingX="2"
        paddingY="4"
        bgColor="vertek.slatepurple.900"
        boxShadow="2px 24px 12px 0px #000"
        borderRadius="16px"
        flexDirection="column"
      >
        <Text align="left" mb="0" fontWeight="normal" color="white" fontSize="1rem">
          How much do you want to lock?
        </Text>

        <LockAmount lockablePool={lockablePool?.pool} />
      </Box>

      <LockEndDate
        minLockEndDateTimestamp={minLockEndDateTimestamp}
        maxLockEndDateTimestamp={maxLockEndDateTimestamp}
        veBalLockInfo={props.veBalLockInfo}
      />

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="space-between"
        mb="6"
        mx="2"
        padding="4"
        paddingY="6"
        bgColor="vertek.slatepurple.900"
        boxShadow="2px 24px 12px 0px #000"
        borderRadius="16px"
        flexDirection="column"
      >
        <Flex>
          <Text fontSize="0.9rem" mr="auto">
            Total Voting Escrow
          </Text>
          <Text fontSize="0.9rem" ml="auto">
            {expectedVeBalAmount && (
              <div>
                {expectedVeBalAmount}: - {veBalTokenInfo?.symbol}
              </div>
            )}
          </Text>
        </Flex>
      </Box>
      <Button
        onClick={handleShowPreviewModal}
        variant="stayblack"
        _hover={{ boxShadow: '0 28px 12px rgba(0, 0, 0, 1)', borderColor: 'white' }}
        mb="4"
        width={{ base: '85%', md: '90%' }}
        // disabled={submissionDisabled}
      >
        Preview
      </Button>
      {isModalOpen && (
        <LockPreview
          isOpen={isModalOpen}
          onClose={handleClosePreviewModal}
          lockType={lockType}
          veBalLockInfo={props.veBalLockInfo}
          totalLpTokens={totalLpTokens || '0'}
          lockEndDate={lockEndDate}
          lockablePool={lockablePool}
        />
      )}
    </GridItem>
  );
}
