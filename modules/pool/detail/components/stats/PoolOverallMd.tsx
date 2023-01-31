import { Badge, Box, Divider, HStack, Text, VStack, Grid } from '@chakra-ui/layout';
import numeral from 'numeral';
import AprTooltip from '~/components/apr-tooltip/AprTooltip';
import { PercentChangeBadge } from '~/components/badge/PercentChangeBadge';
import { numberFormatUSDValue } from '~/lib/util/number-formats';
import { usePool } from '~/modules/pool/lib/usePool';
import TokenAvatar from '~/components/token/TokenAvatar';
import { Skeleton, Tooltip } from '@chakra-ui/react';
import { tokenFormatAmount } from '~/lib/services/token/token-util';
import { networkConfig } from '~/lib/config/network-config';
import {
    useGetBlocksPerDayQuery,
    useGetPoolBptPriceChartDataQuery,
} from '~/apollo/generated/graphql-codegen-generated';
import { useGetTokens } from '~/lib/global/useToken';
import { sumBy } from 'lodash';
import { InfoButton } from '~/components/info-button/InfoButton';

export default function PoolOverallMd() {
    const { pool } = usePool();
    const { priceFor } = useGetTokens();
    const { data: blocksData } = useGetBlocksPerDayQuery({ fetchPolicy: 'cache-first' });
    const data = pool.dynamicData;
    const volumeYesterday = parseFloat(data.volume48h) - parseFloat(data.volume24h);
    const volumePercentChange = (parseFloat(data.volume24h) - volumeYesterday) / volumeYesterday;
    const tvlPercentChange =
        (parseFloat(data.totalLiquidity) - parseFloat(data.totalLiquidity24hAgo)) /
        parseFloat(data.totalLiquidity24hAgo);

    const sharePrice = parseFloat(pool.dynamicData.totalLiquidity) / parseFloat(pool.dynamicData.totalShares);
    const totalShares24hAgo = parseFloat(pool.dynamicData.totalShares24hAgo);
    const sharePrice24hAgo =
        totalShares24hAgo > 0 ? parseFloat(pool.dynamicData.totalLiquidity24hAgo) / totalShares24hAgo : 0;
    const sharePricePercentChange = (sharePrice - sharePrice24hAgo) / sharePrice24hAgo;
    const beetsPerDay = parseFloat(pool.staking?.farm?.beetsPerBlock || '0') * (blocksData?.blocksPerDay || 0);

    const incentivesDailyValue =
        beetsPerDay * priceFor(networkConfig.beets.address) +
        sumBy(
            pool.staking?.farm?.rewarders || [],
            (rewarder) => priceFor(rewarder.tokenAddress) * parseFloat(rewarder.rewardPerSecond) * 86400,
        );
return (
    <>
    <HStack 
    display={{ base:'none', md:'flex' }}
    flexDirection="column" 
    width="full" height="full"
    justifyContent="space-between"
    alignItems="space-between"
    padding="8px"
    borderRadius="12px"
    >
        <VStack alignItems="flex-start" >
            <Text lineHeight="1rem" fontWeight="bold" fontSize="1rem" color="gray.100">
                Pool APR
            </Text>
            <HStack >
                <div className="apr-stripes">{numeral(data.apr.total).format('0.00%')}</div>
                <AprTooltip onlySparkles data={data.apr} />
            </HStack>
        </VStack>
        <VStack alignItems="flex-start" >
        <Text lineHeight="1rem" fontWeight="bold" fontSize="1rem" color="gray.100">
                TVL
            </Text>
            <Text color="vertek.neonpurple.500" fontSize="1.2rem" fontWeight="bold" >
                {numeral(data.totalLiquidity).format('$0,0.00a')}
            </Text>
            {/* <PercentChangeBadge percentChange={tvlPercentChange} /> */}
        </VStack>
        <VStack alignItems="flex-start" >
        <Text lineHeight="1rem" fontWeight="bold" fontSize="1rem" color="gray.100">
                24h Volume
            </Text>
            <Text color="vertek.neonpurple.500" fontSize="1.2rem" fontWeight="bold" >
                {numeral(data.volume24h).format('$0,0.00a')}
            </Text>
            {/* <PercentChangeBadge percentChange={volumePercentChange} /> */}
        </VStack>
        <VStack alignItems="flex-start" >
        <Text lineHeight="1rem" fontWeight="bold" fontSize="1rem" color="gray.100">
                24h Fees
            </Text>
            <Text color="vertek.neonpurple.500" fontSize="1.2rem" fontWeight="bold" >
                {numeral(data.fees24h).format('$0,0.00a')}
            </Text>
        </VStack>
    </HStack>
    <Box gap={6}  
    display={{ base:'flex', md:'none' }}
    flexDirection="column" 
    width="100%"
    height="100%"
    justifyContent="space-evenly"
    alignItems="space-evely"
    padding="8px"
    borderRadius="12px"
    >
        <Box marginBottom=""  alignItems="flex-start" >
            <Text lineHeight="1rem" fontWeight="bold" fontSize="1rem" color="gray.100">
                Pool APR
            </Text>
            <HStack >
                <div className="apr-stripes">{numeral(data.apr.total).format('0.00%')}</div>
                <AprTooltip onlySparkles data={data.apr} />
            </HStack>
        </Box>
        <Box marginBottom="4"  alignItems="flex-start" >
        <Text lineHeight="1rem" fontWeight="bold" fontSize="1rem" color="gray.100">
                TVL
            </Text>
            <Text color="vertek.neonpurple.500" fontSize="1rem" fontWeight="bold" lineHeight="20px">
                {numeral(data.totalLiquidity).format('$0,0.00a')}
            </Text>
            {/* <PercentChangeBadge percentChange={tvlPercentChange} /> */}
        </Box>
        <Box marginBottom="4"  alignItems="flex-start" >
        <Text lineHeight="1rem" fontWeight="bold" fontSize="1rem" color="gray.100">
                24h Volume
            </Text>
            <Text color="vertek.neonpurple.500" fontSize="1rem" fontWeight="bold" lineHeight="20px">
                {numeral(data.volume24h).format('$0,0.00a')}
            </Text>
            {/* <PercentChangeBadge percentChange={volumePercentChange} /> */}
        </Box>
        <Box marginBottom="4"  alignItems="flex-start" >
        <Text lineHeight="1rem" fontWeight="bold" fontSize="1rem" color="gray.100">
                24h Fees
            </Text>
            <Text color="vertek.neonpurple.500" fontSize="1rem" fontWeight="bold" lineHeight="20px">
                {numeral(data.fees24h).format('$0,0.00a')}
            </Text>
        </Box>
    </Box>

    </>
);
}
