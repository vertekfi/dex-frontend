import { Box, HStack, Link, Text } from '@chakra-ui/react';
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

export function RegularFooter() {
  const { chainId } = useNetworkConfig();

  return (
    <Box
      as="footer"
      display={{ base: 'none', md: 'flex' }}
      flexDirection="row"
      minWidth="full"
      px={{ base: '4', xl: '4' }}
      bgColor="vertek.slatepurple.900"
      fontWeight="bold"
      justifyContent="space-between"
      paddingY="2"
    >
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        alignItems="flex-start"
        textAlign="left"
      >
        <FooterLink href="/pools" linkType="internal" textShadow="none">
          Invest
        </FooterLink>
        <FooterLink href="/swap" linkType="internal">
          Swap
        </FooterLink>
        <FooterLink href="/staking" linkType="internal">
          Stake
          <Text as="span" fontSize="2xs">
            {' '}
            (BSC)
          </Text>
        </FooterLink>
        <FooterLink href="/voting" linkType="internal">
          veVRTK
        </FooterLink>
      </Box>
      <Box
        display="flex"
        justifyContent="space-between"
        mb="6"
        alignItems="center"
        flexDirection="column"
        borderBottomWidth="0px"
        borderColor="vertek.neonpurple.500"
        paddingY="2"
        paddingX="2"
      >
        {chainId === '10' ? (
          <BeetsBalLogo mt="1" width="150px" />
        ) : (
          <BeetsLogo width="150px" mt="1" />
        )}
        <HStack spacing="10" mt="" display="flex" justifyContent="center" alignItems="center">
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
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        alignItems="flex-end"
        textAlign="left"
        textShadow="none"
      >
        <FooterLink href="https://aalto-defi.notion.site/Vertek-Dex-d9958759f4424962a700bb2cf90559ea">
          Whitepaper
        </FooterLink>
        <FooterLink href="https://aalto-defi.notion.site/Tokenomics-199366c64eb64684b33684ffe6b6bf89">
          Tokenomics
        </FooterLink>
        <FooterLink href="https://aalto-defi.notion.site/Liquidity-Pool-Types-9ee6d04b7cab4f1b8352e0db492b7672">
          Pool Types
        </FooterLink>

        <FooterLink href={networkConfig.createPoolUrl}>Create a pool</FooterLink>
      </Box>
    </Box>
  );
}
