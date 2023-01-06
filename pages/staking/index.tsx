import Head from 'next/head';
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
  return (
    <>
      <Head>
        <title>Vertek | Staking</title>
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

export default StakingPage;
