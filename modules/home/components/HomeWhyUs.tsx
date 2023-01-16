import { Box, BoxProps, Grid, GridItem, Button, Text} from '@chakra-ui/react';
import NextImage from 'next/image';
import WhyUsImage from '~/assets/images/why-us.png';
import WhyUsOpImage from '~/assets/images/why-us-OP.png';
import { BeetsHeadline } from '~/components/typography/BeetsHeadline';
import { BeetsSubHeadline } from '~/components/typography/BeetsSubHeadline';
import { useNetworkConfig } from '~/lib/global/useNetworkConfig';
import BeetsTokenInfoImage from '~/assets/svg/vertek-logo-dark.svg';
import BeetsTokenInfoOpImage from '~/assets/svg/vertek-logo-dark.svg';

export function HomeWhyUs(props: BoxProps) {
  const { chainId } = useNetworkConfig();

  return (
    <Box {...props}>
      <BeetsHeadline fontSize="3xl">
        The pinnacle of DeFi technological evolution. <br /> Advanced, yet simple. Sophisticated, yet intuitive. 
      </BeetsHeadline>
      <Box mr={{ base: '0', lg: '20' }} >
      Vertek is a full-suite matrix of trading tools that users and developers 
      of any skill level can use to participate in the most advanced DeFi paradigm. 
      Vote for emissions, trade perpetuals, list NFTs on the marketplace, and farm multi-token/multi-reward liquidity pools.
      </Box>
      <Box my="6" display="flex" justifyContent="center">
      </Box>
      <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)' }} gap="8" mt="8">
        <GridItem>
          <BeetsSubHeadline mb={{ base: '2', md: '6' }}>Trade</BeetsSubHeadline>
          <Box>
          Enjoy low swap fees and capitalize on all liquidity at once as the Smart Order Router 
          optimizes for best the best price with the least slippage. 
          Self-custody and freely trade your assets as you see fit 24/7 hours a day, 365 days a year.
          </Box>
        </GridItem>
        <GridItem>
          <BeetsSubHeadline mb={{ base: '2', md: '6' }}>Invest</BeetsSubHeadline>
          <Box>
          Put your capital to work by curating your own crypto index funds. 
          Adjust your portfolio and get rewarded for using it as liquidity position. Earn yield on top of yield.
          </Box>
        </GridItem>
        <GridItem>
          <BeetsSubHeadline mb={{ base: '2', md: '6' }}>Hodl</BeetsSubHeadline>
          <Box>
          Get exposure to the commodities asset class. Acquire digital representations of Gold, Silver, Crude Oil, 
          Diamonds, and more. Unlike going through a 
          traditional broker, on Vertek acquisition or liquidation of these assets is seamless, near instant, and never sleeps.
          </Box>
        </GridItem>
        <GridItem>
          <BeetsSubHeadline mb={{ base: '2', md: '6' }}>Collect</BeetsSubHeadline>
          <Box>
          List your NFTs and transact digital art and rarities with incorruptible ownership. 
          The Vertek Marketplace has some of the lowest fees across all NFT platforms. Denominate your prices in a variety of cryptocurrencies.
          </Box>
        </GridItem>
        <GridItem>
          <BeetsSubHeadline mb={{ base: '2', md: '6' }}>Build</BeetsSubHeadline>
          <Box color="white">
          Fortune favors the <span style={{ fontWeight:'900' }} >brave</span>. Permissionlessly take advantage all the tools Vertek provides. 
          Innovate and usher in a new era for DeFi. The world of finance is changing. Be part of the future. Build with us.

          </Box>
        </GridItem>
        <GridItem>
          <BeetsSubHeadline mb={{ base: '2', md: '6' }}>Break Free</BeetsSubHeadline>
          <Box color="white">
          Escape the shackles of traditional finance with the silver smooth, 
          lightning fast, indestructible surety of decentralized finance. 
          Take control of your own wealth and grow it permissionlessly. No middle man.

          </Box>
        </GridItem>


      </Grid>
    </Box>
  );
}
