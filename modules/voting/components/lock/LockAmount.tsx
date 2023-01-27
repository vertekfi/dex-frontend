import { useEffect, useState } from 'react';
import BigNumber from 'bignumber.js';
import { bnum } from '~/lib/util/big-number.utils';
import { useLockState } from './lib/useLockState';
import { FormControl, FormLabel, Input } from '@chakra-ui/react';
import { networkConfig } from '~/lib/config/network-config';
import { useUserData } from '~/lib/user/useUserData';

type Props = {
  lockablePool: any;
  // lockablePoolTokenInfo: TokenInfo;
};

export function LockAmount(props: Props) {
  const [lockAmountFiatValue, setLockAmountFiatValue] = useState<BigNumber>();

  const { lockAmount, setLockAmount } = useLockState();
  const { bptBalanceForPool } = useUserData();

  useEffect(() => {
    if (props.lockablePool) {
      setLockAmountFiatValue(
        bnum(props.lockablePool.totalLiquidity)
          .div(props.lockablePool.totalShares)
          .times(lockAmount),
      );
    }
  }, [props.lockablePool]);

  return (
    <>
      <div>
        <FormControl mb="4">
          <Input
            focusBorderColor="vertek.neonpurple.500"
            id="voteWeight"
            name="voteWeight"
            type="number"
            value={lockAmount}
            onChange={(event) => setLockAmount(event.target.value)}
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
            step="any"
            placeholder="0.00"
            size="md"
            fontWeight="bold"
          />
          <FormLabel mt="2" mb="4" color="white" fontWeight="bold">
            {bptBalanceForPool(networkConfig.balancer.votingEscrow.lockablePoolId)} shares available
          </FormLabel>
        </FormControl>
      </div>
    </>
  );
}
