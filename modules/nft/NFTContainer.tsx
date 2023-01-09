import { SimpleGrid, Text, GridItem } from '@chakra-ui/react';
import { NFTCard } from './components/NFTCard';
import { UserTokenBalancesProvider } from '~/lib/user/useUserTokenBalances';

export function NFTContainer() {

  return (
    <UserTokenBalancesProvider>
      <Text color="white" fontWeight="bold" mt="-8" mb="4">
        
      </Text>
      <SimpleGrid columns={{ sm: 1 }} paddingX={8} paddingY={4} spacing={35}>
      {/* <NFTCard /> */}
      </SimpleGrid>
    </UserTokenBalancesProvider>
  );
}
