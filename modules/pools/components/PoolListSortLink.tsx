import { Flex, ButtonProps, Text, Button } from '@chakra-ui/react';
import { ArrowUp, ArrowDown } from 'react-feather';
import { GqlPoolOrderDirection } from '~/apollo/generated/graphql-codegen-generated';

interface Props extends ButtonProps {
  title: string;
  orderDirection?: GqlPoolOrderDirection | null;
}

export default function PoolListSortLink({ title, orderDirection, ...rest }: Props) {
  return (
    <Button
      _hover={{ backgroundColor: 'transparent', color: 'white', transform: 'scale(1.1)' }}
      _focus={{ outline: 'none' }}
      _active={{ backgroundColor: 'transparent' }}
      padding="0"
      height="fit-content"
      variant="ghost"
      color={orderDirection ? 'vertek.neonpurple.500' : 'vertek.neonpurple.500'}
      {...rest}
      userSelect="none"
    >
      <Flex justifyContent="flex-end" alignItems="center">
        <Text mr={orderDirection ? 0.5 : 0} fontSize="md" fontWeight="semibold" color="vertek.slate.100">
          {title}
        </Text>
        {orderDirection === 'asc' ? <ArrowUp size={20} /> : null}
        {orderDirection === 'desc' ? <ArrowDown size={20} /> : null}
      </Flex>
    </Button>
  );
}
