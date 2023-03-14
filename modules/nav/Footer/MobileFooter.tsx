import { Box, Flex, HStack, Link, Text } from '@chakra-ui/react';
import NextImage from 'next/image';
import DiscordIcon from '~/assets/icons/discord.svg';
import TwitterIcon from '~/assets/icons/twitter.svg';
import MediumIcon from '~/assets/icons/medium.svg';
import GithubIcon from '~/assets/icons/github.svg';
import { FooterLink } from '~/modules/nav/Footer/FooterLink';
import { useNetworkConfig } from '~/lib/global/useNetworkConfig';
import { networkConfig } from '~/lib/config/network-config';
import { BeetsBalLogo } from '~/assets/logo/BeetsBalLogo';
import { BeetsLogo } from '~/assets/logo/BeetsLogo';

export function MobileFooter() {
const { chainId } = useNetworkConfig();
return (

<Box 
as="footer"
display={{ base:'flex', md:'none' }} 
flexDirection="column" 
minWidth="full" px={{ base: '4', xl: '4' }} 
bgColor="vertek.slatepurple.900"   
fontWeight="bold" 
justifyContent="space-between"
alignItems="center" 
paddingY="2"
gap="4"
>
    {chainId === '10' ? 
    <BeetsBalLogo mt="0" width="150px"  /> : <BeetsLogo width="150px" mt="0" />}
    <HStack 
    spacing="12" 
    mt="" 
    display="flex" 
    justifyContent="space-between" 
    alignItems="center" 
    >
    <Box>
        <Link
        href=" https://discord.gg/verteklabs"
        target="_blank"
        _active={{ boxShadow: 'none' }}
        >
        <NextImage src={DiscordIcon} />
        </Link>
    </Box>
    <Box>
        <Link
        href=" https://twitter.com/Vertek_Dex"
        target="_blank"
        _active={{ boxShadow: 'none' }}
        >
        <NextImage src={TwitterIcon} />
        </Link>
    </Box>
    <Box>
        <Link
        href="https://github.com/vertekfi/vertek-lib"
        target="_blank"
        _active={{ boxShadow: 'none' }}
        >
        <NextImage src={GithubIcon} />
        </Link>
    </Box>
    <Box>
        <Link
        href="https://medium.com/@verteklabs"
        target="_blank"
        _active={{ boxShadow: 'none' }}
        >
        <NextImage src={MediumIcon} />
        </Link>
    </Box>
    </HStack>
</Box>
); 
}