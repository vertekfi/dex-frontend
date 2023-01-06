import { GaugePool, GaugeShare, RewardToken } from '~/apollo/generated/graphql-codegen-generated';

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
