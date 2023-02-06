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
  const [selectedDateOption, setSelectedDateOption] = useState<string>('');

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
  if (isValidLockAmount && lockDate) {
    expectedVeBalAmount = expectedVeBal(lockAmount, lockDate);
  }

  const lockDates = [
    {
      id: 'one-week',
      label: '~1W',
      date: getDateInput(minLockEndDateTimestamp),
      action: () => {
        setSelectedDateOption('one-week');
        updateLockEndDate(minLockEndDateTimestamp);
      },
    },
    {
      id: 'one-month',
      label: '~1M',
      date: getDateInput(addWeeks(minLockEndDateTimestamp, 4).getTime()),
      action: () => {
        setSelectedDateOption('one-month');
        updateLockEndDate(addWeeks(minLockEndDateTimestamp, 4).getTime());
      },
    },
    {
      id: 'three-month',
      label: '~3M',
      date: getDateInput(addWeeks(minLockEndDateTimestamp, 12).getTime()),
      action: () => {
        setSelectedDateOption('three-month');
        updateLockEndDate(addWeeks(minLockEndDateTimestamp, 12).getTime());
      },
    },
    {
      id: 'six-month',
      label: '~6M',
      date: getDateInput(addWeeks(minLockEndDateTimestamp, 24).getTime()),
      action: () => {
        setSelectedDateOption('six-month');
        updateLockEndDate(addWeeks(minLockEndDateTimestamp, 24).getTime());
      },
    },
    {
      id: 'one-year',
      label: '~1Y',
      date: formatDateInput(maxLockEndDateTimestamp),
      action: () => {
        setSelectedDateOption('one-year');
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
          <BeetsModalHeadline textAlign="center" fontSize="1.5rem" color="gray.100" mt="-1rem">
            {title}
          </BeetsModalHeadline>
        </BeetsModalHeader>

        <BeetsModalBody bgColor="transparent" p="0" textAlign="center" fontSize="1.2rem">
          <Grid
            backgroundColor={{ base: 'rgba(0, 0, 0, 0.8)', md: 'transparent' }}
            pl={{ base: '0', md: '4' }}
            pr={{ base: '2', md: '4' }}
            templateColumns={{ base: '1fr', md: '2fr 3fr 2fr' }}
            gap="4"
            maxWidth="90vw"
          >
            <Card
                flexDirection="column" 
                alignItems="center"
                borderRadius="16px"
                height="375px"
                padding="0"
                marginTop={{ base:'0', md:'12'}}
                boxShadow="0 0 10px #5BC0F8, 0 0 20px #4A4AF6"
                >
              <Box 
              width="90%" 
              display="flex" 
              padding="2"
              alignItems="center" justifyContent="center"
              boxShadow="2px 24px 12px 0px #000"
              borderRadius="md" mb="4" mt="2"
              bgColor="vertek.slatepurple.900">
              <Text
                align="center"
                paddingX="2"
                paddingY="4"
                fontWeight="bold"
                color="gray.100"
                lineHeight="1.1rem"
                fontSize="1.2rem"
              >
                My Lockable VRTK-BNB
              </Text>
              </Box>
              <Box
                width="95%" 
                paddingX="4"
                paddingY="4"
                display="flex" 
                boxShadow="2px 24px 12px 0px #000"
                bgColor="vertek.slatepurple.900"
                justifyContent="center"
                mb="6"
                borderRadius="md"
                flexDirection="column"
              >
                <Flex mb="3">
                  <Text fontSize="1rem" mr="auto">
                    VRTK-BNB
                  </Text>
                  <Text fontSize="0.9rem" ml="auto">
                  {(userLockablePoolBalance && parseFloat(userLockablePoolBalance).toFixed(4)) || 'N/A'}
                  </Text>
                </Flex>
                <Flex mb="5">
                  <Text fontSize="1rem" mr="auto">
                    Vertek Governance
                  </Text>
                  <Text fontSize="0.9rem" ml="auto">
                    {userLockablePoolBalanceUSD}
                  </Text>
                  
                </Flex>
                <Button
                  variant="verteklight"
                  as="a"
                  href={'pool/' + networkConfig.balancer.votingEscrow.lockablePoolId}
                  borderWidth="1px"
                  width="100%"
                  height="2.2rem"
                >
                  Get VRTK-BNB
                </Button>
              </Box>
              <Box
                width="90%" 
                paddingX="1"
                paddingBottom="4" paddingTop="2" 
                display="flex" 
                boxShadow="2px 24px 12px 0px #000"
                bgColor="vertek.slatepurple.900"
                justifyContent="center"
                mb="6"
                borderRadius="md"
                flexDirection="column"
              >
                <Text fontSize="1rem" mr="auto"></Text>
                <Accordion allowToggle mb="4" padding={1}>
                  <AccordionItem>
                    <AccordionButton color="gray.100" _expanded={{}}>
                      <AccordionIcon color="gray.100" />
                      <Box flex="1" textAlign="center">
                        How to lock
                      </Box>
                      <AccordionIcon color="gray.100" />
                    </AccordionButton>

                    <AccordionPanel
                      height={{ base: '40vh', md: 'auto' }}
                      bg="vertek.slatepurple.900"
                      paddingBottom="4" paddingX="1"
                      marginY="4"
                      borderRadius="16px"
                      // boxShadow="2px 12px 12px 0px #000"
                    >
                      <Text align="left" color="gray.100" fontSize="0.9rem" mb="0.5rem">
                        1. Invest in the VRTK-BNB pool.
                      </Text>
                      <Text align="left" color="gray.100" fontSize="0.9rem" mb="0.5rem">
                        2. Lock VRTK-BNB to receive veVRTK.
                      </Text>
                      <Text align="left" color="gray.100" fontSize="0.9rem" mb="0.5rem">
                        3. Receive boosted liquidity mining yields (up to 2.5x) and increased voting
                        power.
                      </Text>
                      <Text align="left" color="gray.100" fontSize="0.9rem" mb="0.5rem">
                        4. Choose which pool gauges get allocated liquidity mining incentives.
                      </Text>
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              </Box>
            </Card>

            <Card
                flexDirection="column" 
                alignItems="center"
                borderRadius="16px"
                height="500px"
                padding="0"
                marginTop={{ base:'0', md:'12'}}
                boxShadow="0 0 10px #5BC0F8, 0 0 20px #4A4AF6"
                >
              <Box 
              width="90%" 
              display="flex" 
              paddingX="2" paddingY="1"
              alignItems="center" justifyContent="center"
              boxShadow="2px 24px 12px 0px #000"
              borderRadius="md" mb="4" mt="2"
              bgColor="vertek.slatepurple.900">
                  <Text  align="center"
                    paddingX="2"
                    paddingY="4"
                    fontWeight="bold"
                    color="gray.100"
                    lineHeight="1.1rem"
                    fontSize="1.2rem">
                    {title}
                  </Text>
              </Box>
              <Box
                width="95%" 
                paddingX="4"
                paddingY="3"
                display="flex" 
                boxShadow="2px 24px 12px 0px #000"
                bgColor="vertek.slatepurple.900"
                justifyContent="center"
                mb="2"
                borderRadius="md"
                flexDirection="column"
              >
                <Text align="left" mb="0" fontWeight="normal" color="gray.100" 
                fontSize="1rem">
                  How much do you want to lock?
                </Text>

                <InputGroup>
                  <FormControl mb="1">
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
                      placeholder={(userLockablePoolBalance && 
                          parseFloat(userLockablePoolBalance).toFixed(4)) || 'N/A'}
                      size="md"
                      fontWeight="bold"
                    />
                    <FormLabel mt="1" mb="1" color="gray.100" fontWeight="bold">
                    {(userLockablePoolBalance && 
                          parseFloat(userLockablePoolBalance).toFixed(4)) || 'N/A'} VRTK-BNB available
                    </FormLabel>
                  </FormControl>
                  <InputRightElement width="4.5rem">
                    <Button variant="verteklight" borderWidth="1px"
                    h="1.75rem" size="sm" onClick={handleMaxClick}>
                      Max
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </Box>

              <Box
                width="95%" 
                paddingX="4"
                paddingY="3"
                display="flex" 
                boxShadow="2px 24px 12px 0px #000"
                bgColor="vertek.slatepurple.900"
                justifyContent="center"
                mb="6"
                borderRadius="md"
                flexDirection="column"
              >
                <Text align="left" mb="0" fontWeight="normal" color="gray.100" 
                fontSize="1rem">
                  Lock until
                </Text>
                <FormControl mb="2">
                  <Input
                    placeholder="Select Date and Time"
                    focusBorderColor="vertek.neonpurple.500"
                    size="md"
                    type="date"
                    value={lockDate}
                    onChange={(event) => handleDateChanged(event.target.value)}
                    min={formatDateInput(minLockEndDateTimestamp)}
                    max={formatDateInput(maxLockEndDateTimestamp)}
                  />
                  <Box
                    w="100%"
                    paddingY="2"
                    mt="1"
                    paddingX={{ base: 'none', md: '0' }}
                    justifyContent="space-between"
                    display="flex"
                  >
                    {minLockEndDateTimestamp < maxLockEndDateTimestamp &&
                      lockDates?.map((lockDate, i) => {
                        return (
                          <Button
                            key={i}
                            width="100%"
                            height="2rem"
                            variant={
                              selectedDateOption === lockDate.id ? 'verteklight' : 'stayblacklock'
                            }
                            onClick={lockDate.action}
                          >
                            {lockDate.label}
                          </Button>
                        );
                      })}
                  </Box>
                </FormControl>
              </Box>

              <Box
                width="95%" 
                paddingX="4"
                paddingY="4"
                display="flex" 
                boxShadow="2px 24px 12px 0px #000"
                bgColor="vertek.slatepurple.900"
                justifyContent="center"
                mb="6"
                borderRadius="md"
                flexDirection="column"
              >
                <Flex>
                  <Text fontSize="0.9rem" fontWeight="bold" mr="auto">
                    Total Voting Escrow
                  </Text>
                  <Text fontWeight="bold" fontSize="0.9rem" ml="auto">
                     {(expectedVeBalAmount && 
                          parseFloat(expectedVeBalAmount).toFixed(4)) || 'N/A'} veVRTK
                    {/* <div>{expectedVeBalAmount || '0'} - veVRTK</div> */}
                  </Text>
                </Flex>
              </Box>
              <Button
                onClick={handleShowPreviewModal}
                variant="stayblack"
                mb="4"
                width={{ base: '85%', md: '60%' }}
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
            </Card>

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
