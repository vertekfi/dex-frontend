import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Box, Button, HStack, Skeleton, Spinner, Text, Tooltip } from '@chakra-ui/react';
import Image from 'next/image';
import BeetsSmart from '~/assets/logo/verteknotext.svg';
import { useReactiveVar } from '@apollo/client';
import { txPendingVar } from '~/lib/util/useSubmitTransaction';
import { IconWallet } from '~/components/icons/IconWallet';
import { BarChart2 } from 'react-feather';
import { useUserData } from '~/lib/user/useUserData';
import { Image as ChakraImage } from '@chakra-ui/react';
import { numberFormatLargeUsdValue } from '~/lib/util/number-formats';
import { useEarlyLudwigNft } from '~/lib/global/useEarlyLudwigNft';

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
                  <Button
                    variant="vertekconnect2"
                    // _hover={{
                    //   bgGradient:'linear(90deg, #302B84 0%, #362BA8 50%, #4132D0 100%)', 
                    //   transform: 'scale(1.1)',
                    // }}
                    // _active={{
                    //   bgGradient:'linear(90deg, #302B84 0%, #362BA8 50%, #4132D0 100%)', 
                    // }}
                    onClick={openConnectModal}
                    type="button"
                  >
                    <IconWallet stroke="white" boxSize="20px" />
                    <Box ml="2" color="white">Connect Wallet</Box>
                  </Button>
                );
              }

              if (chain.unsupported) {
                return (
                  <Button
                    variant="primary"
                    backgroundColor="red.400"
                    _hover={{ backgroundColor: 'red.600' }}
                    onClick={openChainModal}
                    type="button"
                  >
                    Wrong network
                  </Button>
                );
              }

              return (
                <HStack spacing="0" position="relative">
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
                  {/* price goes here */}
                  <Button
                    variant="vertekconnect3"
                    
                    onClick={openAccountModal}
                    paddingX="none"
                    padding="3px"
                    color="white"
                    zIndex="100"
                    position="relative"
                  
                    _active={{
                      backgroundColor: 'none',
                    }}
                  >
                    <HStack width="full" height="full" spacing="1">
                      <HStack
                        justifyContent="center"
                        alignItems="center"
                        px="2"
                        height="40px"
                        rounded="10px"
                        width="full"
                      >
                        {txPending ? (
                          <Spinner color="white" />
                        ) : earlyLudwig ? (
                          <ChakraImage src={earlyLudwig} width="24px" height="24px" rounded="xl" />
                        ) : (
                          <Image src={BeetsSmart} width="24" alt="your-profile" />
                        )}
                        <Text
                          display={{ base: 'none', sm: 'inline' }}
                          fontSize={{ base: 'xs', lg: 'normal' }}
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
