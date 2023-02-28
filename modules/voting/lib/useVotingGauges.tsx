import { intervalToDuration } from 'date-fns';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { useGetLiquidityGaugesQuery } from '~/apollo/generated/graphql-codegen-generated';
import { gaugeControllerDecorator } from '~/lib/services/staking/gauge-controller.decorator';
import { VotingGauge } from '~/lib/services/staking/types';
import { useUserAccount } from '~/lib/user/useUserAccount';
import { getVotePeriodEndTime } from '~/lib/util/epoch-utils';

/**
 * Gets the list of current gauges and provides a countdown timer for epoch end
 */
export function _useGauges() {
  const [votingPeriodEnd, setVotingPeriodEnd] = useState<number[]>();
  const [votingPeriodLastHour, setVotingPeriodLastHour] = useState<boolean>();
  const [votingGauges, setVotingGauges] = useState<any[]>();
  const [unallocatedVotes, setUnallocatedVotes] = useState<number>();

  const { userAddress } = useUserAccount();

  // Get the current gauges
  const {
    data: gauges,
    loading: isLoadingGauges,
    refetch,
  } = useGetLiquidityGaugesQuery({
    pollInterval: 30000,
    notifyOnNetworkStatusChange: true,
  });

  function setUserVotes(gauges: any[]) {
    const totalVotes = 1e4; // 10,000
    // Set the users remaining votes
    const votesRemaining = gauges.reduce((remainingVotes: number, gauge) => {
      return remainingVotes - parseFloat(gauge.userVotes);
    }, totalVotes);

    setUnallocatedVotes(votesRemaining);

    // filter out temp old gauge after user votes tally is complete
    return gauges.filter(
      (g) => g.pool.id !== '0x5deb10ed6a66a1e6188b7925a723b6bdfd97476500020000000000000000000a',
    );
  }

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

  // Set gauge voting info for the list of current gauges
  useEffect(() => {
    // inefficient. Use the useCallback thingie or something
    const setGauges = async () => {
      const decoratedGauges = await gaugeControllerDecorator.decorateWithVotes(
        (gauges?.getLiquidityGauges || []) as unknown as VotingGauge[],
        userAddress,
      );

      console.log(decoratedGauges);

      const filteredGauges = setUserVotes(decoratedGauges);
      setVotingGauges(filteredGauges);
    };

    if (userAddress && !isLoadingGauges && gauges?.getLiquidityGauges) {
      // decorate for UI and use state version in other effects
      setGauges();
    }
  }, [isLoadingGauges, gauges, userAddress]);

  return {
    isLoading: !votingGauges && isLoadingGauges,
    votingGauges,
    votingPeriodEnd,
    votingPeriodLastHour,
    unallocatedVotes,
    refetch,
  };
}

export const VotingGaugeListContext = createContext<ReturnType<typeof _useGauges> | null>(null);

export function GaugeListProvider(props: { children: ReactNode }) {
  const value = _useGauges();

  return (
    <VotingGaugeListContext.Provider value={value}>
      {props.children}
    </VotingGaugeListContext.Provider>
  );
}

export function useVotingGauges() {
  return useContext(VotingGaugeListContext) as ReturnType<typeof _useGauges>;
}
