import { createContext, ReactNode, useContext } from 'react';
import { useGetRewardPoolsQuery } from '~/apollo/generated/graphql-codegen-generated';
import { useUserAccount } from '~/lib/user/useUserAccount';
import { COMING_POOLS } from './data';

export interface RewardPoolContextType {}

function _useRewardPools() {
  const { userAddress } = useUserAccount();
  const {
    data,
    loading,
    error,
    networkStatus,
    refetch: refetchPools,
  } = useGetRewardPoolsQuery({
    fetchPolicy: 'cache-first',
    pollInterval: 30000,
    notifyOnNetworkStatusChange: true,
    variables: {
      user: userAddress,
    },
  });

  return {
    pools: data?.getRewardPools || [],
    loading,
    error,
    networkStatus,
    refetchPools,
  };

  return {
    pools: COMING_POOLS,
  };
}

export const RewardPoolContext = createContext<ReturnType<typeof _useRewardPools> | null>(null);

export function RewardPoolProvider(props: { children: ReactNode }) {
  const value = _useRewardPools();

  return <RewardPoolContext.Provider value={value}>{props.children}</RewardPoolContext.Provider>;
}

export function useRewardPools() {
  return useContext(RewardPoolContext) as ReturnType<typeof _useRewardPools>;
}
