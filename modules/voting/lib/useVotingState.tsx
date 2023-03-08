import { VotingGaugeWithVotes } from '~/lib/services/staking/types';
import { bnum, scale } from '~/lib/util/big-number.utils';
import { toJsTimestamp, toUtcTime } from '~/lib/util/time';
import { fNum2, FNumFormats } from '~/lib/util/useNumber';
import { format, formatDistanceToNow } from 'date-fns';
import { useEffect, useState } from 'react';
import { MINIMUM_LOCK_TIME, WEIGHT_VOTE_DELAY } from '../constants';

type ErrorMessage = {
  title: string;
  description: string;
};

type ErrorMessageOrNull = ErrorMessage | null;

export function useVotingState(
  gauge: VotingGaugeWithVotes,
  unallocatedVoteWeight: number,
  veBalLockInfo?: {
    currentVeBalance?: string;
    hasExistingLock?: boolean;
    isExpired?: boolean;
    lockEndDate?: number;
    lockedEndDate?: number;
  },
) {
  // const [hasEnoughVotes, setHasEnoughVotes] = useState<boolean>();
  const [voteWeight, setVoteWeight] = useState<string>('');

  // When input amount changes
  useEffect(() => {
    //  setHasEnoughVotes(isVoteWeightValid(voteWeight));
    const hasVotes = bnum(gauge.userVotes).gt(0);
    const currentWeightNormalized = scale(bnum(gauge.userVotes), -2).toString();
    if (hasVotes) {
      setVoteWeight(currentWeightNormalized);
    }
  }, [voteWeight]);

  let currentWeight = gauge.userVotes;
  // user has active vote for current gauge
  const hasVotes = bnum(gauge.userVotes).gt(0);

  let voteTitle = '';
  let voteButtonText = '';
  if (hasVotes) {
    voteTitle = 'Edit gauge vote';
    voteButtonText = 'Edit vote';
  } else {
    voteTitle = 'Gauge vote';
    voteButtonText = 'Confirm vote';
  }

  const unlockTime = Date.now() + WEIGHT_VOTE_DELAY;
  const voteLockedUntilText = format(toUtcTime(new Date(unlockTime)), 'd LLLL y');

  const remainingVotesFormatted = fNum2(
    scale(bnum(unallocatedVoteWeight).plus(bnum(currentWeight)), -4).toString(),
    FNumFormats.percent,
  );
  const currentVotesFormatted = fNum2(
    scale(bnum(currentWeight), -4).toString(),
    FNumFormats.percent,
  );

  const unallocatedVotesFormatted = fNum2(
    scale(bnum(unallocatedVoteWeight), -4).toString(),
    FNumFormats.percent,
  );

  const localHasEnoughVotes = isVoteWeightValid(voteWeight);
  let remainingVotes: string;
  if (!localHasEnoughVotes) {
    remainingVotes = `This exceeds your remaining votes of: ${remainingVotesFormatted}`;
  } else {
    remainingVotes = hasVotes
      ? `Your remaining votes: ${remainingVotesFormatted} (${currentVotesFormatted} current allocation in this pool + ${unallocatedVotesFormatted}  unallocated votes)`
      : `Your remaining votes: ${remainingVotesFormatted}`;
  }

  /**
   * errors/warnings
   */

  let voteInputDisabled = false;
  let voteButtonDisabled = false;

  let votedTooRecentlyWarning: ErrorMessageOrNull = null;
  const lastUserVoteTime = toJsTimestamp(gauge.lastUserVoteTime);
  if (Date.now() < lastUserVoteTime + WEIGHT_VOTE_DELAY) {
    const remainingTime = formatDistanceToNow(lastUserVoteTime + WEIGHT_VOTE_DELAY);
    votedTooRecentlyWarning = {
      title: 'Votes are locked for 10 days.',
      description: `You won't be able to make any edits to this vote allocation for ${remainingTime}`,
    };
  }

  if (votedTooRecentlyWarning) voteInputDisabled = true;

  const noVeBalWarning: ErrorMessageOrNull =
    Number(veBalLockInfo?.currentVeBalance) > 0
      ? null
      : {
          title: 'You need some veVRTK to vote on gauges',
          description: 'Get veVRTK by locking VPT tokens from the VRTK/BNB pool.',
        };

  if (noVeBalWarning) voteInputDisabled = true;

  // console.log(noVeBalWarning);
  // console.log(voteInputDisabled);

  let veBalLockTooShortWarning: ErrorMessageOrNull = null;
  if (veBalLockInfo?.hasExistingLock && !veBalLockInfo?.isExpired) {
    const lockEndDate = veBalLockInfo.lockedEndDate;
    if (lockEndDate && lockEndDate < Date.now() + MINIMUM_LOCK_TIME) {
      return {
        title: 'veVRTK not locked for 7 days.',
        description: 'You must have veVRTK locked for more than 7 days to vote on gagues.',
      };
    }
  }

  if (veBalLockTooShortWarning) voteInputDisabled = true;

  function getVoteError(): ErrorMessageOrNull {
    if (votedTooRecentlyWarning) return votedTooRecentlyWarning;
    if (noVeBalWarning) return noVeBalWarning;
    if (veBalLockTooShortWarning) return veBalLockTooShortWarning;

    return null;
  }

  const voteError = getVoteError();
  if (voteError || !localHasEnoughVotes) {
    voteInputDisabled = true;
    voteButtonDisabled = true;
  }

  function isVoteWeightValid(voteWeight: string) {
    if (voteWeight === '') return true;

    const currentValue = scale(voteWeight, 2).toNumber();
    const isValid = currentValue <= unallocatedVoteWeight + Number(currentWeight);
    return isValid;
  }

  return {
    voteWeight,
    setVoteWeight,
    currentWeight,

    // Dynamic labels
    voteTitle,
    voteButtonText,
    voteLockedUntilText,
    remainingVotes,
    unallocatedVotesFormatted,

    // warnings/errors
    votedToRecentlyWarning: votedTooRecentlyWarning,
    noVeBalWarning,
    voteInputDisabled,
    voteButtonDisabled,
    voteError,
  };
}
