import { Box, Grid, GridItem, SimpleGrid } from '@chakra-ui/react';
import { HomeHero } from '~/modules/home/components/HomeHero';
import { HomePools } from '~/modules/home/components/HomePools';
import { HomeNews } from '~/modules/home/components/HomeNews';
import { HomeWhyUs } from '~/modules/home/components/HomeWhyUs';
import { HomeBeetsInfo } from '~/modules/home/components/HomeBeetsInfo';
import { HomeLearn } from '~/modules/home/components/HomeLearn';
import { BeetsLogo } from '~/assets/logo/BeetsLogo';
import { useUserData } from '~/lib/user/useUserData';
import { useGetHomeFeaturedPoolsQuery } from '~/apollo/generated/graphql-codegen-generated';
import { useGetPoolsLazyQuery } from '~/apollo/generated/graphql-codegen-generated';
import { orderBy } from 'lodash';
import { useEffect } from 'react';
import { PoolCard } from '~/components/pool-card/PoolCard';
import { HomePoolsNew } from './components/HomePoolsNew';
export function Home() {

  const {
    stakedValueUSD,
    portfolioValueUSD,
    loading: userDataLoading,
    userPoolIds,
    usdBalanceForPool,
    bptBalanceForPool,
  } = useUserData();
  const { data } = useGetHomeFeaturedPoolsQuery();
  const featuredPoolGroups = data?.featuredPoolGroups || [];
  const [getPools, getPoolsQuery] = useGetPoolsLazyQuery();
  const userPools = orderBy(
    getPoolsQuery.data?.poolGetPools || [],
    (pool) => usdBalanceForPool(pool.id),
    'desc',
  );
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

    <Box >
      <Box display="flex" justifyContent="flex-end">
      <BeetsLogo />
      </Box>
      <HomeHero />
      {/* <Grid
          templateColumns={{ base: "repeat(1, 1fr)", lg: "repeat(4, 1fr)" }}
          columnGap={{ base: "0", lg: "8" }}
          rowGap="12"
          mt="12"
          borderBottomWidth={2}
          borderBottomColor="gray.100"
          pb="24"
          >
      {featuredPoolGroups.map((group) =>
      group.items.map((item) => {
      switch (item.__typename) {
          case "GqlPoolMinimal":
            return <PoolCard pool={item} key={item.id} />;
          case "GqlFeaturePoolGroupItemExternalLink":
          // Render something for the external link item
      }
    })
  )}
          <GridItem>
            <HomeNews />
          </GridItem>
      </Grid> */}
      <HomePoolsNew /> 
      <Grid
        templateColumns={{ base: 'repeat(1, 1fr)', lg: 'repeat(3, 1fr)' }}
        columnGap={{ base: '0', lg: '16' }}
        rowGap="12"
        mt="20"
        borderBottomWidth={2}
        borderBottomColor="gray.100"
        pb="24"
      >
        <GridItem colSpan={2}>
          <HomeWhyUs />
        </GridItem>
        <GridItem>
          <HomeBeetsInfo />
        </GridItem>
      </Grid>
      <Box mt="20">
        <HomeLearn />
      </Box>
    </Box>
  );
}
