import { nextThursday } from 'date-fns';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { useGetLiquidityGaugesQuery } from '~/apollo/generated/graphql-codegen-generated';
import { GOERLI_VOTING_GAUGES, MAINNET_VOTING_GAUGES } from '~/constants/voting-gauges';
import { useNetworkInfo } from '~/lib/global/useNetworkInfo';
import { gaugeControllerDecorator } from '~/lib/services/staking/gauge-controller.decorator';
import { VotingGaugeWithVotes } from '~/lib/services/staking/types';
import { useUserAccount } from '~/lib/user/useUserAccount';

export function _useGauges() {
  const [now, setNow] = useState<number>(Date.now());
  const [votingPeriodEnd, setVotingPeriodEnd] = useState();
  const [unallocatedVotes, setUnallocatedVotes] = useState<number>();
  const [votingGauges, setVotingGauges] = useState<VotingGaugeWithVotes[]>([]);

  const { userAddress } = useUserAccount();
  const { isTestnet } = useNetworkInfo();

  const {
    data: gauges,
    loading: isLoading,
    refetch,
  } = useGetLiquidityGaugesQuery({
    pollInterval: 30000,
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    const nowInterval = setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => clearInterval(nowInterval);
  }, []);

  useEffect(() => {
    const setGauges = async () => {
      const gauges = isTestnet ? GOERLI_VOTING_GAUGES : MAINNET_VOTING_GAUGES;
      const decoratedGauges = await gaugeControllerDecorator.decorateWithVotes(gauges, userAddress);
      setVotingGauges(decoratedGauges);
    };

    if (userAddress && !isLoading && gauges?.getLiquidityGauges) {
      // decorate for UI and use state version in other effects
      setGauges();
    }
  }, [isLoading, gauges, userAddress, isTestnet]);

  useEffect(() => {
    const totalVotes = 1e4;

    if (!isLoading && gauges?.getLiquidityGauges) {
      // Set the users remaining votes
      const votesRemaining = votingGauges.reduce((remainingVotes: number, gauge) => {
        return remainingVotes - parseFloat(gauge.userVotes);
      }, totalVotes);

      setUnallocatedVotes(votesRemaining);
    } else {
      setUnallocatedVotes(totalVotes);
    }
  }, [isLoading, gauges]);

  function getVotePeriodEndTime(): number {
    const n = nextThursday(new Date());
    const epochEndTime = Date.UTC(n.getFullYear(), n.getMonth(), n.getDate(), 0, 0, 0);
    return epochEndTime;
  }

  return {
    votingGauges,
    unallocatedVotes,
    refetch,
    isLoading,
  };
}

export const GaugeListContext = createContext<ReturnType<typeof _useGauges> | null>(null);

export function GaugeListProvider(props: { children: ReactNode }) {
  const value = _useGauges();

  return <GaugeListContext.Provider value={value}>{props.children}</GaugeListContext.Provider>;
}

export function useVotingGauges() {
  return useContext(GaugeListContext) as ReturnType<typeof _useGauges>;
}
