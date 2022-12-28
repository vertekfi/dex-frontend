import { useGetLiquidityGaugesQuery } from '~/apollo/generated/graphql-codegen-generated';

export function useGetGaugesQuery() {
  const {
    data: gauges,
    loading: isLoading,
    refetch: refetchGauges,
  } = useGetLiquidityGaugesQuery({
    pollInterval: 30000,
    notifyOnNetworkStatusChange: true,
  });

  return {
    gauges: gauges?.getLiquidityGauges || [],
    isLoading,
    refetchGauges,
  };
}
