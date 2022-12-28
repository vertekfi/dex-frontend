import { Box, Flex } from '@chakra-ui/react';
import Head from 'next/head';
import { PageMasthead } from '~/components/masthead/PageMasthead';
import NextImage from 'next/image';
import { useNetworkConfig } from '~/lib/global/useNetworkConfig';
import SwapMastheadImage from '~/assets/images/swap-masthead-image.png';
import SwapMastheadOpImage from '~/assets/images/swap-masthead-image-OP.png';
import { GaugeListProvider } from '~/lib/global/gauges/useVotingGauges';
import { GaugeActionCard } from '~/modules/voting/components/GaugeActionCard';
import { VotingContainer } from '~/modules/voting/VotingContainer';

function VotingPage() {
  const { chainId } = useNetworkConfig();
  return (
    <>
      <Head>
        <title>Vertex | Voting</title>
      </Head>
      <GaugeListProvider>
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

        <VotingContainer />
      </GaugeListProvider>
    </>
  );
}

export default VotingPage;
