import { SimpleGrid, Box, GridItem, Text, Image } from '@chakra-ui/react';
import { ClaimPoolsTable } from './ClaimPoolsTable';
import NextImage from 'next/image';
import VertekIcon from '~/assets/logo/verteknotext.svg'; 


export function ClaimContainer() {
return (
  <SimpleGrid
    columns={1}
    paddingX={0}
    spacing={6}
    borderRadius="12px">
    
    <GridItem paddingY={0}>
      <Text fontSize="1.5rem" mb="0" >
        BNB Chain Liquidity Incentives
      </Text>
    </GridItem>

    <GridItem 
    display="flex" 
    flexDirection="column" 
    paddingY="0">
      <Box flexDirection="row" display="flex" mb="0" paddingX="1">
          <Box marginRight="2" display="flex" justifyContent="">
              <NextImage  width="24px" height="24px"  src={VertekIcon} />
          </Box>
          <Text fontSize="1.20rem">
              Vertek (VRTK) Earnings
          </Text>
      </Box>
      <Box>
          <ClaimPoolsTable />
      </Box>
    </GridItem>
    
    <GridItem 
    display="flex" 
    flexDirection="column" 
    paddingY="0">
      <Box flexDirection="row" display="flex" mb="0" paddingX="1">
          <Text fontSize="1.20rem">
              veVRTK and Protocol Earnings
          </Text>
      </Box>
      <Box>
          <ClaimPoolsTable />
      </Box>
    </GridItem>
    
    <GridItem 
    display="flex" 
    flexDirection="column" 
    paddingY="0">
      <Box flexDirection="row" display="flex" mb="0" paddingX="1">
          <Text fontSize="1.20rem">
              Other Token Earnings
          </Text>
      </Box>
      <Box>
          <ClaimPoolsTable />
      </Box>
    </GridItem>

  </SimpleGrid>
);
}
