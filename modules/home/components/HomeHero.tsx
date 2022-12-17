import { Box, Button, Flex, HStack, Text, useTheme } from '@chakra-ui/react';
import NextImage from 'next/image';
import InvestMastheadImage from '~/assets/logo/verteklogotext.svg';
import InvestMastheadOpImage from '~/assets/logo/verteklogotext.svg';
import verteknotext from '~/assets/logo/verteknotext.svg'; 
import { NextLink } from '~/components/link/NextLink';
import { useNetworkConfig } from '~/lib/global/useNetworkConfig';
import { ReactSVG } from 'react-svg';
import { BeetsLogo } from '~/assets/logo/BeetsLogo';

export function HomeHero() {
  const theme = useTheme();
  const { chainId } = useNetworkConfig();

  return (
    <Flex
    
    // bgGradient='linear(90deg, #161626 0%, #363562 50%, #1C1C34 100%, #C0C0C0 100%)' 
    paddingX="4" paddingY="2" borderRadius="12px"
      height={{ base: 'auto', lg: 'xl' }}
      // mx={{ base: `-${theme.space['4']}`, xl: `-${theme.space['8']}` }}
      overflow="hidden"
      minHeight="400px"
    >

      <Flex flex="1" mt="8" pl={{ base: '4', xl: '8' }} mb="12" justifyContent="center" 
      alignItems="center">
        <Flex flexDirection="column" 
         width={{ base: 'auto',  }} >
          
          <HStack alignItems="center" justifyContent="space-between" >
          <Text
            as="h1"
            textStyle={{ base: 'h2', lg: 'h1' }}
            textTransform="uppercase"
            color="white"
            fontWeight="semibold" >
            Welcome to
            <br />
            Vertek
          </Text>
          
          </HStack>
          
          <HStack>
          <Text
            color="white"
            as="h5"
            textStyle={{ base: undefined, lg: 'h5' }}
            fontSize={{ base: 'lg', lg: undefined }}
            my={{ base: '6', lg: '10' }}
            mr="8"
          >
            The future of DeFi re-imagineered. Your next generation Decentralised Exchange.
          </Text>
          </HStack>

          <HStack spacing="4" mb={{ base: '6', lg: '10' }}>
            <NextLink href="/pools" chakraProps={{ _hover: { textDecoration: 'none' } }}>
              <Button variant="vertekconnect2" width={{ base: '130px', lg: '160px' }}>
                Invest
              </Button>
            </NextLink>
            <NextLink href="/swap" chakraProps={{ _hover: { textDecoration: 'none' } }}>
              <Button width={{ base: '130px', lg: '160px' }} variant="vertekswap">
                Swap
              </Button>
            </NextLink>
          </HStack>
          {/*<Link color="beets.highlight" alignSelf="flex-start">
                        {"I'm new! Help me get started."}
                    </Link>*/}
        </Flex>
      </Flex>
      {/* <ReactSVG
                src={chainId === '10' ? InvestMastheadOpImage : InvestMastheadImage}

                width="400.62px"
                 height="68px"
                  /> */}
      {/* <Box display="flex" flexDirection="row" justifyContent="center" alignItems="center">
          <BeetsLogo width="500px" />
      </Box>
      <Box flex="0" display={{ base: 'none', md: 'block' }} /> */}
    </Flex>
  );
}
