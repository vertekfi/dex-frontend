import { GridItem, Flex, Text } from '@chakra-ui/react';
import { StakingCardGuts } from './StakingCardGuts';
import Image from 'next/image';
import placeholder from '../../assets/images/fantom-logo.png';
import { StakingAccordion } from './StakingAccordion';
import { RewardPool } from '~/apollo/generated/graphql-codegen-generated';

export function StakingCard(props: { pool: RewardPool | null }) {
  const pool = props.pool;

  return (
    <>
      {pool && (
        <GridItem
          bg="vertek.slatepurple.900"
          boxShadow="0 0 10px #5BC0F8, 0 0 20px #4A4AF6"
          borderRadius="25px"
          maxW="550px"
          color="white"
        >
          <Flex justify="left" padding="4" borderColor="box.500" borderBottomWidth="2px">
            <div
              style={{
                position: 'relative',
                width: '20%',
                paddingBottom: '10%',
                marginRight: '5%',
              }}
            >
              <Image src={placeholder} layout="fill" objectFit="contain" />
            </div>
            <Flex direction="column">
              {/* <Text fontSize="1.5rem"> DOGE </Text> */}
              <Text fontSize="1rem"> Stake VRTK - Earn {pool.rewardToken.symbol} </Text>
            </Flex>
          </Flex>
          <StakingCardGuts pool={pool} />
          <StakingAccordion pool={pool} />
        </GridItem>
      )}
    </>
  );
}
