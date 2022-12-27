import { GaugeList } from './components/GaugeList';
import { useVotingGauges } from './lib/useVotingGauges';
import { SimpleGrid, Flex } from '@chakra-ui/react';
import { GaugeActionCard } from './components/GaugeActionCard';
import { GaugeActionCard1 } from './components/GaugeActionCard1';

export function VotingContainer() {
  const { votingGauges } = useVotingGauges();

  return (
    <>
      <SimpleGrid columns={{ sm: 1, md: 2, xl: 4 }} paddingX={8} paddingY={4} spacing={35}>
        <GaugeActionCard heading="My 80VRTK-20BNB" />
        <GaugeActionCard heading="My locked 80VRTK-20BNB" />
        <GaugeActionCard1 heading=" Locked until..." />
        <GaugeActionCard1 heading=" My veVRTK" />
      </SimpleGrid>
      <GaugeList />
    </>
  );
}
