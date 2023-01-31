import { Box, Grid, GridItem, VStack, Text } from '@chakra-ui/react';
import { useVotingGauges } from '../lib/useVotingGauges';

type Props = {
  unallocatedVotesFormatted: string;
};

export function VotingSubheader(props: Props) {
  const { votingPeriodEnd } = useVotingGauges();

  return (
    <Grid
      mt={16}
      justifyContent="center"
      paddingY="2"
      templateColumns={{
        base: 'repeat(1fr 1fr)',
        lg: '4fr 2fr',
      }}
      alignItems="center"
      gap={{ base: '10', lg: '20' }}
    >
      <GridItem
        marginRight={{ base: '4', lg: '10' }}
        marginLeft={{ base: '8', lg: '20' }}
        paddingY="0"
      >
        <Text variant="topLine">Pools eligible for VRTK emissions</Text>
        <Text variant="topline" fontSize="1.2rem" letterSpacing="-0.01rem">
          Liquidity incentives are directed by the community of veVRTK holders. If you hold veVRTK,
          vote below on any pools across BNB Chain. Your vote will persist until you change it and
          editing a pool can only be done once in 10 days.
        </Text>
      </GridItem>
      {/* <GridItem variant="VotingCard">text </GridItem> */}

      <GridItem marginRight={{ base: '0', lg: '24' }}>
        <VStack spacing={4} alignItems={{ base: 'center', lg: 'stretch' }}>
          <Box
            className="verteklightpurplebox"
            h="full"
            w={{ base: '75%', lg: 'full' }}
            p="12px"
            borderRadius={{ base: '20px', lg: '12px' }}
            alignItems="center"
            justifyContent="center"
            mx={{ base: 'auto', lg: 0 }}
          >
            <Text fontWeight="bold" fontSize="1.0rem" marginTop="2%">
              My unallocated votes
            </Text>
            <Text fontWeight="normal" fontSize="0.9rem" marginTop="2%">
              {props.unallocatedVotesFormatted}
            </Text>
          </Box>
          <Box
            className="verteklightpurplebox"
            h="full"
            w={{ base: '75%', lg: 'full' }}
            p="12px"
            borderRadius={{ base: '20px', lg: '12px' }}
            alignItems="center"
            justifyContent="center"
            mx={{ base: 'auto', lg: 0 }}
          >
            <Text fontWeight="bold" fontSize="1.0rem" marginTop="2%">
              Voting period ends
            </Text>
            <Text fontWeight="normal" fontSize="0.9rem" marginTop="2%">
              {votingPeriodEnd?.length && (
                <Text>
                  {votingPeriodEnd[0]}d : {votingPeriodEnd[1]}h : {votingPeriodEnd[2]}m :{' '}
                  {votingPeriodEnd[3]}s
                </Text>
              )}
            </Text>
          </Box>
        </VStack>
      </GridItem>
    </Grid>
  );
}
