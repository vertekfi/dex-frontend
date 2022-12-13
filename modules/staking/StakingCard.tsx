import { GridItem, Flex, SimpleGrid, Text, Button } from '@chakra-ui/react';
import { StakingCardGuts } from './StakingCardGuts';
import Image from 'next/image';
import placeholder from '../../assets/images/fantom-logo.png';
import { StakingAccordion } from './StakingAccordion';

export function StakingCard() {
  return (
    // glow behind the icons
    <GridItem bg="box.500" borderRadius="25px" maxW="550px" color="white">
      <Flex justify="left" padding="4">
        <div
          style={{ position: 'relative', width: '20%', paddingBottom: '10%', marginRight: '5%' }}
        >
          <Image src={placeholder} layout="fill" objectFit="contain" />
        </div>
        <Flex direction="column">
          <Text fontSize="2xl"> DOGE </Text>
          <Text fontSize="0.8rem"> Stake VTX - Earn DOGE </Text>
        </Flex>
      </Flex>
      <StakingCardGuts />
      <StakingAccordion />
    </GridItem>
  );
}
