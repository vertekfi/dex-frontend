import Head from 'next/head';
import { StakingContainer } from '~/modules/staking/StakingContainer';
import { PageMasthead } from '~/components/masthead/PageMasthead';
import NextImage from 'next/image';
import { RewardPoolProvider } from '~/modules/staking/lib/useRewardPoolStaking';
import Vertek from '~/assets/svg/vertek-logo.svg';
import { UserTokenBalancesProvider } from '~/lib/user/useUserTokenBalances';
import { Box } from '@chakra-ui/react';

function StakingPage() {
  return (
    <>
      <Head>
        <title>Vertek | Staking</title>
      </Head>

      <UserTokenBalancesProvider>
        <RewardPoolProvider>
          <Box display="flex" flexDirection="row" width="100%">
            <PageMasthead
              title="Vertek Staking"
              image={<NextImage src={Vertek} width="213.71px" height="68px" />}
            />
          </Box>

          <StakingContainer />
        </RewardPoolProvider>
      </UserTokenBalancesProvider>
    </>
  );
}

export default StakingPage;
