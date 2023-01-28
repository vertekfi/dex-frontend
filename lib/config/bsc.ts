import { NetworkConfig } from '~/lib/config/network-config-type';
import { AddressZero } from '@ethersproject/constants';

export const bscNetworkConfig: NetworkConfig = {
  appName: 'Vertek',
  chainId: '56',
  networkName: 'BNB Chain',
  networkShortName: 'BNB Chain',
  etherscanName: 'BSC Scan',
  etherscanUrl: 'https://bscscan.com',
  testnet: false,
  eth: {
    name: 'BNB',
    address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
    symbol: 'BNB',
    decimals: 18,
    iconUrl: 'https://assets.coingecko.com/coins/images/825/small/bnb-icon2_2x.png?1644979850',
  },
  wethAddress: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
  wethAddressFormatted: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
  coingecko: {
    nativeAssetId: 'binancecoin',
    platformId: 'binance',
  },
  rpcUrl: 'https://bsc-dataseed.binance.org',
  multicall: '0x4Ba82B21658CAE1975Fa26097d87bd48FF270124',
  backendUrl: '',
  subgraphs: {
    balancer: 'https://api.thegraph.com/subgraphs/name/vertekfi/vertek-subgraph',
    gauges: 'https://api.thegraph.com/subgraphs/name/vertekfi/vertek-gauges-subgraph',
  },
  beets: {
    address: '0xeD236c32f695c83Efde232c288701d6f9C23E60E',
  },
  balancer: {
    vault: '0x719488F4E859953967eFE963c6Bed059BaAab60c',
    feeDistributor: '',
    batchRelayer: '',
    composableStableFactory: '',
    weightedPoolV2Factory: '0xDE8993Bf9D6Eb1e0d752fe56ccB85Ef76538ABb6',
    linearFactories: {
      erc4626: [],
      reaper: [],
    },
    linearRebalancers: {},
    votingEscrow: {
      veAddress: '0x98A73443fb00EDC2EFF0520a00C53633226BF9ED',
      gaugeController: '0x99bFf5953843A211792BF3715b1b3b4CBeE34CE6',
      veBALHelpers: '0xab31C0E1019a8e08748235a76f94497AF9d8718E',
      tokenAdmin: '0x8A935a7c86CA749aD1C6fD7dAA0A916A0ACF8bF8',
      lockablePoolId: '0xdd64e2ec144571b4320f7bfb14a56b2b2cbf37ad000200000000000000000000',
      lockPoolAddress: '0xDD64E2EC144571b4320f7BFB14a56b2b2cBF37ad',
    },
  },
  beetsPoolOwnerAddress: '',
  masterChefContractAddress: '',
  defaultTokenIn: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
  defaultTokenOut: '0xeD236c32f695c83Efde232c288701d6f9C23E60E',
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
    // {
    //   title: 'Github',
    //   url: 'https://github.com/beethovenxfi',
    // },
    // {
    //   title: 'Twitter',
    //   url: 'https://twitter.com/beethoven_x',
    // },
    // {
    //   title: 'Medium',
    //   url: 'https://beethovenxio.medium.com/',
    // },
    // {
    //   title: 'Discord',
    //   url: 'https://discord.gg/jedS4zGk28',
    // },
    // {
    //   title: 'Olympus Bonds',
    //   url: 'https://pro.olympusdao.finance/#/bond',
    // },
    // {
    //   title: 'Multichain Bridge',
    //   subTitle: 'ETH / AVAX / BSC / MATIC',
    //   url: 'https://app.multichain.org/#/router',
    // },
    // {
    //   title: 'AllBridge',
    //   subTitle: 'SOL / MATIC / CELO',
    //   url: 'https://app.allbridge.io/bridge?from=SOL&to=FTM&asset=SOL',
    // },
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
  createPoolUrl: '/#/pool-create',
  stakeUrl: '/#/stake',
};
