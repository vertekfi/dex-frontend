import { GaugeList } from './components/GaugeList';
import { useVotingGauges } from './lib/useVotingGauges';
import { SimpleGrid, useBoolean } from '@chakra-ui/react';
import { GaugeActionCard } from './components/GaugeActionCard';
import { GaugeActionCard1 } from './components/GaugeActionCard1';
import { useUserVeLockInfoQuery } from './lib/useUserVeLockInfoQuery';
import { useExpiredGaugesQuery } from './lib/useExpiredGaugesQuery';
import { useEffect, useState } from 'react';
import { VotingGaugeWithVotes } from '~/lib/services/staking/types';

export function VotingContainer() {
  const [hasLock, setHasLock] = useState<boolean>(false);
  const [hasExpiredLock, setExpiredHasLock] = useState<boolean>(false);
  const [activeVotingGauge, setActiveVotingGauge] = useState<VotingGaugeWithVotes | null>(null);

  const {
    isLoading: loadingGauges,
    votingGauges,
    unallocatedVotes,
    votingPeriodEnd,
    votingPeriodLastHour,
    refetch: refetchVotingGauges,
  } = useVotingGauges();
  const { userLockInfo } = useUserVeLockInfoQuery();
  const { expiredGauges } = useExpiredGaugesQuery(votingGauges?.map((g) => g.address));

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

  function handleModalClose() {
    setActiveVotingGauge(null);
    refetchVotingGauges();
  }

  function handleVoteSuccess() {
    refetchVotingGauges();
  }

  return (
    <>
      <SimpleGrid columns={{ sm: 1, md: 2, xl: 4 }} paddingX={8} paddingY={4} spacing={35}>
        <GaugeActionCard heading="My 80VRTK-20BNB" />
        <GaugeActionCard heading="My locked 80VRTK-20BNB" />
        <GaugeActionCard1 heading="Locked until..." />
        <GaugeActionCard1 heading="My veVRTK" />
      </SimpleGrid>
      <GaugeList />
    </>
  );
}
