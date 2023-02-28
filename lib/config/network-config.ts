import { NetworkConfig } from '~/lib/config/network-config-type';
import { bscNetworkConfig } from './bsc';
import { goerliNetworkConfig } from './goerli';
import { hardhatNetworkConfig } from './hardhat';

const AllNetworkConfigs: { [chainId: string]: NetworkConfig } = {
  '56': bscNetworkConfig,
  '5': goerliNetworkConfig,
  '31337': hardhatNetworkConfig,
};

export const networkConfig = AllNetworkConfigs[process.env.NEXT_PUBLIC_CHAIN_ID || '56'];

export const networkList = [
  {
    name: bscNetworkConfig.networkShortName,
    chainId: bscNetworkConfig.chainId,
    url: 'https://vertek.exchange',
    iconUrl: bscNetworkConfig.eth.iconUrl,
  },
  // {
  //   name: hardhatNetworkConfig.networkShortName,
  //   chainId: hardhatNetworkConfig.chainId,
  //   url: 'http://localhost:3000',
  //   iconUrl: hardhatNetworkConfig.eth.iconUrl,
  // },
  // {
  //   name: goerliNetworkConfig.networkShortName,
  //   chainId: goerliNetworkConfig.chainId,
  //   url: 'https://dex-frontend-v2.vercel.app/',
  //   iconUrl: goerliNetworkConfig.eth.iconUrl,
  // },
];
