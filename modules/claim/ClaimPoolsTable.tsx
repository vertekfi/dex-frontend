import { SimpleGrid, Box, Text, VStack, Grid, GridItem } from '@chakra-ui/react';
import PoolList from '../pools/PoolList';
import { PaginatedTable } from '~/components/table/PaginatedTable';
import { ClaimListItem } from './ClaimListItem';


export function ClaimPoolsTable() {
return (
  <Box padding="1" borderRadius="16px">
    <Box
      mb={4}
      borderBottomRadius="16px"
      overflow="hidden"
      shadow="lg"
      bg="vertek.slate.900">
        
      <Grid paddingX="4" py="2"
      templateColumns={{
        base: '1fr 1fr',
        lg: '4fr 1fr 1fr' }}
      gap="0" >
            <GridItem>
              Pools
            </GridItem>
            <GridItem>
              Amount
            </GridItem>
            <GridItem justifyContent="end" display="flex" >
              Value
            </GridItem>
      </Grid>

      <ClaimListItem />
      <ClaimListItem />
      <ClaimListItem />
      <ClaimListItem />
      <ClaimListItem />    
  </Box>
  </Box>
);
}
