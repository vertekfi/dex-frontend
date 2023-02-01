import { Box, Text, GridItem, VStack, SimpleGrid } from '@chakra-ui/react';
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
import numeral from 'numeral';

export function Pool() {
  const { pool } = usePool();
  const depositFee = pool.staking?.gauge?.depositFee || 0;
  const withdrawalFee = pool.staking?.gauge?.withdrawFee || 0;

  return (
    <Box marginBottom="8">
      <PoolHeader />
      <Box width="full" marginY="2">
        {pool.staking && <PoolStakeInFarmWarning />}
        <Box
          width="full"
          display="flex"
          flexDirection={{ base: 'column', md: 'row' }}
          justifyContent="space-between"
          marginBottom="4"
          paddingY={{ base: '0', md: '3' }}
        >
          <Box width={{ base: '75%', md: '25%' }} mb={{ base: '2rem', md: '0' }}>
            <Text fontWeight="bold" fontSize="1.1rem" textAlign="center" color="gray.100" mb="1">
              Provide Liquidity
            </Text>
            <PoolInvestModal />
            <PoolWithdrawModal />
          </Box>
          <Box
            width={{ base: 'auto', md: '25%' }}
            display={{ base: 'flex', md: 'block' }}
            flexDirection={{ base: 'column', md: 'row' }}
          >
            <Text
              fontWeight="bold"
              fontSize="1.1rem"
              mb="1"
              textAlign={{ base: 'right', md: 'center' }}
              mr={{ base: 'auto', md: '0' }}
              color="gray.100"
            >
              Stake VPT Tokens
            </Text>
            <PoolStakeModal />
            <PoolUnstakeModal />
            <Box display="flex" flexDirection="row" justifyContent="center" alignItems="center">
              <Text
                fontSize="0.8rem"
                textAlign={{ base: 'right', md: 'left' }}
                ml={{ base: 'auto', md: '0' }}
                width="50%"
                color="gray.100"
              >
                Deposit fee:&nbsp;
                {numeral(depositFee / 10000).format('0.0%')}
              </Text>
              <Text
                fontSize="0.8rem"
                textAlign={{ base: 'right', md: 'left' }}
                mr={{ base: 'auto', md: '3' }}
                width="50%"
                color="gray.100"
              >
                Withdrawal fee:&nbsp;
                {numeral(withdrawalFee / 10000).format('0.0%')}
              </Text>
            </Box>
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
