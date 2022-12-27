import { VotingGauge } from '~/lib/services/staking/types';

import ALL_VOTING_GAUGES from '../data/voting-gauges.json';

export const GOERLI_VOTING_GAUGES: VotingGauge[] = (ALL_VOTING_GAUGES as VotingGauge[]).filter(
  (gauge) => gauge.network === 5,
);

export const MAINNET_VOTING_GAUGES: VotingGauge[] = (ALL_VOTING_GAUGES as VotingGauge[]).filter(
  (gauge) => gauge.network === 56,
);
