import { useVotingGauges } from '../../../lib/global/gauges/useVotingGauges';
import { Box, Button, Grid, GridItem, Text, GridItemProps, Heading} from '@chakra-ui/react';
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
  padding: 16px; 
  height: 30vh; 
  max-height: 300px; 
  display: flex; 
  flex-direction: column; 
  align-items: center; 
  justify-content: space-between; 
  box-shadow: 0 0 10px #5bc0f8, 0 0 20px #4a4af6;
  border-radius: 25px;
  color: white;
  border-width: 1px; 
  
`;
const VotingCardHeader = styled.p`
  font-size: 1.2rem;
  text-align: center;
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
    templateColumns={{ base: 'repeat(1, 1fr)', md:'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }}
    paddingX={{ base: '0', md: '6', lg: '4' }}
    paddingY={2}
    gap="4"
    justifyContent="center"
    alignItems="center" >
    <VotingCard >
        <VotingCardHeader>My VRTK-WBNB </VotingCardHeader>
        <Text>{userPoolBalance.usdValue}</Text>
        <Text mb="2rem">{userPoolBalance.balance}</Text>
        <Button 
            as="a"
            href="/pool/0xc107b351b787e64c0a59a1f44cb393704da07d3f000200000000000000000006"
            variant="moistblack" width={{ base: '50%', lg: '75%' }}
            >
              Get VRTK-BNB
        </Button>
    </VotingCard>
    <VotingCard>
        <VotingCardHeader>
              My locked VRTK-WBNB
        </VotingCardHeader>
        <Text mb="2rem" >$0.00</Text>
        <Text>{userLockInfo?.lockedAmount}</Text>
        <Button
                variant="moistblack"
                width={{ base: "50%", lg: "75%" }}
                onClick={handleOpenModal} >
                Lock VRTK-BNB
        </Button>
        {isModalOpen && (
          <LockForm
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        )}
    </VotingCard>
    <VotingCard>
          <VotingCardHeader>Locked until </VotingCardHeader>
          <Text>{lockInfoDisplay.lockedUntilDate}</Text>
          <Text>{lockInfoDisplay.lockedUntilDays} days</Text>
          <Button variant="moistblack" width={{ base: '50%', lg: '75%' }}>
              Update My Lock
              <LockIcon ml="2" color="vertek.slate.200" />
            </Button>
    </VotingCard>

    <VotingCard>
          <VotingCardHeader>My veVRTK</VotingCardHeader>
          <Text>{lockInfoDisplay.veBalance}</Text>
          <Text mb="4">{lockInfoDisplay.percentOwned}</Text>
    </VotingCard>
  </Grid>
</UserDataProvider>
  );
}
