import { Button, Flex, HStack, Text, Box } from '@chakra-ui/react';
import { NextLink } from '~/components/link/NextLink';
import { VLogoPNT } from '~/assets/logo/Vertek/VLogoPNT';
import 'animate.css';

export function HomeHero() {
  return (
    <Flex
      paddingX="4"
      paddingY="2"
      borderRadius="12px"
      height={{ base: 'auto', lg: 'xl' }}
      overflow="hidden"
      minHeight="400px"
    >
      <Flex
        flex="1"
        mt={{ base: '12', lg: '4' }}
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
            justifyContent="flex-start"
            css={{
              transition: 'transform 0.5s',
              '&:hover': {
                transform: 'scale(1.02)',
              },
            }}
          >
            <VLogoPNT
              alignSelf="center"
              marginLeft={{ base: '0', md: '1rem' }}
              height={{ base: '80px', md: '120px', xl: '180px' }}
              marginTop={{ base: '1rem', md: '1.9rem' }}
              className="animate__animated 
              animate__fadeInDown 
              animate__slower
              animate__delay-0s"
            />

            <Text
              textAlign="left"
              display={{ base: 'none', md: 'block' }}
              color="white"
              fontWeight="bold"
              marginLeft={{ base: '-2.8rem', md: '-3rem', xl: '-6rem' }}
              fontSize={{ base: '3.5rem', md: '6rem', xl: '7rem' }}
              className=" vertekhome 
            animate__animated 
            animate__fadeInDown 
            animate__slower
            animate__delay-0s"
            >
              VERTEK
            </Text>
            <Text
              display={{ base: 'auto', md: 'none' }}
              textAlign="left"
              color="white"
              fontWeight="bold"
              marginLeft={{ base: '-2.8rem', md: '-3rem', xl: '-6rem' }}
              fontSize={{ base: '3.5rem', md: '6rem', xl: '7rem' }}
              className="vertekhomemobile"
            >
              VERTEK
            </Text>
          </Box>

          <Text
            color="white"
            fontSize={{ base: '1.3rem', md: '1.5rem', xl: '2rem' }}
            letterSpacing="-0.02rem"
            lineHeight={{ base: '1.6rem', md: '2.3rem' }}
            fontWeight={{ base: 'semibold', md: 'bold' }}
            mt={{ base: '6', md: '4' }}
            mr={{ base: '-1.5rem', md: '4' }}
            className=" 
          animate__animated 
          animate__fadeInRight
          animate__slower
          animate__delay-0s"
          >
            The pinnacle of panoptic evolution in Decentralized Exchanges.
            <br />
          </Text>
          <Text
            color="white"
            fontSize={{ base: '1.3rem', md: '1.5rem', xl: '2rem' }}
            letterSpacing="-0.02rem"
            lineHeight={{ base: '1.6rem', md: '2.3rem' }}
            fontWeight={{ base: 'semibold', md: 'bold' }}
            mr={{ base: '-1.5rem', md: '4' }}
            className=" 
          animate__animated 
          animate__fadeInRight
          animate__slower
          delay25"
          >
            Choose your investment reality. <br />
          </Text>
          <Text
            color="white"
            fontSize={{ base: '1.3rem', md: '1.5rem', xl: '2rem' }}
            letterSpacing="-0.02rem"
            lineHeight={{ base: '1.6rem', md: '2.3rem' }}
            fontWeight={{ base: 'semibold', md: 'bold' }}
            mr={{ base: '-1.5rem', md: '4' }}
            mb={{ base: '6', md: '4' }}
            className="vertekhome
          animate__animated 
          animate__fadeInRight
          animate__slower
          delay5
          "
          >
            Get integrated. <br />
          </Text>

          <HStack
            spacing="4"
            mt={{ base: '4', lg: '0' }}
            mb={{ base: '4', lg: '8' }}
            alignItems="center"
            justifyContent={{ base: 'flex-end', lg: 'flex-start' }}
            // flex-end on base for accessibility
          >
            <NextLink href="/pools" chakraProps={{ _hover: { textDecoration: 'none' } }}>
              <Button
                variant="verteklight"
                width={{ base: '130px', lg: '160px' }}
                className="animate__animated 
          animate__fadeInUp
          animate__slower
          animate__delay-0s"
              >
                Invest
              </Button>
            </NextLink>
            <NextLink href="/swap" chakraProps={{ _hover: { textDecoration: 'none' } }}>
              <Button
                width={{ base: '130px', lg: '160px' }}
                variant="stayblack"
                className="animate__animated 
          animate__fadeInUp 
          animate__slower
          animate__delay-0s"
              >
                Swap
              </Button>
            </NextLink>
          </HStack>
        </Flex>
      </Flex>
    </Flex>
  );
}
