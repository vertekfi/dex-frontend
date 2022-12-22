import Head from 'next/head';
import { StakingContainer } from '~/modules/staking/StakingContainer';
import { PageMasthead } from '~/components/masthead/PageMasthead';
import NextImage from 'next/image';
import { useNetworkConfig } from '~/lib/global/useNetworkConfig';
import SwapMastheadImage from '~/assets/images/swap-masthead-image.png';
import SwapMastheadOpImage from '~/assets/images/swap-masthead-image-OP.png';
import { RewardPoolProvider } from '~/modules/staking/useRewardPoolStaking';

function StakingPage() {
  const { chainId } = useNetworkConfig();
  return (
    <>
      <Head>
        <title>Vertex | Staking</title>
      </Head>

      <RewardPoolProvider>
        <PageMasthead
          title="Vertek Staker"
          image={
            <NextImage
              src={chainId === '10' ? SwapMastheadOpImage : SwapMastheadImage}
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

export default StakingPage;
