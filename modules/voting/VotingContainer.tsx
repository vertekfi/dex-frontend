import { GaugeList } from './components/GaugeList';
import { useGauges } from './lib/useGauges';

export function VotingContainer() {
  const { gauges } = useGauges();

  return <GaugeList></GaugeList>;
}
