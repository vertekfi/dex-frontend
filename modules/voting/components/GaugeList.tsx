import { isSameAddress } from '@balancer-labs/sdk';
import { Box, Text, Flex, Grid, GridItem } from '@chakra-ui/react';
import PoolListSortLink from '~/modules/pools/components/PoolListSortLink';
import { VotingGauge, VotingGaugeWithVotes } from '~/lib/services/staking/types';
import { poolURLFor } from '~/modules/pool/lib/pool-utils';
import { DEFAULT_POOL_LIST_QUERY_VARS, PoolListProvider } from '~/modules/pools/usePoolList';
import { UserTokenBalancesProvider } from '~/lib/user/useUserTokenBalances';
import { scale } from '~/lib/util/big-number.utils';
import { fNum2, FNumFormats } from '~/lib/util/useNumber';
import { useUserAccount } from '~/lib/user/useUserAccount';
import { GaugeListTableHeader } from './GaugeListTableHeader';
import { GaugeListItem } from './GaugeListItem';

interface GaugeListProps {
  votingGauges: VotingGaugeWithVotes[];
  // expiredGauges: string[];
  //  isLoading: boolean;
  // onVoteClicked: (votingGauge: VotingGaugeWithVotes) => void;
}
export function GaugeList(props: GaugeListProps | null) {
  const { isConnected } = useUserAccount();
  function redirectToPool(gauge: VotingGaugeWithVotes) {
    window.location.href = poolURLFor(gauge.pool.id, gauge.network);
  }
  // function getIsGaugeExpired(gaugeAddress: string): boolean {
  //   return !!props?.gaugeInfo?.expiredGauges.some((item) => isSameAddress(gaugeAddress, item));
  // }
  function getHasUserVotes(userVotes: string): boolean {
    return !!Number(userVotes);
  }

  // function getTableRowClass(gauge: VotingGaugeWithVotes): string {
  //   return getHasUserVotes(gauge.userVotes) && getIsGaugeExpired(gauge.address)
  //     ? 'expired-gauge-row'
  //     : '';
  // }

  return (
    <PoolListProvider>
      <UserTokenBalancesProvider>
        <Box 
        mt="3rem" 
        boxShadow={{base: "none", lg:"0 0 10px #5BC0F8, 0 0 20px #4A4AF6" }} 
        mb="6rem" 
        borderRadius="16px" 
        flexDirection="column" 
        display="flex">
          <GaugeListTableHeader />
          <Box>
            {props?.votingGauges.map((gauge) => {
              return <GaugeListItem key={gauge.address} gauge={gauge} />;
            })}
          </Box>
        </Box>
      </UserTokenBalancesProvider>
    </PoolListProvider>
  );
}
