import { Button, Grid, Text, Box, Skeleton, Tooltip } from '@chakra-ui/react';
import { useState } from 'react';
import { UserDataProvider } from '~/lib/user/useUserData';
import { networkConfig } from '~/lib/config/network-config';
import styled from '@emotion/styled';
import { LockForm } from '../lock/LockForm';
import Card from '~/components/card/Card';
import { useUserVeData } from '../lib/useUserVeData';
import { Activity, Database, Zap, Key } from 'react-feather';
import { tokenFormatAmount } from '~/lib/services/token/token-util';
import { motion } from 'framer-motion';
import { UnlockPreviewModal } from '../lock/UnlockPreviewModal/UnlockPreviewModal';
import useLockAmount from '../lock/lib/useLockAmount';
import { InfoIcon } from '@chakra-ui/icons';

export const VotingCardHeader = styled.p`
  font-size: 1.3rem;
  text-align: center;
  color: #c1c1d1;
  font-weight: bold;
  text-shadow: 0 0 12px #000;
`;

export function VotingHeader() {
  const [isLockModalOpen, setIsLockModalOpen] = useState(false);
  const [isUnlockModalOpen, setIsUnlockModalOpen] = useState(false);

  const {
    userLockablePoolBalance,
    userLockablePoolBalanceUSD,
    isLoadingUserVeData,
    lockedUntilDate,
    lockedUntilDays,
    lockedBalance,
    lockedBalanceUSD,
    currentVeBalance,
    percentOwned,
    hasExistingLock,
    lockablePool,
    lockEndDate,
    isExpired,
  } = useUserVeData();

  const isExpiredLocal = isExpired;

  const { totalLpTokens } = useLockAmount({
    hasExistingLock: hasExistingLock || false,
    lockedAmount: lockedBalance,
  });

  const handleLockModal = () => {
    // if (!isExpired) {
    //   setIsLockModalOpen(true);
    // } else {
    //   setIsUnlockModalOpen(true);
    // }

    if (!isExpiredLocal) {
      setIsLockModalOpen(true);
    } else {
      setIsUnlockModalOpen(true);
    }
  };

  return (
    <UserDataProvider>
      <Box
        display="flex"
        flexDirection="row"
        height="4rem"
        alignItems="center"
        justifyContent="space-between"
        marginTop="-3rem"
        marginBottom="1rem"
      >
        <Text fontSize="1.5rem" fontWeight="bold">
          Lock, Load and Vote
        </Text>
      </Box>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2 }}
      >
        <Grid
          templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }}
          paddingX="4"
          paddingY="2"
          gap="12"
          justifyContent="center"
          alignItems="center"
        >
          <Card
            flexDirection="column"
            borderRadius="16px"
            height="275px"
            padding="4"
            marginTop="1"
            boxShadow="0 0 10px #5BC0F8, 0 0 20px #4A4AF6"
            css={{
              transition: 'transform 0.5s',
              '&:hover': {
                transform: 'scale(1.01)',
              },
            }}
          >
            <Box
              height="50%"
              padding="2"
              width="full"
              flexDirection="column"
              display="flex"
              justifyContent="flex-start"
              alignItems="center"
              bg="vertek.slatepurple.900"
              borderRadius="md"
              boxShadow="2px 24px 12px 0px #000"
            >
              <VotingCardHeader>
                My VRTK-BNB
                <Box display="flex" alignItems="center" justifyContent="center">
                  <Activity size="20" color="#4A4AF6" strokeWidth={2} />
                </Box>
              </VotingCardHeader>
            </Box>
            <Box
              marginTop="1rem"
              padding="2"
              height="full"
              width="full"
              flexDirection="column"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              bg="vertek.slatepurple.900"
              borderRadius="md"
              boxShadow="2px 28px 12px 0px #000"
            >
              <Skeleton isLoaded={!!userLockablePoolBalance && !!userLockablePoolBalanceUSD}>
                <Text>{userLockablePoolBalanceUSD}</Text>
                <Text>{tokenFormatAmount(userLockablePoolBalance || '')} shares</Text>
              </Skeleton>
              <Button
                as="a"
                href={'pool/' + networkConfig.balancer.votingEscrow.lockablePoolId}
                variant="verteklight"
                width={{ base: '50%', lg: '75%' }}
                marginY="1rem"
                boxShadow="0 0 10px #4A4AF6"
              >
                Get VRTK-BNB
              </Button>
            </Box>
          </Card>

          <Card
            flexDirection="column"
            borderRadius="16px"
            height="275px"
            padding="4"
            marginTop="1"
            boxShadow="0 0 10px #5BC0F8, 0 0 20px #4A4AF6"
            css={{
              transition: 'transform 0.5s',
              '&:hover': {
                transform: 'scale(1.01)',
              },
            }}
          >
            <Box
              height="50%"
              padding="2"
              width="full"
              flexDirection="column"
              display="flex"
              justifyContent="flex-start"
              alignItems="center"
              bg="vertek.slatepurple.900"
              borderRadius="md"
              boxShadow="2px 24px 12px 0px #000"
            >
              <VotingCardHeader>
                My locked VRTK-BNB
                <Box display="flex" alignItems="center" justifyContent="center">
                  <Database size="20" color="#4A4AF6" strokeWidth={2} />
                </Box>
              </VotingCardHeader>
            </Box>
            <Box
              marginTop="1rem"
              padding="2"
              height="full"
              width="full"
              flexDirection="column"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              bg="vertek.slatepurple.900"
              borderRadius="md"
              boxShadow="2px 28px 12px 0px #000"
            >
              <Skeleton isLoaded={!isLoadingUserVeData}>
                <Text>{lockedBalanceUSD}</Text>
                <Text>
                  {tokenFormatAmount(lockedBalance || '0')} shares{' '}
                  {isExpiredLocal && (
                    <Tooltip
                      label="Your previous lockup period has expired, so you no longer have any veVRTK or voting power. You will no longer earn protocol fees, boosted yields on staked BNB Chain pools or veVRTK incentives. However, you’ll still get the minimum 1.0x rate. Click withdraw to redeem your expired locked 80VRTK-20BNB VPT tokens and then create a new lock to get veVRTK."
                      aria-label="A tooltip"
                    >
                      <InfoIcon />
                    </Tooltip>
                  )}
                </Text>
              </Skeleton>

              <Button
                variant="verteklight"
                marginY="1rem"
                width={{ base: '50%', lg: '75%' }}
                boxShadow="0 0 10px #4A4AF6"
                onClick={handleLockModal}
              >
                {!isExpiredLocal ? 'Lock VRTK-BNB' : 'Withdraw Lock'}
              </Button>
              {isLockModalOpen && (
                <LockForm
                  totalLpTokens={totalLpTokens}
                  isOpen={isLockModalOpen}
                  onClose={() => setIsLockModalOpen(false)}
                  lockablePool={lockablePool}
                />
              )}

              {isUnlockModalOpen && (
                <UnlockPreviewModal
                  isOpen={isUnlockModalOpen}
                  onClose={() => setIsUnlockModalOpen(false)}
                  totalLpTokens={totalLpTokens}
                  lockablePool={lockablePool}
                  currentVeBalance={currentVeBalance || '0'}
                  lockEndDate={lockEndDate}
                />
              )}
            </Box>
          </Card>

          <Card
            flexDirection="column"
            borderRadius="16px"
            height="275px"
            padding="4"
            marginTop="1"
            boxShadow="0 0 10px #5BC0F8, 0 0 20px #4A4AF6"
            css={{
              transition: 'transform 0.5s',
              '&:hover': {
                transform: 'scale(1.01)',
              },
            }}
          >
            <Box
              height="50%"
              padding="2"
              width="full"
              flexDirection="column"
              display="flex"
              justifyContent="flex-start"
              alignItems="center"
              bg="vertek.slatepurple.900"
              borderRadius="md"
              boxShadow="2px 24px 12px 0px #000"
            >
              <VotingCardHeader>
                Locked until
                <Box display="flex" alignItems="center" justifyContent="center">
                  <Key size="20" color="#4A4AF6" strokeWidth={2} />
                </Box>
              </VotingCardHeader>
            </Box>
            <Box
              marginTop="1rem"
              padding="2"
              height="full"
              width="full"
              flexDirection="column"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              bg="vertek.slatepurple.900"
              borderRadius="md"
              boxShadow="2px 28px 12px 0px #000"
            >
              <Skeleton isLoaded={!isLoadingUserVeData}>
                <Text>{!isExpiredLocal ? lockedUntilDate : '---'}</Text>
                <Text>{!isExpiredLocal ? `${lockedUntilDays} days` : '---'} </Text>
              </Skeleton>
              {!isExpiredLocal && (
                <Button
                  variant="verteklight"
                  marginBottom="1rem"
                  boxShadow="0 0 10px #4A4AF6"
                  width={{ base: '50%', lg: '75%' }}
                  onClick={handleLockModal}
                >
                  Update My Lock
                </Button>
              )}

              {isLockModalOpen && (
                <LockForm
                  isOpen={isLockModalOpen}
                  onClose={() => setIsLockModalOpen(false)}
                  totalLpTokens={totalLpTokens}
                  lockablePool={lockablePool}
                />
              )}
            </Box>
          </Card>

          <Card
            flexDirection="column"
            borderRadius="16px"
            height="275px"
            padding="4"
            marginTop="1"
            boxShadow="0 0 10px #5BC0F8, 0 0 20px #4A4AF6"
            css={{
              transition: 'transform 0.5s',
              '&:hover': {
                transform: 'scale(1.01)',
              },
            }}
          >
            <Box
              height="50%"
              padding="2"
              width="full"
              flexDirection="column"
              display="flex"
              justifyContent="flex-start"
              alignItems="center"
              bg="vertek.slatepurple.900"
              borderRadius="md"
              boxShadow="2px 24px 12px 0px #000"
            >
              <VotingCardHeader>
                My veVRTK
                <Box display="flex" alignItems="center" justifyContent="center">
                  <Zap size="20" color="#4A4AF6" strokeWidth={2} />
                </Box>
              </VotingCardHeader>
            </Box>
            <Box
              marginTop="1rem"
              padding="2"
              height="full"
              width="full"
              flexDirection="column"
              display="flex"
              justifyContent="center"
              alignItems="center"
              bg="vertek.slatepurple.900"
              borderRadius="md"
              boxShadow="2px 28px 12px 0px #000"
            >
              <Skeleton isLoaded={!isLoadingUserVeData}>
                <Text marginBottom=".2rem">
                  {!isExpiredLocal ? tokenFormatAmount(currentVeBalance || '0') : '0'} veVRTK
                </Text>
                <Text>{!isExpiredLocal ? percentOwned : '0'}% of all veVRTK owned</Text>
              </Skeleton>
            </Box>
          </Card>
        </Grid>
      </motion.div>
    </UserDataProvider>
  );
}
