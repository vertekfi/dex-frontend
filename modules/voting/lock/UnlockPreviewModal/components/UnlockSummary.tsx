import { Flex, Heading } from '@chakra-ui/react';
import { bnum } from '~/lib/util/big-number.utils';
import { fNum2, FNumFormats } from '~/lib/util/useNumber';
import { PRETTY_DATE_FORMAT } from '~/modules/voting/constants';
import { format } from 'date-fns';
import { tokenFormatAmount } from '~/lib/services/token/token-util';

type Props = {
  lockablePool: any;
  lockEndDate: number;
  currentVeBalance: string;
};

export function UnlockSummary(props: Props) {
  const poolShares = bnum(props.lockablePool.dynamicData.totalLiquidity).div(
    props.lockablePool.dynamicData.totalShares,
  );

  const fiatTotalLockedAmount = poolShares.times(props.currentVeBalance).toString();

  return (
    <div>
      <Heading as="h6" size="md" pb={2}>
        Unlocking Summary
      </Heading>
      <Flex justify="space-between">
        <div>Total to unlock</div>
        <div>{fNum2(fiatTotalLockedAmount, FNumFormats.fiat)}</div>
      </Flex>

      <Flex justify="space-between">
        <div>Total voting escrow</div>
        <div>{tokenFormatAmount(props.currentVeBalance)}</div>
      </Flex>

      <Flex justify="space-between">
        <div>Expired on</div>
        <div>{format(new Date(props.lockEndDate), PRETTY_DATE_FORMAT)}</div>
      </Flex>
    </div>
  );
}
