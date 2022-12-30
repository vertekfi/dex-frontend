import { Box, Grid, GridItem, Text } from '@chakra-ui/react';
import { ClaimListItem } from './ClaimListItem';

interface ClaimTableProps {
    rows: Array<{}>;
  }

export function ClaimTable(props: ClaimTableProps){
    return (
        <Box padding="1" borderRadius="16px">
          <Box
            mb={4}
            borderBottomRadius="16px"
            overflow="hidden"
            shadow="lg"
            bg="vertek.slate.900">
            <Grid
              paddingX="4"
              py="2"
              templateColumns={{
                base: 'repeat(1fr 1fr)',
                lg: '3fr 1fr 1fr 1fr'
              }}
              gap="0"
            >
              <GridItem>
                <Text fontWeight="bold">Pools</Text>
              </GridItem>
              <GridItem>
                <Text fontWeight="bold">Amount</Text>
              </GridItem>
              <GridItem justifyContent="end" display="flex">
                <Text fontWeight="bold">Value</Text>
              </GridItem>
              <GridItem justifyContent="end" display="flex">
                <Text fontWeight="bold">Claim</Text>
              </GridItem>
            </Grid>
            {props.rows.map((row) => (
              <ClaimListItem />
            ))}
          </Box>
        </Box>
      );
    }