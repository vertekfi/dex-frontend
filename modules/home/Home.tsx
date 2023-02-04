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
import Image from 'next/image';
import puzzle from '~/assets/vertekicons/puzzle.svg'; 

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
      <HomeHero />
      <HomePoolsNew />
      <Text mb="4" mt="12" fontSize={{ base: '2rem', md: '3rem'}}  
      lineHeight={{ base: '1.1', md: 'auto' }} 
      textAlign={{ base: 'left', md:'justify' }} className="vertektitle">
        The pinnacle of DeFi technological evolution. <br /> 
      </Text>
      <Box display="flex" flexDirection="row"  alignItems="center" mt="4" mb="8" >
          <Text fontSize={{ base: '1.3rem', md:"2rem"}}  textAlign={{ base: 'left', md:'justify' }}>
            Advanced, yet simple. Sophisticated, yet intuitive &nbsp; 
            {/* <Image  src={puzzle} width="30" height="30"   /> */}
          </Text>
         
          
      </Box> 
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
