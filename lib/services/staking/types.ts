import { AmountHumanReadable } from '~/lib/services/token/token-types';
import { BigNumber } from '@ethersproject/bignumber';
import { GqlPoolToken, LiquidityGauge } from '~/apollo/generated/graphql-codegen-generated';

export interface StakingPendingRewardAmount {
  id: string;
  address: string;
  amount: AmountHumanReadable;
}

export interface UserVotesData {
  end: BigNumber;
  power: BigNumber;
  slope: BigNumber;
}

export interface Point {
  bias: BigNumber;
  slope: BigNumber;
}

export interface RawVotesData {
  gaugeWeightThisPeriod: BigNumber;
  gaugeWeightNextPeriod: BigNumber;
  userVotes: UserVotesData;
  lastUserVoteTime: BigNumber;
}

export interface VotesData {
  votes: string;
  votesNextPeriod: string;
  userVotes: string;
  lastUserVoteTime: number;
}

export interface RawVotesDataMap {
  gauges: Record<string, RawVotesData>;
}

export type VotingGauge = {
  address: string;
  network: number;
  pool: {
    id: string;
    address: string;
    name: string;
    poolType: string;
    symbol: string | undefined;
    tokens: Pick<GqlPoolToken, 'address' | 'weight' | 'symbol'>[];
  };
  tokenLogoURIs: Record<string, string | undefined>;
};

export type VotingGaugeWithVotes = VotingGauge & VotesData;

export type SubgraphGauge = LiquidityGauge;

export interface OnchainGaugeData {
  rewardTokens?: {
    id: string;
    symbol: string;
    decimals: number;
  }[];
  claimableTokens: string;
  claimableRewards: Record<string, string>;
}

export type OnchainGaugeDataMap = Record<string, OnchainGaugeData>;

export type Gauge = SubgraphGauge & OnchainGaugeData;
