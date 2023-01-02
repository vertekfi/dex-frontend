import { Box, Grid, Button, Flex, GridItem, Text } from '@chakra-ui/react';
import Image from 'next/image';

export interface GaugeActionCardProps {
  heading: string;
}

export function GaugeActionCard(props: GaugeActionCardProps) {
  return (
    <GridItem
      bg="vertek.slatepurple.900"
      boxShadow=" 0px 0px 5px 0.5px #ECA833, 0px 5px 10px 2px #000"
      borderRadius="25px"
      maxW="550px"
      color="white"
    >
      <Grid paddingX="2" paddingY="2" 
      >
        <GridItem mt="2">
          <Text fontSize="1.2rem" textAlign="center" fontWeight="bold">
            {props.heading}
          </Text>
        </GridItem>
        
        <GridItem mt="3">
          <Text fontSize="1.2rem" alignItems="center" justifyContent="center" textAlign="center">
            $0.00 
          </Text>
          </GridItem>
        
        <GridItem mt="-1">
          <Text fontSize="1rem" textAlign="center" alignItems="center" justifyContent="center" >
            0 votes
          </Text>
        </GridItem>
        
        <GridItem mt={{ base:'3', lg:'6'}} >
          <Box display="flex" justifyContent="center" >
              <Button  variant="vertekconnect2" width="80%">
                          Button
              </Button>
          </Box>
        </GridItem>
      </Grid>
    </GridItem>
  );
}
