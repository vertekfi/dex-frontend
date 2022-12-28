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
      <Box mt={3} flexDirection="row" display="flex" justifyContent="space-between">
        <Box flexDirection="column" width="60%">
          <Text fontWeight="bold" fontSize="1.8rem">
            Pools eligible for VRTK emissions
          </Text>
          <Text fontWeight="" fontSize="1.2rem">
            Liquidity incentives are directed by the community of veVRTK holders. If you hold
            veVRTK, vote below on any pools across BNB Chain. Your vote will persist until you
            change it and editing a pool can only be done once in 10 days.
          </Text>
        </Box>
        <Box display="flex" justifyContent="left" width="40%" padding="3">
          <Box
            bgColor="vertek.slatepurple.900"
            width="full"
            padding="4"
            marginX="10px"
            borderRadius="12px"
            alignItems="center"
            justifyContent="center"
          >
            <Text fontWeight="bold" fontSize="1.0rem" marginTop="2%">
              My unallocated votes
            </Text>
            <Text fontWeight="bold" fontSize="1.0rem" marginTop="2%">
              --
            </Text>
          </Box>
          <Box
            bgColor="vertek.slatepurple.900"
            width="full"
            padding="4"
            borderRadius="12px"
            alignItems="center"
            justifyContent="center"
          >
            <Text fontWeight="bold" fontSize="1.0rem" marginTop="2%">
              Voting period ends
            </Text>
            <Text>Date</Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
