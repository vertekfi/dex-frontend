import { createContext, ReactNode, useContext } from 'react';
import { useGetLiquidityGaugesQuery } from '~/apollo/generated/graphql-codegen-generated';

export function _useGetGauges() {
  const {} = useGetLiquidityGaugesQuery();
}

export const GaugeListContext = createContext<ReturnType<typeof _useGetGauges> | null>(null);

export function GaugeListProvider(props: { children: ReactNode }) {
  const value = _useGetGauges();

  return <GaugeListContext.Provider value={value}>{props.children}</GaugeListContext.Provider>;
}

export function useGetGauges() {
  return useContext(GaugeListContext) as ReturnType<typeof _useGetGauges>;
}
