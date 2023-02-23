import { useNetworkConfig } from '~/lib/global/useNetworkConfig';
import { useUserAccount } from '~/lib/user/useUserAccount';
import { useSubmitTransaction } from '~/lib/util/useSubmitTransaction';

export function useProtocolRewardClaim() {
  const { userAddress } = useUserAccount();
  const networkConfig = useNetworkConfig();

  const { submitAsync, ...rest } = useSubmitTransaction({
    config: {
      addressOrName: networkConfig.balancer.feeDistributor || '',
      contractInterface: ['function claimTokens(address, address[]) external'],
      functionName: 'claimTokens',
    },
    transactionType: 'HARVEST',
  });

  function claimProtocolRewards() {
    return submitAsync({
      args: [
        userAddress,
        [
          '0x0db861235c7b90d419a64e1f71b3687db74d4477',
          '0x8e15953eba7d5f8f99853d8f3cb64fc73b3ba770',
          '0x6e30ec031f2d94c397e469b40f86bff0be014124',
          '0x32934c1122c0d7b0fc3daab588a4490b53c1568c',
          '0x64bf08fac067b25c77967affafce73760d8d0bdf',
          '0xae42be6a9f75a2b53229e262e0488df6ecfeb53a',
          '0xcf61cf9654f5536b8d6c93f09a0308ff3c2650f9',
          '0xdb043d8a95ad4d3ae0be21a6b34484a345c93481',
          '0x9ee22f8b21b53323ae34d153e475aea6363b3ba7',
          '0xeD236c32f695c83Efde232c288701d6f9C23E60E',
        ],
      ],
      toastText: 'Claim pending rewards',
    });
  }

  return {
    claimProtocolRewards,
    txState: rest,
  };
}
