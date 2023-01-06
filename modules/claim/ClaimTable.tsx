import { Box, Grid, GridItem, Text } from '@chakra-ui/react';
import { VotingGaugeWithVotes } from '~/lib/services/staking/types';
import { ClaimListItem } from './ClaimListItem';

interface ClaimTableProps {
  gauges: VotingGaugeWithVotes[];
}

export function ClaimTable(props: ClaimTableProps) {
  return (
    <Box padding="1" borderRadius="16px">
      <Box
        mb={4}
        mx="2"
        mt="2"
        paddingX={{ base: '2', lg: '0' }}
        borderRadius="16px"
        overflow="hidden"
        boxShadow={{ base: 'none', lg: '0 0px 5px #5BC0F8, 0 0px 10px #4A4AF6' }}
        bg=""
      >
        <Grid
          display={{ base: 'none', lg: 'grid' }}
          paddingX="6"
          paddingY="4"
          borderTopRadius="16px"
          templateColumns={{
            base: 'repeat(1fr 1fr)',
            lg: '1fr 3fr 1fr 1fr 1fr',
          }}
          gap="0"
          // boxShadow="0 -5px 5px #5BC0F8, 0 -5px 50px #4A4AF6"
          bg="vertek.slatepurple.900"
        >
          <GridItem>
            <Text fontWeight="bold">Pools</Text>
          </GridItem>
          <GridItem>
            <Text fontWeight="bold"></Text>
          </GridItem>
          <GridItem>
            <Text fontWeight="bold">Amount</Text>
          </GridItem>
          <GridItem justifyContent="center" display="flex">
            <Text fontWeight="bold">Value</Text>
          </GridItem>
          <GridItem justifyContent="end" display="flex">
            <Text fontWeight="bold">Claim</Text>
          </GridItem>
        </Grid>

        {props.gauges.map((gauge) => (
          <ClaimListItem gauge={gauge} />
        ))}
      </Box>
    </Box>
  );
}
