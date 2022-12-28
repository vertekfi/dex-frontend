import { useEffect, useState } from 'react';
import { VeBAL, VeBalLockInfo } from '~/lib/services/balancer/contracts/veBAL';
import { useUserAccount } from '~/lib/user/useUserAccount';

export function useUserVeLockInfoQuery() {
  const [userLockInfo, setUserLockInfo] = useState<VeBalLockInfo>();

  const { userAddress, isConnected } = useUserAccount();

  useEffect(() => {
    const getLockInfo = async () => {
      if (userAddress) {
        const data = await new VeBAL().getLockInfo(userAddress);
        setUserLockInfo(data);
      }
    };

    if (isConnected) {
      getLockInfo();
    }
  }, [isConnected]);

  return {
    userLockInfo,
  };
}
