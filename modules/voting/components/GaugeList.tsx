import { isSameAddress } from '@balancer-labs/sdk';
import { Box, Text } from '@chakra-ui/react';
import { VotingGauge, VotingGaugeWithVotes } from '~/lib/services/staking/types';
import { poolURLFor } from '~/modules/pool/lib/pool-utils';

interface GaugeListProps {
  votingGauges: VotingGauge[];
  expiredGauges: string[];
  isLoading: boolean;
  onVoteClicked: (votingGauge: VotingGaugeWithVotes) => void;
}

export function GaugeList(props: { gaugeInfo: GaugeListProps | null } | null) {
  // do the list view like thing like bal/aeq

  function redirectToPool(gauge: VotingGaugeWithVotes) {
    window.location.href = poolURLFor(gauge.pool.id, gauge.network);
  }

  function getIsGaugeExpired(gaugeAddress: string): boolean {
    return !!props?.gaugeInfo?.expiredGauges.some((item) => isSameAddress(gaugeAddress, item));
  }

  function getHasUserVotes(userVotes: string): boolean {
    return !!Number(userVotes);
  }

  function getTableRowClass(gauge: VotingGaugeWithVotes): string {
    return getHasUserVotes(gauge.userVotes) && getIsGaugeExpired(gauge.address)
      ? 'expired-gauge-row'
      : '';
  }

  return (
    <Box mt={3} flexDirection="column" display="flex">
      List
    </Box>
  );
}
