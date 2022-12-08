import { NavbarLink } from '~/modules/nav/NavbarLink';
import { Box, Flex, Button, Icon } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useNetworkConfig } from '~/lib/global/useNetworkConfig';
import { IconButton, Collapse } from '@chakra-ui/react';
import { ChevronUpIcon } from '@chakra-ui/icons'; 
import { useState } from 'react';

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

        {networkConfig.stakeUrl && (
          <NavbarLink href={networkConfig.stakeUrl} text="Stake" mr="1" px="4" />
        )}
        {networkConfig.launchUrl && (
          <NavbarLink href={networkConfig.launchUrl} text="Launch" px="4" />
        )}
         {networkConfig.launchUrl && (
          <IconButton
          color='vertek.slatepurple.900'
          bgColor="vertek.neonpurple.500"
          aria-label='Click for more'
          icon={<ChevronUpIcon />}
          onClick={() => setIsOpen(!isOpen)}
          />
         )}
         
      </Flex>
       
    </Box>
  );
}
