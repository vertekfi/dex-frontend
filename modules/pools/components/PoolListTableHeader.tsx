import { Flex, Grid, GridItem, Text } from '@chakra-ui/react';
import { usePoolList } from '../usePoolList';
import PoolListSortLink from '~/modules/pools/components/PoolListSortLink';
import { InfoButton } from '~/components/info-button/InfoButton';

export function PoolListTableHeader() {
  const { state, changeSort, showMyInvestments } = usePoolList();

  
  return (
    <>
      <Grid
        padding="4" 
        boxShadow="0px -1px 0px 0px #000"
        mt="4"
        borderTopRadius="16px" borderBottomRadius="0px"
        borderBottom="0px"
        borderColor="vertek.slate.600"
        alignItems={'center'}
        bgColor="vertek.slate.900"
        mb={{ base: '4', lg: '0' }}
        templateColumns={
          showMyInvestments
            ? { base: '1fr 150px 200px 200px', xl: '1fr 150px 200px 200px 250px' }
            : '1fr 200px 200px 250px'
        }
        gap="0"
        display={{ base: 'none', lg: 'grid' }}
      >
        <GridItem>
          <Text fontSize="md" fontWeight="semibold" color="vertek.slate.100">
            Pool details
          </Text>
        </GridItem>
        {showMyInvestments && (
          <GridItem textAlign="right">
            <Flex justifyContent="flex-end" color="vertek.slate.100">
              <Text fontSize="md" fontWeight="semibold">
                My balance
              </Text>
              <InfoButton infoText="To increase performance, your pool balances
               are cached for this list view. If you just made an investment or withdrawal, 
               it may take a few seconds for the change to be reflected here." />
            </Flex>
          </GridItem>
        )}
        <GridItem textAlign="right">
          {showMyInvestments ? (
            <Text fontSize="md" fontWeight="semibold" color="vertek.slate.100">
              TVL
            </Text>
          ) : (
            <PoolListSortLink
              title="TVL"
              orderDirection={state.orderBy === 'totalLiquidity' ? state.orderDirection : null}
              onClick={() => changeSort('totalLiquidity')}
            />
          )}
        </GridItem>
        <GridItem
          textAlign="right"
          display={showMyInvestments ? { base: 'block', lg: 'none', xl: 'block' } : 'block'}
        >
          {showMyInvestments ? (
            <Text fontSize="md" fontWeight="semibold" color="vertek.slate.100">
              Volume (24h)
            </Text>
          ) : (
            <PoolListSortLink
              title="Volume (24h)"
              orderDirection={state.orderBy === 'volume24h' ? state.orderDirection : null}
              onClick={() => changeSort('volume24h')}
            />
          )}
        </GridItem>
        <GridItem textAlign="right" pr="4" mr="2" >
          {showMyInvestments ? (
            <Text fontSize="md" fontWeight="semibold" color="vertek.slate.100">
              APR
            </Text>
          ) : (
            <PoolListSortLink
              title="APR"
              orderDirection={state.orderBy === 'apr' ? state.orderDirection : null}
              onClick={() => changeSort('apr')}
            />
          )}
        </GridItem>
      </Grid>
    </>
  );
}
