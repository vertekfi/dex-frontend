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
    <HStack
      display="flex"
      flexDirection="row"
      width="full"
      height="full"
      justifyContent="space-between"
      alignItems="flex-start"
      padding="8px"
      borderRadius="12px"
    >
      <VStack spacing="0" alignItems="flex-start">
        <Text lineHeight="1rem" fontWeight="semibold" fontSize="sm" color="vertek.slate.200">
          My APR
        </Text>
        <HStack>
          <div className="apr-stripes">{numeral(pool.dynamicData.apr.total).format('0.00%')}</div>
          <AprTooltip onlySparkles data={pool.dynamicData.apr} />
        </HStack>
      </VStack>
      <VStack spacing="0" alignItems="flex-start">
        <Text lineHeight="1rem" fontWeight="semibold" fontSize="sm" color="beets.base.50">
          My liquidity
        </Text>
        {isLoading ? (
          <Box>
            <Skeleton height="34px" width="140px" mt="4px" mb="4px" />
          </Box>
        ) : (
          <Text color="white" fontSize="1.2rem">
            {numberFormatUSDValue(userPoolBalanceUSD)}
          </Text>
        )}
      </VStack>
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
    </HStack>
  );
}
