import { isSameAddress } from '@balancer-labs/sdk';
import { Box, Text, Flex, Grid, Skeleton } from '@chakra-ui/react';
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
import { useState } from 'react';
import { useEffect } from 'react';

interface GaugeListProps {
  votingGauges: VotingGaugeWithVotes[];
}

export function GaugeList(props: GaugeListProps | null) {
  const { isConnected } = useUserAccount();
  const [isLoading, setIsLoading] = useState(true);
  function redirectToPool(gauge: VotingGaugeWithVotes) {
    window.location.href = poolURLFor(gauge.pool.id, gauge.network);
  }

  function getHasUserVotes(userVotes: string): boolean {
    return !!Number(userVotes);
  }

  return (
    <PoolListProvider>
      <UserTokenBalancesProvider>
        <Skeleton isLoaded={!isLoading}>
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
        </Skeleton>
      </UserTokenBalancesProvider>
    </PoolListProvider>
  );
            }  