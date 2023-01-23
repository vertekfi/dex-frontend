import { Box, Grid, GridItem, Text } from '@chakra-ui/react';
import { HomeHero } from '~/modules/home/components/HomeHero';
import { HomeWhyUs } from '~/modules/home/components/HomeWhyUs';
import { HomeBeetsInfo } from '~/modules/home/components/HomeBeetsInfo';
import { HomeLearn } from '~/modules/home/components/HomeLearn';
import { BeetsLogo } from '~/assets/logo/BeetsLogo';
import { useUserData } from '~/lib/user/useUserData';
import { useGetPoolsLazyQuery } from '~/apollo/generated/graphql-codegen-generated';
import { useEffect } from 'react';
import { HomePoolsNew } from './components/HomePoolsNew';

export function Home() {
  const {
    stakedValueUSD,
    portfolioValueUSD,
    loading: userDataLoading,
    userPoolIds,
    usdBalanceForPool,
  } = useUserData();
  const [getPools, getPoolsQuery] = useGetPoolsLazyQuery();
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
    <Box>
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
      <Text mb="0" mt="12" fontSize={{ base: '2rem', md: '3rem'}}  
      lineHeight={{ base: '1.1', md: 'auto' }} 
      textAlign={{ base: 'left', md:'justify' }} className="vertektitle">
        The pinnacle of DeFi technological evolution. <br /> 
      </Text>
      <Text mt="1" fontSize={{ base: '1.3rem', md:"2rem"}}  mb="8" textAlign={{ base: 'left', md:'justify' }}>
        Advanced, yet simple. Sophisticated, yet intuitive. 
      </Text>
      <Grid
        templateColumns={{ base: 'repeat(1, 1fr)', lg: 'repeat(3, 1fr)' }}
        columnGap={{ base: '0', lg: '16' }}
        rowGap="4"
        mt="4"
        borderBottomWidth={2}
        borderBottomColor="gray.100"
        pb="18">
          
            <GridItem 
            colSpan={3}
            borderBottomWidth={2} borderBottomColor="gray.100">
                  <HomeWhyUs />
            </GridItem>

            <GridItem colSpan={3} mt="12">
              <HomeBeetsInfo />
            </GridItem>
      </Grid>
      <Box mt="12" borderBottomWidth={0} borderBottomColor="gray.100">
        <HomeLearn />
      </Box>
    </Box>
  );
}
