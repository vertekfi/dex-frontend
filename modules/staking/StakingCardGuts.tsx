import { Flex, SimpleGrid, Text, Button, useDisclosure, GridItem, Box } from '@chakra-ui/react';
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
        gap={10}
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
            {pool.userInfo?.pendingRewards || '0.00'} {pool.rewardToken.symbol}
          </Text>
          <Text fontSize="0.7rem" textAlign="right">
            ${pool.userInfo?.pendingRewardValue || '0.00'}
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
            disabled={true}
          >
            Claim
          </Button>
        </Flex>

        <Text textAlign="left" fontWeight="bold">
          My Balance
        </Text>
        <Flex direction="column">
          <Text textAlign="right" fontWeight="bold">
            {pool.userInfo?.amountDeposited || '0.00'} VRTK
          </Text>
          <Text fontSize="0.7rem" textAlign="right">
            ${pool.userInfo?.depositValue || '0.00'}
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
          <Button variant="verteklight" disabled={true} width="full">
            Unstake
          </Button>
          <Button variant="vertekdark" disabled={true} width="full" onClick={onDepositOpen}>
            Not started yet
          </Button>
        </GridItem>
      </SimpleGrid>

      {/* <RewardPoolDepositModal
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
      /> */}
    </>
  );
}
