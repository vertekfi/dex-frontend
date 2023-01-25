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

return (
<>

<VStack width="full" spacing="6"  >
    <Box alignItems="flex-start" padding="1" width="full" mt="8">
            <InfoButton
                labelProps={{
                    lineHeight: '1rem',
                    fontWeight: 'semibold',
                    fontSize: 'md',
                    color: 'gray.100',
                }}
                label="My staked share"
                infoText={`The size of your stake relative to all value staked in this pool. 
                Your staked share represents the percent of liquidity incentives you are entitled to.`}
            />
        <Box alignItems="flex-start"  >
            {isLoadingStake ? (
                <Skeleton height="34px" width="140px" />
            ) : (
                <Text color="vertek.neonpurple.500" fontSize="1.3rem">
                    {userShare < 0.0001 ? '< 0.01%' : numeral(userShare).format('0.00%')}
                </Text>
            )}
            {isLoadingStake ? (
                <Skeleton height="16px" width="45px" />
            ) : (
                <Text fontSize="1rem" lineHeight="1rem">
                    {numeral(userStakedBptBalance).format('0.00a')}
                    {' / '}
                    {numeral(data).format('0.00a')}{' '}
                    <Text as="span" fontSize="md" color="beets.base.50">
                        VPT
                    </Text>
                </Text>
            )}
        </Box>
    </Box>

    <Box alignItems="flex-start" padding="1" width="full" mt="8">
        <InfoButton
            labelProps={{
                lineHeight: '1rem',
                fontWeight: 'semibold',
                fontSize: 'md', 
                color: 'gray.100',
            }}
            label="My potential daily yield"
            infoText="The potential daily value is an approximation based on swap fees, 
            current token prices and your staked share. A number of external factors can influence this value from second to second."
        />
        {isLoadingPendingRewards ? (
            <Skeleton height="34px" width="140px" mt="4px" mb="4px" />
        ) : (
            <Text color="vertek.neonpurple.500" fontSize="1.3rem">
                {numberFormatUSDValue(dailyYieldUSD)}
            </Text>
        )}
        <Box>
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
    </Box>


    <Box alignItems="flex-start" padding="1" width="full" mt="8">
    <InfoButton
        labelProps={{
            lineHeight: '1rem',
            fontWeight: 'semibold',
            fontSize: 'md',
            color: 'gray.100',
        }}
        label="My pending rewards"
        infoText={`Your accumulated liquidity rewards for this pool. You can claim your rewards at any time.`}
    />

    {isLoadingPendingRewards ? (
        <Skeleton height="34px" width="140px" mt="4px" mb="4px" />
    ) : (
        <Text color="vertek.neonpurple.500" fontSize="1.3rem">
            {numberFormatUSDValue(pendingRewardsTotalUSD)}
        </Text>
    )}
    <Box >
        {pendingRewards.map((reward, index) => (
        <HStack key={index} spacing="0" mb={index === pendingRewards.length - 1 ? '0' : '0.5'}>
            <TokenAvatar height="40px" width="40px" address={reward.address} />
            <Skeleton isLoaded={!isLoadingPendingRewards}>
                <Text fontSize="1rem" lineHeight="1rem">
                    {tokenFormatAmount(reward.amount)}
                </Text>
            </Skeleton>
        </HStack>
        ))}
    </Box>
</Box>

<Box width="full" alignItems="flex-start" justifyContent="center" display="flex" >
    <BeetsSubmitTransactionButton
        {...harvestQuery}
        isDisabled={!hasPendingRewards}
        onClick={() => claim()}
        onConfirmed={() => {
            refetchPendingRewards();
            refetchUserTokenBalances();
        }}
        width="80%"
        variant="stayblack"
    >
        Claim rewards
    </BeetsSubmitTransactionButton>
</Box>

    </VStack>
</>      
);
}
