import { Box, Flex } from '@chakra-ui/react';

export interface GaugeActionCardProps {
  heading: string;
}

export function GaugeActionCard(props: GaugeActionCardProps) {
  return (
    <Flex
      bgColor="vertek.slatepurple.900"
      borderRadius="16px"
      p="1"
      boxShadow=" 0px 0px 5px 0.5px #ECA833, 0px 5px 10px 2px #000"
      flexDirection="column"
      height="150px"
      minWidth="250px"
      padding="1rem"
    >
      <Box mt="6" color="white" fontSize="0.9rem" justifyContent="center" textAlign="center">
        {props.heading}
      </Box>
    </Flex>
  );
}
