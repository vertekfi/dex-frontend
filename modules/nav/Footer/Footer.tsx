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
import { MobileFooter } from './MobileFooter';
import { RegularFooter } from './RegularFooter';

export function Footer() {
  const { chainId } = useNetworkConfig();

return (
  <>
<RegularFooter />
<MobileFooter/>
</>
  );
}
