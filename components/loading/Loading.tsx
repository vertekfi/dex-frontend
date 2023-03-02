import { Flex, Spinner, Text } from '@chakra-ui/react';

type Props = {
  loading: boolean;
};

export function Loading({ loading }: Props) {
  return (
    <>
      {loading && (
        <Flex justifyContent="center" direction="column" alignItems="center" p={75}>
          <Text fontSize="1.3rem" mb={5}>
            Loading...
          </Text>
          <Spinner size="xl" />
        </Flex>
      )}
    </>
  );
}
