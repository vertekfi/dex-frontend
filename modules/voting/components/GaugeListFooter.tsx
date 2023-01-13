import { Box, Text, Flex, Grid, GridItem } from '@chakra-ui/react';
import PoolListSortLink from '~/modules/pools/components/PoolListSortLink';
import { UserTokenBalancesProvider } from '~/lib/user/useUserTokenBalances';
import { PoolListProvider } from '~/modules/pools/usePoolList';

export function GaugeListFooter(){
  return (
    <>
      <Grid
        padding="12px"
        paddingY="24px" 
        borderBottomRadius="16px"
        alignItems={'center'}
        bgColor="vertek.slate.900"
        borderTop="2px"
        borderColor="vertek.slate.600"
        mt={{ base: '0', lg: '0' }}
        templateColumns={{ base: '1fr 150px 200px 200px', xl: '1fr 150px 200px 200px 200px' }}
        gap="0"
        display={{ base: 'none', lg: 'grid' }}
      >
      </Grid>
    </>
  );
}

