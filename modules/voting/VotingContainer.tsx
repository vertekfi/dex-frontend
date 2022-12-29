import { GaugeList } from './components/GaugeList';
import { useVotingGauges } from '../../lib/global/gauges/useVotingGauges';
import { SimpleGrid, useBoolean } from '@chakra-ui/react';
import { GaugeActionCard } from './components/GaugeActionCard';
import { VotingPageSub } from './components/VotingPageSub';
import { GaugeActionCard1 } from './components/GaugeActionCard1';
import { useUserVeLockInfoQuery } from './lib/useUserVeLockInfoQuery';
import { useExpiredGaugesQuery } from './lib/useExpiredGaugesQuery';
import { useEffect, useState } from 'react';
import { VotingGaugeWithVotes } from '~/lib/services/staking/types';
import { fNum2, FNumFormats } from '~/lib/util/useNumber';
import { bnum, scale } from '~/lib/util/big-number.utils';
import { GaugeVoteModal } from './components/GaugeVoteModal';

export function VotingContainer() {
  const [hasLock, setHasLock] = useState<boolean>(false);
  const [hasExpiredLock, setExpiredHasLock] = useState<boolean>(false);
  const [activeVotingGauge, setActiveVotingGauge] = useState<VotingGaugeWithVotes | null>(null);
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
  const { expiredGauges } = useExpiredGaugesQuery(votingGauges?.map((g) => g.address));

  // set available voting power
  useEffect(() => {
    if (unallocatedVotes) {
      setUnallocatedVotesFormatted(
        fNum2(scale(bnum(unallocatedVotes), -4).toString(), FNumFormats.percent),
      );
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
    <>
      <SimpleGrid columns={{ sm: 1, md: 2, xl: 4 }} paddingX={8} 
      paddingY={4} spacing={35}>
        <GaugeActionCard heading="My 80VRTK-20BNB" />
        <GaugeActionCard heading="My locked 80VRTK-20BNB" />
        <GaugeActionCard1 heading="Locked until..." />
        <GaugeActionCard1 heading="My veVRTK" />
      </SimpleGrid>
      <VotingPageSub />
      <GaugeList gaugeInfo={null} />
    </>
  );
}
