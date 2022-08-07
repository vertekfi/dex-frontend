import { Box, Button, Link, Text } from '@chakra-ui/react';
import { NetworkStatus } from '@apollo/client';
import { usePoolList } from './usePoolList';
import { PoolListItem } from '~/modules/pools/components/PoolListItem';
import { PoolListTableHeader } from '~/modules/pools/components/PoolListTableHeader';
import { PaginatedTable } from '~/components/table/PaginatedTable';
import { PoolListTop } from '~/modules/pools/components/PoolListTop';
import { useUserData } from '~/lib/user/useUserData';
import { useEffect } from 'react';
import { orderBy } from 'lodash';
import { PoolListMobileHeader } from '~/modules/pools/components/PoolListMobileHeader';
import { networkConfig } from '~/lib/config/network-config';
import { useGetTokens } from '~/lib/global/useToken';
import { GqlPoolMinimalFragment } from '~/apollo/generated/graphql-codegen-generated';

function PoolList() {
    const { getToken } = useGetTokens();
    const { pools, refetch, loading, networkStatus, state, count, setPageSize, setPoolIds, showMyInvestments } =
        usePoolList();
    const { userPoolIds, usdBalanceForPool } = useUserData();
    const userPoolIdsStr = userPoolIds.join();

    useEffect(() => {
        if (showMyInvestments) {
            setPoolIds(userPoolIds).catch();
        }
    }, [userPoolIdsStr, showMyInvestments]);

    const poolsToRender = showMyInvestments ? orderBy(pools, (pool) => usdBalanceForPool(pool.id), 'desc') : pools;
    const poolCount = count || 0;

    return (
        <Box>
            <PoolListMobileHeader />
            <PoolListTop />

            <PaginatedTable
                items={poolsToRender}
                currentPage={state.skip / state.first + 1}
                pageSize={state.first}
                count={poolCount}
                isShort={poolCount < 21}
                onPageChange={(page) => {
                    refetch({ ...state, skip: state.first * (page - 1) });
                }}
                loading={loading}
                fetchingMore={networkStatus === NetworkStatus.refetch}
                onPageSizeChange={setPageSize}
                renderTableHeader={() => <PoolListTableHeader />}
                renderTableRow={(item: GqlPoolMinimalFragment, index) => {
                    return (
                        <PoolListItem
                            key={index}
                            pool={item}
                            userBalance={`${usdBalanceForPool(item.id)}`}
                            showUserBalance={showMyInvestments}
                            borderBottomColor="beets.base.800"
                            borderBottomWidth={index === pools.length - 1 ? 0 : 1}
                            bg="box.500"
                            tokens={item.allTokens
                                .filter((token) => !token.isNested && !token.isPhantomBpt)
                                .map((token) => ({ ...token, logoURI: getToken(token.address)?.logoURI || undefined }))}
                        />
                    );
                }}
            />

            <Box mt="10">
                <Text fontSize="xl" color="white" mb="4">
                    Can&apos;t find what you&apos;re looking for?
                </Text>
                <Button variant="primary" size="lg" as={Link} href={networkConfig.createPoolUrl}>
                    Compose a pool
                </Button>
            </Box>
        </Box>
    );
}

export default PoolList;
