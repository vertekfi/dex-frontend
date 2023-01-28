import { Text, GridItem, Box, Button, Flex, FormControl, Input, FormLabel } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { LockPreview } from './LockPreviewModal/LockPreviewModal';
import 'react-datepicker/dist/react-datepicker.css';
import { networkConfig } from '~/lib/config/network-config';
import { expectedVeBal, useVeVRTK } from '../../lib/useVeVRTK';
import { useLockAmount } from './lib/useLockAmount';
import { VeBalLockInfo } from '~/lib/services/balancer/contracts/veBAL';
import { useLockEndDate } from './lib/useLockEndDate';
import { LockType } from './types';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import { useGetPoolQuery } from '~/apollo/generated/graphql-codegen-generated';
import { bnum } from '~/lib/util/big-number.utils';
import { useUserData } from '~/lib/user/useUserData';
import { addWeeks, format } from 'date-fns';
import { INPUT_DATE_FORMAT } from '../../constants';

interface Props {
  // lockablePool: Pool;
  // lockablePoolTokenInfo: TokenInfo;
  lockablePoolBptBalance: string;
  veBalLockInfo?: VeBalLockInfo;
}

export function LockFormInner(props: Props) {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submissionDisabled, setSubmissionDisabled] = useState<boolean>();
  const [expectedVeBalAmount, setExpectedVeBalAmount] = useState<string>();
  const [lockType, setLockType] = useState<LockType[]>([]);
  const [lockAmount, setLockAmount] = useState<string>();
  const [lockDates, setLockDates] = useState<
    {
      id: string;
      label: string;
      date: string;
      action: () => void;
    }[]
  >();

  const { veBalTokenInfo } = useVeVRTK();
  const { isValidLockAmount, isIncreasedLockAmount, totalLpTokens } = useLockAmount(
    props.veBalLockInfo,
  );
  const { bptBalanceForPool } = useUserData();
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
      setExpectedVeBalAmount(expectedVeBal(totalLpTokens, selectedDate));
    }
  }, [totalLpTokens, selectedDate]);

  useEffect(() => {
    if (props.veBalLockInfo?.hasExistingLock && !props.veBalLockInfo?.isExpired) {
      setSubmissionDisabled(!isIncreasedLockAmount && !isExtendedLockEndDate);
    } else {
      const disabled =
        !bnum(props.lockablePoolBptBalance).gt(0) || !isValidLockAmount || !isValidLockEndDate;

      setSubmissionDisabled(disabled);
    }
  }, [props.veBalLockInfo, props.lockablePoolBptBalance]);

  useEffect(() => {
    if (minLockEndDateTimestamp) {
      setLockDates([
        {
          id: 'one-week',
          label: '~1W',
          date: getDateInput(minLockEndDateTimestamp),
          action: () => updateLockEndDate(minLockEndDateTimestamp),
        },
        {
          id: 'one-month',
          label: '~1M',
          date: getDateInput(addWeeks(minLockEndDateTimestamp, 4).getTime()),
          action: () => updateLockEndDate(addWeeks(minLockEndDateTimestamp, 4).getTime()),
        },
        {
          id: 'three-month',
          label: '~3M',
          date: getDateInput(addWeeks(minLockEndDateTimestamp, 12).getTime()),
          action: () => updateLockEndDate(addWeeks(minLockEndDateTimestamp, 12).getTime()),
        },
        {
          id: 'six-month',
          label: '~6M',
          date: getDateInput(addWeeks(minLockEndDateTimestamp, 24).getTime()),
          action: () => updateLockEndDate(addWeeks(minLockEndDateTimestamp, 24).getTime()),
        },
        {
          id: 'one-year',
          label: '~1Y',
          date: formatDateInput(maxLockEndDateTimestamp),
          action: () => {
            setSelectedDate(formatDateInput(maxLockEndDateTimestamp));
          },
        },
      ]);
    }
  }, [props]);

  function getDateInput(timestamp: number) {
    return formatDateInput(Math.min(timestamp, maxLockEndDateTimestamp));
  }

  function updateLockEndDate(timestamp: number) {
    console.log(timestamp);
    setSelectedDate(getDateInput(timestamp));
  }

  function formatDateInput(date: Date | number) {
    return format(date, INPUT_DATE_FORMAT);
  }

  function handleNewDate(date: any) {
    console.log(date);
  }

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

        <FormControl mb="4">
          <Input
            focusBorderColor="vertek.neonpurple.500"
            id="voteWeight"
            name="voteWeight"
            type="number"
            value={lockAmount}
            onChange={(event) => setLockAmount(event.target.value)}
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
            step="any"
            placeholder="0.00"
            size="md"
            fontWeight="bold"
          />
          <FormLabel mt="2" mb="4" color="white" fontWeight="bold">
            {bptBalanceForPool(networkConfig.balancer.votingEscrow.lockablePoolId)} shares available
          </FormLabel>
        </FormControl>
      </Box>

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="space-between"
        mb="6"
        mx="2"
        paddingX="2"
        paddingY="4"
        bgColor="vertek.slatepurple.900"
        boxShadow="2px 24px 12px 0px #000"
        borderRadius="16px"
        flexDirection="column"
      >
        <Text align="left" mb="0" fontWeight="normal" color="white" fontSize="1rem">
          Lock until
        </Text>
        <FormControl mb="2">
          {/* <DatePicker
            value={selectedDate}
            onChange={(date) => null}
            dateFormat="MM/dd/yyyy"
            placeholderText="mm/dd/yyyy"
            id="voteWeight"
            name="voteWeight"
            autoComplete="off"
            calendarClassName="datepicker"
          /> */}

          <Input placeholder="Select Date and Time" size="md" type="datetime-local" />
          <Box
            w="99%"
            paddingY="2"
            mt="2"
            paddingX={{ base: 'none', md: '1' }}
            justifyContent="space-between"
            display="flex"
          >
            {minLockEndDateTimestamp < maxLockEndDateTimestamp &&
              lockDates?.map((lockDate, i) => {
                return (
                  <Button key={i} variant="stayblacklock" onClick={lockDate.action}>
                    {lockDate.label}
                  </Button>
                );
              })}
          </Box>
        </FormControl>
      </Box>

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
          lockEndDate={selectedDate}
          lockablePool={lockablePool}
        />
      )}
    </GridItem>
  );
}
