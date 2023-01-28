import Head from 'next/head';
import { PageMasthead } from '~/components/masthead/PageMasthead';
import NextImage from 'next/image';
import { useNetworkConfig } from '~/lib/global/useNetworkConfig';
import SwapMastheadImage from '~/assets/images/swap-masthead-image.png';
import BeetsTokenInfoImage from '~/assets/svg/vertek-logo-dark.svg';
import { Box } from '@chakra-ui/react';
import SwapMastheadOpImage from '~/assets/images/swap-masthead-image-OP.png';
import { GaugeListProvider } from '~/lib/global/gauges/useVotingGauges';
import { VotingContainer } from '~/modules/voting/VotingContainer';
import { UserTokenBalancesProvider } from '~/lib/user/useUserTokenBalances';
import { PoolUserBptBalanceProvider } from '~/modules/pool/lib/usePoolUserBptBalance';

function VotingPage() {
  const { chainId } = useNetworkConfig();
  return (
    <>
      <Head>
        <title>Vertek | Voting</title>
      </Head>
      <UserTokenBalancesProvider>
        <GaugeListProvider>
          <Box display="flex" flexDirection="row" width="100%">
          <PageMasthead
            title="The Vertek Volta"
            image={
              <NextImage
                src={chainId === '56' ? BeetsTokenInfoImage : BeetsTokenInfoImage}
                width="213.71px"
                height="68px"
              />
            }
          />
        </Box>

          <VotingContainer />
        </GaugeListProvider>
      </UserTokenBalancesProvider>
    </>
  );
}

export default VotingPage;
