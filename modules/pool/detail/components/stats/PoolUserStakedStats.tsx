import { GqlPoolStaking, useGetBlocksPerDayQuery } from '~/apollo/generated/graphql-codegen-generated';
import { Box, HStack, Grid, Text, VStack, GridItem } from '@chakra-ui/layout';
import numeral from 'numeral';
import { numberFormatUSDValue } from '~/lib/util/number-formats';
import TokenAvatar from '~/components/token/TokenAvatar';
import { BeetsSubmitTransactionButton } from '~/components/button/BeetsSubmitTransactionButton';
import { usePoolUserPendingRewards } from '~/modules/pool/lib/usePoolUserPendingRewards';
import { useStakingTotalStakedBalance } from '~/lib/global/useStakingTotalStakedBalance';
import { usePoolUserBptBalance } from '~/modules/pool/lib/usePoolUserBptBalance';
import { Skeleton, Tooltip } from '@chakra-ui/react';
import { tokenFormatAmount } from '~/lib/services/token/token-util';
import { usePoolUserTokenBalancesInWallet } from '~/modules/pool/lib/usePoolUserTokenBalancesInWallet';
import { useStakingClaimRewards } from '~/lib/global/useStakingClaimRewards';
import { usePool } from '~/modules/pool/lib/usePool';
import { CardRow } from '~/components/card/CardRow';
import { networkConfig } from '~/lib/config/network-config';
import { InfoButton } from '~/components/info-button/InfoButton';

interface Props {
    poolAddress: string;
    staking: GqlPoolStaking;
    totalApr: number;
    userPoolBalanceUSD: number;
}

