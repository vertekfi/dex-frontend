import { Box, BoxProps, Button, HStack, Grid, GridItem } from '@chakra-ui/react';
import { Text, useColorMode } from '@chakra-ui/react'; 
import { BeetsHeadline } from '~/components/typography/BeetsHeadline';
import { BeetsSubHeadline } from '~/components/typography/BeetsSubHeadline';
import { HomeLearnItem } from '~/modules/home/components/HomeLearnItem';

export function HomeLearn(props: BoxProps) {
  return (
    <Box {...props} mb="16rem">
      
      <Text mb="4" fontSize={{ base: '2rem', md: '3rem'}}  className="vertektitle">
            Integrate with the Vertek Matrix
      </Text>
      <Box fontSize="1.2rem">
            Check out the resources below to learn more
            about DeFi, Vertek and the technology we provide.
      </Box>
      {/* <BeetsSubHeadline  mt="8" mb="4">
        Vertek Basics
      </BeetsSubHeadline> */}
      <Grid templateColumns={{ base: 'repeat(1, 1fr)', lg: 'repeat(2, 1fr)' }} gap="12" mt="4">
        <GridItem>
          <HomeLearnItem
            title="Earn Yield on Vertek"
            description="From multiple assets, customized token weightings and dynamic swap fees, weighted pools are the industry standard when it comes to tailored investment strategies. Discover more about this unique type of liquidity pool and how you can get the most out of it."
            url="https://aalto-defi.notion.site/How-to-Earn-on-Vertek-73a8f6c395834a3c8a58bb5d2f28516d"
          />
          <HomeLearnItem
            title="How to Invest in a Liquidity Pool"
            description="Start your journey as a liquidity provider on Vertek, and participate in the most classic yield farming strategy in DeFi. On Vertek this is a two-step process: form liquidity, and stake it in the gauge."
            url="https://aalto-defi.notion.site/Noob-s-Guide-to-Investing-in-a-Liquidity-Pool-c1fef5c4122e4bfe9c8d6a3841bab2b0"
          />
        </GridItem>
        <GridItem>
        
            <HomeLearnItem
              title="The Vertek Volta"
              description="The core DeFi instrument of Vertek. Lock VRTK-WBNB here to get veVRTK, which can be used to vote for and direct emissions to your favorite Core Pools, increasing their APRs. 
              Accumulate and compound veVRTK to boost rewards when farming Core Pools, while also receiving dividends from 50% of dex fee profits."
              url="https://aalto-defi.notion.site/Vertek-Volta-veVRTK-c4cde926ad344b2b9e1e464469bd1873"
            />
            <HomeLearnItem 
                title="Boost Your Rewards"
                description="Get up to a 2.5x boost to the rewards you receive from Core Pools. The more veVRTK you own, the more boost you get. Execute the most optimal profit extraction strategy on Vertek and grow your liquidity positions in your chosen Core Pools. Stake & Chill. Compound & Pound."
                url="https://aalto-defi.notion.site/VRTK-Rewards-Boosting-47c3c0413063456eb9796bdd1798cd84"
                last={true}
              />
        </GridItem>
        </Grid>
        <HStack display="flex" mt="12" mb="12" mx="4" gap="4" justifyContent="center" alignItems="center">
              <BeetsSubHeadline mb="">Want to dive even deeper?</BeetsSubHeadline>
              <Button 
              display="flex" 
              justifyContent="center" alignItems="center" 
              variant="vertekdark" as="a" href="https://docs.beets.fi" 
              target="_blank" 
              px="12">
                Check Our Docs 
              </Button>
              
        </HStack>
    </Box>
  );
}
