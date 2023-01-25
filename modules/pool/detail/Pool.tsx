import { Box, Flex, Grid, GridItem, VStack, SimpleGrid } from '@chakra-ui/react';
import PoolHeader from '~/modules/pool/detail/components/PoolHeader';
import { PoolComposition } from '~/modules/pool/detail/components/composition/PoolComposition';
import PoolStats from './components/stats/PoolStats';
import { PoolTransactions } from './components/transactions/PoolTransactions';
import { PoolStakeInFarmWarning } from '~/modules/pool/detail/components/PoolStakeInFarmWarning';
import { PoolDetailCharts } from '~/modules/pool/detail/components/PoolDetailCharts';
import { PoolInvestModal } from '~/modules/pool/invest/PoolInvestModal';
import { PoolWithdrawModal } from '~/modules/pool/withdraw/PoolWithdrawModal';
import { usePool } from '~/modules/pool/lib/usePool';
import { PoolStatistics } from '~/modules/pool/detail/components/PoolStatistics';

export function Pool() {
  const { pool } = usePool();

  return (
<Box marginBottom="8" >
  <PoolHeader />
  <VStack width="full" spacing="8">
        {pool.staking && 
        
        <PoolStakeInFarmWarning />}

    <Flex width="full" justifyContent="flex-start" marginBottom="2">
        <PoolInvestModal />
        <PoolWithdrawModal />
    </Flex>
  </VStack>
  <SimpleGrid
    columns={{ base: 1, lg: 7 }} 
    paddingX={{ base:'2', lg:'0'}}
    paddingY="2"
    marginTop={{ base: 0, lg: 5 }}
    marginBottom={{ base: 6, lg:8 }}
    spacing={{ base: '6', lg: '8' }}
>      
      <GridItem    
          display="flex" 
          flexDirection="column"  
          colSpan={{ sm: 1, lg: 2 }}
          >            
            <PoolStats />
      </GridItem>
      
      <GridItem colSpan={{ sm:1, lg:5 }} paddingX="2">
            <PoolDetailCharts />
      </GridItem>
      <GridItem colSpan={{sm: 1, lg:4}}>
            <PoolTransactions />
      </GridItem>
      <GridItem colSpan={{ sm:1, lg:3 }}>
        <VStack spacing="4">
          <PoolComposition />
          <PoolStatistics />
        </VStack>
      </GridItem>
    </SimpleGrid>
      

      {/* <VStack spacing="8" width="full">
        <PoolTransactions />
      </VStack> */}
    </Box>
  );
}
