import { tokenFindTokenAmountForAddress } from '~/lib/services/token/token-util';
import VirtualList from 'react-tiny-virtual-list';
import { useGetTokens } from '~/lib/global/useToken';
import { useUserTokenBalances } from '~/lib/user/useUserTokenBalances';
import { orderBy } from 'lodash';
import { PoolRow } from './PoolRow';
import { GqlPoolMinimal } from '~/apollo/generated/graphql-codegen-generated';

interface Props {
  pools: GqlPoolMinimal[];
  listHeight: number;
  searchTerm: string;
  onPoolRowClick: (address: string) => void;
}

export function PoolSelectPoolList({ listHeight, searchTerm, onPoolRowClick, pools }: Props) {
  const { priceForAmount } = useGetTokens();
  const { userBalances, isLoading: userBalancesLoading } = useUserTokenBalances();

  const filteredPools = searchTerm
    ? pools.filter((pool) => {
        return (
          pool.name.toLowerCase() === searchTerm.toLowerCase() ||
          pool.symbol.toLowerCase().includes(searchTerm.toLowerCase())
        );
      })
    : pools;

  const filteredTokensByPrice = orderBy(
    filteredPools,
    [
      (pool) => {
        const userBalance = tokenFindTokenAmountForAddress(pool.address, userBalances);
        return priceForAmount(userBalance);
      },
    ],
    ['desc', 'desc'],
  );

  return (
    <VirtualList
      className="token-select-list"
      width="100%"
      height={listHeight}
      itemCount={filteredPools.length}
      itemSize={56}
      renderItem={({ index, style }) => {
        const pool = filteredTokensByPrice[index];
        const userBalance = tokenFindTokenAmountForAddress(pool.address, userBalances);
        return (
          <div style={style} key={index}>
            <PoolRow
              pool={pool}
              onClick={() => onPoolRowClick(pool.address)}
              key={pool.address}
              userBalance={userBalance.amount}
              userBalanceUSD={priceForAmount(userBalance)}
              loading={userBalancesLoading}
            />
          </div>
        );
      }}
    />
  );
}
