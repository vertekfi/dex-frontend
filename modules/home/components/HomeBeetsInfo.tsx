import { Box, BoxProps, Button, Text } from '@chakra-ui/react';
import { BeetsHeadline } from '~/components/typography/BeetsHeadline';
import NextImage from 'next/image';
import BeetsTokenInfoImage from '~/assets/svg/vertek-logo-dark.svg';
import BeetsTokenInfoOpImage from '~/assets/svg/vertek-logo-dark.svg';
import { useNetworkConfig } from '~/lib/global/useNetworkConfig';

export function HomeBeetsInfo(props: BoxProps) {
  const { chainId } = useNetworkConfig();

  return (
    <Box {...props} mb="0rem">
    <Text mb="-2" fontSize={{ base: '2rem', md: '3rem'}}  className="vertektitle">
      Injected with a digital voice. 
    </Text>
    <Text fontSize={{ base: '1.3rem', md:"2rem"}}  mb="10" textAlign="right">
        I speak, therefore I am
    </Text>
   
    <BeetsHeadline mb="" mt="12" fontSize={{ base: '1.5rem', md: '2.2rem'}} color="white" fontWeight="bold">
      The Vertek system
    </BeetsHeadline>
    <Box mr={{ base: '0', lg: '20' }} width={{ base: 'full', lg: '75%'}}>
    grants every user the power to influence the 
            developmental trajectory of the Vertek matrix. Vote to direct VRTK emissions to your favorite pools, 
            and join the swarm of cyber hornets in the Vertek DAO, all the while boosting your rewards by up to 2.5x as you accumulate veVRTK.
  </Box>


    <Box display="flex" justifyContent="flex-start" alignItems="flex-end">
      <Box fontSize="1.2rem" textAlign={{base: 'left', md:'left'}} width={{base: '100%', md:'60%'}} display="flex"  >
          
      </Box>
    </Box>
      {/* <Box display="flex" justifyContent={{ base:'flex-start', md:'flex-start' }} mb="0" alignItems="flex-start">
        <Text mb="1" fontSize={{ base: '2.5rem', md: '3rem'}} textAlign={{base:'right', md:'right'}} className="vertektitle">
         
        </Text>
      </Box> */}
      <Box 
      display="flex" 
      justifyItems="flex-end" alignContent="flex-end" mb="4" width={{base: 'auto', md:'75%'}}>
        <Text align="right">
           
      </Text>
      </Box>
      <Box display="flex" flexDirection={{ base:'column', md:'row' }} justifyContent="space-between" alignItems="center" mt={{ base:'auto', lg:'-20'}}>
      <NextImage
          src={chainId === '10' ? BeetsTokenInfoOpImage : BeetsTokenInfoImage}
          width="250px"
        />

      <Button
        display="flex" 
        variant="vertekdark"
        width={{ base: '100%', lg: '25%'}}
        as="a"
        href="https://docs.beets.fi/beets/tokenomics"
        target="_blank"
        mb="4"
      >
        veVRTK tokenomics
      </Button>
      </Box>
    </Box>
  );
}
