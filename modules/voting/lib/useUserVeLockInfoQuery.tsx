import { useQuery } from 'react-query';
import { VeBAL } from '~/lib/services/balancer/contracts/veBAL';
import { useUserAccount } from '~/lib/user/useUserAccount';

export function useUserVeLockInfoQuery() {
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
