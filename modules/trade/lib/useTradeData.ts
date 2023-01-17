import { useTrade } from '~/modules/trade/lib/useTrade';
import { useGetTradeSelectedTokenDataQuery } from '~/apollo/generated/graphql-codegen-generated';
import { useEffect } from 'react';
import { useGetTokens } from '~/lib/global/useToken';

export function useTradeData() {
  const { getToken, priceFor } = useGetTokens();
  const { reactiveTradeState } = useTrade();
  const tokenIn = getToken(reactiveTradeState.tokenIn);
  const tokenOut = getToken(reactiveTradeState.tokenOut);

  const priceOut = priceFor(reactiveTradeState.tokenOut);
  const priceIn = priceFor(reactiveTradeState.tokenIn);
  const currentRatio = priceOut / priceIn;
  const reverseRatio = priceIn / priceOut;

  // console.log(priceIn);
  // console.log(priceOut);

  const query = useGetTradeSelectedTokenDataQuery({
    variables: { tokenIn: reactiveTradeState.tokenIn, tokenOut: reactiveTradeState.tokenOut },
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    query.refetch({ tokenIn: reactiveTradeState.tokenIn, tokenOut: reactiveTradeState.tokenOut });
  }, [reactiveTradeState.tokenIn, reactiveTradeState.tokenOut]);

  return {
    ...query,
    ...query.data,
    tokenIn,
    tokenOut,
    currentRatio,
    reverseRatio,
  };
}
