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
    balancer: 'https://api.thegraph.com/subgraphs/name/vertekfi/vertek-v2-goerli',
    gauges: 'https://api.thegraph.com/subgraphs/name/vertekfi/goerli-gauges-v2',
  },
  beets: {
    address: '0x5E1D334E7CFF8436bA39E24d452eB6E8451B5F9b',
  },
  vertek: {
    bribeManager: '',
    bribeRewardClaims: '',
  },
  balancer: {
    vault: '0xBA5CE8dFcB1E077B4537aCaD17400D843842c520',
    feeDistributor: '0xd4ccC5b4d7085603BB03C366F25738494B12E8c9',
    balMinter: '',
    batchRelayer: '',
    composableStableFactory: '',
    weightedPoolV2Factory: '0x94b67Ee1359A26E0527BFafD9C37aD84D9ABda77',
    weightedPoolFactory: '',
    linearFactories: {
      erc4626: [],
      reaper: [],
    },
    linearRebalancers: {},
    votingEscrow: {
      veAddress: '0x76B64524071b3e56EE8EFBc125a53BBbF04D41aB',
      gaugeController: '0x7bC6C2bF0c730E03285f673806586C60AC0B3205',
      veBALHelpers: '0xf2Ac25c69b05C1a7560dECc7363c5150B24eD974',
      tokenAdmin: '0xf4f37A6F5D836AB19f4C7Caf65c780108dB68e12',
      lockablePoolId: '0xd0f30b415c65b99904caf716abc3da23f57d3cdd000200000000000000000000',
      lockPoolAddress: '0xD0F30B415C65B99904caF716ABc3da23f57d3cdd',
    },
  },

  beetsPoolOwnerAddress: '0x891eFc56f5CD6580b2fEA416adC960F2A6156494',
  masterChefContractAddress: '',
  defaultTokenIn: '0xe4E96Cf369D4d604Bedc4d7962F94D53E4B5e3C6',
  defaultTokenOut: '0x5E1D334E7CFF8436bA39E24d452eB6E8451B5F9b',
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
      url: 'https://discord.com/invite/verteklabs',
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
