import { GaugeList } from './components/GaugeList';
import { useVotingGauges } from './lib/useVotingGauges';
import { SimpleGrid, useBoolean } from '@chakra-ui/react';
import { GaugeActionCard } from './components/GaugeActionCard';
import { GaugeActionCard1 } from './components/GaugeActionCard1';
import useUserLockInfoQuery from './lib/useUserVeLockInfoQuery';
import { useExpiredGaugesQuery } from './lib/useExpiredGuagesQuery';

export function VotingContainer() {
  const [hasLock, setHasLock] = useBoolean();

  const { votingGauges } = useVotingGauges();
  const { userLockInfo } = useUserLockInfoQuery();
  const { expiredGauges } = useExpiredGaugesQuery(votingGauges?.map((g) => g.address));

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
