import { Box, HStack, Text, VStack } from '@chakra-ui/layout';
import numeral from 'numeral';
import AprTooltip from '~/components/apr-tooltip/AprTooltip';
import { numberFormatUSDValue } from '~/lib/util/number-formats';
import { usePoolUserDepositBalance } from '~/modules/pool/lib/usePoolUserDepositBalance';
import { Skeleton } from '@chakra-ui/react';
import { PoolUserStakedStats } from '~/modules/pool/detail/components/stats/PoolUserStakedStats';
import { usePool } from '~/modules/pool/lib/usePool';

export default function PoolUserStats() {
  const { pool, totalApr } = usePool();
  const { userPoolBalanceUSD, isLoading } = usePoolUserDepositBalance();

return (
<>

<HStack justifyContent="space-between" paddingX={2}  display="flex" width="full" mt={1}>
  <VStack alignItems="flex-start" >
    <Text lineHeight="1rem" fontWeight="bold" fontSize="md" color="gray.100">
      My APR
    </Text>
    <HStack >
      <div className="apr-stripes">{numeral(pool.dynamicData.apr.total).format('0.00%')}</div>
      <AprTooltip onlySparkles data={pool.dynamicData.apr} />
    </HStack>
  </VStack>
  <VStack alignItems="flex-end">
    <Text lineHeight="1rem" fontWeight="bold" textAlign="center" fontSize="md" color="gray.100">
      My liquidity
    </Text>
    {isLoading ? (
      <Box>
        <Skeleton height="34px" width="140px" mt="4px" mb="4px" />
      </Box>
    ) : (
      <Text color="vertek.neonpurple.500" textAlign="center" fontSize="1.2rem">
        {numberFormatUSDValue(userPoolBalanceUSD)}
      </Text>
    )}
  </VStack>
  </HStack>

  


  <Box >

{pool.staking && (
  <PoolUserStakedStats
    poolAddress={pool.address}
    staking={pool.staking}
    totalApr={totalApr}
    userPoolBalanceUSD={userPoolBalanceUSD}
  />

)}
</Box>
  {/* PoolUserStakedStats needs proper formatting/udpating */}
  {/*<PoolDetailPossibleYieldText />*/}





  </>
  );
}
