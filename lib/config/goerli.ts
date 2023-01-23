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
    address: '0xa5694789C0BaED77d16ca36edC45C9366DBFe0A9',
  },
  balancer: {
    vault: '0xD8a14084e92d6187F1945cB31995d67de54906cD',
    feeDistributor: '0x41e5dE004C19497B04A6Dc4902DF5f6b5a6859C5',
    batchRelayer: '',
    composableStableFactory: '',
    weightedPoolV2Factory: '0x0E7EBca7B9cbFB2797d812D52Bb6DD09598e3601',
    weightedPoolFactory: '0x0E7EBca7B9cbFB2797d812D52Bb6DD09598e3601',
    linearFactories: {
      erc4626: [],
      reaper: [],
    },
    linearRebalancers: {},
    votingEscrow: {
      veAddress: '0x8F9c3B9b55E5bc1c44ca251d4cA2b625fa36A3da',
      gaugeController: '0x10320e8318bFF7259ecf94f9aF03ceA62B1B30D0',
      veBALHelpers: '0xd59c27c69072B613D2beC3c1926B288a3f06714f',
      tokenAdmin: '0x04d825AC6480A6D877cD74C811bE61909D3Bd1be',
      lockablePoolId: '0x762b77980ea2d624cdc5f774352f25c598e469ce000200000000000000000000',
      lockPoolAddress: '0x762b77980Ea2d624CDc5F774352F25C598E469CE',
    },
  },
  beetsPoolOwnerAddress: '0x891eFc56f5CD6580b2fEA416adC960F2A6156494',
  masterChefContractAddress: '',
  defaultTokenIn: '0xe4E96Cf369D4d604Bedc4d7962F94D53E4B5e3C6',
  defaultTokenOut: '0xa5694789C0BaED77d16ca36edC45C9366DBFe0A9',
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
