import { SimpleGrid, Box, Text, VStack, Grid, GridItem } from '@chakra-ui/react';
import PoolList from '../../pools/PoolList';
import { PaginatedTable } from '~/components/table/PaginatedTable';
import { ClaimListItem } from './ClaimListItem';
import { Gauge } from '~/lib/services/staking/types';
import { useEffect, useState } from 'react';
import { useGetTokens } from '~/lib/global/useToken';
import { formatUnits } from '@ethersproject/units';

export function ClaimRewardsTable(props: { gauge: Gauge }) {
  const [rewardsData, setRewardsData] = useState();

  const { getToken } = useGetTokens();

  useEffect(() => {
    if (props.gauge) {
      console.log(props.gauge);
      // const rewards = props.gauge.rewardTokens.map((tokenAddress) => {
      //   const token = getToken(tokenAddress);
      //   const amount = formatUnits(props.gauge.claimableRewards[tokenAddress], token.decimals);

      //   return {
      //     token,
      //     amount,
      //     value: toFiat(amount, token.address),
      //   };
      // });
    }
  }, [props.gauge]);

  return (
    <Box padding="1" borderRadius="16px">
      <Box mb={4} borderBottomRadius="16px" overflow="hidden" shadow="lg" bg="vertek.slate.900">
        <Grid
          paddingX="4"
          py="2"
          templateColumns={{
            base: '1fr 1fr',
            lg: '3fr 1fr 1fr 1fr',
          }}
          gap="0"
        >
          <GridItem>Pools</GridItem>
          <GridItem>Amount</GridItem>
          <GridItem justifyContent="end" display="flex">
            Value
          </GridItem>
          <GridItem justifyContent="end" display="flex">
            Claim
          </GridItem>
        </Grid>
        {/* 
        <ClaimListItem />
        <ClaimListItem />
        <ClaimListItem />
        <ClaimListItem />
        <ClaimListItem /> */}
      </Box>
    </Box>
  );
}
