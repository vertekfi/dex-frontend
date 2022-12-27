import { BigNumber } from '@ethersproject/bignumber';
import { GqlPoolToken } from '~/apollo/generated/graphql-codegen-generated';

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
    poolType: string;
    symbol: string | undefined;
    tokens: Pick<GqlPoolToken, 'address' | 'weight' | 'symbol'>[];
  };
  tokenLogoURIs: Record<string, string | undefined>;
};

export type VotingGaugeWithVotes = VotingGauge & VotesData;
