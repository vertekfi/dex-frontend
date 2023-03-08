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
    address: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
    symbol: 'BNB',
    decimals: 18,
    iconUrl: 'https://assets.coingecko.com/coins/images/825/small/bnb-icon2_2x.png?1644979850',
  },
  wethAddress: '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',
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
    feeDistributor: '0x1ac7c3C34d03f0b4E97FB4a3F08dF4DE6989FfB3',
    feeDistOne: '0x2CFCe0B4d47A994E56904D9EbB9716bbd0A59AbC',
    balMinter: '0xeF0bb9a74218649dE92C86FE0add74c5a03C4c09',
    batchRelayer: '0x558BDC96018B9C3dc46481c04B212465D6A69fF0',
    composableStableFactory: '0xfD50F5eAd870bdCFa69940c41a5C10f015b419e7',
    weightedPoolV2Factory: '0xDE8993Bf9D6Eb1e0d752fe56ccB85Ef76538ABb6',
    // weightedPoolV2FactoryFees: '0xb9C7a581F0792d667beb684Bab1AF4FFFa14DA98',
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
  nft: {
    nftStakingContract: '0xDb52E06a75CAaB7013a0c3127F7AE80De7Be6752',
    nftAddress: '0xFF068652C5D720B2cd4653B0Cc0AF22c4D668a43',
  },
  beetsPoolOwnerAddress: '0x891eFc56f5CD6580b2fEA416adC960F2A6156494',
  masterChefContractAddress: '',
  defaultTokenIn: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
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
