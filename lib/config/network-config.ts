import { NetworkConfig } from '~/lib/config/network-config-type';
import { fantomNetworkConfig } from '~/lib/config/fantom';
import { optimismNetworkConfig } from '~/lib/config/optimism';
import { bscNetworkConfig } from './bsc';
import { goerliNetworkConfig } from './goerli';

const AllNetworkConfigs: { [chainId: string]: NetworkConfig } = {
  '250': fantomNetworkConfig,
  '10': optimismNetworkConfig,
  '56': bscNetworkConfig,
};

export const networkConfig = AllNetworkConfigs[process.env.NEXT_PUBLIC_CHAIN_ID || '250'];

export const networkList = [
  {
    name: fantomNetworkConfig.networkShortName,
    chainId: fantomNetworkConfig.chainId,
    url: 'https://beets.fi',
    iconUrl: fantomNetworkConfig.eth.iconUrl,
  },
  {
    name: optimismNetworkConfig.networkShortName,
    chainId: optimismNetworkConfig.chainId,
    url: 'https://op.beets.fi',
    iconUrl: optimismNetworkConfig.eth.iconUrl,
  },
  {
    name: bscNetworkConfig.networkShortName,
    chainId: bscNetworkConfig.chainId,
    url: 'https://beets.fi',
    iconUrl: bscNetworkConfig.eth.iconUrl,
  },
  {
    name: goerliNetworkConfig.networkShortName,
    chainId: goerliNetworkConfig.chainId,
    url: 'https://beets.fi',
    iconUrl: goerliNetworkConfig.eth.iconUrl,
  },
];
