import { watchNetwork } from '@wagmi/core';
import { useEffect, useState } from 'react';

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
    return unwatchNetwork();
  }, []);

  return {
    isTestnet,
  };
}
