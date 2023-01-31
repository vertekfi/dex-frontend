import { useEffect, useState } from 'react';
import { Tooltip } from '@chakra-ui/react';
import { useNumbers } from '~/lib/global/useNumbers';
import { VotingGaugeWithVotes } from '~/lib/services/staking/types';
import { bnum, scale } from '~/lib/util/big-number.utils';

type Props = {
  gauge: VotingGaugeWithVotes;
};

export function GaugeVoteInfo(props: Props) {
  const [votesThisPeriod, setVotesThisPeriod] = useState<string>();
  const [votesNextPeriod, setVotesNextPeriod] = useState<string>();
  const [voteDifference, setVoteDifference] = useState<number>(0);
  const [voteDifferenceText, setVoteDifferenceText] = useState<string>();
  const [voteTextClass, setVoteTextClass] = useState<string>();

  const { fNum2 } = useNumbers();

  function formatVotesAsPercent(votes: string): string {
    const normalizedVotes = scale(bnum(votes), -18);
    return fNum2(normalizedVotes.toString(), {
      style: 'percent',
      maximumFractionDigits: 2,
      fixedFormat: true,
    });
  }

  useEffect(() => {
    setVotesThisPeriod(props.gauge.votes);
    setVotesNextPeriod(props.gauge.votesNextPeriod);
  }, [props.gauge]);

  useEffect(() => {
    const text = formatVotesAsPercent(voteDifference.toString());
    const prefix = voteDifference > 0 ? '+' : '';
    setVoteDifferenceText(`${prefix}${text}`);
    setVoteTextClass(voteDifference > 0 ? 'green' : 'red');
  }, [voteDifference]);
}
