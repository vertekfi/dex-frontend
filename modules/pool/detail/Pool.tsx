import { Box, Flex, Grid, GridItem, VStack, HStack } from '@chakra-ui/react';
import PoolHeader from '~/modules/pool/detail/components/PoolHeader';
import { PoolComposition } from '~/modules/pool/detail/components/composition/PoolComposition';
import PoolStats from './components/stats/PoolStats';
import { PoolTransactions } from './components/transactions/PoolTransactions';
import { PoolStakeInFarmWarning } from '~/modules/pool/detail/components/PoolStakeInFarmWarning';
import { PoolDetailCharts } from '~/modules/pool/detail/components/PoolDetailCharts';
import { PoolInvestModal } from '~/modules/pool/invest/PoolInvestModal';
import { PoolWithdrawModal } from '~/modules/pool/withdraw/PoolWithdrawModal';
import { usePool } from '~/modules/pool/lib/usePool';
import { usePoolUserBptBalance } from '~/modules/pool/lib/usePoolUserBptBalance';
import { PoolFbeetsWarning } from '~/modules/pool/detail/components/PoolFbeetsWarning';

export function Pool() {
  const { pool, isFbeetsPool } = usePool();
  const { hasBpt } = usePoolUserBptBalance();

  return (
    <Box marginBottom="8" >
      <PoolHeader />
      <VStack width="full" spacing="4">
        {pool.staking && !isFbeetsPool && <PoolStakeInFarmWarning />}
        {isFbeetsPool && hasBpt && <PoolFbeetsWarning />}
            <Flex width="full" justifyContent="flex-end" marginBottom="4">
                <PoolInvestModal />
                <PoolWithdrawModal />
            </Flex>
            <Grid gap="4" templateColumns={{ base: '1fr', lg: '3fr 1fr' }} width="full">
                  <GridItem>
                    
                        <VStack spacing="0">
                            <PoolStats />
                            <PoolDetailCharts />
                        </VStack>
                    
                  </GridItem>
                  <GridItem>
                        <PoolComposition />
                  </GridItem>
            </Grid>
      </VStack>
      
      <VStack spacing="8" width="full">
        
        <PoolTransactions />
      </VStack>
    </Box>
  );
}
