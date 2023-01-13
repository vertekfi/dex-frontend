import { Flex, Grid, GridItem, Text } from '@chakra-ui/react';
import { usePoolList } from '../usePoolList';
import PoolListSortLink from '~/modules/pools/components/PoolListSortLink';
import { InfoButton } from '~/components/info-button/InfoButton';

export function PoolListFooter() {
  const { state, changeSort, showMyInvestments } = usePoolList();

  
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
        templateColumns={
          showMyInvestments
            ? { base: '1fr 150px 200px 200px', xl: '1fr 150px 200px 200px 200px' }
            : '1fr 200px 200px 200px'
        }
        gap="0"
        display={{ base: 'none', lg: 'grid' }}
      >
      </Grid>
    </>
  );
}
