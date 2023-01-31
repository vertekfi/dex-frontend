import Head from 'next/head';
import { initializeApolloClient, loadApolloState } from '~/apollo/client';
import { StakingContainer } from '~/modules/staking/StakingContainer';
import { PageMasthead } from '~/components/masthead/PageMasthead';
import NextImage from 'next/image';
import { useNetworkConfig } from '~/lib/global/useNetworkConfig';
import SwapMastheadImage from '~/assets/images/swap-masthead-image.png';
import SwapMastheadOpImage from '~/assets/images/swap-masthead-image-OP.png';
import { RewardPoolProvider } from '~/modules/staking/lib/useRewardPoolStaking';
import Vertek from '~/assets/svg/vertek-logo.svg'

function StakingPage() {
  const { chainId } = useNetworkConfig();
  const TITLE = 'Vertek | Stake';
  const DESCRIPTION = 'Stake your tokens to earn rewards';
  return (
    <>
      <Head>
                <title>{TITLE}</title>
                <meta name="title" content={TITLE} />
                <meta property="og:title" content={TITLE} />
                <meta property="twitter:title" content={TITLE} />

                <meta name="description" content={DESCRIPTION} />
                <meta property="og:description" content={DESCRIPTION} />
                <meta property="twitter:description" content={DESCRIPTION} />
      </Head>


      <RewardPoolProvider>
        <PageMasthead
          title="Vertek Staker"
          image={
            <NextImage
              src={Vertek}
              width="213.71px"
              height="68px"
            />
          }
        />
        <StakingContainer />
      </RewardPoolProvider>
    </>
  );
}

export async function getStaticProps() {
  const client = initializeApolloClient();

  return loadApolloState({ client });
}
export default StakingPage;
