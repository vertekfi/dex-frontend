import { useGetUserStakesQuery } from '~/apollo/generated/graphql-codegen-generated';
import { useUserAccount } from '~/lib/user/useUserAccount';

export function userUserStakingData() {
  const { userAddress } = useUserAccount();

  const {
    data: userGaugeData,
    loading: isLoadingUserGauges,
    refetch: refetchUserGauges,
  } = useGetUserStakesQuery({
    variables: {
      user: userAddress || '',
      poolIds: [],
    },
    pollInterval: 30000,
    notifyOnNetworkStatusChange: true,
  });

  return {
    userGaugeData,
    isLoadingUserGauges,
    refetchUserGauges,
  };
}
