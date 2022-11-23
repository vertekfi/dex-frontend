import { NetworkConfig } from '~/lib/config/network-config-type';
import { AddressZero } from '@ethersproject/constants';

export const goerliNetworkConfig: NetworkConfig = {
  appName: 'Vertex',
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
  multicall: '',
  beets: {
    address: '',
  },
  fbeets: {
    address: '',
    farmId: '',
    poolId: '',
  },
  balancer: {
    vault: '0x84259CbD70aA17EB282Cb40666d2687Cd8E100AA',
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
  farmTypeName: 'farm',
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
