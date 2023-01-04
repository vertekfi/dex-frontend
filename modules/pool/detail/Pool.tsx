import { Box, Flex, Grid, GridItem, VStack } from '@chakra-ui/react';
import PoolHeader from '~/modules/pool/detail/components/PoolHeader';
import { PoolComposition } from '~/modules/pool/detail/components/composition/PoolComposition';
import PoolStats from './components/stats/PoolStats';
import { PoolTransactions } from './components/transactions/PoolTransactions';
import { PoolStakeInFarmWarning } from '~/modules/pool/detail/components/PoolStakeInFarmWarning';
import { PoolDetailCharts } from '~/modules/pool/detail/components/PoolDetailCharts';
import { PoolInvestModal } from '~/modules/pool/invest/PoolInvestModal';
import { PoolWithdrawModal } from '~/modules/pool/withdraw/PoolWithdrawModal';
import { usePool } from '~/modules/pool/lib/usePool';

export function Pool() {
  const { pool } = usePool();

  return (
    <Box marginBottom="8">
      <PoolHeader />
      <VStack width="full" spacing="8">
        {pool.staking && <PoolStakeInFarmWarning />}
        <Flex width="full" justifyContent="flex-start" marginBottom="2">
          <PoolInvestModal />
          <PoolWithdrawModal />
        </Flex>
        <Grid gap="4" templateColumns={{ base: '1fr', lg: '3fr 1fr' }} width="full">
          <GridItem>
            <VStack spacing="4">
              <PoolStats />
              <PoolDetailCharts />
            </VStack>
          </GridItem>
          <GridItem>
            
            <PoolComposition 
            // symbol name weight balance value 
            />
          </GridItem>
        </Grid>
      </VStack>

      <VStack spacing="8" width="full">
        <PoolTransactions />
      </VStack>
    </Box>
  );
}
