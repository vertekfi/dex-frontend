import { Box, Text, Grid, GridItem, VStack } from '@chakra-ui/react';
import { scale } from '@georgeroman/balancer-v2-pools/dist/src/utils/big-number';
import { useEffect, useState } from 'react';
import { useVotingGauges } from '~/lib/global/gauges/useVotingGauges';
import { bnum } from '~/lib/util/big-number.utils';
import { fNum2, FNumFormats } from '~/lib/util/useNumber';
import { useUserVeLockInfoQuery } from '../lib/useUserVeLockInfoQuery';

export function VotingPageSub() {
  const [hasLock, setHasLock] = useState<boolean>(false);
  const [hasExpiredLock, setExpiredHasLock] = useState<boolean>(false);
  const [unallocatedVotesFormatted, setUnallocatedVotesFormatted] = useState<string>();

  const {
    isLoading: loadingGauges,
    votingGauges,
    unallocatedVotes,
    votingPeriodEnd,
    votingPeriodLastHour,
    refetch: refetchVotingGauges,
  } = useVotingGauges();

  const { userLockInfo } = useUserVeLockInfoQuery();

  useEffect(() => {
    if (unallocatedVotes) {
      setUnallocatedVotesFormatted(
        fNum2(scale(bnum(unallocatedVotes), -4).toString(), FNumFormats.percent),
      );
    } else {
      setUnallocatedVotesFormatted('0%');
    }
  }, [unallocatedVotes]);

  // set user lock info
  useEffect(() => {
    if (userLockInfo) {
      if (userLockInfo.hasExistingLock && !userLockInfo.isExpired) {
        setHasLock(true);
      }

      if (userLockInfo.hasExistingLock && userLockInfo.isExpired) {
        setExpiredHasLock(true);
      }
    }
  }, [userLockInfo]);

  return (
    // <Box mt={3} mb='4rem' flexDirection="column" display="flex">
    <Grid
      mt={8}
      justifyContent="center"
      paddingY="2"
      templateColumns={{
        base: 'repeat(1fr 1fr)',
        lg: '4fr 2fr',
      }}
      alignItems="center"
      gap={{ base: '10', lg: '20' }}
    >
      <GridItem marginRight="10" marginLeft="20" paddingY="0">
        <Text fontWeight="bold" fontSize="1.8rem">
          Pools eligible for VRTK emissions
        </Text>
        <Text fontSize="1.2rem" fontWeight="normal">
          Liquidity incentives are directed by the community of veVRTK holders. If you hold veVRTK,
          vote below on any pools across BNB Chain. Your vote will persist until you change it and
          editing a pool can only be done once in 10 days.
        </Text>
      </GridItem>

      <GridItem marginRight={{ base: '0', lg: '24' }}>
        <VStack spacing={4} alignItems={{ base: 'center', lg: 'stretch' }}>
          <Box
            bgGradient="linear(90deg, #302B84 0%, #362BA8 50%, #4132D0 100%)"
            // bgColor="vertek.slatepurple.900"
            h="full"
            w={{ base: '75%', lg: 'full' }}
            p="12px"
            borderRadius={{ base: '20px', lg: '12px' }}
            alignItems="center"
            justifyContent="center"
            mx={{ base: 'auto', lg: 0 }}
          >
            <Text fontWeight="bold" fontSize="1.0rem" marginTop="2%">
              My unallocated votes
            </Text>
            <Text fontWeight="normal" fontSize="0.9rem" marginTop="2%">
              {unallocatedVotesFormatted}
            </Text>
          </Box>
          <Box
            bgGradient="linear(90deg, #302B84 0%, #362BA8 50%, #4132D0 100%)"
            h="full"
            w={{ base: '75%', lg: 'full' }}
            p="12px"
            borderRadius={{ base: '20px', lg: '12px' }}
            alignItems="center"
            justifyContent="center"
            mx={{ base: 'auto', lg: 0 }}
          >
            <Text fontWeight="bold" fontSize="1.0rem" marginTop="2%">
              Voting period ends
            </Text>
            <Text fontWeight="normal" fontSize="0.9rem" marginTop="2%">
              {votingPeriodEnd?.length && (
                <Text>
                  {votingPeriodEnd[0]}d : {votingPeriodEnd[1]}h : {votingPeriodEnd[2]}m :{' '}
                  {votingPeriodEnd[3]}s
                </Text>
              )}
            </Text>
          </Box>
        </VStack>
      </GridItem>
    </Grid>
    // </Box>
  );
}
