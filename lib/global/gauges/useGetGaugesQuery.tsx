import { useEffect } from 'react';
import { useGetLiquidityGaugesQuery } from '~/apollo/generated/graphql-codegen-generated';

export function useGetGaugesQuery() {
  const {
    data: gauges,
    loading: isLoading,
    error,
    refetch: refetchGauges,
  } = useGetLiquidityGaugesQuery({
    pollInterval: 15000,
  });

  useEffect(() => {
    if (error) {
      console.log(error);
    }
  }, [error]);

  return {
    gauges: gauges?.getLiquidityGauges || [],
    isLoading,
    refetchGauges,
  };
}
