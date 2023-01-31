import { Box, Text, Grid, GridItem } from '@chakra-ui/react';
import PoolListSortLink from '~/modules/pools/components/PoolListSortLink';
import { UserTokenBalancesProvider } from '~/lib/user/useUserTokenBalances';
import { PoolListProvider } from '~/modules/pools/usePoolList';

export function GaugeListTableHeader() {
  return (
    <PoolListProvider>
      <UserTokenBalancesProvider>
        <Box flexDirection="column" display="flex">
          <Grid
            textAlign="center"
            fontWeight="bold"
            borderTopRadius="16px"
            alignItems="center"
            justifyContent="center"
            bgColor="vertek.slate.900"
            borderBottom="2px"
            borderColor="vertek.slate.600"
            mb={{ base: '4', lg: '0' }}
            templateColumns={{
              base: '150px 1fr 150px 200px 200px',
              lg: '150px 1fr 200px 200px 200px',
            }}
            gap="0"
            pl="4"
            py="4"
            display={{ base: 'none', lg: 'grid' }}
          >
            <GridItem textAlign="left">
              <Text fontSize="md">Tokens</Text>
            </GridItem>

            <GridItem textAlign="left">
            <Text fontSize="md">Pool Name</Text>
            </GridItem>

            <GridItem textAlign="center">
            <Text fontSize="md">Next Period Votes</Text>
            </GridItem>

            <GridItem textAlign="center" justifyContent="center" alignItems="center">
            <Text fontSize="md">My Votes</Text>
            </GridItem>
            <GridItem textAlign="center">
            <Text fontSize="md">Vote</Text>
            </GridItem>
          </Grid>
        </Box>
      </UserTokenBalancesProvider>
    </PoolListProvider>
  );
}
