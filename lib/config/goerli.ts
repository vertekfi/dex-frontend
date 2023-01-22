import { NetworkConfig } from '~/lib/config/network-config-type';
import { AddressZero } from '@ethersproject/constants';

export const goerliNetworkConfig: NetworkConfig = {
  appName: 'Vertek',
  chainId: '5',
  networkName: 'Goerli Testnet',
  networkShortName: 'Goerli',
  etherscanName: 'Goerli Testnet Explorer',
  etherscanUrl: 'https://goerli.etherscan.io/',
  testnet: true,
  eth: {
    name: 'Goerli ETH',
    address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
    symbol: 'GETH',
    decimals: 18,
    iconUrl:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png',
  },
  wethAddress: '0xe4E96Cf369D4d604Bedc4d7962F94D53E4B5e3C6',
  wethAddressFormatted: '0xe4E96Cf369D4d604Bedc4d7962F94D53E4B5e3C6',
  coingecko: {
    nativeAssetId: 'ethereum',
    platformId: 'ethereum',
  },
  rpcUrl: 'https://eth-goerli.g.alchemy.com/v2/cK2OOgcOIjM2enbLpRfinpxq8hdY9aGU',
  multicall: '0x1050Bcfb2ec4CAe624BD1Eec5dadc2a3b4f4559a', // V1 type
  backendUrl: 'http://localhost:5000/graphql',
  subgraphs: {
    balancer: '',
    gauges: '',
  },
  beets: {
    address: '0x0bD5AC1eDcA0380E8709773F502C2960DeCcaF79',
  },
  balancer: {
    vault: '0x1F56FDcB9E3a818E4BB2E6Fe2cb73F7385D3Aeac',
    feeDistributor: '0x41e5dE004C19497B04A6Dc4902DF5f6b5a6859C5',
    batchRelayer: '',
    composableStableFactory: '',
    weightedPoolV2Factory: '0x8F1a6dD65E8d76de878dEb776A5D41b5919Feba7',
    weightedPoolFactory: '0x8F1a6dD65E8d76de878dEb776A5D41b5919Feba7',
    linearFactories: {
      erc4626: [],
      reaper: [],
    },
    linearRebalancers: {},
    votingEscrow: {
      veAddress: '0xE135f5772f7dd368dDDC759FA31a11419e253d00',
      gaugeController: '0x88FA9a8887DdB5d7F27d5a9A10fb70aEf47dd2F1',
      veBALHelpers: '0x9Eb753aA97a6E748e1a3334197666f608fFe90BB',
      tokenAdmin: '0xb8e6D3700BCE2CC163BD4FfC52dA1F65CFeE8909',
      lockablePoolId: '0x39f84fe24135d3c160b5e1bca36b0e66b6c11c4e000200000000000000000004',
      lockPoolAddress: '0x39F84FE24135D3C160b5E1BCa36b0e66b6C11c4E',
    },
  },
  beetsPoolOwnerAddress: '0x891eFc56f5CD6580b2fEA416adC960F2A6156494',
  masterChefContractAddress: '',
  defaultTokenIn: '0xe4E96Cf369D4d604Bedc4d7962F94D53E4B5e3C6',
  defaultTokenOut: '0x0bD5AC1eDcA0380E8709773F502C2960DeCcaF79',
  farmTypeName: 'gauge',
  additionalLinks: [
    // {
    //   title: 'Vote',
    //   url: 'https://snapshot.org/#/beets.eth',
    // },
    // {
    //   title: 'Analytics',
    //   url: 'https://info.beets.fi',
    // },
    // {
    //   title: 'Docs & Help',
    //   url: 'https://docs.beets.fi',
    // },
    {
      title: 'Github',
      url: 'https://github.com/vertekfi',
    },
    {
      title: 'Twitter',
      url: 'https://twitter.com/Vertek_Dex',
    },
    // {
    //   title: 'Medium',
    //   url: 'https://beethovenxio.medium.com/',
    // },
    {
      title: 'Discord',
      url: 'https://discord.com/invite/vertek-ames-aalto',
    },
  ],
  priceImpact: {
    invest: {
      noticeable: 0.005,
      high: 0.01,
    },
    trade: {
      noticeable: 0.01,
      high: 0.05,
    },
    withdraw: {
      noticeable: 0.005,
      high: 0.01,
    },
  },
  gauge: {
    rewardHelperAddress: AddressZero,
  },
  createPoolUrl: 'https://vertek.exchange/#/pool-create',
  stakeUrl: '',
};
