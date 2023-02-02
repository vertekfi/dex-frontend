import { Alert, AlertIcon, Box } from '@chakra-ui/react';
import { usePoolList } from './usePoolList';
import { PoolListItem } from '~/modules/pools/components/PoolListItem';
import { PoolListTableHeader } from '~/modules/pools/components/PoolListTableHeader';
import { PoolListTop } from '~/modules/pools/components/PoolListTop';
import { useUserData } from '~/lib/user/useUserData';
import { useEffect } from 'react';
import { orderBy } from 'lodash';
import { PoolListMobileHeader } from '~/modules/pools/components/PoolListMobileHeader';
import { useGetTokens } from '~/lib/global/useToken';
import { PoolListFooter } from './components/PoolListFooter';
import { networkConfig } from '~/lib/config/network-config';

function PoolList() {
  const { getToken } = useGetTokens();

  const { pools, setPoolIds, showMyInvestments } = usePoolList();
  const { userPoolIds, usdBalanceForPool, hasBptInWalletForPool } = useUserData();
  const userPoolIdsStr = userPoolIds.join();

  useEffect(() => {
    if (showMyInvestments) {
      setPoolIds(userPoolIds).catch();
    }
  }, [userPoolIdsStr, showMyInvestments]);

  const poolsToRender = showMyInvestments
    ? orderBy(pools, (pool) => usdBalanceForPool(pool.id), 'desc')
    : pools;

  const hasUnstakedBpt =
    showMyInvestments &&
    pools.filter((pool) => pool.dynamicData.apr.hasRewardApr && hasBptInWalletForPool(pool.id))
      .length > 0;

  const pinnedPoolId = networkConfig.balancer.votingEscrow.lockablePoolId;
  const pinnedPool = poolsToRender.filter((pool) => pool.id === pinnedPoolId);
  const nonPinnedPools = poolsToRender.filter((pool) => pool.id !== pinnedPoolId);

  return (
    <Box>
      <PoolListMobileHeader />
      <PoolListTop />
      {hasUnstakedBpt && (
        <Alert
          borderRadius="12px"
          bg="vertek.slatepurple.900"
          status="warning"
          color="vertek.neonpurple.500"
          mt="4"
        >
          <AlertIcon color="vertek.neonpurple.500" />
          You have unstaked VPT in your wallet. Incentivized pools offer additional rewards that
          will accumulate over time when your VPT are staked.
        </Alert>
      )}
      <Box
        mt="2rem"
        boxShadow={{ base: 'none', lg: '0 0 10px #5BC0F8, 0 0 20px #4A4AF6' }}
        mb="4rem"
        borderRadius="16px"
        flexDirection="column"
        display="flex"
      >
        <PoolListTableHeader />
        {pinnedPool.length > 0 && (
          <PoolListItem
            padding="1"
            key={pinnedPool[0].id}
            pool={pinnedPool[0]}
            userBalance={`${usdBalanceForPool(pinnedPool[0].id)}`}
            showUserBalance={showMyInvestments}
            tokens={pinnedPool[0].allTokens
              .filter((token) => !token.isNested && !token.isPhantomBpt)
              .map((token) => ({
                ...token,
                logoURI: getToken(token.address)?.logoURI || undefined,
              }))}
            hasUnstakedBpt={
              pinnedPool[0].dynamicData.apr.hasRewardApr && hasBptInWalletForPool(pinnedPool[0].id)
            }
          />
        )}
        {nonPinnedPools.map((item, index) => (
          <PoolListItem
            padding="1"
            bgColor="white"
            key={index}
            pool={item}
            userBalance={`${usdBalanceForPool(item.id)}`}
            showUserBalance={showMyInvestments}
            tokens={item.allTokens
              .filter((token) => !token.isNested && !token.isPhantomBpt)
              .map((token) => ({
                ...token,
                logoURI: getToken(token.address)?.logoURI || undefined,
              }))}
            hasUnstakedBpt={item.dynamicData.apr.hasRewardApr && hasBptInWalletForPool(item.id)}
          />
        ))}
        <PoolListFooter />
      </Box>
    </Box>
  );
}

export default PoolList;
