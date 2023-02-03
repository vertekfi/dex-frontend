import { Box, Text, GridItem, VStack, SimpleGrid, Button } from '@chakra-ui/react';
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
import { networkConfig } from '~/lib/config/network-config';

export function Pool() {
  const { pool } = usePool();
  const depositFee = pool.staking?.gauge?.depositFee || 0;
  const withdrawalFee = pool.staking?.gauge?.withdrawFee || 0;
  const isMainPool = networkConfig.balancer.votingEscrow.lockablePoolId === pool.id;

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

          {isMainPool ? (
            <GridItem
              className="verteklightpurplebox"
              //  marginTop={{ base: 0, lg: 2 }}
              display="flex"
              // width={{ base: '100%', md: '60%', lg: 'auto' }}
              //    mx="auto"
              justifyContent="flex-start"
              alignItems="flex-start"
              // colSpan={{ sm: 1, lg: 2 }}
              flexDirection="column"
              borderRadius={{ base: '16px', lg: '16px' }}
              padding={{ base: '4', lg: '4' }}
            >
              <Text
                fontSize={{ base: '1rem', lg: '1.1rem' }}
                color="white"
                fontWeight="semibold"
                m="2"
                textAlign="left"
              >
                Earn more VRTK in Core Pools
              </Text>
              <Text
                fontSize={{ base: '1rem', lg: '1.0rem' }}
                fontWeight="normal"
                m="2"
                color="vertek.slate.100"
                textAlign="left"
              >
                Lock VRTK-BNB and receive up to 2.5x boosted rewards when farming Core Pools.
              </Text>
              <Button
                variant="moistblack"
                marginBottom="1rem"
                width={{ base: '75%', lg: '75%' }}
                boxShadow="0px 2px 2px 4px #000"
                fontSize={{ base: '0.9rem', lg: '1rem' }}
                mt="3"
                as="a"
                alignSelf="center"
                href={'/voting'}
              >
                Earn More
              </Button>
            </GridItem>
          ) : (
            <Box
              width={{ base: 'auto', md: '25%' }}
              display={{ base: 'flex', md: 'block' }}
              flexDirection={{ base: 'column', md: 'row' }}
            >
              <Text fontWeight="bold" fontSize="1.1rem" mb="2" textAlign="center" color="gray.100">
                Stake VPT Tokens
              </Text>
              <Box display="flex" flexDirection="row" justifyContent="center">
                <PoolStakeModal />
                <PoolUnstakeModal />
              </Box>

              <Box display="flex" flexDirection="row">
                <Text
                  fontSize="0.8rem"
                  textAlign="center"
                  mt="2"
                  width="50%"
                  color="gray.100"
                  ml={{ base: 'auto', md: '3' }}
                >
                  Deposit fee:&nbsp;
                  {numeral(depositFee / 10000).format('0.0%')}
                </Text>
                <Text
                  fontSize="0.8rem"
                  textAlign="center"
                  mr={{ base: 'auto', md: '6' }}
                  mt="2"
                  width="50%"
                  color="gray.100"
                >
                  Withdrawal fee:&nbsp;
                  {numeral(withdrawalFee / 10000).format('0.0%')}
                </Text>
              </Box>
            </Box>
          )}
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
