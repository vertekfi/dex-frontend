import * as React from 'react';
import {
  Box,
  Button,
  Flex,
  HStack,
  Image,
  Skeleton,
  Text,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
} from '@chakra-ui/react';
import NavbarWalletConnectButton from './NavbarWalletConnectButton';
import { useGetProtocolDataQuery } from '~/apollo/generated/graphql-codegen-generated';
import { NavbarLink } from '~/modules/nav/NavbarLink';
import numeral from 'numeral';
import { useRouter } from 'next/router';
import { MotionValue } from 'framer-motion';
import { useUserAccount } from '~/lib/user/useUserAccount';
import { FadeInOutBox } from '~/components/animation/FadeInOutBox';
import { NextLink } from '~/components/link/NextLink';
import { useNetworkConfig } from '~/lib/global/useNetworkConfig';
import { NetworkSelectorPopover } from '~/modules/nav/NetworkSelectorPopover';
import { BeetsLogo } from '~/assets/logo/BeetsLogo';
import { VertekWhiteNoText } from '~/assets/logo/Vertek/VertekWhiteNoText';

interface Props {
  scrollY: MotionValue<number>;
}

export function Navbar({ scrollY }: Props) {
  const router = useRouter();
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
                text="Volta"
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
              {loading && !beetsPrice ? (
                <Skeleton height="16px" width="54px" />
              ) : (
                <Box
                  borderWidth="0px" 
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  mr={{ base: 'none', md: '0' }}
                  ml="3"
                >
                  <Popover trigger="hover" >
                    <PopoverTrigger>
                      <Box display="flex" cursor="pointer"  
                      height="100%" justifyContent="center" 
                      padding="2" 
                      alignItems="center">
                        <VertekWhiteNoText
                          width={{ base: '40px', md: '70px' }}
                          mr={{ base:'-2', md:'-6'}}
                        />
                        <Text
                          mr={{ base: '3', md: '6' }}
                          fontWeight="bold"
                          textAlign="left"
                          color="white"
                          fontSize={{ base: 'sm', lg: 'md' }}
                        >
                          {numeral(beetsPrice).format('$0.00[00]')}
                        </Text>
                      </Box>
                    </PopoverTrigger>
                    <PopoverContent  bgColor="vertek.slatepurple.900" backdropFilter="blur(12px)" >
                      <PopoverHeader >
                        <Text color="#ccc" align="center" fontWeight="bold" fontSize="20px">
                          Vertek Exchange Metrics
                        </Text>
                      </PopoverHeader>
                      <PopoverArrow />

                      <PopoverBody>
                        <Box>
                          <Flex gap="2" justifyContent="space-evenly">
                            <Box
                              backdropFilter="blur(12px)"
                              borderColor="#4A4AF6"
                              borderLeftWidth="1px"
                              borderRightWidth="1px"
                              borderTopWidth="1px"
                              borderBottomWidth="1px"
                              borderRadius="8px"
                              marginY="0.25rem"
                              paddingY="1.5rem" paddingX="0.25rem"
                              alignItems="center" justifyContent="center" display="flex" flexDirection="column" 
                              width="50%"
                              _hover={{boxShadow:"0 0 10px #5BC0F8, 0 0 20px #4A4AF6", backgroundColor:"rgba(0, 0, 0, 0.2)"}}
                            >
                              <Text color="#ccc" align="center" fontWeight="bold" fontSize="1.1rem">
                                Price of VRTK
                              </Text>
                              <Text
                                fontWeight="semibold"
                                color="#ccc"
                                align="center"
                                fontSize={{ base: 'sm', lg: '0.9rem' }}
                              >
                                {numeral(beetsPrice).format('$0.00[00]')}
                              </Text>
                            </Box>

                            <Box
                              backdropFilter="blur(12px)"
                              borderColor="#4A4AF6"
                              borderLeftWidth="1px"
                              borderRightWidth="1px"
                              marginY="0.25rem"
                              borderTopWidth="1px"
                              borderBottomWidth="1px"
                              borderRadius="8px"
                              paddingY="1.5rem" paddingX="0.25rem"
                              alignItems="center" justifyContent="center" display="flex" flexDirection="column" 
                              width="50%"
                              _hover={{boxShadow:"0 0 10px #5BC0F8, 0 0 20px #4A4AF6", backgroundColor:"rgba(0, 0, 0, 0.2)"}}
                            >
                              <Text color="#ccc" align="center" fontWeight="bold" fontSize="1.1rem">
                                TVL
                              </Text>
                              <Text
                                fontWeight="semibold"
                                color="#ccc"
                                align="center"
                                fontSize={{ base: 'sm', lg: '0.9rem' }}
                              >
                                {numeral(data?.protocolData.totalLiquidity || '').format('$0.00a')}
                              </Text>
                            </Box>
                          </Flex>

                          <Flex gap="2" justifyContent="space-evenly">
                            <Box
                              backdropFilter="blur(12px)"
                              borderColor="#4A4AF6"
                              borderLeftWidth="1px"
                              borderRightWidth="1px"
                              borderTopWidth="1px"
                              borderBottomWidth="1px"
                              borderRadius="8px"
                              marginY="0.25rem"
                              paddingY="1.5rem" paddingX="0.25rem"
                              alignItems="center" justifyContent="center" display="flex" flexDirection="column" 
                              width="50%"
                              _hover={{boxShadow:"0 0 10px #5BC0F8, 0 0 20px #4A4AF6", backgroundColor:"rgba(0, 0, 0, 0.2)"}}
                            >
                              <Text color="#ccc" align="center" fontWeight="bold" fontSize="1.1rem">

                                Fees (24h)
                              </Text>
                              <Text
                                fontWeight="semibold"
                                color="#ccc"
                                align="center"
                                fontSize={{ base: 'sm', lg: '0.9rem' }}
                              >
                                {numeral(data?.protocolData.swapFee24h || '').format('$0.00a')}
                              </Text>
                            </Box>

                            <Box
                              backdropFilter="blur(12px)"
                              borderColor="#4A4AF6"
                              borderLeftWidth="1px"
                              borderRightWidth="1px"
                              borderTopWidth="1px"
                              borderBottomWidth="1px"
                              borderRadius="8px"
                              marginY="0.25rem"
                              paddingY="1.5rem" paddingX="0.25rem"
                              alignItems="center" justifyContent="center" display="flex" flexDirection="column" 
                              width="50%"
                              _hover={{boxShadow:"0 0 10px #5BC0F8, 0 0 20px #4A4AF6", backgroundColor:"rgba(0, 0, 0, 0.2)"}}
                            >
                              <Text color="#ccc" align="center" fontWeight="bold" fontSize="1.1rem">
                                Volume (24h)
                              </Text>
                              <Text
                                fontWeight="semibold"
                                color="#ccc"
                                align="center"
                                fontSize={{ base: 'sm', lg: '0.9rem' }}
                              >
                                {numeral(data?.protocolData.swapVolume24h || '').format('$0.00a')}
                              </Text>
                            </Box>
                          </Flex>
                        </Box>
                      </PopoverBody>
                    </PopoverContent>
                  </Popover>
                </Box>
              )}
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
