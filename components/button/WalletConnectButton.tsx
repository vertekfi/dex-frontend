import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Box, Button } from '@chakra-ui/react';
import { useUserAccount } from '~/lib/user/useUserAccount';
import { ButtonProps } from '@chakra-ui/button';
import { IconWallet } from '~/components/icons/IconWallet';


export function WalletConnectButton(props: Omit<ButtonProps, 'children' | 'onClick'>) {
    const { isConnected } = useUserAccount();

    if (isConnected) {
        return null;
    }

    return (
        <ConnectButton.Custom>
            {({ account, chain, openConnectModal, mounted }) => {
                return (
                    <Box>
                        {(() => {
                            if (!mounted || !account || !chain) {
                                return (
                                    <Button variant="verteklight" 
                                    onClick={openConnectModal} {...props}>
                                        <Box ml="2" color="white"  >
                                            Connect Wallet
                                        </Box>
                                        <IconWallet ml="2" stroke="white" boxSize="24px"  />
                                    </Button>
                                );
                            }

                            return null;
                        })()}
                    </Box>
                );
            }}
        </ConnectButton.Custom>
    );
}
