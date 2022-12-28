import { watchNetwork } from '@wagmi/core';
import { useEffect, useState } from 'react';

export enum Network {
  GOERLI = 5,
  BSC = 56,
}

export function subdomainFor(network: Network): string {
  switch (network) {
    case Network.BSC:
      return 'vertek.exchange';
    case Network.GOERLI:
      return 'dex-frontend-v2.vercel.app';
    default:
      throw new Error('Network not supported');
  }
}

export function urlFor(network: Network): string {
  const subdomain = subdomainFor(network);
  return `https://${subdomain}/#`;
}

export function useNetworkInfo() {
  const [isTestnet, setIsTesnet] = useState<boolean>(true);
  const unwatchNetwork = watchNetwork((data) => {
    if (data.chain?.id === 5) {
      setIsTesnet(true);
    } else {
      setIsTesnet(false);
    }
    console.log('Network change');
    console.log(data);
  });

  useEffect(() => {
    return () => unwatchNetwork();
  }, []);

  return {
    isTestnet,
  };
}
