import { Box } from '@chakra-ui/react';
import { VotingGaugeWithVotes } from '~/lib/services/staking/types';
import { poolURLFor } from '~/modules/pool/lib/pool-utils';
import { PoolListProvider } from '~/modules/pools/usePoolList';
import { UserTokenBalancesProvider } from '~/lib/user/useUserTokenBalances';
import { GaugeListTableHeader } from './GaugeListTableHeader';
import { GaugeListItem } from './GaugeListItem';
import { useState } from 'react';
import { useEffect } from 'react';
import { GaugeListFooter } from './GaugeListFooter';

interface GaugeListProps {
  votingGauges: VotingGaugeWithVotes[];
}

export function GaugeList(props: GaugeListProps | null) {
  function redirectToPool(gauge: VotingGaugeWithVotes) {
    window.location.href = poolURLFor(gauge.pool.id, gauge.network);
  }

  function getHasUserVotes(userVotes: string): boolean {
    return !!Number(userVotes);
  }

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
            <GaugeListFooter />
          </Box>

      </UserTokenBalancesProvider>
    </PoolListProvider>
  );
}
