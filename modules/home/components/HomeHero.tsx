import { Button, Flex, HStack, Text, Box } from '@chakra-ui/react';
import { NextLink } from '~/components/link/NextLink';
import { VLogoPVWT } from '~/assets/logo/Vertek/VLogoPVWT';
import { VLogoPNT } from '~/assets/logo/Vertek/VLogoPNT';

export function HomeHero() {
return (
  <Flex
    // bgGradient='linear(90deg, #161626 0%, #363562 50%, #1C1C34 100%, #C0C0C0 100%)'
    paddingX="4"
    paddingY="2"
    borderRadius="12px"
    height={{ base: 'auto', lg: 'xl' }}
    // mx={{ base: `-${theme.space['4']}`, xl: `-${theme.space['8']}` }}
    overflow="hidden"
    minHeight="400px"
  >
  <Flex
    flex="1"
    mt={{ base: '12', lg:'4'}}
    pl={{ base: '4', lg: '8' }}
    mb="12"
    justifyContent="center"
    alignItems="center"
  >
    <Flex flexDirection="column" width={{ base: 'auto' }}>
      <Box 
      display="flex" 
      flexDirection="row" 
      alignItems="center" 
      justifyContent="flex-start" css={{
              transition: "transform 0.5s",
              "&:hover": {
                transform: "scale(1.02)",
              },
            }}>
          <VLogoPNT 
              alignSelf="center" marginLeft={{ base:'0', md:'1rem' }}
              height={{ base: '80px', md:'120px', xl:'180px'}} 
              marginTop={{ base: '1rem', md:'1.9rem'}}
          />
          
          <Text
            textAlign="left"
            fontWeight="bold"
            marginLeft={{ base:'-2.8rem', md:'-3rem', xl:'-6rem' }} 
            fontSize={{ base: '3.5rem', md:'6rem', xl:'7rem'}}
            className="vertekhome"
            
          >
            VERTEK
        </Text>
      </Box>
      
        
      
        <Text
          color="white"
          fontSize={{ base: '1.3rem', md:'1.5rem', xl:'2rem' }}
          letterSpacing="-0.02rem"
          lineHeight={{base:'1.5rem', xl:'1.9rem' }}
          fontWeight="bold" 
          my={{ base: '6', md:'4' }}
          mr={{ base: '-1rem', md:'4' }}
        >
          The pinnacle of panoptic evolution in Decentralized Exchanges.<br />
          Choose your investment reality. <br />
          Get integrated.
        </Text>


      <HStack
        spacing="4"
        mt={{ base: '4', lg:'0' }}
        mb={{ base: '4', lg: '8' }}
        alignItems="center"
        justifyContent={{ base: 'flex-end', lg: 'flex-start' }}
        // flex-end on base for accessibility
      >
        <NextLink href="/pools" chakraProps={{ _hover: { textDecoration: 'none' } }}>
          <Button variant="verteklight" width={{ base: '130px', lg: '160px' }}>
            Invest
          </Button>
        </NextLink>
        <NextLink href="/swap" chakraProps={{ _hover: { textDecoration: 'none' } }}>
          <Button width={{ base: '130px', lg: '160px' }} variant="stayblack">
            Swap
          </Button>
        </NextLink>
      </HStack>
    </Flex>
  </Flex>
    
  </Flex>
);
}
