import { Box, HStack, Text, VStack } from '@chakra-ui/layout';
import numeral from 'numeral';
import AprTooltip from '~/components/apr-tooltip/AprTooltip';
import { numberFormatUSDValue } from '~/lib/util/number-formats';
import { usePoolUserDepositBalance } from '~/modules/pool/lib/usePoolUserDepositBalance';
import { Skeleton } from '@chakra-ui/react';
import { PoolUserStakedStats } from '~/modules/pool/detail/components/stats/PoolUserStakedStats';
import { usePool } from '~/modules/pool/lib/usePool';
import { useUserData } from '~/lib/user/useUserData';
import { getAprValues } from '~/lib/util/apr-utils';

export default function PoolUserStats() {
  const { pool, totalApr } = usePool();
  const { userPoolBalanceUSD, isLoading } = usePoolUserDepositBalance();
  const { boostForPool } = useUserData();

  const boost = boostForPool(pool.id);
  const { minApr, maxApr, boostedTotalAPR } = getAprValues(pool.dynamicData.apr, boost);
  return (
    <>
      <Box 
      alignItems="center" 
      display="flex"
      flexDirection="column" 
      width="full" mt={1}>
        <VStack alignItems="center">
          <Text
            lineHeight="1rem"
            fontWeight="bold"
            textAlign="center"
            fontSize="1.2rem"
            color="#ccc"
          >
            My Liquidity
          </Text>
          {isLoading ? (
            <Box>
              <Skeleton height="34px" width="140px" mt="4px" mb="4px" />
            </Box>
          ) : (
            <Text color="vertek.neonpurple.500" textAlign="center" fontWeight="bold" fontSize="1.2rem">
              {numberFormatUSDValue(userPoolBalanceUSD)}
            </Text>
          )}
        </VStack>
      <Box display="flex" flexDirection="row" width="full" gap="2">
        <Box display="flex" 
        width="50%" 
        flexDirection="column" 
        alignItems="flex-start"
        justifyContent="center">
          <Text  fontWeight="bold" fontSize="1.2rem" color="#ccc">
            APR Range 
          </Text>
          <AprTooltip onlySparkles poolId={pool.id} data={pool.dynamicData.apr} />
        </Box>
        <Box display="flex" width="50%" flexDirection="column" justifyContent="flex-end" alignItems="flex-end" my="2rem" >
        <Text textAlign="right"  fontWeight="bold" fontSize="1.2rem" color="#ccc">
          My APR
        </Text>
        <div className="apr-stripes">{numeral(pool.dynamicData.apr.total).format('0.00%')}</div>
          
        </Box>
      </Box>
      </Box>

      {pool.staking && (
        <PoolUserStakedStats
          poolAddress={pool.address}
          staking={pool.staking}
          totalApr={totalApr}
          userPoolBalanceUSD={userPoolBalanceUSD}
        />
      )}

      {/* PoolUserStakedStats needs proper formatting/udpating */}
      {/*<PoolDetailPossibleYieldText />*/}
    </>
  );
}
