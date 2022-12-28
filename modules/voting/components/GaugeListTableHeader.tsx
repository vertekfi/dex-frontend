import { Box, Text, Flex, Grid, GridItem } from '@chakra-ui/react';
import PoolListSortLink from '~/modules/pools/components/PoolListSortLink';
import { UserTokenBalancesProvider } from '~/lib/user/useUserTokenBalances';
import { PoolListProvider } from '~/modules/pools/usePoolList';

export function GaugeListTableHeader(){
  return (
    <PoolListProvider>
      <UserTokenBalancesProvider>
        <Box mt={3} flexDirection="column" display="flex">
        <Grid
        pl="4"
        py="3"
        borderTopLeftRadius="md"
        borderTopRightRadius="md"
        alignItems={'center'}
        bgColor="vertek.slate.900"
        borderBottom="2px"
        borderColor="vertek.slate.600"
        mb={{ base: '4', lg: '0' }}
        templateColumns={
          { base: '150px 1fr 150px 200px 200px', lg: '150px 1fr 150px 150px 150px' }
        }
        gap="0"
        display={{ base: 'none', lg: 'grid' }}
      >
        
        <GridItem  textAlign="left">
          <Text>
            Icons
         </Text>
        </GridItem>
        <GridItem  textAlign="left">
          <PoolListSortLink
            title="Composition"
          />
        </GridItem>
        <GridItem
          textAlign="right"
          display="block"
        >
          <PoolListSortLink
            title="Next Period Votes"
          />
        </GridItem>
        <GridItem textAlign="right" pr="4">
          <PoolListSortLink
            title="My Votes"
          />
        </GridItem>
        <GridItem textAlign="right" pr="4">
          <PoolListSortLink
            title="Vote"
          />
        </GridItem>
      </Grid>
        </Box>
      </UserTokenBalancesProvider>
    </PoolListProvider>
  );
}
