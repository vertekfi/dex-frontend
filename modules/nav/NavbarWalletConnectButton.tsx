import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Box, Button, HStack, Spinner, Text } from '@chakra-ui/react';
import Image from 'next/image';
import VertekAlpha from '~/assets/svg/vertektransparent.svg';
import { useReactiveVar } from '@apollo/client';
import { txPendingVar } from '~/lib/util/useSubmitTransaction';
import { IconWallet } from '~/components/icons/IconWallet';
import { useUserData } from '~/lib/user/useUserData';
import { useEarlyLudwigNft } from '~/lib/global/useEarlyLudwigNft';
import { VertekWhiteNoText } from '~/assets/logo/Vertek/VertekWhiteNoText';

export default function NavbarWalletConnectButton() {
  const txPending = useReactiveVar(txPendingVar);
  const { loading, portfolioValueUSD } = useUserData();
  const { data: earlyLudwig } = useEarlyLudwigNft();

  return (
    <ConnectButton.Custom>
      {({ account, chain, openAccountModal, openChainModal, openConnectModal, mounted }) => {
        return (
          <Box>
            {(() => {
              if (!mounted || !account || !chain) {
                return (
                  <Button variant="verteklight" onClick={openConnectModal} type="button">
                    <IconWallet stroke="white" boxSize="20px" />
                    <Box ml="2" color="white">
                      Connect Wallet
                    </Box>
                  </Button>
                );
              }

              if (chain.unsupported) {
                return (
                  <Button
                    // variant="vertekdark"
                    backgroundColor="red.500"
                    _hover={{ backgroundColor: 'red.600' }}
                    onClick={openChainModal}
                    type="button"
                  >
                    Wrong network
                  </Button>
                );
              }

              return (
                <HStack spacing="1" position="relative">
                  {/* <HStack
                    bgColor="beets.base.500"
                    pr="3"
                    pl="2"
                    spacing="1"
                    height="40px"
                    mr="-1"
                    roundedTopLeft="md"
                    roundedBottomLeft="md"
                    display={{ base: 'none', lg: 'flex' }}
                  >
                    <BarChart2 size={18} />
                    {loading ? (
                      <Skeleton height="10px" width="41px" />
                    ) : (
                      <Box fontSize="sm" fontWeight="semibold">
                        <Tooltip label="Your portfolio value is cached to improve app performance. If you just made a deposit in may take up to a minute for the value to be reflected here.">
                          {numberFormatLargeUsdValue(portfolioValueUSD)}
                        </Tooltip>
                      </Box>
                    )}
                  </HStack> */}

                  <Button
                    variant="vertekdark"
                    marginLeft={{ base: '1', lg: '0' }}
                    onClick={openAccountModal}
                    paddingX="6"
                    color="white"
                    zIndex="100"
                    position="relative"
                    _active={{
                      backgroundColor: 'none',
                    }}
                  >
                    <HStack width="full" height="full" spacing="4">
                      <HStack
                        justifyContent="center"
                        alignItems="center"
                        px="4"
                        gap="2"
                        height="40px"
                        rounded="10px"
                        width="full"
                      >
                        {txPending ? (
                          <Spinner color="white" />
                        ) : earlyLudwig ? (
                          <Image src={VertekAlpha} width="20px" height="20px" />
                        ) : (
                          <Box borderRadius="full" overflow="hidden" width="20px" height="20px">
                            <Image
                              src={'https://avatar.tobi.sh/' + account.address + '?size=20'}
                              width="100%"
                              height="100%"
                              alt="your-profile"
                            />
                          </Box>
                        )}
                        <Text
                          display={{ base: 'none', sm: 'inline' }}
                          fontSize={{ base: 'xs', lg: '14px' }}
                        >
                          {account.displayName}
                        </Text>
                      </HStack>
                    </HStack>
                  </Button>
                </HStack>
              );
            })()}
          </Box>
        );
      }}
    </ConnectButton.Custom>
  );
}
