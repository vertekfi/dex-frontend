import { Flex, Heading } from '@chakra-ui/react';
import { bnum } from '~/lib/util/big-number.utils';
import { fNum2, FNumFormats } from '~/lib/util/useNumber';
import { PRETTY_DATE_FORMAT } from '~/modules/voting/constants';
import { format } from 'date-fns';
import { LockType } from '../../types';
// import { VeBalToolTipExplainer } from './VeBalToolTipExplainer';

type Props = {
  lockablePool: any;
  totalLpTokens: string;
  lockEndDate: string;
  lockAmount: string;
  expectedVeBalAmount: string;
  lockType: LockType[];
  currentVeBalance: string;
};

export function LockSummary(props: Props) {
  const poolShares = bnum(props.lockablePool.dynamicData.totalLiquidity).div(
    props.lockablePool.dynamicData.totalShares,
  );

  const fiatTotalLockedAmount = poolShares.times(props.currentVeBalance.replace(/,/g, '')).toString();
  const fiatTotalLockAmount = poolShares.times(props.lockAmount).toString();
  const fiatTotalLpTokens = poolShares.times(props.totalLpTokens).toString();

  const isExtendLockOnly =
    props.lockType.length === 1 && props.lockType.includes(LockType.EXTEND_LOCK);

  const isIncreaseLockOnly =
    props.lockType.length === 1 && props.lockType.includes(LockType.INCREASE_AMOUNT);

  return (
    <div>
      <Heading as="h6" size="md" pb={2}>
        Locking Summary
      </Heading>
      <Flex justify="space-between">
        <div>
          {isExtendLockOnly || isIncreaseLockOnly ? 'Total already locked' : 'Total to lock'}
        </div>
        <div>
          {fNum2(isIncreaseLockOnly ? fiatTotalLockedAmount : fiatTotalLpTokens, FNumFormats.fiat)}
        </div>
      </Flex>

      {isIncreaseLockOnly && (
        <Flex justify="space-between">
          <div>Increased lock amount</div>
          <div>{fNum2(fiatTotalLockAmount, FNumFormats.fiat)}</div>
        </Flex>
      )}

      <Flex justify="space-between">
        <div>{isExtendLockOnly ? 'New lock-up end date' : 'Lock-up end date'}</div>
        <div>{format(new Date(props.lockEndDate), PRETTY_DATE_FORMAT)}</div>
      </Flex>

      <Flex justify="space-between">
        <div>Total voting escrow</div>
        <Flex justify="center">{fNum2(props.expectedVeBalAmount, FNumFormats.token)} veVRTK</Flex>
      </Flex>
    </div>
  );
}
