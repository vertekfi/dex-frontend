import { getAddress } from 'ethers/lib/utils';
import { useEffect, useState } from 'react';
import { LiquidityGaugeClass } from '~/lib/services/balancer/contracts/liquidity-gauge';

type MulticallerResult = Record<string, { isKilled: boolean }>;

export function useExpiredGaugesQuery(gaugeAddresses: string[]) {
  const [expiredGauges, setExpiredGauges] = useState<string[]>([]);

  useEffect(() => {
    const checkKilled = async () => {
      try {
        const multicaller = LiquidityGaugeClass.getMulticaller();

        for (const gaugeAddress of gaugeAddresses) {
          multicaller.call(
            `${getAddress(gaugeAddress)}.isKilled`,
            getAddress(gaugeAddress),
            'is_killed',
          );
        }

        const result = await multicaller.execute<MulticallerResult>();

        const expiredGaugeAddresses: string[] = [];
        for (const [address, value] of Object.entries(result)) {
          if (value.isKilled) {
            expiredGaugeAddresses.push(address);
          }
        }

        setExpiredGauges(expiredGaugeAddresses);
      } catch (error) {
        console.error('Error when fetching voting gauges is_killed status', {
          error,
        });

        setExpiredGauges([]);
      }
    };

    if (gaugeAddresses?.length) {
      checkKilled();
    }
  }, [gaugeAddresses]);

  return {
    expiredGauges,
  };
}
