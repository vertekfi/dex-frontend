import Head from 'next/head';
import { PageMasthead } from '~/components/masthead/PageMasthead';
import { Box, Text } from '@chakra-ui/react';
import NextImage from 'next/image';
import { useNetworkConfig } from '~/lib/global/useNetworkConfig';
import BeetsTokenInfoImage from '~/assets/svg/vertek-logo-dark.svg';
import BeetsTokenInfoOpImage from '~/assets/svg/vertek-logo-dark.svg';
import { GaugeListProvider } from '~/lib/global/gauges/useVotingGauges';
import { NFTContainer } from '~/modules/nft/NFTContainer';
import { UserTokenBalancesProvider } from '~/lib/user/useUserTokenBalances';
import { PoolUserBptBalanceProvider } from '~/modules/pool/lib/usePoolUserBptBalance';

function NFTPage() {
  const { chainId } = useNetworkConfig();
  return (
    <>
      <Head>
        <title>Vertek | NFT</title>
      </Head>
      <UserTokenBalancesProvider>
        <GaugeListProvider>
          <PageMasthead
            title="Vertek NFT Marketplace"
            image={
                <NextImage
                src={chainId === '10' ? BeetsTokenInfoOpImage : BeetsTokenInfoImage}
                width="466px"
                height="253px"
              />
            }
          />
          <Box display="flex" flexDirection="column" justifyContent="center" mb="25%" alignItems="center">
                <Box mb="-20">
                <NextImage
                src={chainId === '10' ? BeetsTokenInfoOpImage : BeetsTokenInfoImage}
                width="466px"
                height="253px"
                
                />
                </Box>

                <Text fontSize="2rem" >Coming Soon...</Text>
        </Box>

          <NFTContainer />
        </GaugeListProvider>
      </UserTokenBalancesProvider>
    </>
  );
}

export default NFTPage;
