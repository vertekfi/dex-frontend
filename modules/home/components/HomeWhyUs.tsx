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
  {/* <Text mb="4" fontSize="2rem" className="vertektitle">
    The pinnacle of DeFi technological evolution. <br /> 
  </Text>
  <Box fontSize="1.2rem">
    Advanced, yet simple. Sophisticated, yet intuitive. 
  </Box> */}
  <BeetsHeadline mb="" mt="8" fontSize={{ base: '1.5rem', md: '2.2rem'}} textAlign="justify" color="white" fontWeight="bold">
      DeFi Matrix
  </BeetsHeadline>
  <Box mr={{ base: '0', lg: '20' }} width={{ base: 'full', lg: '75%'}}>
  Vertek is a full-suite matrix of trading tools that users and developers 
  of any skill level can use to participate in the most advanced DeFi paradigm. 
  Vote for emissions, trade perpetuals, list NFTs on the marketplace, and farm multi-token/multi-reward liquidity pools.
  </Box>
  
  <Grid 
  templateColumns={{ base: 'repeat(1, 1fr)', lg: 'repeat(3, 1fr)' }} 
  gap={{ base: '6', md:'12'}}
  mx="4"
  mb="8"
  paddingX={{ base: 'none', md: '6'}} 
  mt="4" >
      <GridItem borderBottomWidth={{base: '0px', lg:'0px'}} height={{ base:'auto', lg:'17rem', xl:'14rem'}} borderColor="vertek.neonpurple.500">
          <Text 
              textDecoration="underline" 
              mb="1" 
              mt="4" 
              fontSize={{ base: '1.5rem', md: '2rem'}} 
              className="vertektitle"
              >
              Trade
          </Text>
          <Box>
              Enjoy low swap fees and capitalize on all liquidity at once as the Smart Order Router 
              optimizes for best the best price with the least slippage. 
              Self-custody and freely trade your assets as you see fit 24/7 hours a day, 365 days a year.
          </Box>
      </GridItem>
      <GridItem borderBottomWidth={{base: '0px', lg:'0px'}} height={{ base:'auto', lg:'17rem', xl:'14rem'}} borderColor="vertek.neonpurple.500">
          <Text mb="1" mt="4" fontSize={{ base: '1.5rem', md: '2rem'}}  className="vertektitle">
              Invest
          </Text>
          <Box>
              Put your capital to work by curating your own crypto index funds. 
              Adjust your portfolio and get rewarded for using it as liquidity position. Earn yield on top of yield.
          </Box>
      </GridItem>
      <GridItem borderBottomWidth={{base: '0px', lg:'0px'}} height={{ base:'auto', lg:'17rem', xl:'14rem'}} borderColor="vertek.neonpurple.500">
        <Text mb="1" mt="4" fontSize={{ base: '1.5rem', md: '2rem'}}  className="vertektitle">
              Hodl 
        </Text>
        {/* <BeetsSubHeadline mb={{ base: '2', md: '6' }}>Hodl</BeetsSubHeadline> */}
        <Box>
              Get exposure to the commodities asset class. Acquire digital representations of Gold, Silver, Crude Oil, 
              Diamonds, and more. Unlike going through a 
              traditional broker, acquisition or liquidation of these assets is seamless, near instant, and never sleeps.
        </Box>
      </GridItem>
      <GridItem borderBottomWidth={{base: '0px', lg:'0px'}} height={{ base:'auto', lg:'17rem', xl:'14rem'}} borderColor="vertek.neonpurple.500">
            <Text mb="1" mt="4" fontSize={{ base: '1.5rem', md: '2rem'}}  className="vertektitle">
                    Collect
            </Text>
            <Box>
            List your NFTs and transact digital art and rarities with incorruptible ownership. 
            The Vertek Marketplace has some of the lowest fees across all NFT platforms. Denominate your prices in a variety of cryptocurrencies.
            </Box>
      </GridItem>
      <GridItem borderBottomWidth={{base: '0px', lg:'0px'}} height={{ base:'auto', lg:'17rem', xl:'14rem'}} borderColor="vertek.neonpurple.500">
            <Text mb="1" mt="4" fontSize={{ base: '1.5rem', md: '2rem'}}  className="vertektitle">
                Build
            </Text>
            <Box color="white">
            Fortune favors the <span style={{ fontWeight:'900' }} >brave</span>. Permissionlessly take advantage all the tools Vertek provides. 
            Innovate and usher in a new era for DeFi. The world of finance is changing. Be part of the future. Build with us.

            </Box>
      </GridItem>
      <GridItem borderBottomWidth={{base: '0px', lg:'0px'}} height={{ base:'auto', lg:'17rem', xl:'14rem'}} borderColor="vertek.neonpurple.500">
        <Text mb="1" mt="4" fontSize={{ base: '1.5rem', md: '2rem'}}  className="vertektitle">
          Break Free
        </Text>
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
