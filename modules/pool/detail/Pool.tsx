import { Box, Text, Grid, GridItem, VStack, SimpleGrid } from '@chakra-ui/react';
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
import { PoolStakeModal } from '~/modules/pool/stake/PoolStakeModal'; 
import { PoolUnstakeModal } from '~/modules/pool/stake/PoolUnstakeModal';

export function Pool() {
  const { pool } = usePool();
  

  return (
  <Box marginBottom="8">
    <PoolHeader />
    <Box width="full" marginY="2">
      {pool.staking && <PoolStakeInFarmWarning />}
      <Box width="full" display="flex" flexDirection={{ base:'column', md:'row' }} justifyContent="space-between" marginBottom="4" paddingY={{ base:'0', md:'3'}}>
        <Box width={{ base:'75%', md:'auto' }} mb={{ base: '2rem', md:'0'}}>
            <Text color="gray.100">
              Liquidity provision 
            </Text>
            <PoolInvestModal />
            <PoolWithdrawModal />
        </Box>
        <Box width={{ base:'auto', md:'auto' }} display={{ base:'flex', md:'block'}} flexDirection={{ base:'column', md:'row'}}>
            <Text textAlign={{ base:'right', md:'right'}}  mr={{ base:'auto', md:'2' }} color="gray.100" >
                VPT token staking 
            </Text>
            <PoolStakeModal   /> 
            <PoolUnstakeModal />
        </Box>
      </Box>
    </Box>
    <SimpleGrid
      columns={{ base: 1, md: 7 }}
      paddingX={{ base: '2', md: '0' }}
      paddingY="2"
      marginTop={{ base: '8', md: '5' }}
      marginBottom={{ base: '6', md: '8' }}
      spacing={{ base: '6', md: '8' }}
      width={{ base: 'full', md: 'auto' }}
    >
      <GridItem display="flex" flexDirection="column" colSpan={{ sm: 1, md: 2 }}>
        <PoolStats />
      </GridItem>

      <GridItem colSpan={{ sm: 1, md: 5 }} paddingX="2">
        <PoolDetailCharts />
      </GridItem>
      <GridItem colSpan={{ sm: 1, md: 4 }}>
        <PoolTransactions />
      </GridItem>
      <GridItem colSpan={{ sm: 1, md: 3 }}>
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
