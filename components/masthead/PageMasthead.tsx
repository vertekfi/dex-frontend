import { Box, Flex, Text, VStack } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface Props {
  title: string;
  image: ReactNode;
}

export function PageMasthead({ title, image }: Props) {
  return (
    <Flex borderBottomWidth={5} borderBottomColor="transparent" mb={{ base: '6', lg: '8' }}>
      <VStack alignItems="start">
        <Text
          fontSize="36px"
          color="white"
          fontWeight="semibold"
          as="h1"
          flex="1"
          mb="0"
          textAlign="left"
        >
          {title}
        </Text>
        {/* <Box alignItems="flex-end" display={{ base: 'none', md: 'flex' }}>
                    {image}
                </Box> */}
        <Text fontSize="20px" fontWeight="normal" as="h1" flex="1" mb="2" color="vertek.slate.100">
          {/* Join our pools for higher rewards and bonuses that can multiply your earnings up to 2.5
          times. */}
        </Text>
      </VStack>
    </Flex>
  );
}
