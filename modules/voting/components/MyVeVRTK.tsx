import { Box, Skeleton, Text } from '@chakra-ui/react';
import { VotingCardHeader } from './VotingHeader';

type Props = {
  currentVeBalance: string;
  percentOwned: string;
};

export function MyVeVRTK(props: Props) {
  return (
    <Box
      height="75%"
      padding="2"
      width="full"
      flexDirection="column"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      bg="vertek.slatepurple.900"
      borderRadius="md"
      boxShadow="2px 58px 12px 0px #000"
    >
      <VotingCardHeader>My veVRTK</VotingCardHeader>
      <Skeleton isLoaded={!!props.currentVeBalance}>
        <Text>{props.currentVeBalance} veVRTK</Text>
        <Text>{props.percentOwned}% of all veVRTK</Text>
      </Skeleton>
    </Box>
  );
}
