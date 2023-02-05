import { Flex, SimpleGrid, Text, Button, useDisclosure, GridItem, Box } from '@chakra-ui/react';
import { RewardPool, useGetTokenPricesQuery } from '~/apollo/generated/graphql-codegen-generated';
import { RewardPoolDepositModal } from './components/RewardPoolDepositModal';
import { RewardPoolNftDepositModal } from './components/RewardPoolNftDepositModal';
import { RewardPoolWithdrawModal } from './components/RewardPoolWithdrawModal';
import { RewardPoolNftWithdrawModal } from './components/RewardPoolNftWithdrawModal';
import { useRewardPoolDeposit } from './lib/useRewardPoolDeposit';
import StakingNFTPools from '../../lib/abi/StakingNFTPools.json';

import { readContract } from '@wagmi/core';
import { formatUnits } from 'ethers/lib/utils';
import { useEffect, useState } from 'react';

export function StakingCardGuts(props: { pool: RewardPool }) {
  const pool = props.pool;

  const { isOpen: isDepositOpen, onOpen: onDepositOpen, onClose: onDepositClose } = useDisclosure();
  const { isOpen: isDepositNftOpen, onOpen: onDepositNftOpen, onClose: onDepositNftClose } = useDisclosure();
  const {
    isOpen: isWithdrawOpen,
    onOpen: onWithdrawOpen,
    onClose: onWithdrawClose,
  } = useDisclosure();
  const {
    isOpen: isWithdrawNftOpen,
    onOpen: onWithdrawNftOpen,
    onClose: onWithdrawNftClose,
  } = useDisclosure();

  const { depositToPool, ...depositQuery } = useRewardPoolDeposit(pool);

  const [userInfo, setUserInfo] = useState<any>();
  const [poolInfo, setPoolInfo] = useState<any>();
  const [apr, setApr] = useState<string>();
  const [aprDaily, setAprDaily] = useState<string>();
  const [userTokens, setUserTokens] = useState<string>();
  const [userUnclaimedRewards, setUserUnclaimedRewards] = useState<string>();

  const { data: pricesResponse } = useGetTokenPricesQuery();

  console.log('pricesResponse', pricesResponse);

  // vertek token = 0xeD236c32f695c83Efde232c288701d6f9C23E60E
  const priceOfToken =
    pricesResponse &&
    pricesResponse.tokenPrices
      .filter((item: any) => item.address === '0xed236c32f695c83efde232c288701d6f9c23e60e')[0]
      .price.toFixed(2);
  const priceOfTokenRewards =
    pricesResponse &&
    pricesResponse.tokenPrices
      .filter((item: any) => item.address === pool.rewardToken.address.toLowerCase())[0]
      .price.toFixed(2);

  useEffect(() => {
    readContract({
      addressOrName: '0x9b5c9187561d44a7548dc3680475bfdf8c6f86e2',
      contractInterface: StakingNFTPools,
      chainId: 56,
      functionName: 'userInfo',
      args: [0, '0x592aB600783835E938Df928A5ae1aa56652b22D3'],
    }).then((res) => {
      setUserInfo(res);
      setUserTokens(parseFloat(formatUnits(res.amount.toString(), 18)).toFixed(2));
      setUserUnclaimedRewards(
        parseFloat(formatUnits((res.rewardDebt + res.catDebt).toString(), 18)).toFixed(2),
      );
    });
  }, []);

  useEffect(() => {
    readContract({
      addressOrName: '0x9b5c9187561d44a7548dc3680475bfdf8c6f86e2',
      contractInterface: StakingNFTPools,
      chainId: 56,
      functionName: 'poolInfo',
      args: [0],
    }).then((res) => {
      const rewardsPerYear = formatUnits(res.RewardPerSecond.mul(60).mul(60).mul(24), 18);
      const stakedAmount = formatUnits(res.xBooStakedAmount, 18);
      const apr = (parseInt(rewardsPerYear) * parseInt(stakedAmount) * 100).toFixed(2).toString();
      const aprYearly = (parseInt(rewardsPerYear) * parseInt(stakedAmount) * 365 * 100)
        .toFixed(2)
        .toString();
      setAprDaily(apr);
      setApr(aprYearly);
      setPoolInfo(res);
    });
  }, []);

  // {amount:   uint256
  // rewardDebt:   uint256
  // catDebt:   uint256
  // mp:   uint256}

  console.log('poolInfo', poolInfo);

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
            {apr}%
          </Text>
          <Text fontSize="0.7rem" textAlign="right">
            {aprDaily}% Daily
          </Text>
        </Flex>

        <Text textAlign="left" fontWeight="bold">
          Earning
        </Text>
        <Flex direction="column" alignItems="flex-end">
          <Text textAlign="right" fontWeight="bold">
            {userUnclaimedRewards} {pool.rewardToken.symbol}
          </Text>
          {priceOfTokenRewards && userUnclaimedRewards && (
            <Text fontSize="0.7rem" textAlign="right">
              $
              {(parseFloat(userUnclaimedRewards) ** parseFloat(priceOfTokenRewards))
                .toFixed(2)
                .toString()}
            </Text>
          )}
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
              {userTokens}VRTK
            </Text>
          )}
          {userTokens && priceOfToken && (
            <Text fontSize="0.7rem" textAlign="right">
              ${(parseFloat(userTokens) * parseFloat(priceOfToken)).toFixed(2).toString()}
            </Text>
          )}
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
        <GridItem
          colSpan={2}
          gap="3"
          marginX=""
          alignItems="center"
          justifyContent="center"
          display="flex"
          width="full"
        >
          <Button variant="verteklight" disabled={false} width="full" onClick={onWithdrawNftOpen}>
            Unstake NFT
          </Button>
          <Button variant="vertekdark" disabled={false} width="full" onClick={onDepositNftOpen}>
            Stake NFT
          </Button>
        </GridItem>
      </SimpleGrid>

      <RewardPoolDepositModal
        isOpen={isDepositOpen}
        onOpen={onDepositOpen}
        onClose={onDepositClose}
        pool={pool}
      />
        <RewardPoolNftDepositModal
        isOpen={isDepositNftOpen}
        onOpen={onDepositNftOpen}
        onClose={onDepositNftClose}
        pool={pool}
      />

      <RewardPoolWithdrawModal
        isOpen={isWithdrawOpen}
        onOpen={onWithdrawOpen}
        onClose={onWithdrawClose}
        pool={pool}
      />
      <RewardPoolNftWithdrawModal
        isOpen={isWithdrawNftOpen}
        onOpen={onWithdrawNftOpen}
        onClose={onWithdrawNftClose}
        pool={pool}
      />
    </>
  );
}
