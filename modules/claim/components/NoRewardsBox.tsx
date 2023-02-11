import { Box, Flex, Text } from '@chakra-ui/react';

type Props = {
  label?: string;
};

export function NoRewardsBox({ label }: Props) {
  return (
    <Box
      mb={4}
      mx="2"
      mt="4"
      p="3rem"
      borderRadius="16px"
      overflow="hidden"
      boxShadow={{ base: 'none', lg: '0 0px 5px #5BC0F8, 0 0px 10px #4A4AF6' }}
    >
      <Flex justifyContent="center" alignContent="center">
        <Text>{label || 'No pending rewards to claim'}</Text>
      </Flex>
    </Box>
  );
}
