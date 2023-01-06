import { Flex, SimpleGrid, Text, Button, useDisclosure } from '@chakra-ui/react';
import { RewardPool } from '~/apollo/generated/graphql-codegen-generated';
import { RewardPoolDepositModal } from './components/RewardPoolDepositModal';
import { RewardPoolWithdrawModal } from './components/RewardPoolWithdrawModal';

export function StakingCardGuts(props: { pool: RewardPool }) {
  const pool = props.pool;

  const { isOpen: isDepositOpen, onOpen: onDepositOpen, onClose: onDepositClose } = useDisclosure();
  const withdrawDisclosure = useDisclosure();

  return (
    <>
      <SimpleGrid
        style={{ minWidth: '100%' }}
        bg=""
        borderTopRadius="20px"
        columns={2}
        spacing={10}
        padding="20px"
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
        <Flex direction="column">
          <Text textAlign="right" fontWeight="bold">
            {pool.userInfo?.pendingRewards} {pool.rewardToken.symbol}
          </Text>
          <Text fontSize="0.7rem" textAlign="right">
            ${pool.userInfo?.pendingRewardValue}
          </Text>
          <Button variant="verteklight" disabled={false} width="full">
            Claim
          </Button>
        </Flex>

        <Text textAlign="left" fontWeight="bold">
          My Balance
        </Text>
        <Flex direction="column">
          <Text textAlign="right" fontWeight="bold">
            {pool.userInfo?.amountDeposited} VRTK
          </Text>
          <Text fontSize="0.7rem" textAlign="right">
            ${pool.userInfo?.depositValue}
          </Text>
        </Flex>

        <Button
          variant="verteklight"
          disabled={false}
          width="full"
          size="lg"
          onClick={onDepositOpen}
        >
          Stake
        </Button>
        <Button variant="vertekdark" disabled={false} width="full" size="lg">
          Unstake
        </Button>
      </SimpleGrid>

      <RewardPoolDepositModal
        isOpen={isDepositOpen}
        onOpen={onDepositOpen}
        onClose={onDepositClose}
        pool={pool}
      />

      <RewardPoolWithdrawModal
        isOpen={withdrawDisclosure.isOpen}
        onOpen={withdrawDisclosure.onOpen}
        onClose={withdrawDisclosure.onClose}
        pool={pool}
      />
    </>
  );
}
