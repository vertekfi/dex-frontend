import { Flex, SimpleGrid, Text, Button, useDisclosure, GridItem, Box } from '@chakra-ui/react';
import { RewardPool, useGetTokenPricesQuery } from '~/apollo/generated/graphql-codegen-generated';
import { RewardPoolDepositModal } from './components/RewardPoolDepositModal';
import { RewardPoolNftDepositModal } from './components/RewardPoolNftDepositModal';
import { RewardPoolWithdrawModal } from './components/RewardPoolWithdrawModal';
import { RewardPoolNftWithdrawModal } from './components/RewardPoolNftWithdrawModal';
import { useRewardPoolDeposit } from './lib/useRewardPoolDeposit';
import StakingNFTPools from '../../lib/abi/StakingNFTPools.json';
import { useRewardPoolWithdraw } from './lib/useRewardPoolWithdraw';

import { readContract, getAccount } from '@wagmi/core';
import { formatUnits } from 'ethers/lib/utils';
import { useEffect, useState } from 'react';

export function StakingCardGuts(props: {
  pool: any;
  // pool: RewardPool;
  poolInfo: any;
  apr: any;
  aprDaily: any;
  priceOfToken: any;
  boostedAprDaily: any;
}) {
  const pool = props.pool;
  const poolInfo = props.poolInfo;
  const apr = props.apr;
  const aprDaily = props.aprDaily;
  const boostedAprDaily = props.boostedAprDaily;
  const priceOfToken = props.priceOfToken;

  const { isOpen: isDepositOpen, onOpen: onDepositOpen, onClose: onDepositClose } = useDisclosure();
  const {
    isOpen: isDepositNftOpen,
    onOpen: onDepositNftOpen,
    onClose: onDepositNftClose,
  } = useDisclosure();
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
  const { withdrawFromPool, ...withdrawQuery } = useRewardPoolWithdraw(pool.address);

  const account = getAccount();
  const [userInfo, setUserInfo] = useState<any>();
  const [userTokens, setUserTokens] = useState<string>();
  const [userUnclaimedRewards, setUserUnclaimedRewards] = useState<string>();

  const { data: pricesResponse } = useGetTokenPricesQuery();

  // console.log('pricesResponse', pricesResponse);

  // vertek token = 0xeD236c32f695c83Efde232c288701d6f9C23E60E

  const priceOfTokenRewards =
    pricesResponse &&
    pricesResponse.tokenPrices
      .filter((item: any) => item.address === pool.rewardToken.address.toLowerCase())[0]
      .price.toFixed(2);

  useEffect(() => {
    if (!account.address) return;
    readContract({
      addressOrName: '0xDBC838Ee888407815889d5603bc679A81715F928',
      contractInterface: StakingNFTPools,
      chainId: 56,
      functionName: 'userInfo',
      args: [0, account.address],
    }).then((res) => {
      setUserInfo(res);
      setUserTokens(parseFloat(formatUnits(res.amount.toString(), 18)).toFixed(2));
    });
  }, [account]);

  useEffect(() => {
    if (!account.address) return;
    readContract({
      addressOrName: '0xDBC838Ee888407815889d5603bc679A81715F928',
      contractInterface: StakingNFTPools,
      chainId: 56,
      functionName: 'pendingRewards',
      args: [0, account.address],
    }).then((res) => {
      setUserUnclaimedRewards(
        parseFloat(
          formatUnits(res.xbooReward.toString(), 18) +
            formatUnits(res.magicatReward.toString(), 18),
        ).toFixed(2),
      );
    });
  }, [account]);

  return (
    <>
      <SimpleGrid
        style={{ minWidth: '100%' }}
        bg=""
        borderTopRadius="20px"
        columns={2}
        gap={10}
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
          <Text fontSize=".8rem" textAlign="right" style={{ color: 'red' }}>
            +{boostedAprDaily.toFixed(2)}% Daily with NFT
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
            // onClick={() => withdrawFromPool(pool.poolId, '0')}
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
