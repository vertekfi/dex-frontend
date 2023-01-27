import { Grid, GridItem, Text } from '@chakra-ui/react';
import { useGetTokens } from '~/lib/global/useToken';
import { useGetPoolTokensDynamicDataQuery } from '~/apollo/generated/graphql-codegen-generated';
import { PoolDetailTokenInfoCard } from '~/modules/pool/detail/components/PoolDetailTokenInfoCard';
import { usePool } from '~/modules/pool/lib/usePool';
import { poolGetNestedLinearPoolTokens } from '~/lib/services/pool/lib/util';
import { PoolWithPossibleNesting } from '~/lib/services/pool/pool-types';
import { useNetworkConfig } from '~/lib/global/useNetworkConfig';

export function PoolDetailAboutThisPool() {
  const config = useNetworkConfig();
  const { pool } = usePool();
  const tokensOfInterest = [
    ...poolGetNestedLinearPoolTokens(pool as PoolWithPossibleNesting),
    ...pool.withdrawConfig.options.map((option) => option.tokenOptions),
  ].flat();
  const { priceFor } = useGetTokens();
  const { data } = useGetPoolTokensDynamicDataQuery({
    variables: { addresses: tokensOfInterest.map((token) => token.address) },
  });

  return (
    <Grid gap="4" width="full">
      <GridItem>
        <Text fontWeight="semibold" fontSize="xl" color="white" mb="4">
          Pool tokens
        </Text>
        {tokensOfInterest.map((token, index) => {
          return (
            <PoolDetailTokenInfoCard
              key={index}
              token={token}
              price={priceFor(token.address)}
              data={data?.staticData.find((item) => item.tokenAddress === token.address)}
              dynamicData={data?.dynamicData.find((item) => item.tokenAddress === token.address)}
              mb="2"
              boxShadow=" 0 0 24px 2px #000"
            />
          );
        })}
      </GridItem>
    </Grid>
  );
}
