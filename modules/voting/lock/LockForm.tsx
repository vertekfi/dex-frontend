import {
  Modal,
  Text,
  ModalOverlay,
  ModalContent,
  GridItem,
  ModalCloseButton,
  Grid,
  Box,
  Button,
  Flex,
  FormControl,
  Input,
  FormLabel,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import {
  BeetsModalBody,
  BeetsModalHeader,
  BeetsModalHeadline,
} from '~/components/modal/BeetsModal';
import { useEffect, useState } from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react';
import { LockPreviewModal } from './LockPreviewModal/LockPreviewModal';
import { MyVeVRTK } from '../components/MyVeVRTK';
import { useUserVeData } from '../lib/useUserVeData';
import { networkConfig } from '~/lib/config/network-config';
import { LockType } from './types';
import { useLockEndDate } from './lib/useLockEndDate';
import { INPUT_DATE_FORMAT } from '../constants';
import { addWeeks, format } from 'date-fns';
import useLockAmount from './lib/useLockAmount';
import { bnum } from '~/lib/util/big-number.utils';
import Card from '~/components/card/Card';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function LockForm(props: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lockType, setLockType] = useState<LockType[]>([]);

  const {
    isLoadingUserVeData,
    userLockablePoolBalance,
    userLockablePoolBalanceUSD,
    currentVeBalance,
    percentOwned,
    expectedVeBal,
    lockEndDate,
    lockedUntilDate,
    lockedUntilDays,
    lockablePool,
    hasExistingLock,
    isExpired,
    lockedBalance,
  } = useUserVeData();

  const {
    lockDate,
    setLockDate,
    minLockEndDateTimestamp,
    maxLockEndDateTimestamp,
    isExtendedLockEndDate,
    isValidLockEndDate,
  } = useLockEndDate({
    hasExistingLock: hasExistingLock || false,
    lockedEndDate: lockEndDate,
  });

  const { lockAmount, setLockAmount, isValidLockAmount, isIncreasedLockAmount, totalLpTokens } =
    useLockAmount({
      hasExistingLock: hasExistingLock || false,
      lockedAmount: lockedBalance,
    });

  const hasVaildLock = hasExistingLock && !isExpired;
  let submissionDisabled = true;

  if (hasVaildLock) {
    if (isIncreasedLockAmount || isExtendedLockEndDate) {
      submissionDisabled = false;
    } else {
      submissionDisabled = true;
    }
  } else {
    if (!bnum(userLockablePoolBalance || '0').gt(0) || !isValidLockAmount || !lockDate) {
      submissionDisabled = true;
    } else {
      submissionDisabled = false;
    }
  }

  let title = '';
  if (hasVaildLock) {
    title = 'Update VRTK-BNB lock';
  } else {
    title = 'Lock VRTK-BNB';
  }

  // Set lock type
  useEffect(() => {
    if (hasExistingLock && !isExpired) {
      if (isIncreasedLockAmount && isExtendedLockEndDate) {
        return setLockType([LockType.INCREASE_AMOUNT, LockType.EXTEND_LOCK]);
      }

      if (isExtendedLockEndDate) {
        return setLockType([LockType.EXTEND_LOCK]);
      }

      if (isIncreasedLockAmount) {
        setLockType([LockType.INCREASE_AMOUNT]);
      }
    } else {
      setLockType([LockType.CREATE_LOCK]);
    }
  }, [isLoadingUserVeData, lockAmount, lockDate]);

  // Set initial date if needed
  useEffect(() => {
    if (hasExistingLock) {
      updateLockEndDate(lockEndDate);
    } else {
      updateLockEndDate(maxLockEndDateTimestamp);
    }
  }, [isLoadingUserVeData]);

  function handleClosePreviewModal() {
    setIsModalOpen(false);
  }

  function handleShowPreviewModal() {
    setIsModalOpen(true);
  }

  function getDateInput(timestamp: number) {
    return formatDateInput(Math.min(timestamp, maxLockEndDateTimestamp));
  }

  function updateLockEndDate(timestamp: number) {
    const newDate = getDateInput(timestamp);
    setLockDate(newDate);
  }

  function formatDateInput(date: Date | number) {
    return format(date, INPUT_DATE_FORMAT);
  }

  function handleDateChanged(date: string) {
    updateLockEndDate(new Date(date).getTime());
    // round up to thursday of the selected week?
  }

  function handleMaxClick() {
    setLockAmount(userLockablePoolBalance || '0');
  }

  let expectedVeBalAmount = '0';
  if (isValidLockAmount && isValidLockEndDate) {
    expectedVeBalAmount = expectedVeBal(lockAmount, lockDate);
  }

  const lockDates = [
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
        setLockDate(formatDateInput(maxLockEndDateTimestamp));
      },
    },
  ];

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} size="xl">
      <ModalOverlay
        display={{ base: 'none', md: 'block' }}
        bg={`radial-gradient(circle at center, #4132D0 0%, rgba(0,0,0, 0.8) 90% )`}
      />
      <ModalOverlay display={{ base: 'block', md: 'none' }} bg="black" />
      <ModalContent
        minW={{ base: 'auto', md: '95vw' }}
        maxW={{ base: 'auto', md: '95vw' }}
        h="100vh"
        bgColor="rgba(0, 0, 0, 0.5)"
        // boxShadow="2px 24px 12px 0px #000"
        paddingY="2rem"
        borderRadius="4rem"
        marginTop="0rem"
        padding="4"
      >
        <ModalCloseButton />
        <BeetsModalHeader>
          <BeetsModalHeadline textAlign="center" fontSize="1.5rem" color="white" mt="-1rem">
            {title}
          </BeetsModalHeadline>
        </BeetsModalHeader>

        <BeetsModalBody bgColor="transparent" p="0" textAlign="center" fontSize="1.2rem">
          <Grid
            backgroundColor={{ base: 'rgba(0, 0, 0, 0.8)', md: 'transparent' }}
            pl={{ base: '0', md: '4' }}
            pr={{ base: '0', md: '4' }}
            templateColumns={{ base: '1fr', md: '2fr 3fr 2fr' }}
            gap="4"
          >
            <GridItem
              width={{ base: '90%', md: 'auto' }}
              height={{ base: '90%', md: '50%' }}
              m={{ base: '0', md: '2' }}
              mt={{ base: '2', md: '12' }}
              bgColor="vertek.slate.900"
              borderRadius="16px"
            >
              <Text
                align="left"
                paddingX="4"
                paddingY="2"
                mb="4"
                fontWeight="bold"
                color="white"
                fontSize="1.2rem"
              >
                Lockable tokens in my wallet
              </Text>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="space-between"
                height="40%"
                marginX="2"
                mb="6"
                padding="6"
                bgColor="vertek.slatepurple.900"
                boxShadow="2px 24px 12px 0px #000"
                borderRadius="12px"
                flexDirection="column"
              >
                <Flex>
                  <Text fontSize="1rem" mr="auto">
                    VRTK-BNB
                  </Text>
                  <Text fontSize="1rem" ml="auto">
                    {userLockablePoolBalance}
                  </Text>
                </Flex>
                <Flex>
                  <Text fontSize="1rem" mr="auto">
                    Vertek Governance
                  </Text>
                  <Text fontSize="1rem" ml="auto">
                    {userLockablePoolBalanceUSD}
                  </Text>
                </Flex>
              </Box>

              <Flex display="flex" justifyContent="center" alignItems="center" mt="8">
                <Button
                  variant="verteklight"
                  as="a"
                  href={'pool/' + networkConfig.balancer.votingEscrow.lockablePoolId}
                  borderWidth="1px"
                  width="90%"
                  height="2.2rem"
                >
                  Get VRTK-BNB
                </Button>
              </Flex>

              <Box
                padding="2"
                borderRadius="16px"
                bgColor="vertek.slate.900"
                boxShadow="2px 24px 12px 0px #000"
                mb="4"
                mt="4"
              >
                <Text fontSize="1rem" mr="auto"></Text>
                <Accordion allowToggle mb="4" padding={1}>
                  <AccordionItem>
                    <AccordionButton color="white" _expanded={{}}>
                      <AccordionIcon color="white" />
                      <Box flex="1" textAlign="center">
                        How to lock
                      </Box>
                      <AccordionIcon color="white" />
                    </AccordionButton>

                    <AccordionPanel
                      height={{ base: '40vh', md: 'auto' }}
                      bg="vertek.slatepurple.900"
                      padding="4"
                      marginY="4"
                      borderRadius="16px"
                      boxShadow="2px 12px 12px 0px #000"
                    >
                      <Text align="left" color="white" fontSize="0.9rem" mb="0.5rem">
                        1. Invest in the VRTK-BNB pool.
                      </Text>
                      <Text align="left" color="white" fontSize="0.9rem" mb="0.5rem">
                        2. Lock VRTK-BNB to receive veVRTK.
                      </Text>
                      <Text align="left" color="white" fontSize="0.9rem" mb="0.5rem">
                        3. Receive boosted liquidity mining yields (up to 2.5x) and increased voting
                        power.
                      </Text>
                      <Text align="left" color="white" fontSize="0.9rem" mb="0.5rem">
                        4. Choose which pool gauges get allocated liquidity mining incentives.
                      </Text>
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              </Box>
            </GridItem>

            <GridItem
              width={{ base: '90%', md: 'auto' }}
              mt={{ base: '3rem', md: 'auto' }}
              bgColor="vertek.slate.900"
              borderRadius="16px"
              boxShadow="0 0 10px #5BC0F8, 0 0 20px #4A4AF6"
            >
              <Text align="left" padding="5" fontWeight="bold" color="white" fontSize="1.2rem">
                {title}
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

                <InputGroup>
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
                      placeholder={userLockablePoolBalance || '0.00'}
                      size="md"
                      fontWeight="bold"
                    />
                    <FormLabel mt="2" mb="4" color="white" fontWeight="bold">
                      {userLockablePoolBalance} VRTK-BNB available
                    </FormLabel>
                  </FormControl>
                  <InputRightElement width="4.5rem">
                    <Button variant="verteklight" h="1.75rem" size="sm" onClick={handleMaxClick}>
                      Max
                    </Button>
                  </InputRightElement>
                </InputGroup>
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
                  <Input
                    placeholder="Select Date and Time"
                    size="md"
                    type="date"
                    value={lockDate}
                    onChange={(event) => handleDateChanged(event.target.value)}
                    min={formatDateInput(minLockEndDateTimestamp)}
                    max={formatDateInput(maxLockEndDateTimestamp)}
                  />
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
                    {/* <div>{tokenFormatAmount(expectedVeBalAmount || '0')} - veVRTK</div> */}
                    <div>{expectedVeBalAmount || '0'} - veVRTK</div>
                  </Text>
                </Flex>
              </Box>
              <Button
                onClick={handleShowPreviewModal}
                variant="stayblack"
                _hover={{ boxShadow: '0 28px 12px rgba(0, 0, 0, 1)', borderColor: 'white' }}
                mb="4"
                width={{ base: '85%', md: '90%' }}
                disabled={submissionDisabled}
              >
                Preview
              </Button>
              {isModalOpen && (
                <LockPreviewModal
                  isOpen={isModalOpen}
                  onClose={handleClosePreviewModal}
                  lockType={lockType}
                  totalLpTokens={totalLpTokens}
                  lockEndDate={lockDate}
                  lockablePool={lockablePool}
                  lockAmount={lockAmount || '0'}
                  expectedVeBalAmount={expectedVeBalAmount}
                  currentVeBalance={currentVeBalance || '0'}
                />
              )}
            </GridItem>

            <Card
              flexDirection="column"
              borderRadius="16px"
              height="200px"
              padding="4"
              alignItems="center"
              justifyContent="center"
              marginTop="5rem"
              boxShadow="0 0 10px #5BC0F8, 0 0 20px #4A4AF6"
              css={{
                transition: 'transform 0.5s',
                '&:hover': {
                  transform: 'scale(1.01)',
                },
              }}
            >
              <MyVeVRTK
                currentVeBalance={currentVeBalance || ''}
                percentOwned={percentOwned || '0'}
                lockedUntilDate={lockedUntilDate || '-'}
                lockedUntilDays={lockedUntilDays || 0}
              />
            </Card>
          </Grid>
        </BeetsModalBody>
      </ModalContent>
    </Modal>
  );
}
