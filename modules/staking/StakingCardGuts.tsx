import { Flex, SimpleGrid, Text, Button, useDisclosure, GridItem, Box } from '@chakra-ui/react';
import { RewardPool, useGetTokenPricesQuery } from '~/apollo/generated/graphql-codegen-generated';
import { RewardPoolDepositModal } from './components/RewardPoolDepositModal';
import { RewardPoolWithdrawModal } from './components/RewardPoolWithdrawModal';
import { useRewardPoolDeposit } from './lib/useRewardPoolDeposit';
import StakingNFTPools from '../../lib/abi/StakingNFTPools.json';

import { readContract } from '@wagmi/core';
import { formatUnits } from 'ethers/lib/utils';
import { useEffect, useState } from 'react';

export function StakingCardGuts(props: { pool: RewardPool }) {
  const pool = props.pool;

  const { isOpen: isDepositOpen, onOpen: onDepositOpen, onClose: onDepositClose } = useDisclosure();
  const {
    isOpen: isWithdrawOpen,
    onOpen: onWithdrawOpen,
    onClose: onWithdrawClose,
  } = useDisclosure();

  const { depositToPool, ...depositQuery } = useRewardPoolDeposit(pool);

  const [userInfo, setUserInfo] = useState<any>();

  const { data: pricesResponse } = useGetTokenPricesQuery();

  // vertek token = 0xeD236c32f695c83Efde232c288701d6f9C23E60E
  const priceOfToken = pricesResponse && pricesResponse.tokenPrices.filter((item: any)=> item.address === '0xeD236c32f695c83Efde232c288701d6f9C23E60E')

  useEffect(() => {
    readContract({
      addressOrName: '0x9b5c9187561d44a7548dc3680475bfdf8c6f86e2',
      contractInterface: StakingNFTPools,
      chainId: 56,
      functionName: 'userInfo',
      args: [0, '0x592aB600783835E938Df928A5ae1aa56652b22D3'],
    }).then((res) => {
      setUserInfo(res);
      // setPrice(pricesResponse.filter)
    });
  }, []);

  // {amount:   uint256
  // rewardDebt:   uint256
  // catDebt:   uint256
  // mp:   uint256}

  console.log('pricesResponse',  priceOfToken);
  console.log('pricesResponse', pool.address);

  return (
    <>
      <SimpleGrid
        style={{ minWidth: '100%' }}
        bg=""
        borderTopRadius="20px"
        columns={2}
        spacing={10}
        padding="1.5em"
        marginTop="4"
      >
        <Text textAlign="left" fontWeight="bold">
          APR
        </Text>
        <Flex direction="column">
          <Text textAlign="right" fontWeight="bold">
            {pool.aprs.apr}%
          </Text>
          <Text fontSize="0.7rem" textAlign="right">
            {pool.aprs.daily}% Daily
          </Text>
        </Flex>

        <Text textAlign="left" fontWeight="bold">
          Earning
        </Text>
        <Flex direction="column" alignItems="flex-end">
          <Text textAlign="right" fontWeight="bold">
            {pool.userInfo?.pendingRewards} {pool.rewardToken.symbol}
          </Text>
          <Text fontSize="0.7rem" textAlign="right">
            ${pool.userInfo?.pendingRewardValue}
          </Text>
          <Button
            variant="verteklight"
            bgColor="vertek.neonpurple.500"
            background="none"
            padding="1em"
            borderRadius="10px"
            mt="2"
            ml="4"
            borderWidth="1px"
            alignItems="center"
            width="full"
            height="2em"
            disabled={false}
            onClick={() => depositToPool(pool.poolId, '0')}
          >
            Claim
          </Button>
        </Flex>

        <Text textAlign="left" fontWeight="bold">
          My Balance
        </Text>
        <Flex direction="column">
          {userInfo?.amount && (
            <Text textAlign="right" fontWeight="bold">
              {/* {pool.userInfo?.amountDeposited} VRTK */}
              {parseFloat(formatUnits(userInfo?.amount.toString(), 18)).toFixed(2)}VRTK
            </Text>
          )}
          <Text fontSize="0.7rem" textAlign="right">
            {/* ${pool.userInfo?.depositValue} */}
            NEED TO MULTIPLY BY PRICE
          </Text>
        </Flex>
        <GridItem
          colSpan={2}
          gap="3"
          marginX=""
          alignItems="center"
          justifyContent="center"
          display="flex"
          width="full"
        >
          <Button variant="verteklight" disabled={false} width="full" onClick={onWithdrawOpen}>
            Unstake
          </Button>
          <Button variant="vertekdark" disabled={false} width="full" onClick={onDepositOpen}>
            Stake
          </Button>
        </GridItem>
      </SimpleGrid>

      <RewardPoolDepositModal
        isOpen={isDepositOpen}
        onOpen={onDepositOpen}
        onClose={onDepositClose}
        pool={pool}
      />

      <RewardPoolWithdrawModal
        isOpen={isWithdrawOpen}
        onOpen={onWithdrawOpen}
        onClose={onWithdrawClose}
        pool={pool}
      />
    </>
  );
}
