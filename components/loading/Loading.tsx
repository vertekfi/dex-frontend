import { Flex, Spinner, Text } from '@chakra-ui/react';

type Props = {
  loading: boolean;
};

export function Loading({ loading }: Props) {
  return (
    <>
      {loading && (
        <Flex justifyContent="center" p={55}>
          <Text>Loading...</Text>
          <Spinner size="xl" />
        </Flex>
      )}
    </>
  );
}
