import { GridItem, Flex, Text, Box } from '@chakra-ui/react';
import { StakingCardGuts } from './StakingCardGuts';
import { Image } from '@chakra-ui/react';
import { StakingAccordion } from './StakingAccordion';
import { RewardPool } from '~/apollo/generated/graphql-codegen-generated';

export function StakingCard(props: { pool: RewardPool | null }) {
const pool = props.pool;

return (
  pool ? (
    <GridItem
        bgGradient="vertek.slatepurple.900"
        boxShadow="0 0 10px #5BC0F8, 0 0 20px #4A4AF6"
        borderRadius="18px"
        maxW="550px"
        color="white"
    >
      <Flex direction="row" justify="left" padding="2" ml="2" borderColor="box.500" borderBottomWidth="2px" alignItems="center">
          <Box marginRight="2">
              <Text fontSize="1rem">
                Stake VRTK - Earn
              </Text>
          </Box>
          <Box>
              <Image src={pool.rewardToken.logoURI} alt={`Logo for ${pool.rewardToken.name}`} />
          </Box>
      </Flex>
      <StakingCardGuts pool={pool} />
      <StakingAccordion pool={pool} />
    </GridItem>
  ) : null
);
}
