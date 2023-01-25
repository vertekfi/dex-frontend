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
import { FormControl, FormLabel, Input } from '@chakra-ui/react';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react';
import { LockPreview } from './LockPreview';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useVotingGauges } from '~/lib/global/gauges/useVotingGauges';
import { useUserAccount } from '~/lib/user/useUserAccount';
import { useUserVeLockInfoQuery } from '../../lib/useUserVeLockInfoQuery';
import { useUserData } from '~/lib/user/useUserData';
import { useEffect } from 'react';
import { tokenFormatAmount } from '~/lib/services/token/token-util';
import { networkConfig } from '~/lib/config/network-config';
import { numberFormatUSDValue } from '~/lib/util/number-formats';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

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
  const { userLockInfo } = useUserVeLockInfoQuery();
  const { loading: loadingBalances, bptBalanceForPool, usdBalanceForPool } = useUserData();

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
    <ModalOverlay bgColor="vertek.slate.900"/> 
     <ModalContent
      minW={{ base: 'auto', md: '99vw' }}
      maxW={{ base: 'auto', md: '99vw' }}
      h="full"
      bg={`radial-gradient(circle at top center, 
        rgba(77, 63, 236, 0.5) 0%, 
        rgba(0,0,0, 0.8) 70% )`}
      paddingY="2rem"
      borderRadius="12px"
      marginTop="1.5rem"
      >
      <ModalCloseButton />
      <BeetsModalHeader>
          <BeetsModalHeadline
            textAlign="center"
            fontSize="1.5rem"
            color="white"
            mb="12px"
            mt="-1rem"
          >
              Lock VRTK-BNB
          </BeetsModalHeadline>
      </BeetsModalHeader>
      
      <BeetsModalBody bgColor="transparent" p="0" textAlign="center" fontSize="1.2rem">
        <Grid
          pl={{ base: '2', md: '4' }}
          pr={{ base: '2', md: '4' }}
          templateColumns={{ base: '1fr', md: '2fr 3fr 2fr' }}
          gap="8"
        >
          <GridItem
            boxShadow={{base:'none', md:'none'}}
            width={{base:'90%', lg:'auto'}}
            height={{ base:'auto', lg:'50%'}}
            m={{ base:'2', md:'2'}}
            mt={{ base:'auto', md:'24'}}
            bgGradient="linear-gradient(90deg, #302B84 0%, #362BA8 80%, #4132D0 100%)" 
            borderRadius="12px">
            <Box padding={{ base: '2', md: '2' }} borderRadius="12px" mb="6">
              <Text
                align="left"
                padding="1"
                mb="4"
                fontWeight="bold"
                color="white"
                fontSize="1.2rem"
              >
                Lockable tokens in my wallet

              </Text>
              <Flex align="center" mt="6">
                <Text fontSize="1rem" mr="auto">
                  VRTK-BNB
                </Text>
                <Text fontSize="1rem" ml="auto">
                {bptBalanceForPool(networkConfig.balancer.votingEscrow.lockablePoolId)} shares
                </Text>
              </Flex>
              <Flex align="center" mt="1">
                <Text fontSize="1rem" mr="auto">
                  Vertek Governance
                </Text>
                <Text fontSize="1rem" ml="auto">
                ${usdBalanceForPool(networkConfig.balancer.votingEscrow.lockablePoolId)}
                </Text>
              </Flex>
              <Flex mt="8">
                <Button
                  variant="stayblacklock"
                  as="a"
                  href={'pool/' + networkConfig.balancer.votingEscrow.lockablePoolId}
                  borderWidth="1px"
                  width="100%"
                  height="2.2rem"
                >
                  Get VRTK-BNB
                </Button>
              </Flex>
            </Box>
            <Box
              padding="2"
              borderRadius="12px"
              mb="6"
              bgGradient="linear-gradient(90deg, #302B84 0%, #362BA8 80%, #4132D0 100%)"
            >
              <Text fontSize="1rem" mr="auto"></Text>
              <Accordion allowToggle padding={1}>
                <AccordionItem>
                  <AccordionButton _expanded={{}}>
                    <Box flex="1" textAlign="center">
                      How to lock
                    </Box>
                    <AccordionIcon color="black" />
                  </AccordionButton>

                  <AccordionPanel pb={5} bg="">
                    <Text align="left" color="white" fontSize="1rem">
                      1. Invest in the pool. <br />
                      2. How to lock and earn? 80VRTK-20BNB APT <br />
                      3. veVRTK holders get boosted liquidity mining yields (up to 2.5x) and
                      increased voting power. <br />
                      4. Use this voting power to choose which pool gauges get allocated liquidity
                      mining incentives.
                    </Text>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </Box>
          </GridItem>
          <GridItem
            boxShadow={{ base: 'none', md: 'none' }}
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
              <Text
                align="left"
                padding="1"
                mb="4"
                fontWeight="bold"
                color="white"
                fontSize="1.2rem"
              >
                Lock to get veVRTK
              </Text>
              <Text
                align="left"
                paddingX="3"
                mb="0"
                fontWeight="normal"
                color="white"
                fontSize="1rem"
              >
                How much do you want to lock?
              </Text>
              <Box padding="2" bgColor="black" borderRadius="12px" mb="6">
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
                  {bptBalanceForPool(networkConfig.balancer.votingEscrow.lockablePoolId)} shares available 
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
              <Box padding="2" bgColor="black" borderRadius="12px" mb="6">
                <FormControl mb="8">
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
                    paddingX={{ base: 'none', md: '1' }}
                    justifyContent="space-between"
                    display="flex"
                  >
                    <Button
                      variant="stayblacklock"
                      onClick={() => {
                        let nextThursday = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
                        while (nextThursday.getUTCDay() !== 4) {
                          nextThursday.setDate(nextThursday.getDate() + 1)
                        }
                        setSelectedDate(nextThursday)
                      }}
                    >
                      1w
                    </Button>
                    <Button
                      variant="stayblacklock"
                      onClick={() => {
                        let nextThursday = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
                        while (nextThursday.getUTCDay() !== 4) {
                          nextThursday.setDate(nextThursday.getDate() + 1)
                        }
                        setSelectedDate(nextThursday)
                      }}
                    >
                      1m
                    </Button>
                    <Button
                      variant="stayblacklock"
                      onClick={() => {
                        let nextThursday = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)
                        while (nextThursday.getUTCDay() !== 4) {
                          nextThursday.setDate(nextThursday.getDate() + 1)
                        }
                        setSelectedDate(nextThursday)
                      }}
                    >
                      3m
                    </Button>
                    <Button
                      variant="stayblacklock"
                      onClick={() => {
                        let nextThursday = new Date(Date.now() + 180 * 24 * 60 * 60 * 1000)
                        while (nextThursday.getUTCDay() !== 4) {
                          nextThursday.setDate(nextThursday.getDate() + 1)
                        }
                        setSelectedDate(nextThursday)
                      }}
                    >
                      6m
                    </Button>
                    <Button
                      variant="stayblacklock"
                      onClick={() => {
                        let nextThursday = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
                        while (nextThursday.getUTCDay() !== 4) {
                          nextThursday.setDate(nextThursday.getDate() + 1)
                        }
                        setSelectedDate(nextThursday)
                      }}
                    >
                      1y
                    </Button>
                  </Box>
                </FormControl>
              </Box>
              <Box
                borderRadius="12px"
                p="4"
                bgColor="black"
                mb="6"
                borderWidth="1px"
                borderColor="rgba(255, 255, 255, 0.3)"
              >
                <Flex align="center">
                  <Text fontSize="0.9rem" mr="auto">
                    Total Voting Escrow
                  </Text>
                  <Text fontSize="0.9rem" ml="auto">
                    0 veVRTK
                  </Text>
                </Flex>
              </Box>

              <Button
                onClick={handleOpenModal}
                variant="stayblack"
                mb="4"
                width={{ base: '90%', lg: '100%' }}
              >
                Preview
              </Button>
              {isModalOpen && (
                <LockPreview isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
              )}
            </Box>
          </GridItem>
          <GridItem
            boxShadow={{base:'none', md:'none'}}
            width={{base:'90%', lg:'auto'}}
            height={{ base:'auto', lg:'50%'}}
            m={{ base:'2', md:'2'}}
            mt={{ base:'auto', md:'24'}}
            bgGradient="linear-gradient(90deg, #302B84 0%, #362BA8 80%, #4132D0 100%)" 
            borderRadius="12px">
            <Box
              padding="2"
              borderRadius="12px"
              mb="6"
              bgGradient="linear-gradient(90deg, #302B84 0%, #362BA8 80%, #4132D0 100%)"
            >
              <Text
                align="center"
                padding="1"
                mb="4"
                mt="8"
                fontWeight="bold"
                color="white"
                fontSize="1.2rem"
              >
                My veVRTK
              </Text>
              <Box mt="2">
                <Text fontSize="1.2rem" fontWeight="bold" align="center">
               
                </Text>
              </Box>
              <Box mt="20" alignItems="center" 
              display="flex" flexDirection="row" justifyContent="center" 
              >
                  <Box display="flex" flexDirection="column" mr="4">
                      <Text fontSize="1.1rem" fontWeight="semibold" >
                        % of total veVRTK
                      </Text>
                      <Text fontSize="1.1rem" >
                        % 
                      </Text>
                  </Box>
                  <Box display="flex" flexDirection="column" ml="4" >
                  <Text fontSize="1.1rem" fontWeight="semibold" >
                    Locked until
                  </Text>
                  <Text fontSize="1.1rem">
                  {lockInfoDisplay.lockedUntilDays}
                  </Text>
                  </Box>
              </Box>
            </Box>
          </GridItem>
        </Grid>
      </BeetsModalBody>
    </ModalContent>
  </Modal>
);
}
