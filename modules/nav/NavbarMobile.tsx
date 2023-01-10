import { NavbarLink } from '~/modules/nav/NavbarLink';
import { Box, Flex, Button, Icon } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useNetworkConfig } from '~/lib/global/useNetworkConfig';
import { IconButton, Collapse } from '@chakra-ui/react';
import { ChevronUpIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import { Modal, ModalContent, ModalBody, ModalFooter } from '@chakra-ui/react';

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
      bgGradient='linear(90deg, vertek.slatepurple.900 0%, vertek.slatepurple.700 100% )'
      shadow="lg"
      display={{ base: 'flex', md: 'none' }}
      zIndex="999"
    >
      <Flex alignItems="center">
        <NavbarLink
          href={'/pools'}
          selected={router.asPath.startsWith('/pool')}
          text="Earn"
          mr="1"
          px="4"
        />
        <NavbarLink href={'/swap'} selected={router.asPath === '/swap'} text="Swap" mr="1" px="4" />
        <NavbarLink href={'/staking'} selected={router.asPath === '/staking'} text="Stake" mr="1" px="4" />

        <IconButton
          mr="1" px="4"
          color='vertek.slatepurple.900'
          bgColor="vertek.neonpurple.500"
          aria-label='Click for more'
          icon={<ChevronUpIcon />}
          onClick={() => setIsOpen(!isOpen)}
        />
        {/* Look at a transparent with blur?  */}
        <Box display="flex" padding="8px" width="100%">
          <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} >
            <ModalContent
              width="100vw"
              boxShadow="0 0 10px #5BC0F8, 0 0 20px #4A4AF6"
              borderRadius="25px"
              bgGradient='linear(90deg, vertek.slatepurple.900 0%, vertek.slatepurple.700 100% )'
              position="absolute"
              bottom="5%"
            >
          
              <ModalBody mt="4" alignItems="flex-start" flexDirection="column" display="flex">
                <NavbarLink href={'/voting'} selected={router.asPath === '/voting'} text="Vote" mr="1" px="4" />
                <NavbarLink href={'/claim'} selected={router.asPath === '/claim'} text="Claim" mr="1" px="4" />
                <NavbarLink href={'/nft'} selected={router.asPath === '/nft'} text="NFT Marketplace" mr="1" px="4" />

              </ModalBody>
              <ModalFooter>
                <Button variant="vertekdark" mr={3} onClick={() => setIsOpen(false)}>
                  Close
                </Button>
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
