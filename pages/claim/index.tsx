import Head from 'next/head';
import { PageMasthead } from '~/components/masthead/PageMasthead';
import NextImage from 'next/image';
import { useNetworkConfig } from '~/lib/global/useNetworkConfig';
import SwapMastheadImage from '~/assets/images/swap-masthead-image.png';
import SwapMastheadOpImage from '~/assets/images/swap-masthead-image-OP.png';
import { ClaimContainer } from '~/modules/claim/ClaimContainer';
import { GaugeListProvider } from '~/lib/global/gauges/useVotingGauges';

function ClaimPage() {
  const { chainId } = useNetworkConfig();
  return (
    <>
      <Head>
        <title>Vertek | Claim</title>
      </Head>

      <PageMasthead
        title="Vertek Claiming"
        image={
          <NextImage
            src={chainId === '10' ? SwapMastheadOpImage : SwapMastheadImage}
            width="213.71px"
            height="68px"
          />
        }
      />
      <GaugeListProvider>
        <ClaimContainer />
      </GaugeListProvider>
    </>
  );
}

export default ClaimPage;
