import { SimpleGrid, Text, GridItem } from '@chakra-ui/react';
import { PerpetualsCard } from './components/PerpetualsCard';
import { UserTokenBalancesProvider } from '~/lib/user/useUserTokenBalances';

export function PerpetualsContainer() {

  return (
    <UserTokenBalancesProvider>
      <Text color="white" fontWeight="bold" mt="-8" mb="4">
        
      </Text>
      <SimpleGrid columns={{ sm: 1 }} paddingX={8} paddingY={4} spacing={35}>
      {/* <PerpetualsCard /> */}
      </SimpleGrid>
    </UserTokenBalancesProvider>
  );
}
