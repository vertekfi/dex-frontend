import { useEffect, useState } from 'react';
import { useGetPoolQuery } from '~/apollo/generated/graphql-codegen-generated';
import { networkConfig } from '~/lib/config/network-config';
import { useVeBalQuery } from './useVeBalQuery';
import { useVeVRTK } from './useVeVRTK';

export function useVeLockInfo() {
  const [isLoading, setIsLoading] = useState(true);

  const { veBalBalance, veBalTokenInfo, lockablePoolId } = useVeVRTK();

  const { data: lockPool, loading } = useGetPoolQuery({
    variables: {
      id: networkConfig.balancer.votingEscrow.lockablePoolId,
    },
  });

  const lockQuery = useVeBalQuery();

  useEffect(() => {
    if (lockQuery.data) {
      console.log(lockQuery.data);
    }
  }, [lockQuery]); // not sure about using this here

  useEffect(() => {
    if (lockPool) {
      console.log(lockPool);
    }
  }, [lockPool]);
}
