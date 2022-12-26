import { GaugeList } from './components/GaugeList';
import { useGauges } from './lib/useGauges';
import { SimpleGrid, Flex } from '@chakra-ui/react';
import { GaugeActionCard } from './components/GaugeActionCard';

export function VotingContainer() {
  const { gauges } = useGauges();

  return (
  <div>
      
      <Flex flexDirection="row" justifyContent="space-between">
              <GaugeActionCard heading="My 80VRTK-20BNB" />
              <GaugeActionCard heading="My locked 80VRTK-20BNB" />
              <GaugeActionCard heading=" Locked until" />
              <GaugeActionCard heading=" My veVRTK" />
      </Flex>
      <GaugeList />

  </div>

  ); 
} 
