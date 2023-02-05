import { GridItem, Flex, Text, Box } from '@chakra-ui/react';
import { StakingCardGuts } from './StakingCardGuts';
import { Image } from '@chakra-ui/react';
import NextImage from 'next/image';
import { StakingAccordion } from './StakingAccordion';
import { RewardPool } from '~/apollo/generated/graphql-codegen-generated';
import Vertek from '~/assets/svg/vertektransparent.svg';

export function StakingCard(props: { pool: RewardPool | null }) {
const pool = props.pool;

const basePath = '/images/stakingPools/'

return (
  pool ? (
    <GridItem
        className="blk"
        boxShadow="0 0 10px #5BC0F8, 0 0 20px #4A4AF6"
        borderRadius="18px"
        maxW="550px"
        color="white"
    >
      <Flex 
      direction="row" 
      justify="center" 
      fontWeight="bold" 
      padding="2" ml="2" borderColor="box.500" 
      borderBottomWidth="2px" alignItems="center">
        <Box marginRight="2">
          <Text fontSize="1rem">
            Stake 
          </Text>
        </Box>
        <Box>
          <NextImage width={75} height={75} objectFit="contain" src={Vertek} alt={`Logo for deposit token}`} />
        </Box>
        <Box marginRight="2" marginLeft="12">
          <Text fontSize="1rem">
            Earn
          </Text>
        </Box>
        <Box>
          <NextImage width={75} height={75} objectFit="contain" src={`${basePath}${pool.rewardToken.logoURI}`} alt={`Logo for ${pool.rewardToken.name}`} />
        </Box>
      </Flex>
      <StakingCardGuts pool={pool} />
      <StakingAccordion pool={pool} />
    </GridItem>
  ) : null
);
}
