import { GaugeList } from './components/GaugeList';
import { useGauges } from './lib/useGauges';
import { SimpleGrid, Flex } from '@chakra-ui/react';
import { GaugeActionCard } from './components/GaugeActionCard';

export function VotingContainer() {
  const { gauges } = useGauges();

  return (
  <>
    <SimpleGrid columns={{ sm: 1, md: 2, xl: 4 }} paddingX={8} paddingY={4} spacing={35}>
              <GaugeActionCard heading="My 80VRTK-20BNB" />
              <GaugeActionCard heading="My locked 80VRTK-20BNB" />
              <GaugeActionCard heading=" Locked until..." />
              <GaugeActionCard heading=" My veVRTK" />

    </SimpleGrid>
    <GaugeList />

</>

  ); 
} 
