import { Flex, SimpleGrid, Text, Button } from '@chakra-ui/react';

export function StakingCardGuts() {
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
          10%
        </Text>
        <Text fontSize="0.7rem" textAlign="right">
          0.01% Daily
        </Text>
      </Flex>

      <Text textAlign="left" fontWeight="bold">
        Earning
      </Text>
      <Flex direction="column">
        <Text textAlign="right" fontWeight="bold">
          0.0 DOGE
        </Text>
        <Text fontSize="0.7rem" textAlign="right">
          $0.00
        </Text>
      </Flex>

      <Text textAlign="left" fontWeight="bold">
        My Balance
      </Text>
      <Flex direction="column">
        <Text textAlign="right" fontWeight="bold">
          0.00 VRTK
        </Text>
        <Text fontSize="0.7rem" textAlign="right">
          $0.00
        </Text>
      </Flex>

      <Button variant="vertekconnect25" disabled={false} width="full" size="lg">
        Stake
      </Button>
      <Button
        variant="vertekconnect2"
        disabled={false}
        width="full"
        size="lg"
      >
        Claim
      </Button>
    </SimpleGrid>
  );
}
