import { useQuery } from 'react-query';
import { networkConfig } from '~/lib/config/network-config';
import { FeeDistributor } from '~/lib/services/balancer/contracts/fee-distributor';
import { BalanceMap } from '~/lib/services/token/token-types';
import { useUserAccount } from '~/lib/user/useUserAccount';

export function useProtocolRewardsQuery() {
  const { isConnected, userAddress } = useUserAccount();

  const queryFn = async (): Promise<BalanceMap> => {
    try {
      if (!isConnected || !userAddress) {
        return {};
      }
      const feeDistributorV2 = new FeeDistributor(networkConfig.balancer.feeDistributor);

      const data = await feeDistributorV2.getClaimableBalances(userAddress);
      console.log(data);
      return data;
    } catch (error) {
      console.error('Failed to fetch claimable protocol balances', error);
      return {};
    }
  };

  return useQuery<BalanceMap>(['claims', 'protocol', userAddress], queryFn, {
    enabled: true,
  });
}
