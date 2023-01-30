import { oneDayInMs } from '~/lib/util/time';

export const MAX_LOCK_PERIOD_IN_DAYS = 365; // 1y
export const MIN_LOCK_PERIOD_IN_DAYS = 7;

export const INPUT_DATE_FORMAT = 'yyyy-MM-dd';
export const PRETTY_DATE_FORMAT = 'd MMM yyyy';

export const WEIGHT_VOTE_DELAY = 10 * oneDayInMs;
export const MINIMUM_LOCK_TIME = 86_400_000 * 7;
