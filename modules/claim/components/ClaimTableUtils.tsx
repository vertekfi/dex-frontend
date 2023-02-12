import { GridItemProps, GridItem, Text } from '@chakra-ui/react';

export function MobileLabelRight({ text }: { text: string }) {
  return (
    <Text textAlign="right" fontSize="xs" color="gray.200" display={{ base: 'block', lg: 'none' }}>
      {text}
    </Text>
  );
}

export function MobileLabelLeft({ text }: { text: string }) {
  return (
    <Text textAlign="left" fontSize="xs" color="gray.200" display={{ base: 'block', lg: 'none' }}>
      {text}
    </Text>
  );
}

export function StatGridItemRight(props: GridItemProps) {
  return (
    <GridItem
      area="claim"
      width="100%"
      textAlign={{ base: 'right', lg: 'center' }}
      mb={{ base: '4', lg: '0' }}
      {...props}
    />
  );
}

export function ClaimGrid(props: GridItemProps) {
  return (
    <GridItem
      area="value"
      textAlign={{ base: 'right', lg: 'right' }}
      mb={{ base: '4', lg: '0' }}
      {...props}
    />
  );
}
