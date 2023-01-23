import Head from 'next/head';
import { PageMasthead } from '~/components/masthead/PageMasthead';
import { Box, Text } from '@chakra-ui/react';
import NextImage from 'next/image';
import { useNetworkConfig } from '~/lib/global/useNetworkConfig';
import BeetsTokenInfoImage from '~/assets/svg/vertek-logo-dark.svg';
import BeetsTokenInfoOpImage from '~/assets/svg/vertek-logo-dark.svg';
import WidgetType from '@layerzerolabs/stargate-ui';
import dynamic from 'next/dynamic';
import { FC } from 'react';

const Widget = dynamic<typeof WidgetType>(() => import('@layerzerolabs/stargate-ui'), {
  ssr: false,
});

  const BridgePage: FC = () => {

  const { chainId } = useNetworkConfig();

  return (
    <>
      <Head>
        <title>Vertek | Bridge</title>
      </Head>
      <PageMasthead
        title="Vertek Bridge"
        image={
          <NextImage
            src={chainId === '10' ? BeetsTokenInfoOpImage : BeetsTokenInfoImage}
            width="466px"
            height="253px"
          />
        }
      />
      <Widget themeName="light"></Widget>;
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        mb="25%"
        alignItems="center"
      >
        <Box mb="-20">
          <NextImage
            src={chainId === '10' ? BeetsTokenInfoOpImage : BeetsTokenInfoImage}
            width="466px"
            height="253px"
          />
          
        </Box>
      </Box>
    </>
  );
}

export default BridgePage;
