import { createContext, ReactNode, useContext } from 'react';
import { useGetLiquidityGaugesQuery } from '~/apollo/generated/graphql-codegen-generated';

export function _useGauges() {
  const { data: gauges, loading, networkStatus, refetch } = useGetLiquidityGaugesQuery();

  console.log(gauges);

  return {
    gauges: gauges?.getLiquidityGauges || [],
    refetch,
    loading,
    networkStatus,
  };
}

export const GaugeListContext = createContext<ReturnType<typeof _useGauges> | null>(null);

export function GaugeListProvider(props: { children: ReactNode }) {
  const value = _useGauges();

  return <GaugeListContext.Provider value={value}>{props.children}</GaugeListContext.Provider>;
}

export function useGauges() {
  return useContext(GaugeListContext) as ReturnType<typeof _useGauges>;
}
