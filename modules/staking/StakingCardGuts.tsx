import { Flex, SimpleGrid, Text, Button } from '@chakra-ui/react';
import { RewardPool } from '~/apollo/generated/graphql-codegen-generated';

export function StakingCardGuts(props: { pool: RewardPool }) {
  const pool = props.pool;

  return (
    <SimpleGrid
      style={{ minWidth: '100%' }}
      bg="vertek.slatepurple.900"
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

      <Button variant="vertekdark" disabled={false} width="full" size="lg">
        Stake
      </Button>
      <Button variant="verteklight" disabled={false} width="full" size="lg">
        Claim
      </Button>
    </SimpleGrid>
  );
}
