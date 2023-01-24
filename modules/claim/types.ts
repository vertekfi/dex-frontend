import { GaugePool, GaugeShare, RewardToken } from '~/apollo/generated/graphql-codegen-generated';
import { Gauge } from '~/lib/services/staking/types';

export interface RewardGauge {
  address: string;
  factory?: { id: string };

  /**  Whether Balancer DAO killed the gauge  */
  isKilled: boolean;
  /**  Reference to Pool entity  */
  pool: GaugePool;
  /**  Pool ID if lp_token is a Balancer pool; null otherwise  */
  poolId: string;
  /**  List of reward tokens depositted in the gauge  */
  rewardTokens: RewardToken[];
  /**  List of user shares  */
  shares?: GaugeShare[];
  /**  ERC20 token symbol  */
  symbol: string;
  /**  Total of BPTs users have staked in the LiquidityGauge  */
  totalSupply: string;
}

export type ProtocolRewardRow = {
  token: TokenInfo;
  amount: string;
  value: string;
};

export type TokenInfo = {
  //  readonly chainId: number;
  readonly address: string;
  readonly name: string;
  // readonly decimals: number;
  readonly symbol: string;
  readonly logoURI?: string;
};

export type RewardRow = {
  gauge: Gauge;
  pool: GaugePool;
  amount: string;
  value: string;
};
