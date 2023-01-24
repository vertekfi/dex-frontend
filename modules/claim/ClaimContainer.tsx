import { SimpleGrid, Box, GridItem, Text, Image } from '@chakra-ui/react';
import NextImage from 'next/image';
import VertekIcon from '~/assets/svg/vertektransparent.svg';
import { useClaimsData } from './lib/useClaimsData';
import { useUserAccount } from '~/lib/user/useUserAccount';
import { useEffect, useState } from 'react';
import { BalanceMap } from '~/lib/services/token/token-types';
import { Gauge } from '~/lib/services/staking/types';
import { GaugePool } from '~/apollo/generated/graphql-codegen-generated';
import { ClaimTable } from './components/ClaimTable';
import { useVotingGauges } from '~/lib/global/gauges/useVotingGauges';
import { ProtocolRewardRow } from './types';
import { formatUnits } from 'ethers/lib/utils';
import { useGetTokens } from '~/lib/global/useToken';
import { useNumbers } from '~/lib/global/useNumbers';

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
  const [gaugeTables, setGaugeTables] = useState<GaugeTable[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { isConnected } = useUserAccount();
  const { rewardGauges, isLoading: isClaimsLoading, protocolRewardsData } = useClaimsData();
  const { getToken } = useGetTokens();
  const { toFiat, fNum2 } = useNumbers();

  useEffect(() => {
    //
  }, [gaugesWithRewards]);

  useEffect(() => {
    if (rewardGauges?.length) {
      console.log(rewardGauges);
      setGaugesWithRewards(rewardGauges?.filter((g) => g.rewardTokens?.length));
    }
  }, [rewardGauges]);

  useEffect(() => {
    //
  }, [gaugesWithRewards]);

  useEffect(() => {
    if (protocolRewardsData) {
      formatRewardsData(protocolRewardsData);
    }
  }, [protocolRewardsData]);

  function formatRewardsData(data?: BalanceMap): ProtocolRewardRow[] {
    if (!isConnected || isClaimsLoading || !data) return [];

    return Object.keys(data).map((tokenAddress) => {
      const token = getToken(tokenAddress);
      const amount = formatUnits(data[tokenAddress], token?.decimals || 18);

      return {
        token: {
          logoURI: token?.logoURI || '',
          name: token?.name || '',
          symbol: token?.symbol || '',
          address: token?.address || '',
        },
        amount,
        value: toFiat(amount, tokenAddress),
      };
    });
  }

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
          <ClaimTable gauges={gaugesWithRewards} />
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
          <ClaimTable gauges={gaugesWithRewards} />
        </Box>
      </GridItem>
    </SimpleGrid>
  );
}
