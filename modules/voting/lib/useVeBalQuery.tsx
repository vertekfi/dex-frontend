import { useQuery } from 'react-query';
import { balancerContractsService } from '~/lib/services/balancer/balancer-contracts.service';
import { useUserAccount } from '~/lib/user/useUserAccount';

export function useVeBalQuery() {
  const { userAddress, isConnected } = useUserAccount();

  const queryFn = async () => {
    return await balancerContractsService.veBAL.getLockInfo(userAddress);
  };

  return useQuery(['tokens', 'veBAL', { userAddress }], queryFn, {
    refetchIntervalInBackground: true,
    refetchInterval: 10000,
    enabled: isConnected,
  });
}
