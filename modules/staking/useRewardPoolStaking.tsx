import { createContext, ReactNode, useContext } from 'react';
import { useGetRewardPoolsQuery } from '~/apollo/generated/graphql-codegen-generated';

export interface RewardPoolContextType {}

function _useRewardPools() {
  const { data, loading, error, networkStatus, refetch } = useGetRewardPoolsQuery({
    pollInterval: 30000,
    notifyOnNetworkStatusChange: true,
  });

  return {
    pools: data?.getRewardPools || [],
    loading,
    error,
    networkStatus,
    refetch,
  };
}

export const RewardPoolContext = createContext<RewardPoolContextType | null>(null);

export function RewardPoolProvider(props: { children: ReactNode }) {
  const value = _useRewardPools();

  return <RewardPoolContext.Provider value={value}>{props.children}</RewardPoolContext.Provider>;
}

export function useRewardPools() {
  return useContext(RewardPoolContext) as ReturnType<typeof _useRewardPools>;
}
