import * as React from 'react';
import { Box, Button, Flex, HStack, Image, Skeleton, Text } from '@chakra-ui/react';
import NavbarWalletConnectButton from './NavbarWalletConnectButton';
import { useGetProtocolDataQuery } from '~/apollo/generated/graphql-codegen-generated';
import { NavbarLink } from '~/modules/nav/NavbarLink';
import numeral from 'numeral';
import { useRouter } from 'next/router';
import { MotionValue, useTransform } from 'framer-motion';
import { useUserAccount } from '~/lib/user/useUserAccount';
import { FadeInOutBox } from '~/components/animation/FadeInOutBox';
import { NextLink } from '~/components/link/NextLink';
import { useNetworkConfig } from '~/lib/global/useNetworkConfig';
import { NetworkSelectorPopover } from '~/modules/nav/NetworkSelectorPopover';
import { BeetsLogo } from '~/assets/logo/BeetsLogo';

interface Props {
  scrollY: MotionValue<number>;
}

export function Navbar({ scrollY }: Props) {
  const { chainId } = useNetworkConfig();
  const router = useRouter();
  const opacity = useTransform(scrollY, [0, 32], [0, 1]);
  const { isConnected } = useUserAccount();
  const networkConfig = useNetworkConfig();
  const { data, loading } = useGetProtocolDataQuery({ fetchPolicy: 'cache-first' });
  const beetsPrice = data?.beetsPrice;

  return (
    <>
      <Box
        width="full"
        position="sticky"
        top="0"
        zIndex="3"
        height="92px"
        display="flex"
        alignItems="space-between"
        flexDirection="column"
        justifyContent="center"
        borderBottomColor="vertek.neonpurple.500"
        backdropFilter="blur(16px)"
        borderBottomWidth="3px"
        // padding="12px, 40px, 0px, 40px"
      >
        <Flex px={{ base: '2', lg: '2' }} py="0" alignItems={{ base: 'center', lg: 'center' }}>
          <Flex
            alignItems="center"
            mr={{ base: '0', lg: '2' }}
            zIndex="2"
            cursor="pointer"
            bgColor="transparent"
          >
            <NextLink href="/" chakraProps={{ _focus: { boxShadow: 'none' } }}>
              <Box mb="">
                <BeetsLogo width={{ base: '120px', lg: '120px', xl: '150px' }} />
              </Box>
            </NextLink>
          </Flex>

          <Box flex="1" zIndex="2" margin="6px">
            <Flex alignItems="center" display={{ base: 'none', lg: 'flex' }}>
              <NavbarLink
                href={'/'}
                selected={router.asPath.endsWith('/')}
                text="Home"
                mr="3"
              ></NavbarLink>
              <NavbarLink
                href={'/pools'}
                selected={router.asPath.startsWith('/pool')}
                text="Earn"
                mr="3"
              ></NavbarLink>
              <NavbarLink href={'/swap'} selected={router.asPath === '/swap'} text="Swap" mr="3" />
              {/* {networkConfig.stakeUrl && (
                <NavbarLink href={networkConfig.stakeUrl} text="Stake" mr={5} />
              )} */}
              <NavbarLink
                href={'/staking'}
                selected={router.asPath === '/staking'}
                text="Stake"
                mr="3"
              />
              <NavbarLink
                href={'/voting'}
                selected={router.asPath === '/voting'}
                text="Vote"
                mr="3"
              />
              <NavbarLink
                href={'/claim'}
                selected={router.asPath === '/claim'}
                text="Claim"
                mr="3"
              />
              <NavbarLink
                href={'/nft'}
                selected={router.asPath === '/nft'}
                text="NFT Marketplace"
                textAlign="center"
                mr="3"
              />
              <NavbarLink
                href={'/perpetuals'}
                selected={router.asPath === '/perpetuals'}
                text="Perpetuals"
                mr="3"
              />
              <NavbarLink
                href={'/bridge'}
                selected={router.asPath === '/bridge'}
                text="Bridge"
                mr="5"
              />
              {/* {networkConfig.launchUrl && (
                <NavbarLink href={networkConfig.launchUrl} text="Claim" mr={5} />
              )} */}

              {/*<NavbarAdditionalLinksMenu />*/}
            </Flex>
          </Box>
          <FadeInOutBox mr={{ base: '2', lg: '2' }} isVisible={isConnected}>
            <HStack spacing={{ base: '2', lg: '4' }}>
              <NetworkSelectorPopover>
                <Button
                  bgColor="transparent"
                  width="40px"
                  height="40px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  flexDirection="column"
                  _hover={{ transform: 'scale(1.1)' }}
                  px="0"
                >
                  <Image
                    mr={{ base: '2', lg: '4' }}
                    width="24px"
                    height="24px"
                    src={networkConfig.eth.iconUrl}
                  />
                </Button>
              </NetworkSelectorPopover>
              {loading && !beetsPrice ? (
                <Skeleton height="16px" width="54px" />
              ) : (
                // <Box ml="1rem" display="flex" flexDirection="row"  alignItems="center" >
                //   <Box display="flex" justifyContent="flex-end" ml="4" mr="-1rem">
                <Text
                  ml={{ base: '0', lg: '3' }}
                  textAlign="right"
                  fontWeight="bold"
                  color="white"
                  fontSize={{ base: 'sm', lg: 'md' }}
                >
                  {numeral(beetsPrice).format('$0.00[00]')}
                </Text>
              )}
              {/* <NavbarPendingRewards /> */}
              {/* <NavbarAlerts />
                  <NavbarPortfolioDrawer /> */}
            </HStack>
          </FadeInOutBox>
          <NavbarWalletConnectButton />
        </Flex>
      </Box>
    </>
  );
}
