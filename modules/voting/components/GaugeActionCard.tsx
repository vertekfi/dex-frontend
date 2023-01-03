import { Box, Grid, Button, Flex, GridItem, Text } from '@chakra-ui/react';
import Image from 'next/image';

export interface GaugeActionCardProps {
  heading: string;
}

export function GaugeActionCard(props: GaugeActionCardProps) {
  return (
    <GridItem
    bg="vertek.slatepurple.900"
          boxShadow="0 0 10px #5BC0F8, 0 0 20px #4A4AF6"
    borderRadius="25px"
    maxW="550px"
    color="white"
    >
    <Grid
      paddingX="2"
      paddingY="2"
    >
      <GridItem mt="2">
        <Text
          fontSize="1.2rem"
          fontWeight="bold"
          textAlign="center"
        >
          {props.heading}
        </Text>
      </GridItem>
      <GridItem mt="3">
        <Text
          alignItems="center"
          fontSize="1.2rem"
          justifyContent="center"
          textAlign="center"
        >
          $0.00
        </Text>
      </GridItem>
      <GridItem mt="-1">
        <Text
          alignItems="center"
          fontSize="1rem"
          justifyContent="center"
          textAlign="center"
        >
          0 votes
        </Text>
      </GridItem>
      <GridItem mt={{ base: '3', lg: '6' }}>
        <Box display="flex" justifyContent="center">
          <Button
            variant="vertekconnect2"
            width="80%"
          >
            Button
          </Button>
        </Box>
      </GridItem>
    </Grid>
  </GridItem>
  );
}
