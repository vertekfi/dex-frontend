import { Box, BoxProps, Grid, Text } from '@chakra-ui/react';
import { PoolCard } from '~/components/pool-card/PoolCard';
import { useUserData } from '~/lib/user/useUserData';
import {
  useGetHomeFeaturedPoolsQuery,
  useGetPoolsLazyQuery,
} from '~/apollo/generated/graphql-codegen-generated';
import { useEffect } from 'react';
// import { orderBy } from 'lodash';

export function HomePoolsNew(props: BoxProps) {
  const { userPoolIds, usdBalanceForPool } = useUserData();

  const { data } = useGetHomeFeaturedPoolsQuery();
  const featuredPoolGroups = data?.featuredPoolGroups || [];
  const [getPools, getPoolsQuery] = useGetPoolsLazyQuery();

  //   const userPools = orderBy(
  //     getPoolsQuery.data?.poolGetPools || [],
  //     (pool) => usdBalanceForPool(pool.id),
  //     'desc',
  //   );

  const userPoolIdsStr = userPoolIds.join();

  useEffect(() => {
    getPools({
      variables: {
        where: {
          idIn: userPoolIds,
          poolTypeNotIn: ['LINEAR', 'LIQUIDITY_BOOTSTRAPPING', 'UNKNOWN'],
        },
      },
    });
  }, [userPoolIdsStr]);

  return (
    <>
      <Box minWidth="0" {...props}>
        <Text mb="4" fontSize={{ base: '1.5rem', md: '2.2rem' }} color="white" fontWeight="bold">
          Featured Pools
        </Text>
        <Grid
          templateColumns={{ base: 'repeat(1, 1fr)', lg: 'repeat(4, 1fr)' }}
          columnGap={{ base: '0', lg: '8' }}
          rowGap="8"
          mt="4"
          borderBottomWidth={2}
          borderBottomColor="gray.100"
          pb="12"
        >
          {featuredPoolGroups.map((group) =>
            group.items.map((item) => {
              switch (item.__typename) {
                case 'GqlPoolMinimal':
                  return <PoolCard pool={item} key={item.id} />;
                case 'GqlFeaturePoolGroupItemExternalLink':
                // Render something for the external link item
              }
            }),
          )}
          {/* <GridItem>
            <HomeNews />
        </GridItem> */}
        </Grid>
      </Box>

      {/* {(userPools.length > 0 || getPoolsQuery.loading) && (
    <>
     <Box>
      <BeetsHeadline mb="4">My Investments </BeetsHeadline>
      <Grid
       templateColumns={{ base: 'repeat(1, 1fr)', lg: 'repeat(4, 1fr)' }}
       columnGap={{ base: '0', lg: '8' }}
       rowGap="12"
       mt="4"
       borderBottomWidth={2}
       borderBottomColor="gray.100"
       pb="12"
      >
       {userPools.map((pool) => (
        <PoolCardUser
         pool={pool}
         key={pool.id}
         balance={bptBalanceForPool(pool.id)}
         balanceUSD={usdBalanceForPool(pool.id)}
        />
       ))}

      </Grid>
     </Box>
    </>
       )}*/}
    </>
  );
}
