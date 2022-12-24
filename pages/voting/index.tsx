import { Card, CardBody, CardHeader } from '@chakra-ui/card';
import { Box, Button, Flex, Heading, HStack, Text, useTheme } from '@chakra-ui/react';
import Head from 'next/head';
import { PageMasthead } from '~/components/masthead/PageMasthead';
import NextImage from 'next/image';
import { useNetworkConfig } from '~/lib/global/useNetworkConfig';
import SwapMastheadImage from '~/assets/images/swap-masthead-image.png';
import SwapMastheadOpImage from '~/assets/images/swap-masthead-image-OP.png';
import { VotingContainer } from '~/modules/voting/VotingContainer';

function VotingPage() {
  const { chainId } = useNetworkConfig();
  return (
    <>
      <Head>
        <title>Vertex | Voting</title>
      </Head>

      <PageMasthead
        title="Vertek Voting"
        image={
          <NextImage
            src={chainId === '10' ? SwapMastheadOpImage : SwapMastheadImage}
            width="213.71px"
            height="68px"
          />
        }
      />

      <Flex flexDirection="row" justifyContent="space-between">
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
            My 80VRTK-20BNB
          </Box>
        </Flex>

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
            My locked 80VRTK-20BNB
          </Box>
        </Flex>

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
            Locked until
          </Box>
        </Flex>

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
            My veVRTK
          </Box>
        </Flex>
      </Flex>
    </>
  );
}

export default VotingPage;
