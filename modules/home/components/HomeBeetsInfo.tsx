import { Box, BoxProps, Button } from '@chakra-ui/react';
import { BeetsHeadline } from '~/components/typography/BeetsHeadline';
import NextImage from 'next/image';
import BeetsTokenInfoImage from '~/assets/svg/vertek-logo-dark.svg';
import BeetsTokenInfoOpImage from '~/assets/svg/vertek-logo-dark.svg';
import { useNetworkConfig } from '~/lib/global/useNetworkConfig';

export function HomeBeetsInfo(props: BoxProps) {
  const { chainId } = useNetworkConfig();

  return (
    <Box {...props}>
      <BeetsHeadline mb="2" fontSize="3xl" mt="2">
        Empowered Governance
        </BeetsHeadline>
      <Box display="flex" justifyContent={{ base:'flex-start', md:'center' }} mb="0" mt={{ base:'-24', md:'-20' }} alignItems="flex-start">
        <NextImage
          src={chainId === '10' ? BeetsTokenInfoOpImage : BeetsTokenInfoImage}
          width="250px"
        />
      </Box>
      <Box mb="4" mt={{ base: '-20', md:'-20'}}>
      Injected with a digital voice: The veVRTK system grants every user the power to influence the 
      developmental trajectory of the Vertek matrix. Vote to direct VRTK emissions to your favorite pools, 
      and join the swarm of cyber hornets in the Vertek DAO, all the while boosting your rewards by up to 2.5x as you accumulate veVRTK.
      </Box>
      <Button
        display="flex" 
        variant="vertekdark"
        as="a"
        href="https://docs.beets.fi/beets/tokenomics"
        target="_blank"
        mb="4"
      >
        veVRTK tokenomics
      </Button>
    </Box>
  );
}
