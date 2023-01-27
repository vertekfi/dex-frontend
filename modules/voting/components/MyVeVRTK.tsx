import { Box, Flex, GridItem, Text } from '@chakra-ui/react';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { useNumbers } from '~/lib/global/useNumbers';
import { VeBalLockInfo } from '~/lib/services/balancer/contracts/veBAL';
import { bnum } from '~/lib/util/big-number.utils';
import { PRETTY_DATE_FORMAT } from '../constants';
import { useVeVRTK } from '../lib/useVeVRTK';

type Props = {
  veBalLockInfo?: VeBalLockInfo;
};

export function MyVeVRTK(props: Props) {
  const [percentVeVRTK, setPercentVeVRTK] = useState<string>();

  const { veBalBalance, veBalTokenInfo } = useVeVRTK();
  const { fNum2 } = useNumbers();

  useEffect(() => {
    if (props.veBalLockInfo) {
      const totalSupply = bnum(props.veBalLockInfo.totalSupply);
      if (totalSupply.gt(0)) {
        setPercentVeVRTK(
          fNum2(bnum(veBalBalance).div(totalSupply).toString(), {
            style: 'percent',
            maximumFractionDigits: 4,
          }),
        );
      }
    }
  }, [props.veBalLockInfo]);

  return (
    <GridItem
      width={{ base: '90%', md: 'auto' }}
      height={{ base: 'auto', md: '40%' }}
      m={{ base: '2', md: '2' }}
      padding="2"
      mt={{ base: '6', md: '24' }}
      mb={{ base: '6rem', md: 'auto' }}
      bgColor="vertek.slate.900"
      borderRadius="12px"
    >
      <Text align="left" padding="1" mb="2" fontWeight="bold" color="white" fontSize="1.2rem">
        Governance -- veVRTK
      </Text>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="space-between"
        paddingX="1"
        paddingY="4"
        mx="1"
        my="4"
        bgColor="vertek.slatepurple.900"
        boxShadow="2px 24px 12px 0px #000"
        borderRadius="16px"
        flexDirection="column"
      >
        <Flex align="center" mt="3">
          <Text fontWeight="bold" fontSize=".9rem" mr="auto">
            My veVRTK
          </Text>
          <Text fontSize="1rem" ml="auto">
            {props.veBalLockInfo?.lockedAmount} - {veBalTokenInfo?.symbol}
          </Text>
        </Flex>

        <Flex align="center" mt="2">
          <Text fontWeight="bold" fontSize=".9rem" mr="auto">
            My share of total veVRTK
          </Text>
          <Text fontSize="1rem" ml="auto">
            {percentVeVRTK}
          </Text>
        </Flex>
        <Flex align="center" mt="2">
          <Text fontWeight="bold" fontSize=".9rem" mr="auto">
            Locked until
          </Text>
          <Text fontSize="1rem" ml="auto">
            {props.veBalLockInfo?.hasExistingLock
              ? format(props.veBalLockInfo.lockedEndDate, PRETTY_DATE_FORMAT)
              : '-'}
          </Text>
        </Flex>
      </Box>
    </GridItem>
  );
}