export function PoolUserStakedStats({ poolAddress, staking, totalApr, userPoolBalanceUSD }: Props) {
    const { data: blocksData } = useGetBlocksPerDayQuery({ fetchPolicy: 'cache-first' });
    const {
        pendingRewards,
        pendingRewardsTotalUSD,
        hasPendingRewards,
        hardRefetch: refetchPendingRewards,
        isLoading: isLoadingPendingRewards,
    } = usePoolUserPendingRewards();
    const { claim, ...harvestQuery } = useStakingClaimRewards(staking);
    const { data, isLoading: isLoadingTotalStakedBalance } = useStakingTotalStakedBalance(poolAddress, staking);
    const { userStakedBptBalance, isLoading: isLoadingUserBptBalance } = usePoolUserBptBalance();
    const { refetch: refetchUserTokenBalances } = usePoolUserTokenBalancesInWallet();
    const isLoadingStake = isLoadingTotalStakedBalance || isLoadingUserBptBalance;
    const userShare = parseFloat(userStakedBptBalance) / parseFloat(data || '1');
    const dailyYield = totalApr / 365;
    const dailyYieldUSD = userPoolBalanceUSD * dailyYield;
    const beetsPerDay = parseFloat(staking.farm?.beetsPerBlock || '0') * (blocksData?.blocksPerDay || 0) * userShare;
    console.log(dailyYieldUSD); 
    console.log(totalApr); 
    console.log(pendingRewardsTotalUSD); 
    console.log(pendingRewards); 

return (
<>
<Box display="flex" flexDirection="row" width="full" mt="4" gap="2">
    <Box display="flex" flexDirection="column" alignItems="flex-start" padding="0" width="50%">
        <InfoButton
            labelProps={{
                lineHeight: '1rem',
                fontWeight: 'semibold',
                fontSize: '0.9rem',
                color: '#ccc',
            }}
            label="My staked share"
            infoText={`The size of your stake relative to all value staked in this pool. 
            Your staked share represents the percent of liquidity incentives you are entitled to.`}
        />
        <Box alignItems="flex-start"  >
            {isLoadingStake ? (
                <Skeleton height="34px" width="140px" />
            ) : (
                <Text color="vertek.neonpurple.500" fontSize="1.1rem" fontWeight="bold" >
                    {userShare < 0.0001 ? '< 0.01%' : numeral(userShare).format('0.00%')}
                </Text>
            )}
            {isLoadingStake ? (
                <Skeleton height="16px" width="45px" />
            ) : (
                <Text fontSize="1.1rem" color="#ccc" fontWeight="bold" lineHeight="1rem">
                    {numeral(userStakedBptBalance).format('0.00a')}
                    {' / '}
                    {numeral(data).format('0.00a')}{' '}
                    <Text as="span" fontSize="0.9rem" color="#ccc" >
                        VPT
                    </Text>
                </Text>
            )}
        </Box>
    </Box>
    
    <Box display="flex" flexDirection="column" alignItems="flex-end" width="55%" padding="0" >
        <InfoButton
            labelProps={{
                lineHeight: '1rem',
                textAlign:'end', 
                fontWeight: 'semibold',
                fontSize: '0.9rem', 
                color: '#ccc',
            }}
            label="My potential daily yield"
            infoText="The potential daily value is an approximation based on swap fees, 
            current token prices and your staked share. A number of external factors can influence this value from second to second."
        />
        {isLoadingPendingRewards ? (
            <Skeleton height="34px" width="140px" mt="4px" mb="4px" />
        ) : (
            <Text color="vertek.neonpurple.500" fontWeight="bold" fontSize="1.1rem">
                {numberFormatUSDValue(dailyYieldUSD)}
            </Text>
        )}
        
    </Box>
</Box>

    {/* <Box>
    {beetsPerDay > 0 && (
        <HStack spacing="0">
            <TokenAvatar height="20px" width="20px" address={networkConfig.beets.address} />
            <Tooltip
                label={`Vertek emissions are calculated per block, so daily emissions are an estimate 
                based on an average block time over last 5,000 blocks. Avg block time: ${blocksData?.avgBlockTime}s.`}
            >
                <Text fontSize="1rem" lineHeight="1rem">
                    {numeral(beetsPerDay).format('0,0')} / day
                </Text>
            </Tooltip>
        </HStack>
    )}
    {staking.farm?.rewarders?.map((rewarder) => (
        <HStack spacing="0"  key={rewarder.id}>
            <TokenAvatar height="20px" width="20px" address={rewarder.tokenAddress} />
            <Text fontSize="1rem" lineHeight="1rem">
                {numeral(parseFloat(rewarder.rewardPerSecond) * 86400 * userShare).format('0,0')} / day
            </Text>
        </HStack>
    ))}
        </Box>

    
    <Box alignItems="center" justifyContent="space-between" display="flex" flexDirection="column" 
    padding="1" width="100%" mb="1rem" mt="4">
    <InfoButton
        labelProps={{
            lineHeight: '1rem',
            fontWeight: 'semibold',
            fontSize: '1rem',
            color: '#ccc',
        }}
        label="My pending rewards"
        infoText={`Your accumulated liquidity rewards for this pool. You can claim your rewards at any time.`}
    />

    {isLoadingPendingRewards ? (
        <Skeleton height="34px" width="140px" mt="4px" mb="4px" />
    ) : (
        <Text color="vertek.neonpurple.500" fontSize="1.1rem" mt="1rem" fontWeight="bold" >
            {numberFormatUSDValue(pendingRewardsTotalUSD)}
        </Text>
    )}
    <Box display="flex"  alignItems="space-between" mt="0.5rem"  >
        {pendingRewards.map((reward, index) => (
        <HStack  key={index} spacing="0" mb={index === pendingRewards.length - 1 ? '0' : '0.5'}>
            <TokenAvatar ml="0.5rem" height="25px" width="25px" address={reward.address} />
            <Skeleton isLoaded={!isLoadingPendingRewards}>
                <Text fontSize="0.9rem" lineHeight="1rem">
                    {tokenFormatAmount(reward.amount)}
                </Text>
            </Skeleton>
        </HStack>
        ))}
    </Box> 
        </Box> */}




</>      
);
}
