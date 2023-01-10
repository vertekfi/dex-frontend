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
      <BeetsHeadline mb="2">Governance redefined</BeetsHeadline>
      <Box display="flex" justifyContent={{ base:'flex-start', md:'center' }} mb="0" mt={{ base:'-32', md:'-20' }} alignItems="flex-start">
        <NextImage
          src={chainId === '10' ? BeetsTokenInfoOpImage : BeetsTokenInfoImage}
          width="250px"
        />
      </Box>
      <Box mb="2">
        Bringing power back to the people: The VRTK token grants users the ability to influence the
        evolution of the protocol through decentralized governance; make sure your voice is heard
        and have your say in decisions that shape the future of Vertek.
      </Box>
      <Button
        display="flex" 
        variant="vertekdark"
        as="a"
        href="https://docs.beets.fi/beets/tokenomics"
        target="_blank"
      >
        VRTK tokenomics
      </Button>
    </Box>
  );
}
