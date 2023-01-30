import { Button, Flex, HStack, Text } from '@chakra-ui/react';
import { NextLink } from '~/components/link/NextLink';
import { VLogoPVWT } from '~/assets/logo/Vertek/VLogoPVWT';

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
      <HStack alignItems="center" justifyContent="space-between">
          <Text
            as="h1"
            textStyle={{ base: 'h2', lg: 'h1' }}
            textTransform="uppercase"
            color="white"
            fontWeight="semibold"
            css={{
              transition: "transform 0.5s",
              "&:hover": {
                transform: "scale(1.02)",
              },
            }}
          >
              Welcome to
          <br />
          <VLogoPVWT 
              height={{ base: '65px', md:'100px'}}  mt="3" 
          />
        </Text>
      </HStack>
      {/* <NextImage
          src={HomeImage}
          width="100px"

          
        /> */}
        
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
          <Button width={{ base: '130px', lg: '160px' }} variant="vertekdark">
            Swap
          </Button>
        </NextLink>
      </HStack>
    </Flex>
  </Flex>
    
  </Flex>
);
}
