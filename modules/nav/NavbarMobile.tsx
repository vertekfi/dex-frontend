import { NavbarLink } from '~/modules/nav/NavbarLink';
import { Box, Flex, Button, Text, Icon, Grid } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useNetworkConfig } from '~/lib/global/useNetworkConfig';
import { IconButton, Collapse } from '@chakra-ui/react';
import { ChevronUpIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import { Modal, ModalContent, ModalBody, ModalFooter } from '@chakra-ui/react';
import { BeetsLogo } from '~/assets/logo/BeetsLogo';

export function NavbarMobile() {
  const router = useRouter();
  const networkConfig = useNetworkConfig();
  const [isOpen, setIsOpen] = useState(false);


return (
<Box
  position="sticky"
  bottom="0"
  height="54px"
  flexDirection="column"
  alignItems="center"
  justifyContent="center"
  borderTopColor="vertek.slatepurple.600"
  borderTopWidth="2px"
  bg=
      {`radial-gradient(circle at center, 
          #4132D0 0%, 
          rgba(0,0,0, 1) 70% )`}
      
  shadow="lg"
  display={{ base: 'flex', md: 'none' }}
  zIndex="999"
>
  <Flex alignItems="center">
   
  <NavbarLink
    href={'/'}
    selected={router.pathname === '/'}
    text="Home"
    px="2"
  />
  <NavbarLink
    href={'/pools'}
    selected={router.asPath.startsWith('/pool')}
    text="Earn"
    px="2"
  />
  <NavbarLink href={'/swap'} selected={router.asPath === '/swap'} text="Swap"     px="2"
 />
  <NavbarLink href={'/staking'} selected={router.asPath === '/staking'} text="Stake"     px="2"
 />
  <IconButton
    px="2"
    ml="4"
    color='white'
    bgColor="transparent"
    borderWidth="0.5px" 
    borderColor="vertek.neonpurple.500"
    backdropBlur="12px"
    aria-label='Click for more'
    icon={<ChevronUpIcon />}
    onClick={() => setIsOpen(!isOpen)}
    />
  <Box display="flex" padding="4px" >
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} >
      <ModalContent
        width="90vw"
        boxShadow="0 0 10px #5BC0F8, 0 0 20px #4A4AF6"
        borderRadius="25px"
        bg=
      {`radial-gradient(circle at center, 
          #4132D0 0%, 
          rgba(0,0,0, 1) 70% )`}
      
        position="absolute"
        bottom="0%"
      >
        <ModalBody>
          <Box display="flex" justifyContent="center" my="4">
              <BeetsLogo width="120px"  />
          </Box>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="space-between"
            marginX="2"
            borderRadius="12px"
            flexDirection="column"
          >
              <NavbarLink href={'/voting'} selected={router.asPath === '/voting'} mt="2" py="2px" text="Volta"  />
              <NavbarLink href={'/claim'} selected={router.asPath === '/claim'} text="Claim"  py="2px"/>
              <NavbarLink href={'/nft'} selected={router.asPath === '/nft'} text="NFT Marketplace" py="2px" />
              <NavbarLink href={'/perpetuals'} selected={router.asPath === '/perpetuals'} text="Perpetuals"  py="2px" />
              <NavbarLink href={'/bridge'} selected={router.asPath === '/bridge'}  py="2px" text="Bridge"  />
          </Box>

          
          <Box display="flex" alignItems="flex-end" justifyContent="center" mb="-1" mt="2">
              <Button variant="vertekdark" width="100%" onClick={() => setIsOpen(false)}>
                Close
              </Button>
          </Box>
        </ModalBody>
        <ModalFooter>
          
        </ModalFooter>
      </ModalContent>
    </Modal>
  </Box>
    {/* {networkConfig.stakeUrl && (
      <NavbarLink href={networkConfig.stakeUrl} text="Stake" mr="1" px="4" />
    )} */}
    {/* {networkConfig.launchUrl && (
      <NavbarLink href={networkConfig.launchUrl} text="Launch" px="4" />
    )} */}


  </Flex>

</Box>
  );
}
