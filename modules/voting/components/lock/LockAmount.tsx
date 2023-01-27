import { useEffect, useState } from 'react';
import BigNumber from 'bignumber.js';
import { GqlPoolDynamicData } from '~/apollo/generated/graphql-codegen-generated';
import { bnum } from '~/lib/util/big-number.utils';
import { TokenInfo } from '~/modules/claim/types';
import { useLockState } from './lib/useLockState';

type Props = {
  lockablePool: GqlPoolDynamicData;
  lockablePoolTokenInfo: TokenInfo;
};

export function LockAmount(props: Props) {
  const [lockAmountFiatValue, setLockAmountFiatValue] = useState<BigNumber>();

  const { lockAmount } = useLockState();

  useEffect(() => {
    if (props.lockablePool) {
      setLockAmountFiatValue(
        bnum(props.lockablePool.totalLiquidity)
          .div(props.lockablePool.totalShares)
          .times(lockAmount),
      );
    }
  }, [props.lockablePool]);
}
