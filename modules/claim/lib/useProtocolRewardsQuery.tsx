import { useQuery } from 'react-query';
import { networkConfig } from '~/lib/config/network-config';
import { FeeDistributor } from '~/lib/services/balancer/contracts/fee-distributor';
import { BalanceMap } from '~/lib/services/token/token-types';
import { useUserAccount } from '~/lib/user/useUserAccount';

const feeDistributorV2 = new FeeDistributor(networkConfig.balancer.feeDistributor);

export function useProtocolRewardsQuery() {
  const { isConnected, userAddress } = useUserAccount();

  const queryFn = async (): Promise<BalanceMap> => {
    try {
      if (!isConnected) {
        return {};
      }
      // const data = await feeDistributorV2.getClaimableBalances(userAddress || '');
      // return data;

      return {};
    } catch (error) {
      console.error('Failed to fetch claimable protocol balances', error);
      return {};
    }
  };

  return useQuery<BalanceMap>(['claims', 'protocol', userAddress], queryFn, {
    enabled: !!userAddress && isConnected,
  });
}
