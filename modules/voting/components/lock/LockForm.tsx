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
} from '@chakra-ui/react';
import {
  BeetsModalBody,
  BeetsModalHeader,
  BeetsModalHeadline,
} from '~/components/modal/BeetsModal';
import { useState } from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react';
import 'react-datepicker/dist/react-datepicker.css';
import { useVotingGauges } from '~/lib/global/gauges/useVotingGauges';
import { useUserAccount } from '~/lib/user/useUserAccount';
import { useUserVeLockInfoQuery } from '../../lib/useUserVeLockInfoQuery';
import { useUserData } from '~/lib/user/useUserData';
import { useEffect } from 'react';
import { tokenFormatAmount } from '~/lib/services/token/token-util';
import { networkConfig } from '~/lib/config/network-config';
import { numberFormatUSDValue } from '~/lib/util/number-formats';
import { useVeVRTK } from '../../lib/useVeVRTK';
import { LockFormInner } from './LockFormInner';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const StyledGridItem = styled(GridItem)({});

export function LockForm(props: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => setIsModalOpen(true);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const [userPoolBalance, setUserPoolBalance] = useState<{
    balance: string;
    usdValue: string;
  }>({
    balance: '0',
    usdValue: '0',
  });

  const [lockInfoDisplay, setLockInfoDisplay] = useState<{
    lockedUntilDays: number;
    lockedUntilDate: string;
    veBalance: string;
    percentOwned: string;
  }>({
    lockedUntilDays: 0,
    lockedUntilDate: '-',
    veBalance: '0',
    percentOwned: '0',
  });

  const { isConnected } = useUserAccount();
  const { data: userLockInfo } = useUserVeLockInfoQuery();
  const { loading: loadingBalances, bptBalanceForPool, usdBalanceForPool } = useUserData();
  const { lockablePoolId } = useVeVRTK();

  useEffect(() => {
    if (!loadingBalances && isConnected) {
      setUserPoolBalance({
        balance: tokenFormatAmount(
          bptBalanceForPool(networkConfig.balancer.votingEscrow.lockablePoolId),
        ),
        usdValue: numberFormatUSDValue(
          usdBalanceForPool(networkConfig.balancer.votingEscrow.lockablePoolId),
        ),
      });
    }
  }, [loadingBalances, isConnected]);

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
          <BeetsModalHeadline textAlign="center" fontSize="1.5rem" color="white" mb="" mt="-1rem">
            Lock VRTK-BNB
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
                padding="2"
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
                padding="4"
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
                    {bptBalanceForPool(networkConfig.balancer.votingEscrow.lockablePoolId)} shares
                  </Text>
                </Flex>
                <Flex>
                  <Text fontSize="1rem" mr="auto">
                    Vertek Governance
                  </Text>
                  <Text fontSize="1rem" ml="auto">
                    ${usdBalanceForPool(networkConfig.balancer.votingEscrow.lockablePoolId)}
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
              <Text
                align="left"
                padding="2"
                mb="4"
                fontWeight="bold"
                color="white"
                fontSize="1.2rem"
              >
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
                    fontWeight="bold"
                  />
                  <FormLabel mt="2" mb="4" color="white" fontWeight="bold">
                    {bptBalanceForPool(networkConfig.balancer.votingEscrow.lockablePoolId)} shares
                    available
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
                  <DatePicker
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    dateFormat="MM/dd/yyyy"
                    placeholderText="mm/dd/yyyy"
                    id="voteWeight"
                    name="voteWeight"
                    autoComplete="off"
                    calendarClassName="datepicker"
                  />
                  <Box
                    w="99%"
                    paddingY="2"
                    mt="2"
                    paddingX={{ base: 'none', md: '1' }}
                    justifyContent="space-between"
                    display="flex"
                  >
                    <Button
                      variant="stayblacklock"
                      onClick={() => {
                        let nextThursday = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
                        while (nextThursday.getUTCDay() !== 4) {
                          nextThursday.setDate(nextThursday.getDate() + 1);
                        }
                        setSelectedDate(nextThursday);
                      }}
                    >
                      1w
                    </Button>
                    <Button
                      variant="stayblacklock"
                      onClick={() => {
                        let nextThursday = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
                        while (nextThursday.getUTCDay() !== 4) {
                          nextThursday.setDate(nextThursday.getDate() + 1);
                        }
                        setSelectedDate(nextThursday);
                      }}
                    >
                      1m
                    </Button>
                    <Button
                      variant="stayblacklock"
                      onClick={() => {
                        let nextThursday = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000);
                        while (nextThursday.getUTCDay() !== 4) {
                          nextThursday.setDate(nextThursday.getDate() + 1);
                        }
                        setSelectedDate(nextThursday);
                      }}
                    >
                      3m
                    </Button>
                    <Button
                      variant="stayblacklock"
                      onClick={() => {
                        let nextThursday = new Date(Date.now() + 180 * 24 * 60 * 60 * 1000);
                        while (nextThursday.getUTCDay() !== 4) {
                          nextThursday.setDate(nextThursday.getDate() + 1);
                        }
                        setSelectedDate(nextThursday);
                      }}
                    >
                      6m
                    </Button>
                    <Button
                      variant="stayblacklock"
                      onClick={() => {
                        let nextThursday = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);
                        while (nextThursday.getUTCDay() !== 4) {
                          nextThursday.setDate(nextThursday.getDate() + 1);
                        }
                        setSelectedDate(nextThursday);
                      }}
                    >
                      1y
                    </Button>
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
                    NEXT
                  </Text>
                </Flex>
              </Box>
              <Button
                onClick={handleOpenModal}
                variant="stayblack"
                _hover={{ boxShadow: '0 28px 12px rgba(0, 0, 0, 1)', borderColor: 'white' }}
                mb="4"
                // boxShadow="0 28px 12px rgba(0, 0, 0, 1)"
                width={{ base: '85%', md: '90%' }}
              >
                Preview
              </Button>
              {isModalOpen && (
                <LockPreview isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
              )}
            </GridItem>

            <GridItem
              width={{ base: '90%', md: 'auto' }}
              height={{ base: 'auto', md: '40%' }}
              m={{ base: '2', md: '2' }}
              padding="2"
              mt={{ base: '6', md: '24' }}
              mb={{ base: '6rem', md: 'auto' }}
              bgColor="vertek.slate.900"
              borderRadius="12px"
            >
              <Text
                align="left"
                padding="1"
                mb="2"
                fontWeight="bold"
                color="white"
                fontSize="1.2rem"
              >
                Governance -- veVRTK
              </Text>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="space-between"
                paddingX="1"
                paddingY="4"
                mx="1"
                my="4"
                bgColor="vertek.slatepurple.900"
                boxShadow="2px 24px 12px 0px #000"
                borderRadius="16px"
                flexDirection="column"
              >
                <Flex align="center" mt="3">
                  <Text fontWeight="bold" fontSize=".9rem" mr="auto">
                    My veVRTK
                  </Text>
                  <Text fontSize="1rem" ml="auto">
                    {lockInfoDisplay.veBalance} shares
                  </Text>
                </Flex>

                <Flex align="center" mt="2">
                  <Text fontWeight="bold" fontSize=".9rem" mr="auto">
                    My share of total veVRTK
                  </Text>
                  <Text fontSize="1rem" ml="auto">
                    {lockInfoDisplay.percentOwned}%
                  </Text>
                </Flex>
                <Flex align="center" mt="2">
                  <Text fontWeight="bold" fontSize=".9rem" mr="auto">
                    Locked until
                  </Text>
                  <Text fontSize="1rem" ml="auto">
                    {lockInfoDisplay.lockedUntilDays}
                  </Text>
                </Flex>
              </Box>
            </GridItem>
          </Grid>
        </BeetsModalBody>
      </ModalContent>
    </Modal>
  );
}
