import { isSameAddress } from '@balancer-labs/sdk';
import { Box, Text, Grid, GridItem, VStack, BoxProps } from '@chakra-ui/react';
import {
 VotingGauge,
 VotingGaugeWithVotes,
} from '~/lib/services/staking/types';
import { poolURLFor } from '~/modules/pool/lib/pool-utils';

export function VotingPageSub() {
 return (
  // <Box mt={3} mb='4rem' flexDirection="column" display="flex">
  <Grid
   mt={8}
   justifyContent="center"
   paddingY="2"
   templateColumns={{
    base: 'repeat(1fr 1fr)',
    lg: '4fr 2fr',
   }}
   alignItems="center"
   gap={{ base:"10", lg:"20" }}
  >
   <GridItem marginRight="10" marginLeft="20" paddingY="0">
    <Text fontWeight="bold" fontSize="1.8rem">
     Pools eligible for VRTK emissions
    </Text>
    <Text fontSize="1.2rem" fontWeight="normal">
     Liquidity incentives are directed by the community of veVRTK holders. If
     you hold veVRTK, vote below on any pools across BNB Chain. Your vote will
     persist until you change it and editing a pool can only be done once in 10
     days.
    </Text>
   </GridItem>


   <GridItem marginRight={{base: "0", lg:"24" }}>
     <VStack spacing={4} alignItems={{ base:"center", lg:"stretch" }}>
        <Box
          bgGradient='linear(90deg, #302B84 0%, #362BA8 50%, #4132D0 100%)'
          // bgColor="vertek.slatepurple.900"
          h="full"
          w={{ base:"75%", lg:"full"}}
          p="12px"          
          borderRadius={{ base:"20px", lg:"12px" }}
          alignItems="center"
          justifyContent="center"
          mx={{ base: "auto", lg: 0 }}
        >
            <Text fontWeight="bold" fontSize="1.0rem" marginTop="2%">
              My unallocated votes
            </Text>
            <Text fontWeight="normal" fontSize="0.9rem" marginTop="2%">
              1 
            </Text>
        </Box>
        <Box
          bgGradient='linear(90deg, #302B84 0%, #362BA8 50%, #4132D0 100%)'
          h="full"
          w={{ base:"75%", lg:"full"}}
          p="12px"
          borderRadius={{ base:"20px", lg:"12px" }}
          alignItems="center"
          justifyContent="center"
          mx={{ base: "auto", lg: 0 }}
        >
      <Text fontWeight="bold" fontSize="1.0rem" marginTop="2%">
        Voting period ends
      </Text>
      <Text fontWeight="normal" fontSize="0.9rem" marginTop="2%">
        Date
      </Text>
    </Box>
  </VStack>
</GridItem>
</Grid>
  // </Box>
 );
}
