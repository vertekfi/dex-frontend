import { useQuery, UseQueryResult } from 'react-query';
import { VeBAL, VeBalLockInfo } from '~/lib/services/balancer/contracts/veBAL';
import { useUserAccount } from '~/lib/user/useUserAccount';

export function useUserVeLockInfoQuery(): UseQueryResult<any> {
  const { userAddress, isConnected } = useUserAccount();

  const queryFn = async () => {
    if (userAddress && isConnected) {
      return await new VeBAL().getLockInfo(userAddress);
    }
  };

  return useQuery(['VeBalLockInfo', 'userAddress'], queryFn, {
    refetchInterval: 30000,
  });
}
