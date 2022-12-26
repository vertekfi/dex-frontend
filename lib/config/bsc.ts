import { NetworkConfig } from '~/lib/config/network-config-type';
import { AddressZero } from '@ethersproject/constants';

export const bscNetworkConfig: NetworkConfig = {
  appName: 'Vertex',
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
  multicall: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
  beets: {
    address: '',
  },
  fbeets: {
    address: '',
    farmId: '',
    poolId: '',
  },
  balancer: {
    vault: '',
    batchRelayer: '',
    composableStableFactory: '',
    weightedPoolV2Factory: '',
    linearFactories: {
      erc4626: [],
      reaper: [],
    },
    linearRebalancers: {},
  },
  beetsPoolOwnerAddress: '',
  masterChefContractAddress: '',
  defaultTokenIn: '',
  defaultTokenOut: '',
  farmTypeName: 'gauge',
  additionalLinks: [
    {
      title: 'Vote',
      url: 'https://snapshot.org/#/beets.eth',
    },
    {
      title: 'Analytics',
      url: 'https://info.beets.fi',
    },
    {
      title: 'Docs & Help',
      url: 'https://docs.beets.fi',
    },
    {
      title: 'Github',
      url: 'https://github.com/beethovenxfi',
    },
    {
      title: 'Twitter',
      url: 'https://twitter.com/beethoven_x',
    },
    {
      title: 'Medium',
      url: 'https://beethovenxio.medium.com/',
    },
    {
      title: 'Discord',
      url: 'https://discord.gg/jedS4zGk28',
    },
    {
      title: 'Olympus Bonds',
      url: 'https://pro.olympusdao.finance/#/bond',
    },
    {
      title: 'Multichain Bridge',
      subTitle: 'ETH / AVAX / BSC / MATIC',
      url: 'https://app.multichain.org/#/router',
    },
    {
      title: 'AllBridge',
      subTitle: 'SOL / MATIC / CELO',
      url: 'https://app.allbridge.io/bridge?from=SOL&to=FTM&asset=SOL',
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
  createPoolUrl: 'https://v1.beets.fi/#/pool-create',
  launchUrl: 'https://v1.beets.fi/#/launch',
  stakeUrl: 'https://v1.beets.fi/#/stake',
};
