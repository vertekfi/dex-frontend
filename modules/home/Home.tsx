import { Box, Grid, GridItem } from '@chakra-ui/react';
import { HomeHero } from '~/modules/home/components/HomeHero';
import { HomePools } from '~/modules/home/components/HomePools';
// import { HomeNews } from '~/modules/home/components/HomeNews';
import { HomeWhyUs } from '~/modules/home/components/HomeWhyUs';
import { HomeBeetsInfo } from '~/modules/home/components/HomeBeetsInfo';
import { HomeLearn } from '~/modules/home/components/HomeLearn';
import { BeetsLogo } from '~/assets/logo/BeetsLogo';


export function Home() {
  return (
    <Box >
      <Box display="flex" justifyContent="flex-end">
      <BeetsLogo />
      </Box>
      <HomeHero />
      <Grid
        templateColumns={{ base: 'repeat(1, 1fr)', lg: 'repeat(5, 1fr)' }}
        columnGap={{ base: '0', lg: '16' }}
        rowGap="12"
        mt="12"
        borderBottomWidth={2}
        borderBottomColor="gray.100"
        pb="24"
      >

        <GridItem colSpan={4} maxW="100%" paddingLeft="1">
          <HomePools  />
        </GridItem>
        {/* <GridItem>
          <HomeNews />
        </GridItem> */}
      </Grid>

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
