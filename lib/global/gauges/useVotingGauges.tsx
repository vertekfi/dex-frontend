import { intervalToDuration, nextThursday } from 'date-fns';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { useGetLiquidityGaugesQuery } from '~/apollo/generated/graphql-codegen-generated';
import { gaugeControllerDecorator } from '~/lib/services/staking/gauge-controller.decorator';
import { VotingGauge, VotingGaugeWithVotes } from '~/lib/services/staking/types';
import { useUserAccount } from '~/lib/user/useUserAccount';

export function _useGauges() {
  const [votingPeriodEnd, setVotingPeriodEnd] = useState<number[]>();
  const [votingPeriodLastHour, setVotingPeriodLastHour] = useState<boolean>();
  const [unallocatedVoteWeight, setUnallocatedVoteWeight] = useState<number>(0);
  const [votingGauges, setVotingGauges] = useState<VotingGaugeWithVotes[]>([]);

  const { userAddress } = useUserAccount();

  const {
    data: gauges,
    loading: isLoading,
    refetch,
  } = useGetLiquidityGaugesQuery({
    pollInterval: 30000,
    notifyOnNetworkStatusChange: true,
  });

  // Update voting period timer
  useEffect(() => {
    const nowInterval = setInterval(() => {
      const periodEnd = getVotePeriodEndTime();
      const interval: Interval = { start: Date.now(), end: periodEnd };
      const timeUntilEnd: Duration = intervalToDuration(interval);
      const formattedTime = [
        (timeUntilEnd.days || 0) % 7,
        timeUntilEnd.hours || 0,
        timeUntilEnd.minutes || 0,
        timeUntilEnd.seconds || 0,
      ];

      const isLastHour = (timeUntilEnd.days || 0) < 1 && (timeUntilEnd.hours || 0) < 1;

      setVotingPeriodEnd(formattedTime);
      setVotingPeriodLastHour(isLastHour);
    }, 1000);

    return () => clearInterval(nowInterval);
  }, []);

  // Set gauge voting info
  useEffect(() => {
    // inefficient. Use the useCallback thingie or something
    const setGauges = async () => {
      const decoratedGauges = await gaugeControllerDecorator.decorateWithVotes(
        (gauges?.getLiquidityGauges || []) as unknown as VotingGauge[],
        userAddress,
      );
      setVotingGauges(decoratedGauges);
    };

    if (!isLoading && gauges?.getLiquidityGauges) {
      console.log(gauges?.getLiquidityGauges);
      // decorate for UI and use state version in other effects
      setGauges();
    }
  }, [isLoading, gauges]);

  useEffect(() => {
    // inefficient. Use the useCallback thingie or something
    const setGauges = async () => {
      const decoratedGauges = await gaugeControllerDecorator.decorateWithVotes(
        (gauges?.getLiquidityGauges || []) as unknown as VotingGauge[],
        userAddress,
      );
      setVotingGauges(decoratedGauges);
    };

    if (userAddress && !isLoading && gauges?.getLiquidityGauges) {
      // decorate for UI and use state version in other effects
      setGauges();
    }
  }, [isLoading, gauges]);

  // Set users voting info
  useEffect(() => {
    const totalVotes = 1e4; // 10,000

    if (votingGauges.length) {
      // Set the users remaining votes
      const votesRemaining = votingGauges.reduce((remainingVotes: number, gauge) => {
        return remainingVotes - parseFloat(gauge.userVotes);
      }, totalVotes);

      setUnallocatedVoteWeight(votesRemaining);
    } else {
      setUnallocatedVoteWeight(totalVotes);
    }
  }, [votingGauges]);

  function getVotePeriodEndTime(): number {
    const n = nextThursday(new Date());
    const epochEndTime = Date.UTC(n.getFullYear(), n.getMonth(), n.getDate(), 0, 0, 0);
    return epochEndTime;
  }

  return {
    isLoading,
    votingGauges,
    unallocatedVoteWeight,
    votingPeriodEnd,
    votingPeriodLastHour,
    refetch,
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
