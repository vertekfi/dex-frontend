import { Flex, Text, Box } from '@chakra-ui/react';
import { StakingCardGuts } from './StakingCardGuts';
import NextImage from 'next/image';
import { StakingAccordion } from './StakingAccordion';
import { RewardPool } from '~/apollo/generated/graphql-codegen-generated';
import Vertek from '~/assets/svg/vertektransparent.svg';
import TokenAvatarSet from '~/components/token/TokenAvatarSet';

export function StakingCard(props: { pool: RewardPool | null }) {
  const pool = props.pool;

  return pool ? (
    <>
      <Flex
        direction="row"
        justify="center"
        fontWeight="bold"
        padding="2"
        ml="2"
        borderColor="box.500"
        borderBottomWidth="2px"
        alignItems="center"
      >
        <Box marginRight="2">
          <Text fontSize="1rem">Stake</Text>
        </Box>
        <Box>
          <NextImage objectFit="contain" src={Vertek} alt={`Logo for deposit token}`} />
        </Box>
        <Box marginRight="2" marginLeft="12">
          <Text fontSize="1rem">Earn</Text>
        </Box>
        <Box>
          <TokenAvatarSet width={32} tokenData={[{ address: pool.rewardToken.address }]} />
        </Box>
      </Flex>
      <StakingCardGuts pool={pool} />
      <StakingAccordion pool={pool} />
    </>
  ) : null;
}
