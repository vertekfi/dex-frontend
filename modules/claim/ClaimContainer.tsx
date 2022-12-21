import { SimpleGrid } from '@chakra-ui/react';

export function ClaimContainer() {
  return (
    <SimpleGrid
      columns={{ sm: 1, md: 2, xl: 3 }}
      paddingX={8}
      paddingY={4}
      spacing={35}
    ></SimpleGrid>
  );
}
