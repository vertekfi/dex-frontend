import { Box, Flex } from '@chakra-ui/react';
import Head from 'next/head';
import { PageMasthead } from '~/components/masthead/PageMasthead';
import NextImage from 'next/image';
import { useNetworkConfig } from '~/lib/global/useNetworkConfig';
import SwapMastheadImage from '~/assets/images/swap-masthead-image.png';
import SwapMastheadOpImage from '~/assets/images/swap-masthead-image-OP.png';
import { GaugeListProvider } from '~/modules/voting/lib/useGauges';
import { GaugeActionCard } from '~/modules/voting/components/GaugeActionCard';
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

      <GaugeListProvider>
        <Flex flexDirection="row" justifyContent="space-between">
          <GaugeActionCard heading="My 80VRTK-20BNB" />
          <GaugeActionCard heading="My locked 80VRTK-20BNB" />
          <GaugeActionCard heading=" Locked until" />
          <GaugeActionCard heading=" My veVRTK" />
        </Flex>

        <VotingContainer></VotingContainer>
      </GaugeListProvider>
    </>
  );
}

export default VotingPage;
