import { GridItem, SimpleGrid, Flex, useDisclosure, Text } from '@chakra-ui/react';
import { StakingCard } from './StakingCard';
import Image from 'next/image';
import placeholder from '../../assets/images/fantom-logo.png';

export function StakingContainer() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <SimpleGrid columns={{ sm: 1, md: 2, xl: 3 }} paddingX={8} paddingY={4} spacing={35}>
      <StakingCard />
      <StakingCard />
      <StakingCard />
      <StakingCard />
      <StakingCard />
    </SimpleGrid>
  );
}
