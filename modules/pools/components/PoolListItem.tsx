import { GqlPoolMinimalFragment } from '~/apollo/generated/graphql-codegen-generated';
import { Box, Grid, GridItem, GridItemProps, Text } from '@chakra-ui/react';
import Link from 'next/link';
import numeral from 'numeral';
import AprTooltip from '~/components/apr-tooltip/AprTooltip';
import { BoxProps } from '@chakra-ui/layout';
import { AmountHumanReadable } from '~/lib/services/token/token-types';
import { numberFormatUSDValue } from '~/lib/util/number-formats';
import {
  TokenAvatarSetInList,
  TokenAvatarSetInListTokenData,
} from '~/components/token/TokenAvatarSetInList';
import { memo } from 'react';

interface Props extends BoxProps {
  pool: GqlPoolMinimalFragment;
  userBalance?: AmountHumanReadable;
  showUserBalance: boolean;
  tokens: TokenAvatarSetInListTokenData[];
  hasUnstakedBpt?: boolean;
}

const MemoizedTokenAvatarSetInList = memo(TokenAvatarSetInList);
const MemoizedAprTooltip = memo(AprTooltip);

export function PoolListItem({
  pool,
  userBalance,
  showUserBalance,
  tokens,
  hasUnstakedBpt,
  ...rest
}: Props) {
  return (
    <Box
      mb={{ base: '12', md: '0' }}
      borderRadius={{ base: '16px', md: 'none' }}
      padding={{ base: '2', md: 'none' }}
      borderWidth="1px"
      borderColor="gray.200"
      bg={{ base: 'vertek.slate.900', md: 'transparent' }}
      boxShadow={{ base: '0 0 5px #5BC0F8, 0 0 10px #4A4AF6', md: 'none' }}
    >
      <Box
        bg={{ base: 'vertek.slatepurple.900', md: 'transparent' }}
        borderRadius={{ base: '16px', md: 'none' }}
        boxShadow={{ base: '0px 24px 12px 1px #000', md: 'none' }}
      >
        <Link href={`/pool/${pool.id}`} passHref>
          <a>
            <Grid
              pl="4"
              py="4"
              templateColumns={{
                base: '1fr',
                lg: showUserBalance
                  ? '90px 1fr 150px 200px 0px 200px'
                  : '90px 1fr 200px 200px 200px',
                xl: showUserBalance
                  ? '90px 1fr 150px 200px 200px 200px'
                  : '90px 1fr 200px 200px 200px',
              }}
              gap={{ base: '4', md: '0' }}
              templateAreas={
                showUserBalance
                  ? {
                      base: `"icons icons"
            "name name"
            "userBalance userBalance"
            "apr tvl"
            "fees volume"
            `,
                      lg: `"icons name userBalance tvl volume apr"`,
                    }
                  : {
                      base: `
            "icons icons"
            "name name"
            "apr tvl"
            "fees volume" `,
                      lg: `"icons name tvl volume apr"`,
                    }
              }
            >
              <GridItem area="icons">
                <MemoizedTokenAvatarSetInList
                  imageSize={25}
                  width={92}
                  tokens={tokens}
                  //renderPopover={false}
                />
              </GridItem>

              <GridItem area="name" mb={{ base: '4', lg: '0' }}>
                <Text
                  color="white"
                  fontSize={{ base: 'xl', lg: 'md' }}
                  fontWeight={{ base: 'bold', lg: 'normal' }}
                >
                  {pool.name}
                </Text>
              </GridItem>

              {showUserBalance && (
                <GridItem
                  area="userBalance"
                  color="white"
                  fontWeight="bold"
                  textAlign={{ base: 'left', lg: 'right' }}
                  mb={{ base: '4', lg: '0' }}
                >
                  <MobileLabel text="My balance" />
                  <Text
                    fontSize={{ base: '3xl', lg: 'md' }}
                    fontWeight={{ base: 'bold', lg: 'normal' }}
                  >
                    {numberFormatUSDValue(userBalance || '0')}
                  </Text>
                </GridItem>
              )}
              <StatGridItem area="tvl">
                <Text
                  marginRight="1rem"
                  fontSize="xs"
                  textAlign="right"
                  color="gray.200"
                  display={{ base: 'block', lg: 'none' }}
                >
                  TVL
                </Text>
                <Text
                  textAlign="right"
                  marginRight="1rem"
                  fontSize={{ base: 'xl', lg: 'md' }}
                  color="white"
                >
                  {numeral(pool.dynamicData.totalLiquidity24hAgo).format('$0,0')}
                </Text>
              </StatGridItem>
              <StatGridItem
                area="volume"
                display={showUserBalance ? { base: 'block', lg: 'none', xl: 'block' } : 'block'}
              >
                <Text
                  marginRight="1rem"
                  fontSize="xs"
                  textAlign="right"
                  color="gray.200"
                  display={{ base: 'block', lg: 'none' }}
                >
                  VOLUME (24H)
                </Text>

                <Text
                  marginRight="1rem"
                  textAlign="right"
                  fontSize={{ base: 'xl', lg: 'md' }}
                  color="white"
                >
                  {numeral(pool.dynamicData.volume24h).format('$0,0')}
                </Text>
              </StatGridItem>

              <StatGridItem
                area="apr"
                display={{ base: 'block', lg: 'flex' }}
                justifyContent={{ base: 'flex-start', lg: 'end' }}
                mr="4"
              >
                <MobileLabel text="APR" />
                <MemoizedAprTooltip
                  data={pool.dynamicData.apr}
                  textProps={{ fontWeight: 'normal', fontSize: { base: 'xl', lg: 'md' } }}
                />
              </StatGridItem>
              <StatGridItem area="fees" display={{ base: 'block', lg: 'none' }}>
                <MobileLabel text="FEES (24H)" />
                <Text fontSize={{ base: 'xl', lg: 'md' }}>
                  {numeral(pool.dynamicData.fees24h).format('$0,0')}
                </Text>
              </StatGridItem>
            </Grid>
          </a>
        </Link>
      </Box>
    </Box>
  );
}

function MobileLabel({ text }: { text: string }) {
  return (
    <Text fontSize="xs" textAlign="left" color="gray.200" display={{ base: 'block', lg: 'none' }}>
      {text}
    </Text>
  );
}

function StatGridItem(props: GridItemProps) {
  return (
    <GridItem
      area="fees"
      textAlign={{ base: 'left', lg: 'right' }}
      mb={{ base: '4', lg: '0' }}
      {...props}
    />
  );
}
