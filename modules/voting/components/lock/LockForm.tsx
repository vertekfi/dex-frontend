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
  Skeleton,
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
import { useUserAccount } from '~/lib/user/useUserAccount';
import { useUserVeLockInfoQuery } from '../../lib/useUserVeLockInfoQuery';
import { useUserData } from '~/lib/user/useUserData';
import { useEffect } from 'react';
import { tokenFormatAmount } from '~/lib/services/token/token-util';
import { networkConfig } from '~/lib/config/network-config';
import { numberFormatUSDValue } from '~/lib/util/number-formats';
import { LockFormInner } from './LockFormInner';
import { MyVeVRTK } from '../MyVeVRTK';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function LockForm(props: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => setIsModalOpen(true);

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
  const { data: userLockInfo, isLoading: isLoadingUserVeData } = useUserVeLockInfoQuery();
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
            <Skeleton isLoaded={!isLoadingUserVeData}>
              <LockFormInner lockablePoolBptBalance={userPoolBalance.balance} />
            </Skeleton>

            <MyVeVRTK veBalLockInfo={userLockInfo} isLoading={isLoadingUserVeData} />
          </Grid>
        </BeetsModalBody>
      </ModalContent>
    </Modal>
  );
}
