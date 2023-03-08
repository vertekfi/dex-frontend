import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Box, Button, HStack, Spinner, Text } from '@chakra-ui/react';
import Image from 'next/image';
import VertekAlpha from '~/assets/svg/vertektransparent.svg';
import { useReactiveVar } from '@apollo/client';
import { txPendingVar } from '~/lib/util/useSubmitTransaction';
import { IconWallet } from '~/components/icons/IconWallet';
import { useEarlyLudwigNft } from '~/lib/global/useEarlyLudwigNft';
import { useEffect } from 'react';

export default function NavbarWalletConnectButton() {
  const txPending = useReactiveVar(txPendingVar);
  const { data: earlyLudwig } = useEarlyLudwigNft();

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (txPending) {
      timeoutId = setTimeout(() => {
        // Clear the txPending state after 5 seconds
        txPendingVar(false);
      }, 5000);
    }

    return () => {
      // Clear the timeout if the component unmounts or the txPending state changes
      clearTimeout(timeoutId);
    };
  }, [txPending]);

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
                    width="90%"
                  >
                    Wrong network
                  </Button>
                );
              }
              return (
                <HStack spacing="1" position="relative">
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
