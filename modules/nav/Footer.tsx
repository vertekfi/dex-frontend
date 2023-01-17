import { Box, Flex, Grid, GridItem, HStack, Link, Text } from '@chakra-ui/react';
import NextImage from 'next/image';
import DegenBand from '~/assets/images/degen-band.png';
import FooterImageOp from '~/assets/images/footer-OP.png';
import DiscordIcon from '~/assets/icons/discord.svg';
import TwitterIcon from '~/assets/icons/twitter.svg';
import MediumIcon from '~/assets/icons/medium.svg';
import GithubIcon from '~/assets/icons/github.svg';
import { FooterLink } from '~/modules/nav/FooterLink';
import { useNetworkConfig } from '~/lib/global/useNetworkConfig';
import { networkConfig } from '~/lib/config/network-config';
import { BeetsBalLogo } from '~/assets/logo/BeetsBalLogo';
import { BeetsLogo } from '~/assets/logo/BeetsLogo';

export function Footer() {
  const { chainId } = useNetworkConfig();

  return (
    <Box display="flex" justifyContent="center" alignItems="center" 
    width="full" px={{ base: '4', xl: '4' }} bgColor="vertek.slatepurple.900" pt=""         
    borderTopColor="vertek.slatepurple.600" borderWidth="1px" fontWeight="bold" 
    >
      <Flex minWidth="full" justifyContent="center" alignItems="center" >
        <Box flex="1" bgColor="">
          
          <Grid templateColumns={{ base: 'repeat(2, 1fr)', lg: '2' }} 
          gap="" pt="2" minWidth="full" alignItems="center" justifyContent="space-between" display="flex"
          >
            <GridItem textAlign="left" >
              <FooterLink href="/pools" linkType="internal">
                Invest
              </FooterLink>
              <FooterLink href="/swap" linkType="internal">
                Swap
              </FooterLink>
              <FooterLink href="/stake" linkType="internal">
                Stake
                <Text as="span" fontSize="2xs">
                  {' '}
                  (BSC)
                </Text>
              </FooterLink>
              {/* <FooterLink href="https://v1.beets.fi/#/launch" linkType="internal">
                Launch
                <Text as="span" fontSize="2xs">
                  {' '}
                  (BSC)
                </Text>
              </FooterLink> */}
               <FooterLink href="https://aalto-defi.notion.site/Vertek-Dex-d9958759f4424962a700bb2cf90559ea">Whitepaper</FooterLink>
            
            <FooterLink href="https://aalto-defi.notion.site/Tokenomics-199366c64eb64684b33684ffe6b6bf89">Tokenomics</FooterLink>
           
            </GridItem>
            <Box justifyContent="center" display="flex" flexDirection="column" mb="">{chainId === '10' ? 
              <BeetsBalLogo /> : <BeetsLogo />}
              <HStack spacing="6" mt="4">
            <Box>
              <Link
                href=" https://discord.gg/vertek-ames-aalto"
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
                href="https://github.com/beethovenxfi"
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
            <GridItem marginRight="2" textAlign="end" fontWeight="bold">
            <FooterLink href="https://aalto-defi.notion.site/Liquidity-Pool-Types-9ee6d04b7cab4f1b8352e0db492b7672">
              Weighted Pools
            </FooterLink>
            <FooterLink href="https://aalto-defi.notion.site/Liquidity-Pool-Types-9ee6d04b7cab4f1b8352e0db492b7672">
              Boosted Pools
            </FooterLink>
            <FooterLink href="https://snapshot.org/#/beets.eth">Snapshot</FooterLink>
              {/* <FooterLink href="https://info.beets.fi">Analytics</FooterLink> */}
              <FooterLink href="https://docs.beets.fi">Docs & Help</FooterLink>
              <FooterLink href={networkConfig.createPoolUrl}>Create a pool</FooterLink>
            </GridItem>
            {/* <GridItem>
              <FooterLink href="https://pro.olympusdao.finance/#/bond">Olympus Bonds</FooterLink>
              <FooterLink href="https://app.multichain.org/#/router">Multichain Bridge</FooterLink>
              <FooterLink href="https://app.allbridge.io/bridge?from=SOL&to=FTM&asset=SOL">
                AllBridge
              </FooterLink>
            </GridItem> */}
          </Grid>

          
        </Box>
      {/* <Box flex="1" justifyContent="flex-end" display={{ base: 'none', lg: 'flex' }} ml="12">
           <NextImage
            src={chainId === '10' ? FooterImageOp : DegenBand}
            width="472px"
            height="394.8px"
          /> 
  </Box> */}
      </Flex>
    </Box>
  );
}
