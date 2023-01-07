import { GaugeList } from './components/GaugeList';
import { useVotingGauges } from '../../lib/global/gauges/useVotingGauges';
import { Box, Button, Grid, GridItem, SimpleGrid, Text } from '@chakra-ui/react';
import { VotingPageSub } from './components/VotingPageSub';
import { useUserVeLockInfoQuery } from './lib/useUserVeLockInfoQuery';
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
import { PRETTY_DATE_FORMAT } from './constants';
import { GqlPoolUnion, useGetPoolQuery } from '~/apollo/generated/graphql-codegen-generated';
import { PoolProvider } from '../pool/lib/usePool';

interface Props {
  pool: GqlPoolUnion;
}

export function VotingContainer() {
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
  const { data: mainPoolData, loading: loadingMainPool } = useGetPoolQuery({
    variables: {
      id: networkConfig.balancer.votingEscrow.lockablePoolId,
    },
  });

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
      console.log(userLockInfo);
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
      <SimpleGrid columns={{ sm: 1, md: 2, lg: 4 }} paddingX={4} paddingY={2} spacing={4}>
        <GridItem
          bg="vertek.slatepurple.900"
          boxShadow="0 0 10px #5BC0F8, 0 0 20px #4A4AF6"
          borderRadius="25px"
          maxW="550px"
          color="white"
        >
          <Grid paddingX="2" paddingY="2">
            <GridItem mt="2">
              <Text fontSize="1.2rem" fontWeight="bold" textAlign="center">
                My 80VRTK-20BNB
              </Text>
            </GridItem>
            <GridItem mt="3">
              <Text
                alignItems="center"
                fontSize="1.2rem"
                justifyContent="center"
                textAlign="center"
              >
                {userPoolBalance.usdValue}
              </Text>
            </GridItem>
            <GridItem mt="-1">
              <Text alignItems="center" fontSize="1rem" justifyContent="center" textAlign="center">
                {userPoolBalance.balance}
              </Text>
            </GridItem>
            <GridItem mt={{ base: '3', lg: '6' }}>
              <Box display="flex" justifyContent="center">
                <Button variant="verteklight" width="80%">
                  Button
                </Button>
              </Box>
            </GridItem>
          </Grid>
        </GridItem>

        <GridItem
          bg="vertek.slatepurple.900"
          boxShadow="0 0 10px #5BC0F8, 0 0 20px #4A4AF6"
          borderRadius="25px"
          maxW="550px"
          color="white"
        >
          <Grid paddingX="2" paddingY="2">
            <GridItem mt="2">
              <Text fontSize="1.2rem" fontWeight="bold" textAlign="center">
                My locked 80VRTK-20BNB
              </Text>
            </GridItem>
            <GridItem mt="3">
              <Text
                alignItems="center"
                fontSize="1.2rem"
                justifyContent="center"
                textAlign="center"
              >
                $0.00
              </Text>
            </GridItem>
            <GridItem mt="-1">
              <Text alignItems="center" fontSize="1rem" justifyContent="center" textAlign="center">
                {userLockInfo?.lockedAmount}
              </Text>
            </GridItem>
            <GridItem mt={{ base: '3', lg: '6' }}>
              <Box display="flex" justifyContent="center">
                <Button variant="verteklight" width="80%">
                  Button
                </Button>
              </Box>
            </GridItem>
          </Grid>
        </GridItem>

        <GridItem
          bg="vertek.slatepurple.900"
          boxShadow="0 0 10px #5BC0F8, 0 0 20px #4A4AF6"
          borderRadius="25px"
          maxW="550px"
          color="white"
        >
          <Grid paddingX="2" paddingY="2">
            <GridItem mt="2">
              <Text fontSize="1.2rem" fontWeight="bold" textAlign="center">
                Locked until
              </Text>
            </GridItem>
            <GridItem mt="3">
              <Text
                alignItems="center"
                fontSize="1.2rem"
                justifyContent="center"
                textAlign="center"
              >
                {lockInfoDisplay.lockedUntilDate}
              </Text>
            </GridItem>
            <GridItem mt="-1">
              <Text alignItems="center" fontSize="1rem" justifyContent="center" textAlign="center">
                {lockInfoDisplay.lockedUntilDays} days
              </Text>
            </GridItem>
            <GridItem mt={{ base: '3', lg: '6' }}>
              <Box display="flex" justifyContent="center">
                <Button variant="verteklight" width="80%">
                  Button
                </Button>
              </Box>
            </GridItem>
          </Grid>
        </GridItem>

        <GridItem
          bg="vertek.slatepurple.900"
          boxShadow="0 0 10px #5BC0F8, 0 0 20px #4A4AF6"
          borderRadius="25px"
          maxW="550px"
          color="white"
        >
          <Grid h="100%" paddingX="2" paddingY="2">
            <GridItem mt="2">
              <Text fontSize="1.2rem" fontWeight="bold" textAlign="center">
                My veVRTK
              </Text>
            </GridItem>
            <GridItem mt="3">
              <Text
                alignItems="center"
                fontSize="1.5rem"
                justifyContent="center"
                textAlign="center"
              >
                {lockInfoDisplay.veBalance}
              </Text>
            </GridItem>
            <GridItem mt="-1">
              <Text alignItems="center" fontSize="1rem" justifyContent="center" textAlign="center">
                {lockInfoDisplay.percentOwned}
              </Text>
            </GridItem>
          </Grid>
        </GridItem>
      </SimpleGrid>
      <VotingPageSub />
      <GaugeList votingGauges={votingGauges} />
    </UserDataProvider>
  );
}
