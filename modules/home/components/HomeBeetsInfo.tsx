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
    <Text mb="-2" fontSize={{ base: '2rem', md: '3rem'}} lineHeight={{ base: '1.1', md: 'auto' }} 
    textAlign={{ base: 'left', md:'justify' }} className="vertektitle">
      Injected with a digital voice. 
    </Text>
    <Text fontSize={{ base: '1.3rem', md:"2rem"}} mt="1" mb="10" textAlign={{ base: 'left', md:'justify' }}>
        I speak, therefore I am. 
    </Text>
   
    <BeetsHeadline mb="" mt="12" fontSize={{ base: '1.5rem', md: '2.2rem'}} color="white" fontWeight="bold">
      Empowered Governance
    </BeetsHeadline>
    <Box mr={{ base: '0', lg: '20' }} width={{ base: 'full', lg: '75%'}}>
        The veVRTK system grants every user the power to influence the 
            developmental trajectory of the Vertek matrix. Vote to direct VRTK emissions to your favorite pools, 
            and join the swarm of cyber hornets in the Vertek DAO, all the while boosting your rewards by up to 2.5x as you accumulate veVRTK.
  </Box>
      <Box 
      display="flex" 
      justifyItems="flex-end" alignContent="flex-end" mb="" width={{base: 'auto', md:'75%'}}>
      </Box>
      <Box 
      display="flex" flexDirection={{ base:'column', md:'row' }} 
      justifyContent="space-between" 
      alignItems="center" mt={{ base:'-8', lg:'-20'}}>
        <Box ml="4">
          <NextImage
              src={chainId === '10' ? BeetsTokenInfoOpImage : BeetsTokenInfoImage}
              width="250px"
            />
        </Box>
          <Button
            display="flex" 
            mr={{ base:'auto', md:'25%'}}
            variant="vertekdark"
            width={{ base: '100%', lg: '25%'}}
            mt={{ base: '-8', lg:'auto' }}
            as="a"
            href=" https://aalto-defi.notion.site/Vertek-Volta-veVRTK-c4cde926ad344b2b9e1e464469bd1873"
            target="_blank"
            mb="4"
          >
            veVRTK tokenomics
          </Button>
      </Box>
    </Box>
  );
}
