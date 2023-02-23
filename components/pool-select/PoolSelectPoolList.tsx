import { tokenFindTokenAmountForAddress } from '~/lib/services/token/token-util';
import VirtualList from 'react-tiny-virtual-list';
import { useGetTokens } from '~/lib/global/useToken';
import { useUserTokenBalances } from '~/lib/user/useUserTokenBalances';
import { orderBy } from 'lodash';
import { PoolRow } from './PoolRow';
import { LiquidityGauge } from '~/apollo/generated/graphql-codegen-generated';

interface Props {
  gauges: LiquidityGauge[];
  listHeight: number;
  searchTerm: string;
  onPoolRowClick: (address: string) => void;
}

export function PoolSelectPoolList({ listHeight, searchTerm, onPoolRowClick, gauges }: Props) {
  const { priceForAmount } = useGetTokens();
  const { userBalances, isLoading: userBalancesLoading } = useUserTokenBalances();

  const filteredPools = searchTerm
    ? gauges.filter((gauge) => {
        return gauge.pool.name.toLowerCase() === searchTerm.toLowerCase();
      })
    : gauges;

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
        const gauge = filteredTokensByPrice[index];
        const userBalance = tokenFindTokenAmountForAddress(gauge.pool.address, userBalances);
        return (
          <div style={style} key={index}>
            <PoolRow
              gauge={gauge}
              onClick={() => onPoolRowClick(gauge.address)}
              key={gauge.address}
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
