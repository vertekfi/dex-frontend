import { Box } from '@chakra-ui/react';
import { Gauge } from '~/lib/services/staking/types';
import { GaugeRewardsTable } from './GaugeRewardsTable';

type Props = {
  gauges: Gauge[];
  isLoading: boolean;
  onSuccessfulClaim: () => void;
};

export function GaugeRewardsContainer({ gauges, onSuccessfulClaim }: Props) {
  const gaugesWithRewards = gauges.filter((g) => g.rewardTokens.length > 0);

  return (
    <>
      {gaugesWithRewards.map((gauge) => {
        return (
          <Box mb={10} key={gauge.address}>
            <GaugeRewardsTable gauge={gauge} onClaimSuccess={onSuccessfulClaim} />
          </Box>
        );
      })}
    </>
  );
}
