import BigNumber from 'bignumber.js';
import { useEffect, useState } from 'react';
import { Text, Box, Button, Flex } from '@chakra-ui/react';
import { useNumbers } from '~/lib/global/useNumbers';
import { VeBalLockInfo } from '~/lib/services/balancer/contracts/veBAL';
import { bnum } from '~/lib/util/big-number.utils';
import { useVeVRTK } from '~/modules/voting/lib/useVeVRTK';
import { LockType } from '../types';
import { FNumFormats } from '~/lib/util/useNumber';
import { format } from 'date-fns';
import { PRETTY_DATE_FORMAT } from '~/modules/voting/constants';

type Props = {
  lockablePool: any;
  totalLpTokens: string;
  lockEndDate: string;
  lockAmount: string;
  expectedVeBalAmount: string;
  lockType: LockType[];
  veBalLockInfo?: VeBalLockInfo;
};

export function LockSummary(props: Props) {
  const [poolShares, setPoolShares] = useState<BigNumber>();
  const [fiatTotalLockedAmount, setFiatTotalLockedAmount] = useState<string>('0');
  const [fiatTotalLockAmount, setFiatTotalLockAmount] = useState<string>('0');
  const [fiatTotalLpTokens, setFiatTotalLpTokens] = useState<string>('0');
  const [isExtendLockOnly, setIsExtendLockOnly] = useState<boolean>();
  const [isIncreaseLockOnly, setIsIncreaseLockOnly] = useState<boolean>();

  const { fNum2 } = useNumbers();
  const { veBalTokenInfo } = useVeVRTK();

  const lockEndDateObject = new Date(props.lockEndDate);
  console.log(props.lockEndDate);
  console.log(props.lockAmount);


  useEffect(() => {
    if (props.lockablePool) {
      setPoolShares(bnum(props.lockablePool.totalLiquidity).div(props.lockablePool.totalShares));
    }
  }, [props.lockablePool]);

  useEffect(() => {
    if (poolShares) {
      setFiatTotalLockedAmount(poolShares.times(props.lockAmount).toString());
      setFiatTotalLpTokens(poolShares.times(props.totalLpTokens).toString());
    }
  }, [poolShares, props.lockAmount, props.totalLpTokens]);

  useEffect(() => {
    if (props.lockType.length === 1 && props.lockType.includes(LockType.EXTEND_LOCK)) {
      setIsExtendLockOnly(true);
    }

    if (props.lockType.length === 1 && props.lockType.includes(LockType.INCREASE_LOCK)) {
      setIsIncreaseLockOnly(true);
    }
  }, [props.lockType]);

  return (
    <Box
      bg="vertek.slatepurple.900"
      height="full"
      padding="4"
      boxShadow="2px 24px 12px 0px #000, 0px 0px 12px 4px #000"
      borderRadius="md"
      mb="4"
    >
      <Box
        mt="1"
        pt="2"
        mb=""
        borderRadius="16px"
        justifyContent="center"
        fontWeight="bold"
        fontSize="1.1rem"
        alignItems="center"
        flexDirection="column"
      >
        <Flex align="center" mt="2">
          <Text fontWeight="normal" mr="auto">
            {isExtendLockOnly || isIncreaseLockOnly ? 'Total already locked' : 'Total to lock'}
          </Text>
          <Text ml="auto">
            {fNum2(
              isIncreaseLockOnly ? fiatTotalLockedAmount : fiatTotalLpTokens,
              FNumFormats.fiat,
            )}
          </Text>
        </Flex>
        <Flex align="center" mt="1">
          <Text fontWeight="normal" mr="auto">
            {isExtendLockOnly ? 'New lock-up end date' : 'Lock-up end date'}
          </Text>
          {isIncreaseLockOnly && (
            <Text>
              <div>
                Increased lock amount
                <div>{fNum2(fiatTotalLockAmount, FNumFormats.fiat)}</div>
              </div>
            </Text>
          )}
        </Flex>

        <Flex align="center" mt="1">
          <Text fontWeight="normal" mr="auto">
              {isExtendLockOnly ? 'New lock-up end date' : 'Lock-up end date'}
          </Text>
          <Text fontWeight="bold" ml="auto">
              {props.lockEndDate && format(lockEndDateObject, PRETTY_DATE_FORMAT)}
          </Text>
        </Flex>

        <Flex align="center" mt="1">
          <Text fontWeight="normal" mr="auto">
            Total voting escrow{' '}
          </Text>
          <Text ml="auto">{fNum2(props.expectedVeBalAmount, FNumFormats.token)} veVRTK </Text>
        </Flex>
        <Flex mt="8">
          <Button variant="vertekdark" width="100%" height="2.2rem">
            Approve LP for locking
          </Button>
        </Flex>
      </Box>
    </Box>
  );
}
