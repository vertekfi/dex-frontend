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
  beets: {
    address: '0xaFbf7fB9Fa206089041218dF93c8B3A1Bb9F4497',
  },
  balancer: {
    vault: '0x4b93431a1942A0F3Be0a082834200FFd9BE54FD4',
    feeDistributor: '0x41e5dE004C19497B04A6Dc4902DF5f6b5a6859C5',
    batchRelayer: '',
    composableStableFactory: '',
    weightedPoolV2Factory: '',
    weightedPoolFactory: '0x274B157a7b312175936Dc16fCA5209ee9DE8422e',
    linearFactories: {
      erc4626: [],
      reaper: [],
    },
    linearRebalancers: {},
    votingEscrow: {
      veAddress: '0x0701037C5Af32ec230dB00af18075C5a91a4D259',
      gaugeController: '0xdb3c6c83828D903D99aCD198e9e638a365cd52e6',
      veBALHelpers: '0xe030325aDa7e0365EBD0efb4adf3ef55F5Fd3BAE',
      tokenAdmin: '0xaF3F9EB221f3DB6cEEdC6cC24818A18869Feb268',
    },
  },
  beetsPoolOwnerAddress: '0x891eFc56f5CD6580b2fEA416adC960F2A6156494',
  masterChefContractAddress: '',
  defaultTokenIn: '0xe4E96Cf369D4d604Bedc4d7962F94D53E4B5e3C6',
  defaultTokenOut: '0xaFbf7fB9Fa206089041218dF93c8B3A1Bb9F4497',
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
  createPoolUrl: 'https://dex-frontend-v2.vercel.app/#/pool-create',
  stakeUrl: 'https://dex-frontend-v2.vercel.app/#/voting',
};
