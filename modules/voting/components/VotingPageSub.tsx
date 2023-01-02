import { isSameAddress } from '@balancer-labs/sdk';
import { Box, Text, Grid, GridItem } from '@chakra-ui/react';
import {
 VotingGauge,
 VotingGaugeWithVotes,
} from '~/lib/services/staking/types';
import { poolURLFor } from '~/modules/pool/lib/pool-utils';

export function VotingPageSub() {
 return (
  // <Box mt={3} mb='4rem' flexDirection="column" display="flex">
  <Grid
   mt={12}
   justifyContent="center"
   paddingY="4"
   templateColumns={{
    base: 'repeat(1fr 1fr)',
    lg: '3fr 2fr',
   }}
   alignItems="center"
  >
   <GridItem marginX="2" paddingY="4">
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

   <GridItem>
    <Grid templateColumns={'1fr 1fr'} paddingX="2" marginX="4">
    <GridItem marginX={{base:"1", lg:"2"}}>
      <Box
       bgColor="vertek.slatepurple.900"
       width="full"
       padding="4"
       borderRadius="12px"
       alignItems="center"
       justifyContent="center"
      >
       <Text fontWeight="bold" fontSize="1.0rem" marginTop="2%">
        My unallocated votes
       </Text>
       <Text fontWeight="normal" fontSize="0.9rem" marginTop="2%">
        1 
       </Text>
      </Box>
     </GridItem>
     <GridItem marginX={{base:"1", lg:"2"}}>
      <Box
       bgColor="vertek.slatepurple.900"
       width="full"
       padding="4"
       borderRadius="12px"
       alignItems="center"
       justifyContent="center"
      >
       <Text fontWeight="bold" fontSize="1.0rem" marginTop="2%">
        Voting period ends
       </Text>
       <Text fontWeight="normal" fontSize="0.9rem" marginTop="2%">
        Date
        </Text>
      </Box>
     </GridItem>
    </Grid>
   </GridItem>
  </Grid>
  // </Box>
 );
}
