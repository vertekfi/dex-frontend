import Head from 'next/head';
import { useAnimation } from 'framer-motion';
import { PageMasthead } from '~/components/masthead/PageMasthead';
import Card from '~/components/card/Card';
import { Box } from '@chakra-ui/react';
import NextImage from 'next/image';
import { useNetworkConfig } from '~/lib/global/useNetworkConfig';
import BeetsTokenInfoImage from '~/assets/svg/vertek-logo-dark.svg';
import BeetsTokenInfoOpImage from '~/assets/svg/vertek-logo-dark.svg';
import { useTheme } from '@chakra-ui/react'
import Script from 'next/script';
import { FC } from 'react';

const BridgePage: FC = () => {
  const { chainId } = useNetworkConfig();
  const theme = useTheme();
  const controls = useAnimation();

  return (
    <>
      <Head>
        <title>Vertek | Bridge</title>
      </Head>
      {/* 
      // @ts-ignore  */}
      <style jsx global>{`
        .MuiScopedCssBaseline-root {
          background-color: transparent !important;
        }
        .MuiPaper-root {
          background-color: ${theme.colors.vertek.slate[900]} !important;
        }
        .MuiFab-label {
          border: 6px solid ${theme.colors.vertek.neonpurple[900]} !important;
          padding-top: 6px;
          padding-bottom: 6px;
          border-radius: 100%;
        }
        .MuiFab-label:hover {
          rotate: 90deg;
          border: 6px solid ${theme.colors.vertek.neonpurple[700]} !important;
        }
        .MuiInputBase-root {
          background-color: ${theme.colors.vertek.slatepurple[900]} !important;
        }
        .StgHeader {
          border-bottom: 1px solid #0070f3 !important;
          font-family: ${theme.fonts.heading}
        }
        .StgHeader .MuiTypography-subtitle1 {
          font-family: ${theme.fonts.body};
          font-weight: 600;
        }
        .MuiScopedCssBaseline-root .StgMaxButton {
          border-color: ${theme.colors.vertek.slate[500]} !important;
          background-color: transparent;
          font-family: ${theme.fonts.body};
          padding: 11px 16px;
          font-size: 13px;
          background: ${theme.components.Button.variants.primary.background};
        }
        .MuiInputBase-root {
          box-shadow: '0px 0px 8px 4px rgba(0, 0, 0, 0.4)';
          border: 1px solid transparent !important;
        }
        .MuiInputBase-root:hover {
          border: 2px solid ${theme.colors.vertek.slatepurple[500]} !important;
        }
        .MuiButton-containedPrimary {
          border: 2px solid ${theme.colors.vertek.slate[500]} !important;
          font-family: ${theme.fonts.body};
          padding: 11px 16px;
          font-size: 13px;
          background: ${theme.components.Button.variants.primary.background} !important;
        }
        .MuiButton-root:hover {
          border: 2px solid ${theme.colors.vertek.neonpurple[500]} !important;
          background: ${theme.colors.vertek.slate[900]} !important;
        }
        .MuiButton-label {
          color: #fff;
          font-family: ${theme.fonts.body};
        }
        .MuiButton-containedPrimary:hover {
          text-decoration: none !important;
          border: 2px solid ${theme.colors.vertek.neonpurple[500]} !important;
          background: ${theme.colors.vertek.slate[900]} !important;
        }
        .MuiFormLabel-root.Mui-focused {
          color: ${theme.colors.vertek.slatepurple[500]} !important;
        }
      `}</style>
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
      <Script
        src="https://unpkg.com/@layerzerolabs/stargate-ui@latest/element.js"
        defer
        async
      ></Script>
          <Card
      animate={controls}
      position="relative"
      boxShadow='0 0 10px #5BC0F8, 0 0 20px #4A4AF6'
      borderRadius="16px"
    >
       {/* 
      // @ts-ignore  */}
      <stargate-widget
        theme="dark"
        partnerId="0x0010"
        // need to add this wallet
        feeCollector="0x26441aE27Ce06D140Ef5b1Bc5E4f43B83bdBa0e4"
        tenthBps="10"
      />
      </Card>
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
};

export default BridgePage;
