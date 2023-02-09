import { Box, Skeleton, Text, Flex } from '@chakra-ui/react';
import { VotingCardHeader } from './VotingHeader';

type Props = {
  currentVeBalance: string;
  percentOwned: string;
  lockedUntilDate: string;
  lockedUntilDays: number;
};

export function MyVeVRTK(props: Props) {
  return (
    <>
      <Box
        // height="75%"
        padding="2"
        flexDirection="column"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="vertek.slatepurple.900"
        borderRadius="md"
        width="90%"
        boxShadow="2px 24px 12px 0px #000"
        mb="4"
        mt="2"
        bgColor="vertek.slatepurple.900"
      >
        <VotingCardHeader>My veVRTK</VotingCardHeader>
      </Box>
      <Box
        width="95%"
        paddingX="2"
        paddingY="3"
        fontWeight="bold"
        display="flex"
        boxShadow="2px 24px 12px 0px #000"
        bgColor="vertek.slatepurple.900"
        justifyContent="center"
        mb="2"
        borderRadius="md"
        flexDirection="column"
      >
        <Skeleton isLoaded={!!props.currentVeBalance}>
          <Text fontSize="1rem" mb="3">
            veVRTK shares:{' '}
            {(props.currentVeBalance && parseFloat(props.currentVeBalance).toFixed(4)) || 'N/A'}
          </Text>

          <Text fontSize="1rem" textAlign="center">
            {(props.percentOwned && parseFloat(props.percentOwned).toFixed(4)) || 'N/A'}% of all
            veVRTK
          </Text>

          {/* <Text align="left">End date: {props.lockedUntilDate}</Text>
        <Text align="left">Ends in: {props.lockedUntilDays || 0} days</Text> */}
        </Skeleton>
      </Box>
    </>
  );
}
