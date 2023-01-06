import { SimpleGrid, Box, GridItem, Text, Image } from '@chakra-ui/react';
import { ClaimRewardsTable } from './components/ClaimRewardsTable';
import NextImage from 'next/image';
import VertekIcon from '~/assets/svg/vertektransparent.svg';
import { useClaimsData } from './lib/useClaimsData';
import { useUserAccount } from '~/lib/user/useUserAccount';
import { useEffect, useState } from 'react';
import { BalanceMap } from '~/lib/services/token/token-types';
import { Gauge } from '~/lib/services/staking/types';
import { GaugePool, LiquidityGauge } from '~/apollo/generated/graphql-codegen-generated';
import { ClaimTable } from './components/ClaimTable';
import { GaugeListProvider, useVotingGauges } from '~/lib/global/gauges/useVotingGauges';
export type GaugeTable = {
  gauge: Gauge;
  pool: GaugePool;
};
const boxProps = {
  display: 'flex',
  mb: '1',
  paddingX: '1',
};

export function ClaimContainer() {
  const [vrtkRewardData, setVrtkRewardData] = useState<BalanceMap>({});
  const [gaugesWithRewards, setGaugesWithRewards] = useState<any[]>([]);
  const { isConnected } = useUserAccount();
  const { gauges, rewardGauges, isLoading: isClaimsLoading } = useClaimsData();

  const {
    isLoading: loadingGauges,
    votingGauges,
    unallocatedVotes,
    votingPeriodEnd,
    votingPeriodLastHour,
    refetch: refetchVotingGauges,
  } = useVotingGauges();

  useEffect(() => {
    if (gauges?.length) {
      console.log(gauges);
      setGaugesWithRewards(gauges.filter((gauge) => gauge?.rewardTokens.length));
    }
  }, [gauges]);

  useEffect(() => {
    if (gauges?.length) {
      console.log(gauges);
      setGaugesWithRewards(gauges.filter((gauge) => gauge?.rewardTokens.length));
    }
  }, [gauges]);

  // function formatRewardsData(data?: BalanceMap): ProtocolRewardRow[] {
  //   if (!isConnected || isClaimsLoading || !gauges) return [];
  //   return Object.keys(data).map(tokenAddress => {
  //     const token = getToken(tokenAddress);
  //     const amount = formatUnits(data[tokenAddress], token.decimals);

  //     return {
  //       token,
  //       amount,
  //       value: toFiat(amount, tokenAddress)
  //     };
  //   });
  // }

  return (
    <SimpleGrid columns={1} paddingX={0} spacing={6} borderRadius="12px">
      <GridItem paddingY={0}>
        <Text fontSize="1.5rem" mb="2">
          BNB Chain Liquidity Incentives
        </Text>
      </GridItem>

      <GridItem display="flex" flexDirection="column" paddingY="0">
        <Box flexDirection="row" {...boxProps}>
          <Box marginRight="2" display="flex" justifyContent="">
            <NextImage width="36px" height="36px" src={VertekIcon} />
          </Box>
          <Text fontSize="1.20rem">Vertek (VRTK) Earnings</Text>
        </Box>
        <Box>
          <ClaimTable gauges={votingGauges} />
        </Box>
      </GridItem>

      <GridItem display="flex" flexDirection="column" paddingY="0">
        <Box flexDirection="row" display="flex" mb="0" paddingX="1">
          <Text fontSize="1.20rem">veVRTK and Protocol Earnings</Text>
        </Box>
        {/* <Box>
          <ClaimTable gauges={votingGauges} />
        </Box> */}
      </GridItem>

      <GridItem display="flex" flexDirection="column" paddingY="0">
        <Box flexDirection="row" display="flex" mb="0" paddingX="1">
          <Text fontSize="1.20rem">Other Token Earnings</Text>
        </Box>
        <Box>
          <ClaimTable gauges={votingGauges} />
        </Box>
      </GridItem>
    </SimpleGrid>
  );
}
