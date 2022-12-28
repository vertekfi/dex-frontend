import { isSameAddress } from '@balancer-labs/sdk';
import { Box, Text } from '@chakra-ui/react';

import { VotingGauge, VotingGaugeWithVotes } from '~/lib/services/staking/types';
import { poolURLFor } from '~/modules/pool/lib/pool-utils';

import { DEFAULT_POOL_LIST_QUERY_VARS, PoolListProvider } from '~/modules/pools/usePoolList';
import { UserTokenBalancesProvider } from '~/lib/user/useUserTokenBalances';
import { scale } from '~/lib/util/big-number.utils';
import { fNum2, FNumFormats } from '~/lib/util/useNumber';
import { useUserAccount } from '~/lib/user/useUserAccount';

interface GaugeListProps {
  votingGauges: VotingGauge[];
  expiredGauges: string[];
  isLoading: boolean;
  onVoteClicked: (votingGauge: VotingGaugeWithVotes) => void;
}

export function GaugeList(props: { gaugeInfo: GaugeListProps | null } | null) {
  // do the list view like thing like bal/aeq
  // we out heeeeere
  const { isConnected } = useUserAccount();
  const columns = [
    // {
    //   name: 'Chain',
    //   id: 'chain',
    //   accessor: '',
    //   Header: 'chainColumnHeader',
    //   Cell: 'networkColumnCell',
    //   width: 80,
    //   noGrow: true
    // },
    {
      name: 'Icons',
      id: 'icons',
      accessor: 'uri',
      Header: 'iconColumnHeader',
      Cell: 'iconColumnCell',
      width: 125,
      noGrow: true
    },
    {
      name: 'Composition',
      id: 'poolComposition',
      accessor: 'id',
      Cell: 'poolCompositionCell',
      width: 350
    },
    {
      name: 'Next period votes',
      accessor: 'id',
      align: 'right',
      id: 'nextPeriodVotes',
      Cell: 'nextPeriodVotesCell',
      sortKey: (gauge: { votesNextPeriod: string }) => Number(gauge.votesNextPeriod) as number,   
      width: 150,
      cellClassName: 'font-numeric'
    },
    {
      name: 'My votes',
      accessor(gauge: any) {
        const normalizedVotes = scale(gauge.userVotes.toString(), -4);
        return fNum2(normalizedVotes.toString(), {
          style: 'percent',
          maximumFractionDigits: 2
        });
      },
      align: 'right',
      id: 'myVotes',
      sortKey: (gauge: any) => Number(gauge.userVotes), 
      width: 150,
      cellClassName: 'font-numeric',
      hidden: !isConnected ? true : false
    },
    {
      name: 'Vote',
      id: 'vote',
      accessor: 'id',
      align: 'right',
      Cell: 'voteColumnCell',
      width: 100,
      hidden: !isConnected ? true : false
    }
  ];
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
    <PoolListProvider>
      <UserTokenBalancesProvider>
        <Box mt={3} flexDirection="column" display="flex">
          
        </Box>
      </UserTokenBalancesProvider>
    </PoolListProvider>
  );
}
