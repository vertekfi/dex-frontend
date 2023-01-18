import { useVotingGauges } from '../../../lib/global/gauges/useVotingGauges';
import { Box, Button, Grid, GridItem, Text, GridItemProps } from '@chakra-ui/react';
import { useUserVeLockInfoQuery } from '../lib/useUserVeLockInfoQuery';
import { useEffect, useState } from 'react';
import { VotingGaugeWithVotes } from '~/lib/services/staking/types';
import { UserDataProvider, useUserData } from '~/lib/user/useUserData';
import { networkConfig } from '~/lib/config/network-config';
import { useUserAccount } from '~/lib/user/useUserAccount';
import { numberFormatUSDValue } from '~/lib/util/number-formats';
import { tokenFormatAmount } from '~/lib/services/token/token-util';
import { bnum } from '@balancer-labs/sor';
import { fNum2, FNumFormats } from '~/lib/util/useNumber';
import { differenceInDays, format } from 'date-fns';
import { PRETTY_DATE_FORMAT } from '../constants';
import { GqlPoolUnion } from '~/apollo/generated/graphql-codegen-generated';
import styled from '@emotion/styled';
import { LockIcon } from '@chakra-ui/icons';
import { LockForm } from './lock/LockForm'; 

interface Props {
  pool: GqlPoolUnion;
}

const VotingCard = styled.div`
  bg: '';
  box-shadow: 0 0 10px #5bc0f8, 0 0 20px #4a4af6;
  border-radius: 25px;
  max-width: 550px;
  height: 200px;
  color: white;
`;
const VotingCardHeader = styled.p`
  font-size: 1.2rem;
  font-weight: bold;
  text-align: center;
`;
const SubText = styled.p`
  font-size: 1.1rem;
  text-align: center;
  font-weight: semibold;
`;
const ValueText = styled.p`
  font-size: 1rem;
  text-align: center;
  font-weight: bold;
`;

export function VotingHeader() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => setIsModalOpen(true);
  const [pool, setPool] = useState<GqlPoolUnion>();
  const [hasLock, setHasLock] = useState<boolean>(false);
  const [hasExpiredLock, setExpiredHasLock] = useState<boolean>(false);
  const [activeVotingGauge, setActiveVotingGauge] = useState<VotingGaugeWithVotes | null>(null);
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

  const {
    isLoading: loadingGauges,
    votingGauges,
    unallocatedVotes,
    votingPeriodEnd,
    votingPeriodLastHour,
    refetch: refetchVotingGauges,
  } = useVotingGauges();

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

  // set user lock info
  useEffect(() => {
    if (isConnected && userLockInfo) {
      if (userLockInfo.hasExistingLock && !userLockInfo.isExpired) {
        setHasLock(true);

        const percentOwned = fNum2(
          bnum(userLockInfo.lockedAmount).div(userLockInfo.totalSupply).toString(),
          {
            style: 'percent',
            maximumFractionDigits: 4,
          },
        );
        const lockedUntilDays = differenceInDays(new Date(userLockInfo.lockedEndDate), new Date());
        const veBalance = fNum2(userLockInfo.lockedAmount, FNumFormats.token);
        const lockedUntilDate = format(userLockInfo.lockedEndDate, PRETTY_DATE_FORMAT);

        setLockInfoDisplay({
          lockedUntilDays,
          percentOwned,
          veBalance,
          lockedUntilDate,
        });
      }

      if (userLockInfo.hasExistingLock && userLockInfo.isExpired) {
        setExpiredHasLock(true);
      }
    }
  }, [isConnected, userLockInfo]);

  function setActiveGaugeVote(votingGauge: VotingGaugeWithVotes) {
    setActiveVotingGauge(votingGauge);
  }

  function handleModalClose() {
    setActiveVotingGauge(null);
    refetchVotingGauges();
  }

  function handleVoteSuccess() {
    refetchVotingGauges();
  }

  return (
<UserDataProvider>
  <Grid
    templateColumns={{ base: 'repeat(1, 1fr)', lg: 'repeat(4, 1fr)' }}
    paddingX={{ base: '0', md: '6', lg: '4' }}
    paddingY={2}
    gap="4"
    justifyContent="center"
    alignItems="center"
  >
    <VotingCard>
      <Grid paddingX="2" paddingY="2">
          <GridItem mt="2">
              <VotingCardHeader>My 80VRTK-20BNB</VotingCardHeader>
          </GridItem>
          <GridItem mt="3">
            <SubText>{userPoolBalance.usdValue}</SubText>
          </GridItem>
          <GridItem mt="-1">
            <ValueText>{userPoolBalance.balance}</ValueText>
          </GridItem>
          <GridItem mt={{ base: '3', lg: '6' }}>
            <Box display="flex" justifyContent="center">
              <Button 
              as="a"
              href="/pool/0xc107b351b787e64c0a59a1f44cb393704da07d3f000200000000000000000006"
              target=""
              variant="stayblack" width={{ base: '50%', lg: '75%' }}
              >
                Get VRTK-BNB
              </Button>

              {/* will need to update this link when the real pool is live!  */}
            </Box>
          </GridItem>
      </Grid>
    </VotingCard>

    <VotingCard>
      <Grid paddingX="2" paddingY="2">
        <GridItem mt="2">
          <VotingCardHeader>My locked 80VRTK-20BNB</VotingCardHeader>
        </GridItem>
        <GridItem mt="3">
          <SubText>$0.00</SubText>
        </GridItem>
        <GridItem mt="-1">
          <ValueText>{userLockInfo?.lockedAmount}</ValueText>
        </GridItem>
        <GridItem mt={{ base: "3", lg: "6" }}>
          <Box display="flex" justifyContent="center">
            <Button
              variant="stayblack"
              width={{ base: "50%", lg: "75%" }}
              onClick={handleOpenModal} >
              Lock VRTK-BNB
            </Button>
          </Box>
        </GridItem>
          {isModalOpen && (
            <LockForm
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
            />
          )}
      </Grid>
    </VotingCard>

    <VotingCard>
      <Grid paddingX="2" paddingY="2">
        <GridItem mt="2">
          <VotingCardHeader>Locked until</VotingCardHeader>
        </GridItem>
        <GridItem mt="3">
          <SubText>{lockInfoDisplay.lockedUntilDate}</SubText>
        </GridItem>
        <GridItem mt="-1">
          <Box display="flex" flexDirection="row" justifyContent="center" alignItems="center">
            <ValueText>{lockInfoDisplay.lockedUntilDays} days</ValueText>
          </Box>
        </GridItem>

        <GridItem mt={{ base: '3', lg: '6' }}>
          <Box display="flex" justifyContent="center">
            <Button variant="stayblack" width={{ base: '50%', lg: '75%' }}>
              Update My Lock
              <LockIcon ml="2" color="vertek.slate.200" />
            </Button>
          </Box>
        </GridItem>
      </Grid>
    </VotingCard>

    <VotingCard>
      <Grid paddingX="2" paddingY="2">
        <GridItem mt="2">
          <VotingCardHeader>My veVRTK</VotingCardHeader>
        </GridItem>
        <GridItem mt="3">
          <SubText>{lockInfoDisplay.veBalance}</SubText>
        </GridItem>
        <GridItem mt="-1">
          <ValueText>{lockInfoDisplay.percentOwned}</ValueText>
        </GridItem>
      </Grid>
    </VotingCard>
  </Grid>
</UserDataProvider>
  );
}
