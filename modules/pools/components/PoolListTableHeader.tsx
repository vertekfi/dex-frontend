import { Box, Flex, Text } from '@chakra-ui/react';
import { usePoolList } from '../usePoolList';
import PoolListSortLink from '~/modules/pools/components/PoolListSortLink';

function PoolListTableHeader() {
    const { state, changeSort, showMyInvestments } = usePoolList();

    return (
        <Flex
            px="4"
            py="3"
            borderTopLeftRadius="md"
            borderTopRightRadius="md"
            alignItems={'center'}
            bgColor="rgba(255,255,255,0.08)"
            borderBottom="2px"
            borderColor="beets.base.500"
        >
            <Box flex={1}>
                <Text fontSize="md" fontWeight="semibold" color="beets.base.100">
                    Pool details
                </Text>
            </Box>
            {showMyInvestments && (
                <Text fontSize="md" fontWeight="semibold" color="beets.base.100">
                    My balance
                </Text>
            )}
            <Box width="200px" textAlign="right">
                {showMyInvestments ? (
                    <Text fontSize="md" fontWeight="semibold" color="beets.base.100">
                        TVL
                    </Text>
                ) : (
                    <PoolListSortLink
                        title="TVL"
                        orderDirection={state.orderBy === 'totalLiquidity' ? state.orderDirection : null}
                        onClick={() => changeSort('totalLiquidity')}
                    />
                )}
            </Box>
            <Box width="200px" textAlign="right">
                {showMyInvestments ? (
                    <Text fontSize="md" fontWeight="semibold" color="beets.base.100">
                        Volume (24h)
                    </Text>
                ) : (
                    <PoolListSortLink
                        title="Volume (24h)"
                        orderDirection={state.orderBy === 'volume24h' ? state.orderDirection : null}
                        onClick={() => changeSort('volume24h')}
                    />
                )}
            </Box>
            <Box width="200px" textAlign="right">
                {showMyInvestments ? (
                    <Text fontSize="md" fontWeight="semibold" color="beets.base.100">
                        APR
                    </Text>
                ) : (
                    <PoolListSortLink
                        title="APR"
                        orderDirection={state.orderBy === 'apr' ? state.orderDirection : null}
                        onClick={() => changeSort('apr')}
                    />
                )}
            </Box>
        </Flex>
    );
}

export default PoolListTableHeader;
