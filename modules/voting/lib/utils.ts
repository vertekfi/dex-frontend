import { bnum, scale } from '~/lib/util/big-number.utils';
import { fNum2 } from '~/lib/util/useNumber';

export function formatVotesAsPercent(votes: string): string {
  const normalizedVotes = scale(bnum(votes), -18);
  return fNum2(normalizedVotes.toString(), {
    style: 'percent',
    maximumFractionDigits: 2,
    fixedFormat: true,
  });
}
