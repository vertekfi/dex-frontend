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
    <Text mb="4" fontSize={{ base: '2rem', md: '3rem'}}  className="vertektitle">
      Injected with a digital voice. 
    </Text>
    <Box display="flex" justifyContent="flex-end" alignItems="flex-end">
      <Box fontSize="1.2rem" textAlign="right" width={{base: '100%', md:'60%'}} display="flex"  >
            The veVRTK system grants every user the power to influence the 
            developmental trajectory of the Vertek matrix. Vote to direct VRTK emissions to your favorite pools, 
            and join the swarm of cyber hornets in the Vertek DAO, all the while boosting your rewards by up to 2.5x as you accumulate veVRTK.
      </Box>
    </Box>
      <Box display="flex" justifyContent={{ base:'flex-start', md:'flex-start' }} mb="0" alignItems="flex-start">
        <Text mb="1" fontSize={{ base: '2.5rem', md: '3rem'}} textAlign={{base:'right', md:'right'}} className="vertektitle">
         
        </Text>
      </Box>
      <Box 
      display="flex" 
      justifyItems="flex-end" alignContent="flex-end" mb="4" width={{base: 'auto', md:'75%'}}>
        <Text align="right">
           
      </Text>
      </Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mt={{ base:'auto', lg:'-20'}}>
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
