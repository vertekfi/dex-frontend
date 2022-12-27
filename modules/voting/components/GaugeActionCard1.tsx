import { Box, Flex, GridItem, Text } from '@chakra-ui/react';
import Image from 'next/image';

export interface GaugeActionCardProps {
  heading: string;
}

export function GaugeActionCard1(props: GaugeActionCardProps) {
  return (
    <GridItem
      bg="vertek.slatepurple.900"
      boxShadow=" 0px 0px 5px 0.5px #ECA833, 0px 5px 10px 2px #000"
      borderRadius="25px"
      maxW="550px"
      color="white"
    >
      <Flex direction="column" justify="left" padding="8">
        <Text fontSize="1.2rem" paddingX="0" fontWeight="bold">
          {props.heading}
        </Text>

        <Flex direction="row" justify="space-between" mt="6" alignItems="center">
          <Text fontSize="1.5rem" paddingX="0">
            Date
          </Text>
        </Flex>

        <Text fontSize="1rem" paddingX="0" marginTop="2">
          Days
        </Text>
      </Flex>

      {/* Need one card for the pool values and another for the date stuff */}
    </GridItem>
  );
}
