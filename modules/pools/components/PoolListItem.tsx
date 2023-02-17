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
}: Props) {
  return (
    <Box
      mb={{ base: '12', md: '0' }}
      borderRadius={{ base: '16px', md: 'none' }}
      padding={{ base: '2', md: 'none' }}
      borderTopWidth="1px"
      borderTopColor={{ base: 'none', md: 'gray.200'}}
      borderLeftWidth={{ base: '0px', md: '1px'}}
      borderRightWidth={{ base: '0px', md: '1px'}}
      borderLeftColor="vertek.slate.600"
      borderRightColor="vertek.slate.600"

      height={{ base: '340px', md: 'auto' }}

      bg={{ base: 'transparent', md: 'transparent' }}
    >
      <Box
        bg={{ base: 'transparent', md: 'transparent' }}
        borderRadius={{ base: '18px', md: 'none' }}
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
                  : '90px 1fr 200px 200px 250px',
                xl: showUserBalance
                  ? '90px 1fr 150px 200px 200px 200px'
                  : '90px 1fr 200px 200px 250px',
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
                <MemoizedTokenAvatarSetInList imageSize={30} width={100} tokens={tokens} />
              </GridItem>

              <GridItem area="name" mb={{ base: '3', lg: '0' }}>
                <Text
                  color="white"
                  fontSize={{ base: '1.6rem', lg: 'md' }}
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
                  fontSize="md"
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
                  {numeral(pool.dynamicData.totalLiquidity).format('$0,0')}
                </Text>
              </StatGridItem>
              <StatGridItem
                area="volume"
                display={showUserBalance ? { base: 'block', lg: 'none', xl: 'block' } : 'block'}
              >
                <Text
                  marginRight="1rem"
                  fontSize="md"
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
                mb="0.5rem"
              >
                <MobileLabel text="APR" />
                <MemoizedAprTooltip
                  placement="left"
                  poolId={pool.id}
                  data={pool.dynamicData.apr}
                  textProps={{ fontWeight: 'normal', fontSize: { base: 'md', lg: 'md' } }}
                />
              </StatGridItem>
              <StatGridItem area="fees" 
              display={{ base: 'block', lg: 'none' }} 
              mb={{ base: '1rem', md: 'auto' }}>
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
    <Text fontSize="md" textAlign="left" color="gray.200" display={{ base: 'block', lg: 'none' }}>
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
