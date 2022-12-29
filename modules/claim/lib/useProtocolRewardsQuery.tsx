import { useEffect, useState } from 'react';
import { networkConfig } from '~/lib/config/network-config';
import { FeeDistributor } from '~/lib/services/balancer/contracts/fee-distributor';
import { BalanceMap } from '~/lib/services/token/token-types';
import { useUserAccount } from '~/lib/user/useUserAccount';

export function useProtocolRewardsQuery() {
  const [protocolRewards, setProtocolRewards] = useState<BalanceMap>();
  const [isLoading, setIsloading] = useState(false);

  const { isConnected, userAddress } = useUserAccount();

  const feeDistributorV2 = new FeeDistributor(networkConfig.balancer.feeDistributor);

  // TODO: Can use apollo cache to manage some of these things instead using intervals

  useEffect(() => {
    const getData = async () => {
      if (userAddress) {
        try {
          setIsloading(true);
          const data = await feeDistributorV2.getClaimableBalances(userAddress);
          setProtocolRewards(data);
          setIsloading(false);
        } catch (error) {
          console.error('Failed to fetch claimable protocol balances', error);
          setIsloading(false);
          return setProtocolRewards({});
        }
      }
    };

    if (isConnected) {
      getData();
    }
  }, [isConnected, userAddress]);

  return {
    protocolRewards,
    isLoading,
  };
}
