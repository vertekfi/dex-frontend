/* tslint:disable */
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  AmountHumanReadable: string;
  BigDecimal: string;
  BigInt: string;
  Bytes: string;
  Date: any;
  GqlBigNumber: any;
  JSON: any;
}

export interface GaugeFactory {
  __typename: 'GaugeFactory';
  id: Scalars['String'];
}

export interface GaugePool {
  __typename: 'GaugePool';
  address: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
  poolType: Scalars['String'];
  tokens: Array<GqlPoolToken>;
  tokensList: Array<Scalars['String']>;
}

export interface GaugeShare {
  __typename: 'GaugeShare';
  /**  User's balance of gauge deposit tokens  */
  balance: Scalars['BigDecimal'];
  /**  Equal to: <userAddress>-<gaugeAddress>  */
  id: Scalars['ID'];
  /**  Reference to User entity  */
  user: User;
}

export interface GaugeType {
  __typename: 'GaugeType';
  /**  Type ID  */
  id: Scalars['ID'];
  /**  Name of the type - empty string if call reverts  */
  name: Scalars['String'];
}

export interface GaugeVote {
  __typename: 'GaugeVote';
  /**  Equal to: <userAddress>-<gaugeAddress>  */
  id: Scalars['ID'];
  /**  Timestamp at which user voted [seconds]  */
  timestamp?: Maybe<Scalars['BigInt']>;
  /**  Reference to User entity  */
  user: User;
  /**  Weight of veBAL power user has used to vote  */
  weight?: Maybe<Scalars['BigDecimal']>;
}

export interface GqlAllFeesData {
  __typename: 'GqlAllFeesData';
  feeCollector: GqlFeesCollectorAmountsResult;
  gauges: GqlPendingGaugeFeeResult;
  totalValueUSD: Scalars['Float'];
}

export interface GqlBalancePoolAprItem {
  __typename: 'GqlBalancePoolAprItem';
  apr: Scalars['BigDecimal'];
  id: Scalars['ID'];
  subItems?: Maybe<Array<GqlBalancePoolAprSubItem>>;
  title: Scalars['String'];
}

export interface GqlBalancePoolAprSubItem {
  __typename: 'GqlBalancePoolAprSubItem';
  apr: Scalars['BigDecimal'];
  id: Scalars['ID'];
  title: Scalars['String'];
}

export interface GqlContentNewsItem {
  __typename: 'GqlContentNewsItem';
  discussionUrl?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  image?: Maybe<Scalars['String']>;
  source: GqlContentNewsItemSource;
  text: Scalars['String'];
  timestamp: Scalars['String'];
  url: Scalars['String'];
}

export type GqlContentNewsItemSource = 'discord' | 'medium' | 'twitter';

export interface GqlFeaturePoolGroupItemExternalLink {
  __typename: 'GqlFeaturePoolGroupItemExternalLink';
  buttonText: Scalars['String'];
  buttonUrl: Scalars['String'];
  id: Scalars['ID'];
  image: Scalars['String'];
}

export interface GqlFeesCollectorAmountsResult {
  __typename: 'GqlFeesCollectorAmountsResult';
  totalValueUSD: Scalars['Float'];
  values: Array<Maybe<GqlProtocolFeesCollectorAmounts>>;
}

export interface GqlHistoricalTokenPrice {
  __typename: 'GqlHistoricalTokenPrice';
  address: Scalars['String'];
  prices: Array<GqlHistoricalTokenPriceEntry>;
}

export interface GqlHistoricalTokenPriceEntry {
  __typename: 'GqlHistoricalTokenPriceEntry';
  price: Scalars['Float'];
  timestamp: Scalars['String'];
}

export interface GqlLatestSyncedBlocks {
  __typename: 'GqlLatestSyncedBlocks';
  poolSyncBlock: Scalars['BigInt'];
  userStakeSyncBlock: Scalars['BigInt'];
  userWalletSyncBlock: Scalars['BigInt'];
}

export interface GqlPendingGaugeFeeResult {
  __typename: 'GqlPendingGaugeFeeResult';
  totalValueUSD: Scalars['Float'];
  values: Array<Maybe<GqlProtocolPendingGaugeFee>>;
}

export interface GqlPoolApr {
  __typename: 'GqlPoolApr';
  hasRewardApr: Scalars['Boolean'];
  items: Array<GqlBalancePoolAprItem>;
  max?: Maybe<Scalars['BigDecimal']>;
  min?: Maybe<Scalars['BigDecimal']>;
  nativeRewardApr: Scalars['BigDecimal'];
  swapApr: Scalars['BigDecimal'];
  thirdPartyApr: Scalars['BigDecimal'];
  total: Scalars['BigDecimal'];
}

export interface GqlPoolAprItem {
  __typename: 'GqlPoolAprItem';
  apr: Scalars['BigDecimal'];
  subItems?: Maybe<Array<GqlBalancePoolAprSubItem>>;
  title: Scalars['String'];
}

export interface GqlPoolAprSubItem {
  __typename: 'GqlPoolAprSubItem';
  apr: Scalars['BigDecimal'];
  title: Scalars['String'];
}

export interface GqlPoolBase {
  address: Scalars['Bytes'];
  allTokens: Array<GqlPoolTokenExpanded>;
  createTime: Scalars['Int'];
  decimals: Scalars['Int'];
  displayTokens: Array<GqlPoolTokenDisplay>;
  dynamicData: GqlPoolDynamicData;
  factory?: Maybe<Scalars['Bytes']>;
  id: Scalars['ID'];
  investConfig: GqlPoolInvestConfig;
  name: Scalars['String'];
  owner?: Maybe<Scalars['Bytes']>;
  staking?: Maybe<GqlPoolStaking>;
  symbol: Scalars['String'];
  withdrawConfig: GqlPoolWithdrawConfig;
}

export interface GqlPoolBatchSwap {
  __typename: 'GqlPoolBatchSwap';
  id: Scalars['ID'];
  swaps: Array<GqlPoolBatchSwapSwap>;
  timestamp: Scalars['Int'];
  tokenAmountIn: Scalars['String'];
  tokenAmountOut: Scalars['String'];
  tokenIn: Scalars['String'];
  tokenInPrice: Scalars['Float'];
  tokenOut: Scalars['String'];
  tokenOutPrice: Scalars['Float'];
  tx: Scalars['String'];
  userAddress: Scalars['String'];
  valueUSD: Scalars['Float'];
}

export interface GqlPoolBatchSwapPool {
  __typename: 'GqlPoolBatchSwapPool';
  id: Scalars['ID'];
  tokens: Array<Scalars['String']>;
}

export interface GqlPoolBatchSwapSwap {
  __typename: 'GqlPoolBatchSwapSwap';
  id: Scalars['ID'];
  pool: GqlPoolMinimal;
  timestamp: Scalars['Int'];
  tokenAmountIn: Scalars['String'];
  tokenAmountOut: Scalars['String'];
  tokenIn: Scalars['String'];
  tokenOut: Scalars['String'];
  tx: Scalars['String'];
  userAddress: Scalars['String'];
  valueUSD: Scalars['Float'];
}

export interface GqlPoolDynamicData {
  __typename: 'GqlPoolDynamicData';
  apr: GqlPoolApr;
  fees24h: Scalars['BigDecimal'];
  fees24hAth: Scalars['BigDecimal'];
  fees24hAthTimestamp: Scalars['Int'];
  fees24hAtl: Scalars['BigDecimal'];
  fees24hAtlTimestamp: Scalars['Int'];
  fees48h: Scalars['BigDecimal'];
  holdersCount: Scalars['BigInt'];
  lifetimeSwapFees: Scalars['BigDecimal'];
  lifetimeVolume: Scalars['BigDecimal'];
  poolId: Scalars['ID'];
  sharePriceAth: Scalars['BigDecimal'];
  sharePriceAthTimestamp: Scalars['Int'];
  sharePriceAtl: Scalars['BigDecimal'];
  sharePriceAtlTimestamp: Scalars['Int'];
  swapEnabled: Scalars['Boolean'];
  swapFee: Scalars['BigDecimal'];
  swapsCount: Scalars['BigInt'];
  totalLiquidity: Scalars['BigDecimal'];
  totalLiquidity24hAgo: Scalars['BigDecimal'];
  totalLiquidityAth: Scalars['BigDecimal'];
  totalLiquidityAthTimestamp: Scalars['Int'];
  totalLiquidityAtl: Scalars['BigDecimal'];
  totalLiquidityAtlTimestamp: Scalars['Int'];
  totalShares: Scalars['BigDecimal'];
  totalShares24hAgo: Scalars['BigDecimal'];
  volume24h: Scalars['BigDecimal'];
  volume24hAth: Scalars['BigDecimal'];
  volume24hAthTimestamp: Scalars['Int'];
  volume24hAtl: Scalars['BigDecimal'];
  volume24hAtlTimestamp: Scalars['Int'];
  volume48h: Scalars['BigDecimal'];
}

export interface GqlPoolElement extends GqlPoolBase {
  __typename: 'GqlPoolElement';
  address: Scalars['Bytes'];
  allTokens: Array<GqlPoolTokenExpanded>;
  baseToken: Scalars['Bytes'];
  createTime: Scalars['Int'];
  decimals: Scalars['Int'];
  displayTokens: Array<GqlPoolTokenDisplay>;
  dynamicData: GqlPoolDynamicData;
  factory?: Maybe<Scalars['Bytes']>;
  id: Scalars['ID'];
  investConfig: GqlPoolInvestConfig;
  name: Scalars['String'];
  owner: Scalars['Bytes'];
  principalToken: Scalars['Bytes'];
  staking?: Maybe<GqlPoolStaking>;
  symbol: Scalars['String'];
  tokens: Array<GqlPoolToken>;
  unitSeconds: Scalars['BigInt'];
  withdrawConfig: GqlPoolWithdrawConfig;
}

export interface GqlPoolFeaturedPoolGroup {
  __typename: 'GqlPoolFeaturedPoolGroup';
  icon: Scalars['String'];
  id: Scalars['ID'];
  items: Array<GqlPoolFeaturedPoolGroupItem>;
  title: Scalars['String'];
}

export type GqlPoolFeaturedPoolGroupItem = GqlFeaturePoolGroupItemExternalLink | GqlPoolMinimal;

export interface GqlPoolFilter {
  categoryIn?: InputMaybe<Array<GqlPoolFilterCategory>>;
  categoryNotIn?: InputMaybe<Array<GqlPoolFilterCategory>>;
  filterIn?: InputMaybe<Array<Scalars['String']>>;
  filterNotIn?: InputMaybe<Array<Scalars['String']>>;
  idIn?: InputMaybe<Array<Scalars['String']>>;
  idNotIn?: InputMaybe<Array<Scalars['String']>>;
  poolTypeIn?: InputMaybe<Array<GqlPoolFilterType>>;
  poolTypeNotIn?: InputMaybe<Array<GqlPoolFilterType>>;
  tokensIn?: InputMaybe<Array<Scalars['String']>>;
  tokensNotIn?: InputMaybe<Array<Scalars['String']>>;
}

export type GqlPoolFilterCategory = 'BLACK_LISTED' | 'INCENTIVIZED';

export interface GqlPoolFilterDefinition {
  __typename: 'GqlPoolFilterDefinition';
  id: Scalars['ID'];
  title: Scalars['String'];
}

export type GqlPoolFilterType =
  | 'ELEMENT'
  | 'INVESTMENT'
  | 'LINEAR'
  | 'LIQUIDITY_BOOTSTRAPPING'
  | 'META_STABLE'
  | 'PHANTOM_STABLE'
  | 'STABLE'
  | 'UNKNOWN'
  | 'WEIGHTED';

export interface GqlPoolInvestConfig {
  __typename: 'GqlPoolInvestConfig';
  options: Array<GqlPoolInvestOption>;
  proportionalEnabled: Scalars['Boolean'];
  singleAssetEnabled: Scalars['Boolean'];
}

export interface GqlPoolInvestOption {
  __typename: 'GqlPoolInvestOption';
  poolTokenAddress: Scalars['String'];
  poolTokenIndex: Scalars['Int'];
  tokenOptions: Array<GqlPoolToken>;
}

export interface GqlPoolJoinExit {
  __typename: 'GqlPoolJoinExit';
  amounts: Array<GqlPoolJoinExitAmount>;
  id: Scalars['ID'];
  poolId: Scalars['String'];
  sender: Scalars['String'];
  timestamp: Scalars['Int'];
  tx: Scalars['String'];
  type: GqlPoolJoinExitType;
  valueUSD?: Maybe<Scalars['String']>;
}

export interface GqlPoolJoinExitAmount {
  __typename: 'GqlPoolJoinExitAmount';
  address: Scalars['String'];
  amount: Scalars['String'];
}

export interface GqlPoolJoinExitFilter {
  poolIdIn?: InputMaybe<Array<Scalars['String']>>;
}

export type GqlPoolJoinExitType = 'Exit' | 'Join';

export interface GqlPoolLinear extends GqlPoolBase {
  __typename: 'GqlPoolLinear';
  address: Scalars['Bytes'];
  allTokens: Array<GqlPoolTokenExpanded>;
  bptPriceRate?: Maybe<Scalars['BigDecimal']>;
  createTime: Scalars['Int'];
  decimals: Scalars['Int'];
  displayTokens: Array<GqlPoolTokenDisplay>;
  dynamicData: GqlPoolDynamicData;
  factory?: Maybe<Scalars['Bytes']>;
  id: Scalars['ID'];
  investConfig: GqlPoolInvestConfig;
  lowerTarget: Scalars['BigInt'];
  mainIndex: Scalars['Int'];
  name: Scalars['String'];
  owner: Scalars['Bytes'];
  staking?: Maybe<GqlPoolStaking>;
  symbol: Scalars['String'];
  tokens: Array<GqlPoolToken>;
  upperTarget: Scalars['BigInt'];
  withdrawConfig: GqlPoolWithdrawConfig;
  wrappedIndex: Scalars['Int'];
}

export interface GqlPoolLinearNested {
  __typename: 'GqlPoolLinearNested';
  address: Scalars['Bytes'];
  bptPriceRate?: Maybe<Scalars['BigDecimal']>;
  createTime: Scalars['Int'];
  factory?: Maybe<Scalars['Bytes']>;
  id: Scalars['ID'];
  lowerTarget: Scalars['BigInt'];
  mainIndex: Scalars['Int'];
  name: Scalars['String'];
  owner: Scalars['Bytes'];
  symbol: Scalars['String'];
  tokens: Array<GqlPoolToken>;
  totalLiquidity: Scalars['BigDecimal'];
  totalShares: Scalars['BigDecimal'];
  upperTarget: Scalars['BigInt'];
  wrappedIndex: Scalars['Int'];
}

export interface GqlPoolLinearPoolData {
  __typename: 'GqlPoolLinearPoolData';
  address: Scalars['String'];
  balance: Scalars['String'];
  id: Scalars['ID'];
  mainToken: GqlPoolLinearPoolMainToken;
  mainTokenTotalBalance: Scalars['String'];
  poolToken: Scalars['String'];
  priceRate: Scalars['String'];
  symbol: Scalars['String'];
  totalSupply: Scalars['String'];
  unwrappedTokenAddress: Scalars['String'];
  wrappedToken: GqlPoolLinearPoolWrappedToken;
}

export interface GqlPoolLinearPoolMainToken {
  __typename: 'GqlPoolLinearPoolMainToken';
  address: Scalars['String'];
  balance: Scalars['String'];
  decimals: Scalars['Int'];
  index: Scalars['Int'];
  name: Scalars['String'];
  symbol: Scalars['String'];
  totalSupply: Scalars['String'];
}

export interface GqlPoolLinearPoolWrappedToken {
  __typename: 'GqlPoolLinearPoolWrappedToken';
  address: Scalars['String'];
  balance: Scalars['String'];
  decimals: Scalars['Int'];
  index: Scalars['Int'];
  name: Scalars['String'];
  priceRate: Scalars['String'];
  symbol: Scalars['String'];
  totalSupply: Scalars['String'];
}

export interface GqlPoolLiquidityBootstrapping extends GqlPoolBase {
  __typename: 'GqlPoolLiquidityBootstrapping';
  address: Scalars['Bytes'];
  allTokens: Array<GqlPoolTokenExpanded>;
  createTime: Scalars['Int'];
  decimals: Scalars['Int'];
  displayTokens: Array<GqlPoolTokenDisplay>;
  dynamicData: GqlPoolDynamicData;
  factory?: Maybe<Scalars['Bytes']>;
  id: Scalars['ID'];
  investConfig: GqlPoolInvestConfig;
  name: Scalars['String'];
  nestingType: GqlPoolNestingType;
  owner: Scalars['Bytes'];
  staking?: Maybe<GqlPoolStaking>;
  symbol: Scalars['String'];
  tokens: Array<GqlPoolTokenUnion>;
  withdrawConfig: GqlPoolWithdrawConfig;
}

export interface GqlPoolMetaStable extends GqlPoolBase {
  __typename: 'GqlPoolMetaStable';
  address: Scalars['Bytes'];
  allTokens: Array<GqlPoolTokenExpanded>;
  amp: Scalars['BigInt'];
  createTime: Scalars['Int'];
  decimals: Scalars['Int'];
  displayTokens: Array<GqlPoolTokenDisplay>;
  dynamicData: GqlPoolDynamicData;
  factory?: Maybe<Scalars['Bytes']>;
  id: Scalars['ID'];
  investConfig: GqlPoolInvestConfig;
  name: Scalars['String'];
  owner: Scalars['Bytes'];
  staking?: Maybe<GqlPoolStaking>;
  symbol: Scalars['String'];
  tokens: Array<GqlPoolToken>;
  withdrawConfig: GqlPoolWithdrawConfig;
}

export interface GqlPoolMinimal {
  __typename: 'GqlPoolMinimal';
  address: Scalars['Bytes'];
  allTokens: Array<GqlPoolTokenExpanded>;
  createTime: Scalars['Int'];
  decimals: Scalars['Int'];
  displayTokens: Array<GqlPoolTokenDisplay>;
  dynamicData: GqlPoolDynamicData;
  factory?: Maybe<Scalars['Bytes']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  owner?: Maybe<Scalars['Bytes']>;
  staking?: Maybe<GqlPoolStaking>;
  symbol: Scalars['String'];
  type: GqlPoolMinimalType;
}

export type GqlPoolMinimalType =
  | 'ELEMENT'
  | 'INVESTMENT'
  | 'LINEAR'
  | 'LIQUIDITY_BOOTSTRAPPING'
  | 'META_STABLE'
  | 'PHANTOM_STABLE'
  | 'STABLE'
  | 'UNKNOWN'
  | 'WEIGHTED';

export type GqlPoolNestedUnion = GqlPoolLinearNested | GqlPoolPhantomStableNested;

export type GqlPoolNestingType = 'HAS_ONLY_PHANTOM_BPT' | 'HAS_SOME_PHANTOM_BPT' | 'NO_NESTING';

export type GqlPoolOrderBy = 'apr' | 'fees24h' | 'totalLiquidity' | 'totalShares' | 'volume24h';

export type GqlPoolOrderDirection = 'asc' | 'desc';

export interface GqlPoolPhantomStable extends GqlPoolBase {
  __typename: 'GqlPoolPhantomStable';
  address: Scalars['Bytes'];
  allTokens: Array<GqlPoolTokenExpanded>;
  amp: Scalars['BigInt'];
  bptPriceRate?: Maybe<Scalars['BigDecimal']>;
  createTime: Scalars['Int'];
  decimals: Scalars['Int'];
  displayTokens: Array<GqlPoolTokenDisplay>;
  dynamicData: GqlPoolDynamicData;
  factory?: Maybe<Scalars['Bytes']>;
  id: Scalars['ID'];
  investConfig: GqlPoolInvestConfig;
  name: Scalars['String'];
  nestingType: GqlPoolNestingType;
  owner: Scalars['Bytes'];
  staking?: Maybe<GqlPoolStaking>;
  symbol: Scalars['String'];
  tokens: Array<GqlPoolTokenUnion>;
  withdrawConfig: GqlPoolWithdrawConfig;
}

export interface GqlPoolPhantomStableNested {
  __typename: 'GqlPoolPhantomStableNested';
  address: Scalars['Bytes'];
  amp: Scalars['BigInt'];
  bptPriceRate?: Maybe<Scalars['BigDecimal']>;
  createTime: Scalars['Int'];
  factory?: Maybe<Scalars['Bytes']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  nestingType: GqlPoolNestingType;
  owner: Scalars['Bytes'];
  swapFee: Scalars['BigDecimal'];
  symbol: Scalars['String'];
  tokens: Array<GqlPoolTokenPhantomStableNestedUnion>;
  totalLiquidity: Scalars['BigDecimal'];
  totalShares: Scalars['BigDecimal'];
}

export interface GqlPoolSnapshot {
  __typename: 'GqlPoolSnapshot';
  amounts: Array<Scalars['String']>;
  fees24h: Scalars['String'];
  holdersCount: Scalars['String'];
  id: Scalars['ID'];
  poolId: Scalars['String'];
  sharePrice: Scalars['String'];
  swapsCount: Scalars['String'];
  timestamp: Scalars['Int'];
  totalLiquidity: Scalars['String'];
  totalShares: Scalars['String'];
  totalSwapFee: Scalars['String'];
  totalSwapVolume: Scalars['String'];
  volume24h: Scalars['String'];
}

export type GqlPoolSnapshotDataRange =
  | 'ALL_TIME'
  | 'NINETY_DAYS'
  | 'ONE_HUNDRED_EIGHTY_DAYS'
  | 'ONE_YEAR'
  | 'THIRTY_DAYS';

export interface GqlPoolStable extends GqlPoolBase {
  __typename: 'GqlPoolStable';
  address: Scalars['Bytes'];
  allTokens: Array<GqlPoolTokenExpanded>;
  amp: Scalars['BigInt'];
  createTime: Scalars['Int'];
  decimals: Scalars['Int'];
  displayTokens: Array<GqlPoolTokenDisplay>;
  dynamicData: GqlPoolDynamicData;
  factory?: Maybe<Scalars['Bytes']>;
  id: Scalars['ID'];
  investConfig: GqlPoolInvestConfig;
  name: Scalars['String'];
  owner: Scalars['Bytes'];
  staking?: Maybe<GqlPoolStaking>;
  symbol: Scalars['String'];
  tokens: Array<GqlPoolToken>;
  withdrawConfig: GqlPoolWithdrawConfig;
}

export interface GqlPoolStablePhantomPoolData {
  __typename: 'GqlPoolStablePhantomPoolData';
  address: Scalars['String'];
  balance: Scalars['String'];
  id: Scalars['ID'];
  symbol: Scalars['String'];
  tokens: Array<GqlPoolToken>;
  totalSupply: Scalars['String'];
}

export interface GqlPoolStaking {
  __typename: 'GqlPoolStaking';
  address: Scalars['String'];
  farm?: Maybe<GqlPoolStakingMasterChefFarm>;
  gauge?: Maybe<GqlPoolStakingGauge>;
  id: Scalars['ID'];
  reliquary?: Maybe<GqlPoolStakingReliquaryFarm>;
  type: GqlPoolStakingType;
}

export interface GqlPoolStakingFarmRewarder {
  __typename: 'GqlPoolStakingFarmRewarder';
  address: Scalars['String'];
  id: Scalars['ID'];
  rewardPerSecond: Scalars['String'];
  tokenAddress: Scalars['String'];
}

export interface GqlPoolStakingGauge {
  __typename: 'GqlPoolStakingGauge';
  depositFee: Scalars['Int'];
  gaugeAddress: Scalars['String'];
  id: Scalars['ID'];
  rewards: Array<GqlPoolStakingGaugeReward>;
  withdrawFee: Scalars['Int'];
}

export interface GqlPoolStakingGaugeReward {
  __typename: 'GqlPoolStakingGaugeReward';
  id: Scalars['ID'];
  rewardPerSecond: Scalars['String'];
  tokenAddress: Scalars['String'];
}

export interface GqlPoolStakingMasterChefFarm {
  __typename: 'GqlPoolStakingMasterChefFarm';
  beetsPerBlock: Scalars['String'];
  id: Scalars['ID'];
  rewarders?: Maybe<Array<GqlPoolStakingFarmRewarder>>;
}

export interface GqlPoolStakingReliquarFarmLevel {
  __typename: 'GqlPoolStakingReliquarFarmLevel';
  allocationPoints: Scalars['Int'];
  apr: Scalars['BigDecimal'];
  balance: Scalars['BigDecimal'];
  id: Scalars['ID'];
  level: Scalars['Int'];
  requiredMaturity: Scalars['Int'];
}

export interface GqlPoolStakingReliquaryFarm {
  __typename: 'GqlPoolStakingReliquaryFarm';
  beetsPerSecond: Scalars['String'];
  id: Scalars['ID'];
  levels?: Maybe<Array<GqlPoolStakingReliquarFarmLevel>>;
}

export type GqlPoolStakingType = 'FRESH_BEETS' | 'GAUGE' | 'MASTER_CHEF' | 'RELIQUARY';

export interface GqlPoolSwap {
  __typename: 'GqlPoolSwap';
  id: Scalars['ID'];
  poolId: Scalars['String'];
  timestamp: Scalars['Int'];
  tokenAmountIn: Scalars['String'];
  tokenAmountOut: Scalars['String'];
  tokenIn: Scalars['String'];
  tokenOut: Scalars['String'];
  tx: Scalars['String'];
  userAddress: Scalars['String'];
  valueUSD: Scalars['Float'];
}

export interface GqlPoolSwapFilter {
  poolIdIn?: InputMaybe<Array<Scalars['String']>>;
  tokenInIn?: InputMaybe<Array<Scalars['String']>>;
  tokenOutIn?: InputMaybe<Array<Scalars['String']>>;
}

export interface GqlPoolToken extends GqlPoolTokenBase {
  __typename: 'GqlPoolToken';
  address: Scalars['String'];
  balance: Scalars['BigDecimal'];
  decimals: Scalars['Int'];
  id: Scalars['ID'];
  index: Scalars['Int'];
  logoURI?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  priceRate: Scalars['BigDecimal'];
  symbol: Scalars['String'];
  totalBalance: Scalars['BigDecimal'];
  weight?: Maybe<Scalars['BigDecimal']>;
}

export interface GqlPoolTokenBase {
  address: Scalars['String'];
  balance: Scalars['BigDecimal'];
  decimals: Scalars['Int'];
  id: Scalars['ID'];
  index: Scalars['Int'];
  name: Scalars['String'];
  priceRate: Scalars['BigDecimal'];
  symbol: Scalars['String'];
  totalBalance: Scalars['BigDecimal'];
  weight?: Maybe<Scalars['BigDecimal']>;
}

export interface GqlPoolTokenDisplay {
  __typename: 'GqlPoolTokenDisplay';
  address: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
  nestedTokens?: Maybe<Array<GqlPoolTokenDisplay>>;
  symbol: Scalars['String'];
  weight?: Maybe<Scalars['BigDecimal']>;
}

export interface GqlPoolTokenExpanded {
  __typename: 'GqlPoolTokenExpanded';
  address: Scalars['String'];
  decimals: Scalars['Int'];
  id: Scalars['ID'];
  isMainToken: Scalars['Boolean'];
  isNested: Scalars['Boolean'];
  isPhantomBpt: Scalars['Boolean'];
  name: Scalars['String'];
  symbol: Scalars['String'];
  weight?: Maybe<Scalars['String']>;
}

export interface GqlPoolTokenLinear extends GqlPoolTokenBase {
  __typename: 'GqlPoolTokenLinear';
  address: Scalars['String'];
  balance: Scalars['BigDecimal'];
  decimals: Scalars['Int'];
  id: Scalars['ID'];
  index: Scalars['Int'];
  mainTokenBalance: Scalars['BigDecimal'];
  name: Scalars['String'];
  pool: GqlPoolLinearNested;
  priceRate: Scalars['BigDecimal'];
  symbol: Scalars['String'];
  totalBalance: Scalars['BigDecimal'];
  totalMainTokenBalance: Scalars['BigDecimal'];
  weight?: Maybe<Scalars['BigDecimal']>;
  wrappedTokenBalance: Scalars['BigDecimal'];
}

export interface GqlPoolTokenPhantomStable extends GqlPoolTokenBase {
  __typename: 'GqlPoolTokenPhantomStable';
  address: Scalars['String'];
  balance: Scalars['BigDecimal'];
  decimals: Scalars['Int'];
  id: Scalars['ID'];
  index: Scalars['Int'];
  name: Scalars['String'];
  pool: GqlPoolPhantomStableNested;
  priceRate: Scalars['BigDecimal'];
  symbol: Scalars['String'];
  totalBalance: Scalars['BigDecimal'];
  weight?: Maybe<Scalars['BigDecimal']>;
}

export type GqlPoolTokenPhantomStableNestedUnion = GqlPoolToken | GqlPoolTokenLinear;

export type GqlPoolTokenUnion = GqlPoolToken | GqlPoolTokenLinear | GqlPoolTokenPhantomStable;

export type GqlPoolUnion =
  | GqlPoolElement
  | GqlPoolLinear
  | GqlPoolLiquidityBootstrapping
  | GqlPoolMetaStable
  | GqlPoolPhantomStable
  | GqlPoolStable
  | GqlPoolWeighted;

export interface GqlPoolUserSwapVolume {
  __typename: 'GqlPoolUserSwapVolume';
  swapVolumeUSD: Scalars['BigDecimal'];
  userAddress: Scalars['String'];
}

export interface GqlPoolWeighted extends GqlPoolBase {
  __typename: 'GqlPoolWeighted';
  address: Scalars['Bytes'];
  allTokens: Array<GqlPoolTokenExpanded>;
  createTime: Scalars['Int'];
  decimals: Scalars['Int'];
  displayTokens: Array<GqlPoolTokenDisplay>;
  dynamicData: GqlPoolDynamicData;
  factory?: Maybe<Scalars['Bytes']>;
  id: Scalars['ID'];
  investConfig: GqlPoolInvestConfig;
  name: Scalars['String'];
  nestingType: GqlPoolNestingType;
  owner: Scalars['Bytes'];
  staking?: Maybe<GqlPoolStaking>;
  symbol: Scalars['String'];
  tokens: Array<GqlPoolTokenUnion>;
  withdrawConfig: GqlPoolWithdrawConfig;
}

export interface GqlPoolWithdrawConfig {
  __typename: 'GqlPoolWithdrawConfig';
  options: Array<GqlPoolWithdrawOption>;
  proportionalEnabled: Scalars['Boolean'];
  singleAssetEnabled: Scalars['Boolean'];
}

export interface GqlPoolWithdrawOption {
  __typename: 'GqlPoolWithdrawOption';
  poolTokenAddress: Scalars['String'];
  poolTokenIndex: Scalars['Int'];
  tokenOptions: Array<GqlPoolToken>;
}

export interface GqlProtocolFeesCollectorAmounts {
  __typename: 'GqlProtocolFeesCollectorAmounts';
  amount: Scalars['String'];
  poolId: Scalars['String'];
  poolName: Scalars['String'];
  token: Scalars['String'];
  valueUSD: Scalars['String'];
}

export interface GqlProtocolGaugeInfo {
  __typename: 'GqlProtocolGaugeInfo';
  address: Scalars['String'];
  poolId: Scalars['String'];
}

export interface GqlProtocolMetrics {
  __typename: 'GqlProtocolMetrics';
  poolCount: Scalars['BigInt'];
  swapFee24h: Scalars['BigDecimal'];
  swapVolume24h: Scalars['BigDecimal'];
  totalLiquidity: Scalars['BigDecimal'];
  totalSwapFee: Scalars['BigDecimal'];
  totalSwapVolume: Scalars['BigDecimal'];
}

export interface GqlProtocolPendingGaugeFee {
  __typename: 'GqlProtocolPendingGaugeFee';
  gauge: Scalars['String'];
  gaugeAddress: Scalars['String'];
  pendingPoolTokensFee: Scalars['Float'];
  poolAddress: Scalars['String'];
  poolId: Scalars['String'];
  poolName: Scalars['String'];
  valueUSD: Scalars['Float'];
}

export interface GqlSorGetBatchSwapForTokensInResponse {
  __typename: 'GqlSorGetBatchSwapForTokensInResponse';
  assets: Array<Scalars['String']>;
  swaps: Array<GqlSorSwap>;
  tokenOutAmount: Scalars['AmountHumanReadable'];
}

export interface GqlSorGetSwapsResponse {
  __typename: 'GqlSorGetSwapsResponse';
  effectivePrice: Scalars['AmountHumanReadable'];
  effectivePriceReversed: Scalars['AmountHumanReadable'];
  isV1Trade: Scalars['Boolean'];
  marketSp: Scalars['String'];
  priceImpact: Scalars['AmountHumanReadable'];
  returnAmount: Scalars['AmountHumanReadable'];
  returnAmountConsideringFees: Scalars['BigDecimal'];
  returnAmountFromSwaps?: Maybe<Scalars['BigDecimal']>;
  returnAmountScaled: Scalars['BigDecimal'];
  routes: Array<GqlSorSwapRoute>;
  swapAmount: Scalars['AmountHumanReadable'];
  swapAmountForSwaps?: Maybe<Scalars['BigDecimal']>;
  swapAmountScaled: Scalars['BigDecimal'];
  swapType: GqlSorSwapType;
  swaps: Array<GqlSorSwap>;
  tokenAddresses: Array<Scalars['String']>;
  tokenIn: Scalars['String'];
  tokenInAmount: Scalars['AmountHumanReadable'];
  tokenOut: Scalars['String'];
  tokenOutAmount: Scalars['AmountHumanReadable'];
}

export interface GqlSorSwap {
  __typename: 'GqlSorSwap';
  amount: Scalars['String'];
  assetInIndex: Scalars['Int'];
  assetOutIndex: Scalars['Int'];
  poolId: Scalars['String'];
  userData: Scalars['String'];
}

export interface GqlSorSwapOptionsInput {
  forceRefresh?: InputMaybe<Scalars['Boolean']>;
  maxPools?: InputMaybe<Scalars['Int']>;
  timestamp?: InputMaybe<Scalars['Int']>;
}

export interface GqlSorSwapRoute {
  __typename: 'GqlSorSwapRoute';
  hops: Array<GqlSorSwapRouteHop>;
  share: Scalars['Float'];
  tokenIn: Scalars['String'];
  tokenInAmount: Scalars['BigDecimal'];
  tokenOut: Scalars['String'];
  tokenOutAmount: Scalars['BigDecimal'];
}

export interface GqlSorSwapRouteHop {
  __typename: 'GqlSorSwapRouteHop';
  pool: GqlPoolMinimal;
  poolId: Scalars['String'];
  tokenIn: Scalars['String'];
  tokenInAmount: Scalars['BigDecimal'];
  tokenOut: Scalars['String'];
  tokenOutAmount: Scalars['BigDecimal'];
}

export type GqlSorSwapType = 'EXACT_IN' | 'EXACT_OUT';

export interface GqlToken {
  __typename: 'GqlToken';
  address: Scalars['String'];
  chainId: Scalars['Int'];
  coingeckoTokenId?: Maybe<Scalars['String']>;
  decimals: Scalars['Int'];
  description?: Maybe<Scalars['String']>;
  discordUrl?: Maybe<Scalars['String']>;
  logoURI?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  priority: Scalars['Int'];
  symbol: Scalars['String'];
  telegramUrl?: Maybe<Scalars['String']>;
  tradable: Scalars['Boolean'];
  twitterUsername?: Maybe<Scalars['String']>;
  websiteUrl?: Maybe<Scalars['String']>;
}

export interface GqlTokenAmountHumanReadable {
  address: Scalars['String'];
  amount: Scalars['AmountHumanReadable'];
}

export interface GqlTokenCandlestickChartDataItem {
  __typename: 'GqlTokenCandlestickChartDataItem';
  close: Scalars['AmountHumanReadable'];
  high: Scalars['AmountHumanReadable'];
  id: Scalars['ID'];
  low: Scalars['AmountHumanReadable'];
  open: Scalars['AmountHumanReadable'];
  timestamp: Scalars['Int'];
}

export type GqlTokenChartDataRange = 'SEVEN_DAY' | 'THIRTY_DAY';

export interface GqlTokenData {
  __typename: 'GqlTokenData';
  description?: Maybe<Scalars['String']>;
  discordUrl?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  telegramUrl?: Maybe<Scalars['String']>;
  tokenAddress: Scalars['String'];
  twitterUsername?: Maybe<Scalars['String']>;
  websiteUrl?: Maybe<Scalars['String']>;
}

export interface GqlTokenDynamicData {
  __typename: 'GqlTokenDynamicData';
  ath: Scalars['Float'];
  atl: Scalars['Float'];
  fdv?: Maybe<Scalars['String']>;
  high24h: Scalars['Float'];
  id: Scalars['String'];
  low24h: Scalars['Float'];
  marketCap?: Maybe<Scalars['String']>;
  price: Scalars['Float'];
  priceChange24h: Scalars['Float'];
  priceChangePercent7d?: Maybe<Scalars['Float']>;
  priceChangePercent14d?: Maybe<Scalars['Float']>;
  priceChangePercent24h: Scalars['Float'];
  priceChangePercent30d?: Maybe<Scalars['Float']>;
  tokenAddress: Scalars['String'];
  updatedAt: Scalars['String'];
}

export interface GqlTokenPrice {
  __typename: 'GqlTokenPrice';
  address: Scalars['String'];
  price: Scalars['Float'];
}

export interface GqlTokenPriceChartDataItem {
  __typename: 'GqlTokenPriceChartDataItem';
  id: Scalars['ID'];
  price: Scalars['AmountHumanReadable'];
  timestamp: Scalars['Int'];
}

export type GqlTokenType = 'BPT' | 'LINEAR_WRAPPED_TOKEN' | 'PHANTOM_BPT' | 'WHITE_LISTED';

export interface GqlUserFbeetsBalance {
  __typename: 'GqlUserFbeetsBalance';
  id: Scalars['String'];
  stakedBalance: Scalars['AmountHumanReadable'];
  totalBalance: Scalars['AmountHumanReadable'];
  walletBalance: Scalars['AmountHumanReadable'];
}

export interface GqlUserGaugeBoost {
  __typename: 'GqlUserGaugeBoost';
  boost: Scalars['String'];
  gaugeAddress: Scalars['String'];
  poolId: Scalars['String'];
}

export interface GqlUserPoolBalance {
  __typename: 'GqlUserPoolBalance';
  poolId: Scalars['String'];
  stakedBalance: Scalars['AmountHumanReadable'];
  tokenAddress: Scalars['String'];
  tokenPrice: Scalars['Float'];
  totalBalance: Scalars['AmountHumanReadable'];
  walletBalance: Scalars['AmountHumanReadable'];
}

export interface GqlUserPoolSnapshot {
  __typename: 'GqlUserPoolSnapshot';
  farmBalance: Scalars['AmountHumanReadable'];
  fees24h: Scalars['AmountHumanReadable'];
  gaugeBalance: Scalars['AmountHumanReadable'];
  percentShare: Scalars['Float'];
  timestamp: Scalars['Int'];
  totalBalance: Scalars['AmountHumanReadable'];
  totalValueUSD: Scalars['AmountHumanReadable'];
  walletBalance: Scalars['AmountHumanReadable'];
}

export interface GqlUserPortfolioSnapshot {
  __typename: 'GqlUserPortfolioSnapshot';
  farmBalance: Scalars['AmountHumanReadable'];
  fees24h: Scalars['AmountHumanReadable'];
  gaugeBalance: Scalars['AmountHumanReadable'];
  pools: Array<GqlUserPoolSnapshot>;
  timestamp: Scalars['Int'];
  totalBalance: Scalars['AmountHumanReadable'];
  totalFees: Scalars['AmountHumanReadable'];
  totalValueUSD: Scalars['AmountHumanReadable'];
  walletBalance: Scalars['AmountHumanReadable'];
}

export type GqlUserSnapshotDataRange =
  | 'ALL_TIME'
  | 'NINETY_DAYS'
  | 'ONE_HUNDRED_EIGHTY_DAYS'
  | 'ONE_YEAR'
  | 'THIRTY_DAYS';

export interface GqlUserSwapVolumeFilter {
  poolIdIn?: InputMaybe<Array<Scalars['String']>>;
  tokenInIn?: InputMaybe<Array<Scalars['String']>>;
  tokenOutIn?: InputMaybe<Array<Scalars['String']>>;
}

export interface GqlUserVoteEscrowInfo {
  __typename: 'GqlUserVoteEscrowInfo';
  currentBalance: Scalars['String'];
  epoch: Scalars['String'];
  hasExistingLock: Scalars['Boolean'];
  isExpired: Scalars['Boolean'];
  lockEndDate: Scalars['String'];
  lockedAmount: Scalars['String'];
  percentOwned: Scalars['String'];
  totalSupply: Scalars['String'];
}

export interface LiquidityGauge {
  __typename: 'LiquidityGauge';
  /**  Address of the pool (lp_token of the gauge)  */
  address: Scalars['String'];
  depositFee: Scalars['Int'];
  factory?: Maybe<GaugeFactory>;
  /**  LiquidityGauge contract address  */
  id: Scalars['ID'];
  /**  Whether Balancer DAO killed the gauge  */
  isKilled: Scalars['Boolean'];
  /**  Reference to Pool entity  */
  pool: GaugePool;
  /**  Pool ID if lp_token is a Balancer pool; null otherwise  */
  poolId: Scalars['String'];
  /**  List of reward tokens depositted in the gauge  */
  rewardTokens: Array<RewardToken>;
  /**  List of user shares  */
  shares: Array<GaugeShare>;
  /**  ERC20 token symbol  */
  symbol: Scalars['String'];
  /**  Total of BPTs users have staked in the LiquidityGauge  */
  totalSupply: Scalars['BigDecimal'];
  withdrawFee: Scalars['Int'];
}

export interface Mutation {
  __typename: 'Mutation';
  cacheAverageBlockTime: Scalars['String'];
  doStakes: Scalars['Boolean'];
  poolInitializeSnapshotsForPool: Scalars['String'];
  poolLoadOnChainDataForAllPools: Scalars['String'];
  poolLoadOnChainDataForPoolsWithActiveUpdates: Scalars['String'];
  poolLoadSnapshotsForAllPools: Scalars['String'];
  poolReloadAllPoolAprs: Scalars['String'];
  poolReloadAllTokenNestedPoolIds: Scalars['String'];
  poolReloadPoolNestedTokens: Scalars['String'];
  poolReloadStakingForAllPools: Scalars['String'];
  poolSyncAllPoolsFromSubgraph: Array<Scalars['String']>;
  poolSyncLatestSnapshotsForAllPools: Scalars['String'];
  poolSyncNewPoolsFromSubgraph: Array<Scalars['String']>;
  poolSyncPool: Scalars['String'];
  poolSyncPoolAllTokensRelationship: Scalars['String'];
  poolSyncSanityPoolData: Scalars['String'];
  poolSyncSwapsForLast48Hours: Scalars['String'];
  poolSyncTotalShares: Scalars['String'];
  poolUpdateAprs: Scalars['String'];
  poolUpdateLifetimeValuesForAllPools: Scalars['String'];
  poolUpdateLiquidity24hAgoForAllPools: Scalars['String'];
  poolUpdateLiquidityValuesForAllPools: Scalars['String'];
  poolUpdateVolumeAndFeeValuesForAllPools: Scalars['String'];
  protocolCacheMetrics: Scalars['String'];
  syncGaugeData: Scalars['Boolean'];
  tokenDeletePrice: Scalars['Boolean'];
  tokenDeleteTokenType: Scalars['String'];
  tokenInitChartData: Scalars['String'];
  tokenReloadTokenPrices?: Maybe<Scalars['Boolean']>;
  tokenSyncTokenDefinitions: Scalars['String'];
  tokenSyncTokenDynamicData: Scalars['String'];
  userInitStakedBalances: Scalars['String'];
  userInitWalletBalancesForAllPools: Scalars['String'];
  userInitWalletBalancesForPool: Scalars['String'];
  userSyncBalance: Scalars['String'];
  userSyncBalanceAllPools: Scalars['String'];
  userSyncChangedStakedBalances: Scalars['String'];
  userSyncChangedWalletBalancesForAllPools: Scalars['String'];
}

export interface MutationPoolInitializeSnapshotsForPoolArgs {
  poolId: Scalars['String'];
}

export interface MutationPoolReloadPoolNestedTokensArgs {
  poolId: Scalars['String'];
}

export interface MutationPoolSyncLatestSnapshotsForAllPoolsArgs {
  daysToSync?: InputMaybe<Scalars['Int']>;
}

export interface MutationPoolSyncPoolArgs {
  poolId: Scalars['String'];
}

export interface MutationTokenDeletePriceArgs {
  timestamp: Scalars['Int'];
  tokenAddress: Scalars['String'];
}

export interface MutationTokenDeleteTokenTypeArgs {
  tokenAddress: Scalars['String'];
  type: GqlTokenType;
}

export interface MutationTokenInitChartDataArgs {
  tokenAddress: Scalars['String'];
}

export interface MutationUserInitWalletBalancesForPoolArgs {
  poolId: Scalars['String'];
}

export interface MutationUserSyncBalanceArgs {
  poolId: Scalars['String'];
}

export interface Query {
  __typename: 'Query';
  adminGetAllGaugePendingProtocolFees: GqlPendingGaugeFeeResult;
  adminGetAllPendingFeeData: GqlAllFeesData;
  adminGetFeeCollectorBalances: GqlFeesCollectorAmountsResult;
  beetsGetBeetsPrice: Scalars['String'];
  blocksGetAverageBlockTime: Scalars['Float'];
  blocksGetBlocksPerDay: Scalars['Float'];
  blocksGetBlocksPerSecond: Scalars['Float'];
  blocksGetBlocksPerYear: Scalars['Float'];
  contentGetNewsItems: Array<Maybe<GqlContentNewsItem>>;
  getLiquidityGauges: Array<Maybe<LiquidityGauge>>;
  getProtocolPoolData: Array<Maybe<GqlProtocolGaugeInfo>>;
  getProtocolTokenList?: Maybe<Array<Maybe<Scalars['String']>>>;
  getRewardPools: Array<Maybe<RewardPool>>;
  getUserGaugeStakes: Array<Maybe<LiquidityGauge>>;
  latestSyncedBlocks: GqlLatestSyncedBlocks;
  poolGetAllPoolsSnapshots: Array<GqlPoolSnapshot>;
  poolGetBatchSwaps: Array<GqlPoolBatchSwap>;
  poolGetFeaturedPoolGroups: Array<GqlPoolFeaturedPoolGroup>;
  poolGetJoinExits: Array<GqlPoolJoinExit>;
  poolGetLinearPools: Array<GqlPoolLinear>;
  poolGetPool: GqlPoolBase;
  poolGetPoolFilters: Array<GqlPoolFilterDefinition>;
  poolGetPools: Array<GqlPoolMinimal>;
  poolGetPoolsCount: Scalars['Int'];
  poolGetSnapshots: Array<GqlPoolSnapshot>;
  poolGetSwaps: Array<GqlPoolSwap>;
  poolGetUserSwapVolume: Array<GqlPoolUserSwapVolume>;
  protocolMetrics: GqlProtocolMetrics;
  sorGetBatchSwapForTokensIn: GqlSorGetBatchSwapForTokensInResponse;
  sorGetSwaps: GqlSorGetSwapsResponse;
  tokenGetCandlestickChartData: Array<GqlTokenCandlestickChartDataItem>;
  tokenGetCurrentPrices: Array<GqlTokenPrice>;
  tokenGetHistoricalPrices: Array<GqlHistoricalTokenPrice>;
  tokenGetPriceChartData: Array<GqlTokenPriceChartDataItem>;
  tokenGetRelativePriceChartData: Array<GqlTokenPriceChartDataItem>;
  tokenGetTokenData?: Maybe<GqlTokenData>;
  tokenGetTokenDynamicData?: Maybe<GqlTokenDynamicData>;
  tokenGetTokens: Array<GqlToken>;
  tokenGetTokensData: Array<GqlTokenData>;
  tokenGetTokensDynamicData: Array<GqlTokenDynamicData>;
  userGetFbeetsBalance: GqlUserFbeetsBalance;
  userGetGaugeBoosts: Array<Maybe<GqlUserGaugeBoost>>;
  userGetPoolBalances: Array<GqlUserPoolBalance>;
  userGetPoolJoinExits: Array<GqlPoolJoinExit>;
  userGetPortfolioSnapshots: Array<GqlUserPortfolioSnapshot>;
  userGetStaking: Array<GqlPoolStaking>;
  userGetSwaps: Array<GqlPoolSwap>;
  userGetVeLockInfo: GqlUserVoteEscrowInfo;
}

export interface QueryAdminGetAllPendingFeeDataArgs {
  onlyWithBalances?: InputMaybe<Scalars['Boolean']>;
}

export interface QueryGetRewardPoolsArgs {
  user?: InputMaybe<Scalars['String']>;
}

export interface QueryGetUserGaugeStakesArgs {
  poolIds: Array<Scalars['String']>;
  user: Scalars['String'];
}

export interface QueryPoolGetAllPoolsSnapshotsArgs {
  range: GqlPoolSnapshotDataRange;
}

export interface QueryPoolGetBatchSwapsArgs {
  first?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<GqlPoolSwapFilter>;
}

export interface QueryPoolGetJoinExitsArgs {
  first?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<GqlPoolJoinExitFilter>;
}

export interface QueryPoolGetPoolArgs {
  id: Scalars['String'];
}

export interface QueryPoolGetPoolsArgs {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<GqlPoolOrderBy>;
  orderDirection?: InputMaybe<GqlPoolOrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  textSearch?: InputMaybe<Scalars['String']>;
  where?: InputMaybe<GqlPoolFilter>;
}

export interface QueryPoolGetPoolsCountArgs {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<GqlPoolOrderBy>;
  orderDirection?: InputMaybe<GqlPoolOrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  textSearch?: InputMaybe<Scalars['String']>;
  where?: InputMaybe<GqlPoolFilter>;
}

export interface QueryPoolGetSnapshotsArgs {
  id: Scalars['String'];
  range: GqlPoolSnapshotDataRange;
}

export interface QueryPoolGetSwapsArgs {
  first?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<GqlPoolSwapFilter>;
}

export interface QueryPoolGetUserSwapVolumeArgs {
  first?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<GqlUserSwapVolumeFilter>;
}

export interface QuerySorGetBatchSwapForTokensInArgs {
  swapOptions: GqlSorSwapOptionsInput;
  tokenOut: Scalars['String'];
  tokensIn: Array<GqlTokenAmountHumanReadable>;
}

export interface QuerySorGetSwapsArgs {
  swapAmount: Scalars['BigDecimal'];
  swapOptions: GqlSorSwapOptionsInput;
  swapType: GqlSorSwapType;
  tokenIn: Scalars['String'];
  tokenOut: Scalars['String'];
}

export interface QueryTokenGetCandlestickChartDataArgs {
  address: Scalars['String'];
  range: GqlTokenChartDataRange;
}

export interface QueryTokenGetHistoricalPricesArgs {
  addresses: Array<Scalars['String']>;
}

export interface QueryTokenGetPriceChartDataArgs {
  address: Scalars['String'];
  range: GqlTokenChartDataRange;
}

export interface QueryTokenGetRelativePriceChartDataArgs {
  range: GqlTokenChartDataRange;
  tokenIn: Scalars['String'];
  tokenOut: Scalars['String'];
}

export interface QueryTokenGetTokenDataArgs {
  address: Scalars['String'];
}

export interface QueryTokenGetTokenDynamicDataArgs {
  address: Scalars['String'];
}

export interface QueryTokenGetTokensDataArgs {
  addresses: Array<Scalars['String']>;
}

export interface QueryTokenGetTokensDynamicDataArgs {
  addresses: Array<Scalars['String']>;
}

export interface QueryUserGetGaugeBoostsArgs {
  userAddress?: InputMaybe<Scalars['String']>;
}

export interface QueryUserGetPoolJoinExitsArgs {
  first: Scalars['Int'];
  poolId: Scalars['String'];
  skip: Scalars['Int'];
}

export interface QueryUserGetPortfolioSnapshotsArgs {
  days: Scalars['Int'];
}

export interface QueryUserGetSwapsArgs {
  first: Scalars['Int'];
  poolId: Scalars['String'];
  skip: Scalars['Int'];
}

export interface RewardPool {
  __typename: 'RewardPool';
  address: Scalars['String'];
  amountStaked: Scalars['String'];
  amountStakedValue: Scalars['String'];
  aprs: RewardPoolAprs;
  blocksRemaining: Scalars['String'];
  daysRemaining: Scalars['String'];
  endBlock: Scalars['Int'];
  isPartnerPool: Scalars['Boolean'];
  rewardToken: RewardPoolRewardToken;
  startBlock: Scalars['Int'];
  userInfo?: Maybe<RewardPoolUserInfo>;
}

export interface RewardPoolAprs {
  __typename: 'RewardPoolAprs';
  apr: Scalars['String'];
  daily: Scalars['String'];
}

export interface RewardPoolRewardToken {
  __typename: 'RewardPoolRewardToken';
  address: Scalars['String'];
  logoURI: Scalars['String'];
  name: Scalars['String'];
  price?: Maybe<Scalars['Int']>;
  rewardPerBlock: Scalars['String'];
  symbol: Scalars['String'];
}

export interface RewardPoolUserInfo {
  __typename: 'RewardPoolUserInfo';
  amountDeposited: Scalars['String'];
  amountDepositedFull: Scalars['String'];
  depositValue: Scalars['String'];
  hasPendingRewards: Scalars['Boolean'];
  pendingRewardValue: Scalars['String'];
  pendingRewards: Scalars['String'];
  percentageOwned: Scalars['String'];
  poolAddress: Scalars['String'];
}

export interface RewardToken {
  __typename: 'RewardToken';
  /**  ERC20 token decimals - zero if call to decimals() reverts  */
  decimals: Scalars['Int'];
  /**  Equal to: <tokenAddress>-<gaugeAddress>  */
  id: Scalars['ID'];
  logoURI: Scalars['String'];
  /**  Timestamp at which finishes the period of rewards  */
  periodFinish?: Maybe<Scalars['BigInt']>;
  /**  Rate of reward tokens streamed per second  */
  rewardPerSecond: Scalars['BigDecimal'];
  /**  ERC20 token symbol - empty string if call to symbol() reverts  */
  symbol: Scalars['String'];
  tokenAddress: Scalars['String'];
  /**  Amount of reward tokens that has been deposited into the gauge  */
  totalDeposited: Scalars['BigDecimal'];
}

export interface User {
  __typename: 'User';
  /**  List of gauge the user has shares  */
  gaugeShares?: Maybe<Array<GaugeShare>>;
  /**  List of votes on gauges  */
  gaugeVotes?: Maybe<Array<GaugeVote>>;
  /**  User address  */
  id: Scalars['ID'];
  /**  List of locks the user created  */
  votingLocks?: Maybe<Array<VotingEscrowLock>>;
}

export interface VotingEscrow {
  __typename: 'VotingEscrow';
  /**  VotingEscrow contract address  */
  id: Scalars['ID'];
  /**  List of veBAL locks created  */
  locks?: Maybe<Array<VotingEscrowLock>>;
  /**  Amount of B-80BAL-20WETH BPT locked  */
  stakedSupply: Scalars['BigDecimal'];
}

export interface VotingEscrowLock {
  __typename: 'VotingEscrowLock';
  /**  Equal to: <userAdress>-<votingEscrow>  */
  id: Scalars['ID'];
  /**  Amount of B-80BAL-20WETH BPT the user has locked  */
  lockedBalance: Scalars['BigDecimal'];
  /**  Timestamp at which B-80BAL-20WETH BPT can be unlocked by user [seconds]  */
  unlockTime?: Maybe<Scalars['BigInt']>;
  updatedAt: Scalars['Int'];
  /**  Reference to User entity  */
  user: User;
  /**  Reference to VotingEscrow entity  */
  votingEscrowID: VotingEscrow;
}

export type GetPoolBatchSwapsQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<GqlPoolSwapFilter>;
}>;

export type GetPoolBatchSwapsQuery = {
  __typename: 'Query';
  batchSwaps: Array<{
    __typename: 'GqlPoolBatchSwap';
    id: string;
    timestamp: number;
    tokenAmountIn: string;
    tokenAmountOut: string;
    tokenIn: string;
    tokenOut: string;
    tokenInPrice: number;
    tokenOutPrice: number;
    tx: string;
    userAddress: string;
    valueUSD: number;
    swaps: Array<{
      __typename: 'GqlPoolBatchSwapSwap';
      id: string;
      timestamp: number;
      tokenAmountIn: string;
      tokenAmountOut: string;
      tokenIn: string;
      tokenOut: string;
      valueUSD: number;
      pool: {
        __typename: 'GqlPoolMinimal';
        id: string;
        name: string;
        type: GqlPoolMinimalType;
        symbol: string;
        allTokens: Array<{
          __typename: 'GqlPoolTokenExpanded';
          address: string;
          isNested: boolean;
          isPhantomBpt: boolean;
          weight?: string | null;
        }>;
      };
    }>;
  }>;
};

export type GqlPoolBatchSwapFragment = {
  __typename: 'GqlPoolBatchSwap';
  id: string;
  timestamp: number;
  tokenAmountIn: string;
  tokenAmountOut: string;
  tokenIn: string;
  tokenOut: string;
  tokenInPrice: number;
  tokenOutPrice: number;
  tx: string;
  userAddress: string;
  valueUSD: number;
  swaps: Array<{
    __typename: 'GqlPoolBatchSwapSwap';
    id: string;
    timestamp: number;
    tokenAmountIn: string;
    tokenAmountOut: string;
    tokenIn: string;
    tokenOut: string;
    valueUSD: number;
    pool: {
      __typename: 'GqlPoolMinimal';
      id: string;
      name: string;
      type: GqlPoolMinimalType;
      symbol: string;
      allTokens: Array<{
        __typename: 'GqlPoolTokenExpanded';
        address: string;
        isNested: boolean;
        isPhantomBpt: boolean;
        weight?: string | null;
      }>;
    };
  }>;
};

export type GqlPoolBatchSwapSwapFragment = {
  __typename: 'GqlPoolBatchSwapSwap';
  id: string;
  timestamp: number;
  tokenAmountIn: string;
  tokenAmountOut: string;
  tokenIn: string;
  tokenOut: string;
  valueUSD: number;
  pool: {
    __typename: 'GqlPoolMinimal';
    id: string;
    name: string;
    type: GqlPoolMinimalType;
    symbol: string;
    allTokens: Array<{
      __typename: 'GqlPoolTokenExpanded';
      address: string;
      isNested: boolean;
      isPhantomBpt: boolean;
      weight?: string | null;
    }>;
  };
};

export type GetAppGlobalDataQueryVariables = Exact<{ [key: string]: never }>;

export type GetAppGlobalDataQuery = {
  __typename: 'Query';
  tokenGetTokens: Array<{
    __typename: 'GqlToken';
    address: string;
    name: string;
    symbol: string;
    decimals: number;
    chainId: number;
    logoURI?: string | null;
    priority: number;
    tradable: boolean;
  }>;
  tokenGetCurrentPrices: Array<{ __typename: 'GqlTokenPrice'; price: number; address: string }>;
};

export type GetAppGlobalPollingDataQueryVariables = Exact<{ [key: string]: never }>;

export type GetAppGlobalPollingDataQuery = {
  __typename: 'Query';
  blocksGetBlocksPerDay: number;
  blocksGetAverageBlockTime: number;
  beetsGetBeetsPrice: string;
  tokenGetCurrentPrices: Array<{ __typename: 'GqlTokenPrice'; price: number; address: string }>;
  protocolMetrics: {
    __typename: 'GqlProtocolMetrics';
    totalLiquidity: string;
    totalSwapVolume: string;
    totalSwapFee: string;
    poolCount: string;
    swapFee24h: string;
    swapVolume24h: string;
  };
};

export type GetTokensQueryVariables = Exact<{ [key: string]: never }>;

export type GetTokensQuery = {
  __typename: 'Query';
  tokens: Array<{
    __typename: 'GqlToken';
    address: string;
    name: string;
    symbol: string;
    decimals: number;
    chainId: number;
    logoURI?: string | null;
    priority: number;
    tradable: boolean;
  }>;
};

export type GetTokenPricesQueryVariables = Exact<{ [key: string]: never }>;

export type GetTokenPricesQuery = {
  __typename: 'Query';
  tokenPrices: Array<{ __typename: 'GqlTokenPrice'; price: number; address: string }>;
};

export type GetTokensDynamicDataQueryVariables = Exact<{
  addresses: Array<Scalars['String']> | Scalars['String'];
}>;

export type GetTokensDynamicDataQuery = {
  __typename: 'Query';
  dynamicData: Array<{
    __typename: 'GqlTokenDynamicData';
    ath: number;
    atl: number;
    fdv?: string | null;
    high24h: number;
    id: string;
    low24h: number;
    marketCap?: string | null;
    price: number;
    priceChange24h: number;
    priceChangePercent7d?: number | null;
    priceChangePercent14d?: number | null;
    priceChangePercent24h: number;
    priceChangePercent30d?: number | null;
    tokenAddress: string;
    updatedAt: string;
  }>;
};

export type GetProtocolDataQueryVariables = Exact<{ [key: string]: never }>;

export type GetProtocolDataQuery = {
  __typename: 'Query';
  beetsPrice: string;
  protocolData: {
    __typename: 'GqlProtocolMetrics';
    totalLiquidity: string;
    totalSwapVolume: string;
    totalSwapFee: string;
    poolCount: string;
    swapFee24h: string;
    swapVolume24h: string;
  };
};

export type GetBlocksPerDayQueryVariables = Exact<{ [key: string]: never }>;

export type GetBlocksPerDayQuery = {
  __typename: 'Query';
  blocksPerDay: number;
  avgBlockTime: number;
};

export type GetBeetsPriceQueryVariables = Exact<{ [key: string]: never }>;

export type GetBeetsPriceQuery = { __typename: 'Query'; beetsPrice: string };

export type GetUserDataQueryVariables = Exact<{ [key: string]: never }>;

export type GetUserDataQuery = {
  __typename: 'Query';
  balances: Array<{
    __typename: 'GqlUserPoolBalance';
    poolId: string;
    tokenAddress: string;
    tokenPrice: number;
    totalBalance: string;
    stakedBalance: string;
    walletBalance: string;
  }>;
  staking: Array<{
    __typename: 'GqlPoolStaking';
    id: string;
    type: GqlPoolStakingType;
    address: string;
    gauge?: {
      __typename: 'GqlPoolStakingGauge';
      id: string;
      gaugeAddress: string;
      depositFee: number;
      withdrawFee: number;
      rewards: Array<{
        __typename: 'GqlPoolStakingGaugeReward';
        id: string;
        rewardPerSecond: string;
        tokenAddress: string;
      }>;
    } | null;
  }>;
  boosts: Array<{
    __typename: 'GqlUserGaugeBoost';
    poolId: string;
    gaugeAddress: string;
    boost: string;
  } | null>;
};

export type UserSyncBalanceMutationVariables = Exact<{
  poolId: Scalars['String'];
}>;

export type UserSyncBalanceMutation = { __typename: 'Mutation'; userSyncBalance: string };

export type GetHomeDataQueryVariables = Exact<{ [key: string]: never }>;

export type GetHomeDataQuery = {
  __typename: 'Query';
  poolGetFeaturedPoolGroups: Array<{
    __typename: 'GqlPoolFeaturedPoolGroup';
    id: string;
    icon: string;
    title: string;
    items: Array<
      | { __typename: 'GqlFeaturePoolGroupItemExternalLink' }
      | {
          __typename: 'GqlPoolMinimal';
          id: string;
          address: string;
          name: string;
          dynamicData: {
            __typename: 'GqlPoolDynamicData';
            totalLiquidity: string;
            totalShares: string;
            apr: {
              __typename: 'GqlPoolApr';
              hasRewardApr: boolean;
              thirdPartyApr: string;
              nativeRewardApr: string;
              swapApr: string;
              total: string;
              items: Array<{
                __typename: 'GqlBalancePoolAprItem';
                id: string;
                title: string;
                apr: string;
                subItems?: Array<{
                  __typename: 'GqlBalancePoolAprSubItem';
                  id: string;
                  title: string;
                  apr: string;
                }> | null;
              }>;
            };
          };
          allTokens: Array<{
            __typename: 'GqlPoolTokenExpanded';
            id: string;
            address: string;
            isNested: boolean;
            isPhantomBpt: boolean;
            weight?: string | null;
          }>;
        }
    >;
  }>;
  contentGetNewsItems: Array<{
    __typename: 'GqlContentNewsItem';
    id: string;
    text: string;
    image?: string | null;
    url: string;
    source: GqlContentNewsItemSource;
    timestamp: string;
    discussionUrl?: string | null;
  } | null>;
};

export type GetHomeFeaturedPoolsQueryVariables = Exact<{ [key: string]: never }>;

export type GetHomeFeaturedPoolsQuery = {
  __typename: 'Query';
  featuredPoolGroups: Array<{
    __typename: 'GqlPoolFeaturedPoolGroup';
    id: string;
    icon: string;
    title: string;
    items: Array<
      | { __typename: 'GqlFeaturePoolGroupItemExternalLink' }
      | {
          __typename: 'GqlPoolMinimal';
          id: string;
          address: string;
          name: string;
          dynamicData: {
            __typename: 'GqlPoolDynamicData';
            totalLiquidity: string;
            totalShares: string;
            apr: {
              __typename: 'GqlPoolApr';
              hasRewardApr: boolean;
              thirdPartyApr: string;
              nativeRewardApr: string;
              swapApr: string;
              total: string;
              items: Array<{
                __typename: 'GqlBalancePoolAprItem';
                id: string;
                title: string;
                apr: string;
                subItems?: Array<{
                  __typename: 'GqlBalancePoolAprSubItem';
                  id: string;
                  title: string;
                  apr: string;
                }> | null;
              }>;
            };
          };
          allTokens: Array<{
            __typename: 'GqlPoolTokenExpanded';
            id: string;
            address: string;
            isNested: boolean;
            isPhantomBpt: boolean;
            weight?: string | null;
          }>;
        }
    >;
  }>;
};

export type GetHomeNewsItemsQueryVariables = Exact<{ [key: string]: never }>;

export type GetHomeNewsItemsQuery = {
  __typename: 'Query';
  newsItems: Array<{
    __typename: 'GqlContentNewsItem';
    id: string;
    text: string;
    image?: string | null;
    url: string;
    source: GqlContentNewsItemSource;
    timestamp: string;
    discussionUrl?: string | null;
  } | null>;
};

export type GqlPoolFeaturedPoolGroupFragment = {
  __typename: 'GqlPoolFeaturedPoolGroup';
  id: string;
  icon: string;
  title: string;
  items: Array<
    | { __typename: 'GqlFeaturePoolGroupItemExternalLink' }
    | {
        __typename: 'GqlPoolMinimal';
        id: string;
        address: string;
        name: string;
        dynamicData: {
          __typename: 'GqlPoolDynamicData';
          totalLiquidity: string;
          totalShares: string;
          apr: {
            __typename: 'GqlPoolApr';
            hasRewardApr: boolean;
            thirdPartyApr: string;
            nativeRewardApr: string;
            swapApr: string;
            total: string;
            items: Array<{
              __typename: 'GqlBalancePoolAprItem';
              id: string;
              title: string;
              apr: string;
              subItems?: Array<{
                __typename: 'GqlBalancePoolAprSubItem';
                id: string;
                title: string;
                apr: string;
              }> | null;
            }>;
          };
        };
        allTokens: Array<{
          __typename: 'GqlPoolTokenExpanded';
          id: string;
          address: string;
          isNested: boolean;
          isPhantomBpt: boolean;
          weight?: string | null;
        }>;
      }
  >;
};

export type GqlPoolCardDataFragment = {
  __typename: 'GqlPoolMinimal';
  id: string;
  address: string;
  name: string;
  dynamicData: {
    __typename: 'GqlPoolDynamicData';
    totalLiquidity: string;
    totalShares: string;
    apr: {
      __typename: 'GqlPoolApr';
      hasRewardApr: boolean;
      thirdPartyApr: string;
      nativeRewardApr: string;
      swapApr: string;
      total: string;
      items: Array<{
        __typename: 'GqlBalancePoolAprItem';
        id: string;
        title: string;
        apr: string;
        subItems?: Array<{
          __typename: 'GqlBalancePoolAprSubItem';
          id: string;
          title: string;
          apr: string;
        }> | null;
      }>;
    };
  };
  allTokens: Array<{
    __typename: 'GqlPoolTokenExpanded';
    id: string;
    address: string;
    isNested: boolean;
    isPhantomBpt: boolean;
    weight?: string | null;
  }>;
};

export type GetLinearPoolsQueryVariables = Exact<{ [key: string]: never }>;

export type GetLinearPoolsQuery = {
  __typename: 'Query';
  pools: Array<{
    __typename: 'GqlPoolLinear';
    id: string;
    address: string;
    name: string;
    owner: string;
    decimals: number;
    factory?: string | null;
    symbol: string;
    createTime: number;
    mainIndex: number;
    wrappedIndex: number;
    lowerTarget: string;
    upperTarget: string;
    dynamicData: {
      __typename: 'GqlPoolDynamicData';
      poolId: string;
      swapEnabled: boolean;
      totalLiquidity: string;
      totalLiquidity24hAgo: string;
      totalShares: string;
      totalShares24hAgo: string;
      fees24h: string;
      swapFee: string;
      volume24h: string;
      fees48h: string;
      volume48h: string;
      apr: {
        __typename: 'GqlPoolApr';
        hasRewardApr: boolean;
        thirdPartyApr: string;
        nativeRewardApr: string;
        swapApr: string;
        total: string;
        items: Array<{
          __typename: 'GqlBalancePoolAprItem';
          id: string;
          title: string;
          apr: string;
          subItems?: Array<{
            __typename: 'GqlBalancePoolAprSubItem';
            id: string;
            title: string;
            apr: string;
          }> | null;
        }>;
      };
    };
    tokens: Array<{
      __typename: 'GqlPoolToken';
      id: string;
      index: number;
      name: string;
      symbol: string;
      balance: string;
      address: string;
      priceRate: string;
      decimals: number;
      weight?: string | null;
      totalBalance: string;
    }>;
  }>;
};

export type GqlPoolLinearFragment = {
  __typename: 'GqlPoolLinear';
  id: string;
  address: string;
  name: string;
  owner: string;
  decimals: number;
  factory?: string | null;
  symbol: string;
  createTime: number;
  mainIndex: number;
  wrappedIndex: number;
  lowerTarget: string;
  upperTarget: string;
  dynamicData: {
    __typename: 'GqlPoolDynamicData';
    poolId: string;
    swapEnabled: boolean;
    totalLiquidity: string;
    totalLiquidity24hAgo: string;
    totalShares: string;
    totalShares24hAgo: string;
    fees24h: string;
    swapFee: string;
    volume24h: string;
    fees48h: string;
    volume48h: string;
    apr: {
      __typename: 'GqlPoolApr';
      hasRewardApr: boolean;
      thirdPartyApr: string;
      nativeRewardApr: string;
      swapApr: string;
      total: string;
      items: Array<{
        __typename: 'GqlBalancePoolAprItem';
        id: string;
        title: string;
        apr: string;
        subItems?: Array<{
          __typename: 'GqlBalancePoolAprSubItem';
          id: string;
          title: string;
          apr: string;
        }> | null;
      }>;
    };
  };
  tokens: Array<{
    __typename: 'GqlPoolToken';
    id: string;
    index: number;
    name: string;
    symbol: string;
    balance: string;
    address: string;
    priceRate: string;
    decimals: number;
    weight?: string | null;
    totalBalance: string;
  }>;
};

export type GetPoolQueryVariables = Exact<{
  id: Scalars['String'];
}>;

export type GetPoolQuery = {
  __typename: 'Query';
  pool:
    | {
        __typename: 'GqlPoolElement';
        unitSeconds: string;
        principalToken: string;
        baseToken: string;
        id: string;
        address: string;
        name: string;
        owner: string;
        decimals: number;
        factory?: string | null;
        symbol: string;
        createTime: number;
        tokens: Array<{
          __typename: 'GqlPoolToken';
          id: string;
          index: number;
          name: string;
          symbol: string;
          balance: string;
          address: string;
          priceRate: string;
          decimals: number;
          weight?: string | null;
          totalBalance: string;
          logoURI?: string | null;
        }>;
        dynamicData: {
          __typename: 'GqlPoolDynamicData';
          poolId: string;
          swapEnabled: boolean;
          totalLiquidity: string;
          totalLiquidity24hAgo: string;
          totalShares: string;
          totalShares24hAgo: string;
          fees24h: string;
          swapFee: string;
          volume24h: string;
          fees48h: string;
          volume48h: string;
          lifetimeVolume: string;
          lifetimeSwapFees: string;
          holdersCount: string;
          swapsCount: string;
          sharePriceAth: string;
          sharePriceAthTimestamp: number;
          sharePriceAtl: string;
          sharePriceAtlTimestamp: number;
          totalLiquidityAth: string;
          totalLiquidityAthTimestamp: number;
          totalLiquidityAtl: string;
          totalLiquidityAtlTimestamp: number;
          volume24hAth: string;
          volume24hAthTimestamp: number;
          volume24hAtl: string;
          volume24hAtlTimestamp: number;
          fees24hAth: string;
          fees24hAthTimestamp: number;
          fees24hAtl: string;
          fees24hAtlTimestamp: number;
          apr: {
            __typename: 'GqlPoolApr';
            hasRewardApr: boolean;
            thirdPartyApr: string;
            nativeRewardApr: string;
            swapApr: string;
            total: string;
            items: Array<{
              __typename: 'GqlBalancePoolAprItem';
              id: string;
              title: string;
              apr: string;
              subItems?: Array<{
                __typename: 'GqlBalancePoolAprSubItem';
                id: string;
                title: string;
                apr: string;
              }> | null;
            }>;
          };
        };
        allTokens: Array<{
          __typename: 'GqlPoolTokenExpanded';
          id: string;
          address: string;
          name: string;
          symbol: string;
          decimals: number;
          isNested: boolean;
          isPhantomBpt: boolean;
        }>;
        staking?: {
          __typename: 'GqlPoolStaking';
          id: string;
          type: GqlPoolStakingType;
          address: string;
          gauge?: {
            __typename: 'GqlPoolStakingGauge';
            id: string;
            gaugeAddress: string;
            depositFee: number;
            withdrawFee: number;
            rewards: Array<{
              __typename: 'GqlPoolStakingGaugeReward';
              id: string;
              rewardPerSecond: string;
              tokenAddress: string;
            }>;
          } | null;
        } | null;
        investConfig: {
          __typename: 'GqlPoolInvestConfig';
          singleAssetEnabled: boolean;
          proportionalEnabled: boolean;
          options: Array<{
            __typename: 'GqlPoolInvestOption';
            poolTokenIndex: number;
            poolTokenAddress: string;
            tokenOptions: Array<{
              __typename: 'GqlPoolToken';
              id: string;
              index: number;
              name: string;
              symbol: string;
              balance: string;
              address: string;
              priceRate: string;
              decimals: number;
              weight?: string | null;
              totalBalance: string;
              logoURI?: string | null;
            }>;
          }>;
        };
        withdrawConfig: {
          __typename: 'GqlPoolWithdrawConfig';
          singleAssetEnabled: boolean;
          proportionalEnabled: boolean;
          options: Array<{
            __typename: 'GqlPoolWithdrawOption';
            poolTokenIndex: number;
            poolTokenAddress: string;
            tokenOptions: Array<{
              __typename: 'GqlPoolToken';
              id: string;
              index: number;
              name: string;
              symbol: string;
              balance: string;
              address: string;
              priceRate: string;
              decimals: number;
              weight?: string | null;
              totalBalance: string;
              logoURI?: string | null;
            }>;
          }>;
        };
      }
    | {
        __typename: 'GqlPoolLinear';
        mainIndex: number;
        wrappedIndex: number;
        lowerTarget: string;
        upperTarget: string;
        id: string;
        address: string;
        name: string;
        owner: string;
        decimals: number;
        factory?: string | null;
        symbol: string;
        createTime: number;
        tokens: Array<{
          __typename: 'GqlPoolToken';
          id: string;
          index: number;
          name: string;
          symbol: string;
          balance: string;
          address: string;
          priceRate: string;
          decimals: number;
          weight?: string | null;
          totalBalance: string;
          logoURI?: string | null;
        }>;
        dynamicData: {
          __typename: 'GqlPoolDynamicData';
          poolId: string;
          swapEnabled: boolean;
          totalLiquidity: string;
          totalLiquidity24hAgo: string;
          totalShares: string;
          totalShares24hAgo: string;
          fees24h: string;
          swapFee: string;
          volume24h: string;
          fees48h: string;
          volume48h: string;
          lifetimeVolume: string;
          lifetimeSwapFees: string;
          holdersCount: string;
          swapsCount: string;
          sharePriceAth: string;
          sharePriceAthTimestamp: number;
          sharePriceAtl: string;
          sharePriceAtlTimestamp: number;
          totalLiquidityAth: string;
          totalLiquidityAthTimestamp: number;
          totalLiquidityAtl: string;
          totalLiquidityAtlTimestamp: number;
          volume24hAth: string;
          volume24hAthTimestamp: number;
          volume24hAtl: string;
          volume24hAtlTimestamp: number;
          fees24hAth: string;
          fees24hAthTimestamp: number;
          fees24hAtl: string;
          fees24hAtlTimestamp: number;
          apr: {
            __typename: 'GqlPoolApr';
            hasRewardApr: boolean;
            thirdPartyApr: string;
            nativeRewardApr: string;
            swapApr: string;
            total: string;
            items: Array<{
              __typename: 'GqlBalancePoolAprItem';
              id: string;
              title: string;
              apr: string;
              subItems?: Array<{
                __typename: 'GqlBalancePoolAprSubItem';
                id: string;
                title: string;
                apr: string;
              }> | null;
            }>;
          };
        };
        allTokens: Array<{
          __typename: 'GqlPoolTokenExpanded';
          id: string;
          address: string;
          name: string;
          symbol: string;
          decimals: number;
          isNested: boolean;
          isPhantomBpt: boolean;
        }>;
        staking?: {
          __typename: 'GqlPoolStaking';
          id: string;
          type: GqlPoolStakingType;
          address: string;
          gauge?: {
            __typename: 'GqlPoolStakingGauge';
            id: string;
            gaugeAddress: string;
            depositFee: number;
            withdrawFee: number;
            rewards: Array<{
              __typename: 'GqlPoolStakingGaugeReward';
              id: string;
              rewardPerSecond: string;
              tokenAddress: string;
            }>;
          } | null;
        } | null;
        investConfig: {
          __typename: 'GqlPoolInvestConfig';
          singleAssetEnabled: boolean;
          proportionalEnabled: boolean;
          options: Array<{
            __typename: 'GqlPoolInvestOption';
            poolTokenIndex: number;
            poolTokenAddress: string;
            tokenOptions: Array<{
              __typename: 'GqlPoolToken';
              id: string;
              index: number;
              name: string;
              symbol: string;
              balance: string;
              address: string;
              priceRate: string;
              decimals: number;
              weight?: string | null;
              totalBalance: string;
              logoURI?: string | null;
            }>;
          }>;
        };
        withdrawConfig: {
          __typename: 'GqlPoolWithdrawConfig';
          singleAssetEnabled: boolean;
          proportionalEnabled: boolean;
          options: Array<{
            __typename: 'GqlPoolWithdrawOption';
            poolTokenIndex: number;
            poolTokenAddress: string;
            tokenOptions: Array<{
              __typename: 'GqlPoolToken';
              id: string;
              index: number;
              name: string;
              symbol: string;
              balance: string;
              address: string;
              priceRate: string;
              decimals: number;
              weight?: string | null;
              totalBalance: string;
              logoURI?: string | null;
            }>;
          }>;
        };
      }
    | {
        __typename: 'GqlPoolLiquidityBootstrapping';
        name: string;
        nestingType: GqlPoolNestingType;
        id: string;
        address: string;
        owner: string;
        decimals: number;
        factory?: string | null;
        symbol: string;
        createTime: number;
        tokens: Array<
          | {
              __typename: 'GqlPoolToken';
              id: string;
              index: number;
              name: string;
              symbol: string;
              balance: string;
              address: string;
              priceRate: string;
              decimals: number;
              weight?: string | null;
              totalBalance: string;
              logoURI?: string | null;
            }
          | {
              __typename: 'GqlPoolTokenLinear';
              id: string;
              index: number;
              name: string;
              symbol: string;
              balance: string;
              address: string;
              priceRate: string;
              decimals: number;
              weight?: string | null;
              mainTokenBalance: string;
              wrappedTokenBalance: string;
              totalMainTokenBalance: string;
              totalBalance: string;
              pool: {
                __typename: 'GqlPoolLinearNested';
                id: string;
                name: string;
                symbol: string;
                address: string;
                owner: string;
                factory?: string | null;
                createTime: number;
                wrappedIndex: number;
                mainIndex: number;
                upperTarget: string;
                lowerTarget: string;
                totalShares: string;
                totalLiquidity: string;
                bptPriceRate?: string | null;
                tokens: Array<{
                  __typename: 'GqlPoolToken';
                  id: string;
                  index: number;
                  name: string;
                  symbol: string;
                  balance: string;
                  address: string;
                  priceRate: string;
                  decimals: number;
                  weight?: string | null;
                  totalBalance: string;
                  logoURI?: string | null;
                }>;
              };
            }
          | {
              __typename: 'GqlPoolTokenPhantomStable';
              id: string;
              index: number;
              name: string;
              symbol: string;
              balance: string;
              address: string;
              weight?: string | null;
              priceRate: string;
              decimals: number;
              totalBalance: string;
              pool: {
                __typename: 'GqlPoolPhantomStableNested';
                id: string;
                name: string;
                symbol: string;
                address: string;
                owner: string;
                factory?: string | null;
                createTime: number;
                totalShares: string;
                totalLiquidity: string;
                nestingType: GqlPoolNestingType;
                swapFee: string;
                amp: string;
                tokens: Array<
                  | {
                      __typename: 'GqlPoolToken';
                      id: string;
                      index: number;
                      name: string;
                      symbol: string;
                      balance: string;
                      address: string;
                      priceRate: string;
                      decimals: number;
                      weight?: string | null;
                      totalBalance: string;
                      logoURI?: string | null;
                    }
                  | {
                      __typename: 'GqlPoolTokenLinear';
                      id: string;
                      index: number;
                      name: string;
                      symbol: string;
                      balance: string;
                      address: string;
                      priceRate: string;
                      decimals: number;
                      weight?: string | null;
                      mainTokenBalance: string;
                      wrappedTokenBalance: string;
                      totalMainTokenBalance: string;
                      totalBalance: string;
                      pool: {
                        __typename: 'GqlPoolLinearNested';
                        id: string;
                        name: string;
                        symbol: string;
                        address: string;
                        owner: string;
                        factory?: string | null;
                        createTime: number;
                        wrappedIndex: number;
                        mainIndex: number;
                        upperTarget: string;
                        lowerTarget: string;
                        totalShares: string;
                        totalLiquidity: string;
                        bptPriceRate?: string | null;
                        tokens: Array<{
                          __typename: 'GqlPoolToken';
                          id: string;
                          index: number;
                          name: string;
                          symbol: string;
                          balance: string;
                          address: string;
                          priceRate: string;
                          decimals: number;
                          weight?: string | null;
                          totalBalance: string;
                          logoURI?: string | null;
                        }>;
                      };
                    }
                >;
              };
            }
        >;
        dynamicData: {
          __typename: 'GqlPoolDynamicData';
          poolId: string;
          swapEnabled: boolean;
          totalLiquidity: string;
          totalLiquidity24hAgo: string;
          totalShares: string;
          totalShares24hAgo: string;
          fees24h: string;
          swapFee: string;
          volume24h: string;
          fees48h: string;
          volume48h: string;
          lifetimeVolume: string;
          lifetimeSwapFees: string;
          holdersCount: string;
          swapsCount: string;
          sharePriceAth: string;
          sharePriceAthTimestamp: number;
          sharePriceAtl: string;
          sharePriceAtlTimestamp: number;
          totalLiquidityAth: string;
          totalLiquidityAthTimestamp: number;
          totalLiquidityAtl: string;
          totalLiquidityAtlTimestamp: number;
          volume24hAth: string;
          volume24hAthTimestamp: number;
          volume24hAtl: string;
          volume24hAtlTimestamp: number;
          fees24hAth: string;
          fees24hAthTimestamp: number;
          fees24hAtl: string;
          fees24hAtlTimestamp: number;
          apr: {
            __typename: 'GqlPoolApr';
            hasRewardApr: boolean;
            thirdPartyApr: string;
            nativeRewardApr: string;
            swapApr: string;
            total: string;
            items: Array<{
              __typename: 'GqlBalancePoolAprItem';
              id: string;
              title: string;
              apr: string;
              subItems?: Array<{
                __typename: 'GqlBalancePoolAprSubItem';
                id: string;
                title: string;
                apr: string;
              }> | null;
            }>;
          };
        };
        allTokens: Array<{
          __typename: 'GqlPoolTokenExpanded';
          id: string;
          address: string;
          name: string;
          symbol: string;
          decimals: number;
          isNested: boolean;
          isPhantomBpt: boolean;
        }>;
        staking?: {
          __typename: 'GqlPoolStaking';
          id: string;
          type: GqlPoolStakingType;
          address: string;
          gauge?: {
            __typename: 'GqlPoolStakingGauge';
            id: string;
            gaugeAddress: string;
            depositFee: number;
            withdrawFee: number;
            rewards: Array<{
              __typename: 'GqlPoolStakingGaugeReward';
              id: string;
              rewardPerSecond: string;
              tokenAddress: string;
            }>;
          } | null;
        } | null;
        investConfig: {
          __typename: 'GqlPoolInvestConfig';
          singleAssetEnabled: boolean;
          proportionalEnabled: boolean;
          options: Array<{
            __typename: 'GqlPoolInvestOption';
            poolTokenIndex: number;
            poolTokenAddress: string;
            tokenOptions: Array<{
              __typename: 'GqlPoolToken';
              id: string;
              index: number;
              name: string;
              symbol: string;
              balance: string;
              address: string;
              priceRate: string;
              decimals: number;
              weight?: string | null;
              totalBalance: string;
              logoURI?: string | null;
            }>;
          }>;
        };
        withdrawConfig: {
          __typename: 'GqlPoolWithdrawConfig';
          singleAssetEnabled: boolean;
          proportionalEnabled: boolean;
          options: Array<{
            __typename: 'GqlPoolWithdrawOption';
            poolTokenIndex: number;
            poolTokenAddress: string;
            tokenOptions: Array<{
              __typename: 'GqlPoolToken';
              id: string;
              index: number;
              name: string;
              symbol: string;
              balance: string;
              address: string;
              priceRate: string;
              decimals: number;
              weight?: string | null;
              totalBalance: string;
              logoURI?: string | null;
            }>;
          }>;
        };
      }
    | {
        __typename: 'GqlPoolMetaStable';
        amp: string;
        id: string;
        address: string;
        name: string;
        owner: string;
        decimals: number;
        factory?: string | null;
        symbol: string;
        createTime: number;
        tokens: Array<{
          __typename: 'GqlPoolToken';
          id: string;
          index: number;
          name: string;
          symbol: string;
          balance: string;
          address: string;
          priceRate: string;
          decimals: number;
          weight?: string | null;
          totalBalance: string;
          logoURI?: string | null;
        }>;
        dynamicData: {
          __typename: 'GqlPoolDynamicData';
          poolId: string;
          swapEnabled: boolean;
          totalLiquidity: string;
          totalLiquidity24hAgo: string;
          totalShares: string;
          totalShares24hAgo: string;
          fees24h: string;
          swapFee: string;
          volume24h: string;
          fees48h: string;
          volume48h: string;
          lifetimeVolume: string;
          lifetimeSwapFees: string;
          holdersCount: string;
          swapsCount: string;
          sharePriceAth: string;
          sharePriceAthTimestamp: number;
          sharePriceAtl: string;
          sharePriceAtlTimestamp: number;
          totalLiquidityAth: string;
          totalLiquidityAthTimestamp: number;
          totalLiquidityAtl: string;
          totalLiquidityAtlTimestamp: number;
          volume24hAth: string;
          volume24hAthTimestamp: number;
          volume24hAtl: string;
          volume24hAtlTimestamp: number;
          fees24hAth: string;
          fees24hAthTimestamp: number;
          fees24hAtl: string;
          fees24hAtlTimestamp: number;
          apr: {
            __typename: 'GqlPoolApr';
            hasRewardApr: boolean;
            thirdPartyApr: string;
            nativeRewardApr: string;
            swapApr: string;
            total: string;
            items: Array<{
              __typename: 'GqlBalancePoolAprItem';
              id: string;
              title: string;
              apr: string;
              subItems?: Array<{
                __typename: 'GqlBalancePoolAprSubItem';
                id: string;
                title: string;
                apr: string;
              }> | null;
            }>;
          };
        };
        allTokens: Array<{
          __typename: 'GqlPoolTokenExpanded';
          id: string;
          address: string;
          name: string;
          symbol: string;
          decimals: number;
          isNested: boolean;
          isPhantomBpt: boolean;
        }>;
        staking?: {
          __typename: 'GqlPoolStaking';
          id: string;
          type: GqlPoolStakingType;
          address: string;
          gauge?: {
            __typename: 'GqlPoolStakingGauge';
            id: string;
            gaugeAddress: string;
            depositFee: number;
            withdrawFee: number;
            rewards: Array<{
              __typename: 'GqlPoolStakingGaugeReward';
              id: string;
              rewardPerSecond: string;
              tokenAddress: string;
            }>;
          } | null;
        } | null;
        investConfig: {
          __typename: 'GqlPoolInvestConfig';
          singleAssetEnabled: boolean;
          proportionalEnabled: boolean;
          options: Array<{
            __typename: 'GqlPoolInvestOption';
            poolTokenIndex: number;
            poolTokenAddress: string;
            tokenOptions: Array<{
              __typename: 'GqlPoolToken';
              id: string;
              index: number;
              name: string;
              symbol: string;
              balance: string;
              address: string;
              priceRate: string;
              decimals: number;
              weight?: string | null;
              totalBalance: string;
              logoURI?: string | null;
            }>;
          }>;
        };
        withdrawConfig: {
          __typename: 'GqlPoolWithdrawConfig';
          singleAssetEnabled: boolean;
          proportionalEnabled: boolean;
          options: Array<{
            __typename: 'GqlPoolWithdrawOption';
            poolTokenIndex: number;
            poolTokenAddress: string;
            tokenOptions: Array<{
              __typename: 'GqlPoolToken';
              id: string;
              index: number;
              name: string;
              symbol: string;
              balance: string;
              address: string;
              priceRate: string;
              decimals: number;
              weight?: string | null;
              totalBalance: string;
              logoURI?: string | null;
            }>;
          }>;
        };
      }
    | {
        __typename: 'GqlPoolPhantomStable';
        amp: string;
        nestingType: GqlPoolNestingType;
        id: string;
        address: string;
        name: string;
        owner: string;
        decimals: number;
        factory?: string | null;
        symbol: string;
        createTime: number;
        tokens: Array<
          | {
              __typename: 'GqlPoolToken';
              id: string;
              index: number;
              name: string;
              symbol: string;
              balance: string;
              address: string;
              priceRate: string;
              decimals: number;
              weight?: string | null;
              totalBalance: string;
              logoURI?: string | null;
            }
          | {
              __typename: 'GqlPoolTokenLinear';
              id: string;
              index: number;
              name: string;
              symbol: string;
              balance: string;
              address: string;
              priceRate: string;
              decimals: number;
              weight?: string | null;
              mainTokenBalance: string;
              wrappedTokenBalance: string;
              totalMainTokenBalance: string;
              totalBalance: string;
              pool: {
                __typename: 'GqlPoolLinearNested';
                id: string;
                name: string;
                symbol: string;
                address: string;
                owner: string;
                factory?: string | null;
                createTime: number;
                wrappedIndex: number;
                mainIndex: number;
                upperTarget: string;
                lowerTarget: string;
                totalShares: string;
                totalLiquidity: string;
                bptPriceRate?: string | null;
                tokens: Array<{
                  __typename: 'GqlPoolToken';
                  id: string;
                  index: number;
                  name: string;
                  symbol: string;
                  balance: string;
                  address: string;
                  priceRate: string;
                  decimals: number;
                  weight?: string | null;
                  totalBalance: string;
                  logoURI?: string | null;
                }>;
              };
            }
          | {
              __typename: 'GqlPoolTokenPhantomStable';
              id: string;
              index: number;
              name: string;
              symbol: string;
              balance: string;
              address: string;
              weight?: string | null;
              priceRate: string;
              decimals: number;
              totalBalance: string;
              pool: {
                __typename: 'GqlPoolPhantomStableNested';
                id: string;
                name: string;
                symbol: string;
                address: string;
                owner: string;
                factory?: string | null;
                createTime: number;
                totalShares: string;
                totalLiquidity: string;
                nestingType: GqlPoolNestingType;
                swapFee: string;
                amp: string;
                tokens: Array<
                  | {
                      __typename: 'GqlPoolToken';
                      id: string;
                      index: number;
                      name: string;
                      symbol: string;
                      balance: string;
                      address: string;
                      priceRate: string;
                      decimals: number;
                      weight?: string | null;
                      totalBalance: string;
                      logoURI?: string | null;
                    }
                  | {
                      __typename: 'GqlPoolTokenLinear';
                      id: string;
                      index: number;
                      name: string;
                      symbol: string;
                      balance: string;
                      address: string;
                      priceRate: string;
                      decimals: number;
                      weight?: string | null;
                      mainTokenBalance: string;
                      wrappedTokenBalance: string;
                      totalMainTokenBalance: string;
                      totalBalance: string;
                      pool: {
                        __typename: 'GqlPoolLinearNested';
                        id: string;
                        name: string;
                        symbol: string;
                        address: string;
                        owner: string;
                        factory?: string | null;
                        createTime: number;
                        wrappedIndex: number;
                        mainIndex: number;
                        upperTarget: string;
                        lowerTarget: string;
                        totalShares: string;
                        totalLiquidity: string;
                        bptPriceRate?: string | null;
                        tokens: Array<{
                          __typename: 'GqlPoolToken';
                          id: string;
                          index: number;
                          name: string;
                          symbol: string;
                          balance: string;
                          address: string;
                          priceRate: string;
                          decimals: number;
                          weight?: string | null;
                          totalBalance: string;
                          logoURI?: string | null;
                        }>;
                      };
                    }
                >;
              };
            }
        >;
        dynamicData: {
          __typename: 'GqlPoolDynamicData';
          poolId: string;
          swapEnabled: boolean;
          totalLiquidity: string;
          totalLiquidity24hAgo: string;
          totalShares: string;
          totalShares24hAgo: string;
          fees24h: string;
          swapFee: string;
          volume24h: string;
          fees48h: string;
          volume48h: string;
          lifetimeVolume: string;
          lifetimeSwapFees: string;
          holdersCount: string;
          swapsCount: string;
          sharePriceAth: string;
          sharePriceAthTimestamp: number;
          sharePriceAtl: string;
          sharePriceAtlTimestamp: number;
          totalLiquidityAth: string;
          totalLiquidityAthTimestamp: number;
          totalLiquidityAtl: string;
          totalLiquidityAtlTimestamp: number;
          volume24hAth: string;
          volume24hAthTimestamp: number;
          volume24hAtl: string;
          volume24hAtlTimestamp: number;
          fees24hAth: string;
          fees24hAthTimestamp: number;
          fees24hAtl: string;
          fees24hAtlTimestamp: number;
          apr: {
            __typename: 'GqlPoolApr';
            hasRewardApr: boolean;
            thirdPartyApr: string;
            nativeRewardApr: string;
            swapApr: string;
            total: string;
            items: Array<{
              __typename: 'GqlBalancePoolAprItem';
              id: string;
              title: string;
              apr: string;
              subItems?: Array<{
                __typename: 'GqlBalancePoolAprSubItem';
                id: string;
                title: string;
                apr: string;
              }> | null;
            }>;
          };
        };
        allTokens: Array<{
          __typename: 'GqlPoolTokenExpanded';
          id: string;
          address: string;
          name: string;
          symbol: string;
          decimals: number;
          isNested: boolean;
          isPhantomBpt: boolean;
        }>;
        staking?: {
          __typename: 'GqlPoolStaking';
          id: string;
          type: GqlPoolStakingType;
          address: string;
          gauge?: {
            __typename: 'GqlPoolStakingGauge';
            id: string;
            gaugeAddress: string;
            depositFee: number;
            withdrawFee: number;
            rewards: Array<{
              __typename: 'GqlPoolStakingGaugeReward';
              id: string;
              rewardPerSecond: string;
              tokenAddress: string;
            }>;
          } | null;
        } | null;
        investConfig: {
          __typename: 'GqlPoolInvestConfig';
          singleAssetEnabled: boolean;
          proportionalEnabled: boolean;
          options: Array<{
            __typename: 'GqlPoolInvestOption';
            poolTokenIndex: number;
            poolTokenAddress: string;
            tokenOptions: Array<{
              __typename: 'GqlPoolToken';
              id: string;
              index: number;
              name: string;
              symbol: string;
              balance: string;
              address: string;
              priceRate: string;
              decimals: number;
              weight?: string | null;
              totalBalance: string;
              logoURI?: string | null;
            }>;
          }>;
        };
        withdrawConfig: {
          __typename: 'GqlPoolWithdrawConfig';
          singleAssetEnabled: boolean;
          proportionalEnabled: boolean;
          options: Array<{
            __typename: 'GqlPoolWithdrawOption';
            poolTokenIndex: number;
            poolTokenAddress: string;
            tokenOptions: Array<{
              __typename: 'GqlPoolToken';
              id: string;
              index: number;
              name: string;
              symbol: string;
              balance: string;
              address: string;
              priceRate: string;
              decimals: number;
              weight?: string | null;
              totalBalance: string;
              logoURI?: string | null;
            }>;
          }>;
        };
      }
    | {
        __typename: 'GqlPoolStable';
        amp: string;
        id: string;
        address: string;
        name: string;
        owner: string;
        decimals: number;
        factory?: string | null;
        symbol: string;
        createTime: number;
        tokens: Array<{
          __typename: 'GqlPoolToken';
          id: string;
          index: number;
          name: string;
          symbol: string;
          balance: string;
          address: string;
          priceRate: string;
          decimals: number;
          weight?: string | null;
          totalBalance: string;
          logoURI?: string | null;
        }>;
        dynamicData: {
          __typename: 'GqlPoolDynamicData';
          poolId: string;
          swapEnabled: boolean;
          totalLiquidity: string;
          totalLiquidity24hAgo: string;
          totalShares: string;
          totalShares24hAgo: string;
          fees24h: string;
          swapFee: string;
          volume24h: string;
          fees48h: string;
          volume48h: string;
          lifetimeVolume: string;
          lifetimeSwapFees: string;
          holdersCount: string;
          swapsCount: string;
          sharePriceAth: string;
          sharePriceAthTimestamp: number;
          sharePriceAtl: string;
          sharePriceAtlTimestamp: number;
          totalLiquidityAth: string;
          totalLiquidityAthTimestamp: number;
          totalLiquidityAtl: string;
          totalLiquidityAtlTimestamp: number;
          volume24hAth: string;
          volume24hAthTimestamp: number;
          volume24hAtl: string;
          volume24hAtlTimestamp: number;
          fees24hAth: string;
          fees24hAthTimestamp: number;
          fees24hAtl: string;
          fees24hAtlTimestamp: number;
          apr: {
            __typename: 'GqlPoolApr';
            hasRewardApr: boolean;
            thirdPartyApr: string;
            nativeRewardApr: string;
            swapApr: string;
            total: string;
            items: Array<{
              __typename: 'GqlBalancePoolAprItem';
              id: string;
              title: string;
              apr: string;
              subItems?: Array<{
                __typename: 'GqlBalancePoolAprSubItem';
                id: string;
                title: string;
                apr: string;
              }> | null;
            }>;
          };
        };
        allTokens: Array<{
          __typename: 'GqlPoolTokenExpanded';
          id: string;
          address: string;
          name: string;
          symbol: string;
          decimals: number;
          isNested: boolean;
          isPhantomBpt: boolean;
        }>;
        staking?: {
          __typename: 'GqlPoolStaking';
          id: string;
          type: GqlPoolStakingType;
          address: string;
          gauge?: {
            __typename: 'GqlPoolStakingGauge';
            id: string;
            gaugeAddress: string;
            depositFee: number;
            withdrawFee: number;
            rewards: Array<{
              __typename: 'GqlPoolStakingGaugeReward';
              id: string;
              rewardPerSecond: string;
              tokenAddress: string;
            }>;
          } | null;
        } | null;
        investConfig: {
          __typename: 'GqlPoolInvestConfig';
          singleAssetEnabled: boolean;
          proportionalEnabled: boolean;
          options: Array<{
            __typename: 'GqlPoolInvestOption';
            poolTokenIndex: number;
            poolTokenAddress: string;
            tokenOptions: Array<{
              __typename: 'GqlPoolToken';
              id: string;
              index: number;
              name: string;
              symbol: string;
              balance: string;
              address: string;
              priceRate: string;
              decimals: number;
              weight?: string | null;
              totalBalance: string;
              logoURI?: string | null;
            }>;
          }>;
        };
        withdrawConfig: {
          __typename: 'GqlPoolWithdrawConfig';
          singleAssetEnabled: boolean;
          proportionalEnabled: boolean;
          options: Array<{
            __typename: 'GqlPoolWithdrawOption';
            poolTokenIndex: number;
            poolTokenAddress: string;
            tokenOptions: Array<{
              __typename: 'GqlPoolToken';
              id: string;
              index: number;
              name: string;
              symbol: string;
              balance: string;
              address: string;
              priceRate: string;
              decimals: number;
              weight?: string | null;
              totalBalance: string;
              logoURI?: string | null;
            }>;
          }>;
        };
      }
    | {
        __typename: 'GqlPoolWeighted';
        nestingType: GqlPoolNestingType;
        id: string;
        address: string;
        name: string;
        owner: string;
        decimals: number;
        factory?: string | null;
        symbol: string;
        createTime: number;
        tokens: Array<
          | {
              __typename: 'GqlPoolToken';
              id: string;
              index: number;
              name: string;
              symbol: string;
              balance: string;
              address: string;
              priceRate: string;
              decimals: number;
              weight?: string | null;
              totalBalance: string;
              logoURI?: string | null;
            }
          | {
              __typename: 'GqlPoolTokenLinear';
              id: string;
              index: number;
              name: string;
              symbol: string;
              balance: string;
              address: string;
              priceRate: string;
              decimals: number;
              weight?: string | null;
              mainTokenBalance: string;
              wrappedTokenBalance: string;
              totalMainTokenBalance: string;
              totalBalance: string;
              pool: {
                __typename: 'GqlPoolLinearNested';
                id: string;
                name: string;
                symbol: string;
                address: string;
                owner: string;
                factory?: string | null;
                createTime: number;
                wrappedIndex: number;
                mainIndex: number;
                upperTarget: string;
                lowerTarget: string;
                totalShares: string;
                totalLiquidity: string;
                bptPriceRate?: string | null;
                tokens: Array<{
                  __typename: 'GqlPoolToken';
                  id: string;
                  index: number;
                  name: string;
                  symbol: string;
                  balance: string;
                  address: string;
                  priceRate: string;
                  decimals: number;
                  weight?: string | null;
                  totalBalance: string;
                  logoURI?: string | null;
                }>;
              };
            }
          | {
              __typename: 'GqlPoolTokenPhantomStable';
              id: string;
              index: number;
              name: string;
              symbol: string;
              balance: string;
              address: string;
              weight?: string | null;
              priceRate: string;
              decimals: number;
              totalBalance: string;
              pool: {
                __typename: 'GqlPoolPhantomStableNested';
                id: string;
                name: string;
                symbol: string;
                address: string;
                owner: string;
                factory?: string | null;
                createTime: number;
                totalShares: string;
                totalLiquidity: string;
                nestingType: GqlPoolNestingType;
                swapFee: string;
                amp: string;
                tokens: Array<
                  | {
                      __typename: 'GqlPoolToken';
                      id: string;
                      index: number;
                      name: string;
                      symbol: string;
                      balance: string;
                      address: string;
                      priceRate: string;
                      decimals: number;
                      weight?: string | null;
                      totalBalance: string;
                      logoURI?: string | null;
                    }
                  | {
                      __typename: 'GqlPoolTokenLinear';
                      id: string;
                      index: number;
                      name: string;
                      symbol: string;
                      balance: string;
                      address: string;
                      priceRate: string;
                      decimals: number;
                      weight?: string | null;
                      mainTokenBalance: string;
                      wrappedTokenBalance: string;
                      totalMainTokenBalance: string;
                      totalBalance: string;
                      pool: {
                        __typename: 'GqlPoolLinearNested';
                        id: string;
                        name: string;
                        symbol: string;
                        address: string;
                        owner: string;
                        factory?: string | null;
                        createTime: number;
                        wrappedIndex: number;
                        mainIndex: number;
                        upperTarget: string;
                        lowerTarget: string;
                        totalShares: string;
                        totalLiquidity: string;
                        bptPriceRate?: string | null;
                        tokens: Array<{
                          __typename: 'GqlPoolToken';
                          id: string;
                          index: number;
                          name: string;
                          symbol: string;
                          balance: string;
                          address: string;
                          priceRate: string;
                          decimals: number;
                          weight?: string | null;
                          totalBalance: string;
                          logoURI?: string | null;
                        }>;
                      };
                    }
                >;
              };
            }
        >;
        dynamicData: {
          __typename: 'GqlPoolDynamicData';
          poolId: string;
          swapEnabled: boolean;
          totalLiquidity: string;
          totalLiquidity24hAgo: string;
          totalShares: string;
          totalShares24hAgo: string;
          fees24h: string;
          swapFee: string;
          volume24h: string;
          fees48h: string;
          volume48h: string;
          lifetimeVolume: string;
          lifetimeSwapFees: string;
          holdersCount: string;
          swapsCount: string;
          sharePriceAth: string;
          sharePriceAthTimestamp: number;
          sharePriceAtl: string;
          sharePriceAtlTimestamp: number;
          totalLiquidityAth: string;
          totalLiquidityAthTimestamp: number;
          totalLiquidityAtl: string;
          totalLiquidityAtlTimestamp: number;
          volume24hAth: string;
          volume24hAthTimestamp: number;
          volume24hAtl: string;
          volume24hAtlTimestamp: number;
          fees24hAth: string;
          fees24hAthTimestamp: number;
          fees24hAtl: string;
          fees24hAtlTimestamp: number;
          apr: {
            __typename: 'GqlPoolApr';
            hasRewardApr: boolean;
            thirdPartyApr: string;
            nativeRewardApr: string;
            swapApr: string;
            total: string;
            items: Array<{
              __typename: 'GqlBalancePoolAprItem';
              id: string;
              title: string;
              apr: string;
              subItems?: Array<{
                __typename: 'GqlBalancePoolAprSubItem';
                id: string;
                title: string;
                apr: string;
              }> | null;
            }>;
          };
        };
        allTokens: Array<{
          __typename: 'GqlPoolTokenExpanded';
          id: string;
          address: string;
          name: string;
          symbol: string;
          decimals: number;
          isNested: boolean;
          isPhantomBpt: boolean;
        }>;
        staking?: {
          __typename: 'GqlPoolStaking';
          id: string;
          type: GqlPoolStakingType;
          address: string;
          gauge?: {
            __typename: 'GqlPoolStakingGauge';
            id: string;
            gaugeAddress: string;
            depositFee: number;
            withdrawFee: number;
            rewards: Array<{
              __typename: 'GqlPoolStakingGaugeReward';
              id: string;
              rewardPerSecond: string;
              tokenAddress: string;
            }>;
          } | null;
        } | null;
        investConfig: {
          __typename: 'GqlPoolInvestConfig';
          singleAssetEnabled: boolean;
          proportionalEnabled: boolean;
          options: Array<{
            __typename: 'GqlPoolInvestOption';
            poolTokenIndex: number;
            poolTokenAddress: string;
            tokenOptions: Array<{
              __typename: 'GqlPoolToken';
              id: string;
              index: number;
              name: string;
              symbol: string;
              balance: string;
              address: string;
              priceRate: string;
              decimals: number;
              weight?: string | null;
              totalBalance: string;
              logoURI?: string | null;
            }>;
          }>;
        };
        withdrawConfig: {
          __typename: 'GqlPoolWithdrawConfig';
          singleAssetEnabled: boolean;
          proportionalEnabled: boolean;
          options: Array<{
            __typename: 'GqlPoolWithdrawOption';
            poolTokenIndex: number;
            poolTokenAddress: string;
            tokenOptions: Array<{
              __typename: 'GqlPoolToken';
              id: string;
              index: number;
              name: string;
              symbol: string;
              balance: string;
              address: string;
              priceRate: string;
              decimals: number;
              weight?: string | null;
              totalBalance: string;
              logoURI?: string | null;
            }>;
          }>;
        };
      };
};

export type GqlPoolTokenFragment = {
  __typename: 'GqlPoolToken';
  id: string;
  index: number;
  name: string;
  symbol: string;
  balance: string;
  address: string;
  priceRate: string;
  decimals: number;
  weight?: string | null;
  totalBalance: string;
  logoURI?: string | null;
};

export type GqlPoolTokenLinearFragment = {
  __typename: 'GqlPoolTokenLinear';
  id: string;
  index: number;
  name: string;
  symbol: string;
  balance: string;
  address: string;
  priceRate: string;
  decimals: number;
  weight?: string | null;
  mainTokenBalance: string;
  wrappedTokenBalance: string;
  totalMainTokenBalance: string;
  totalBalance: string;
  pool: {
    __typename: 'GqlPoolLinearNested';
    id: string;
    name: string;
    symbol: string;
    address: string;
    owner: string;
    factory?: string | null;
    createTime: number;
    wrappedIndex: number;
    mainIndex: number;
    upperTarget: string;
    lowerTarget: string;
    totalShares: string;
    totalLiquidity: string;
    bptPriceRate?: string | null;
    tokens: Array<{
      __typename: 'GqlPoolToken';
      id: string;
      index: number;
      name: string;
      symbol: string;
      balance: string;
      address: string;
      priceRate: string;
      decimals: number;
      weight?: string | null;
      totalBalance: string;
      logoURI?: string | null;
    }>;
  };
};

export type GqlPoolTokenPhantomStableFragment = {
  __typename: 'GqlPoolTokenPhantomStable';
  id: string;
  index: number;
  name: string;
  symbol: string;
  balance: string;
  address: string;
  weight?: string | null;
  priceRate: string;
  decimals: number;
  totalBalance: string;
  pool: {
    __typename: 'GqlPoolPhantomStableNested';
    id: string;
    name: string;
    symbol: string;
    address: string;
    owner: string;
    factory?: string | null;
    createTime: number;
    totalShares: string;
    totalLiquidity: string;
    nestingType: GqlPoolNestingType;
    swapFee: string;
    amp: string;
    tokens: Array<
      | {
          __typename: 'GqlPoolToken';
          id: string;
          index: number;
          name: string;
          symbol: string;
          balance: string;
          address: string;
          priceRate: string;
          decimals: number;
          weight?: string | null;
          totalBalance: string;
          logoURI?: string | null;
        }
      | {
          __typename: 'GqlPoolTokenLinear';
          id: string;
          index: number;
          name: string;
          symbol: string;
          balance: string;
          address: string;
          priceRate: string;
          decimals: number;
          weight?: string | null;
          mainTokenBalance: string;
          wrappedTokenBalance: string;
          totalMainTokenBalance: string;
          totalBalance: string;
          pool: {
            __typename: 'GqlPoolLinearNested';
            id: string;
            name: string;
            symbol: string;
            address: string;
            owner: string;
            factory?: string | null;
            createTime: number;
            wrappedIndex: number;
            mainIndex: number;
            upperTarget: string;
            lowerTarget: string;
            totalShares: string;
            totalLiquidity: string;
            bptPriceRate?: string | null;
            tokens: Array<{
              __typename: 'GqlPoolToken';
              id: string;
              index: number;
              name: string;
              symbol: string;
              balance: string;
              address: string;
              priceRate: string;
              decimals: number;
              weight?: string | null;
              totalBalance: string;
              logoURI?: string | null;
            }>;
          };
        }
    >;
  };
};

export type GetPoolSwapsQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<GqlPoolSwapFilter>;
}>;

export type GetPoolSwapsQuery = {
  __typename: 'Query';
  swaps: Array<{
    __typename: 'GqlPoolSwap';
    id: string;
    poolId: string;
    timestamp: number;
    tokenAmountIn: string;
    tokenAmountOut: string;
    tokenIn: string;
    tokenOut: string;
    tx: string;
    userAddress: string;
    valueUSD: number;
  }>;
};

export type GetPoolJoinExitsQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  poolId: Scalars['String'];
}>;

export type GetPoolJoinExitsQuery = {
  __typename: 'Query';
  joinExits: Array<{
    __typename: 'GqlPoolJoinExit';
    id: string;
    timestamp: number;
    tx: string;
    type: GqlPoolJoinExitType;
    poolId: string;
    valueUSD?: string | null;
    amounts: Array<{ __typename: 'GqlPoolJoinExitAmount'; address: string; amount: string }>;
  }>;
};

export type GetPoolBptPriceChartDataQueryVariables = Exact<{
  address: Scalars['String'];
  range: GqlTokenChartDataRange;
}>;

export type GetPoolBptPriceChartDataQuery = {
  __typename: 'Query';
  prices: Array<{
    __typename: 'GqlTokenPriceChartDataItem';
    id: string;
    price: string;
    timestamp: number;
  }>;
};

export type GetPoolUserJoinExitsQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  poolId: Scalars['String'];
}>;

export type GetPoolUserJoinExitsQuery = {
  __typename: 'Query';
  joinExits: Array<{
    __typename: 'GqlPoolJoinExit';
    id: string;
    timestamp: number;
    tx: string;
    type: GqlPoolJoinExitType;
    poolId: string;
    valueUSD?: string | null;
    amounts: Array<{ __typename: 'GqlPoolJoinExitAmount'; address: string; amount: string }>;
  }>;
};

export type GetUserSwapsQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  poolId: Scalars['String'];
}>;

export type GetUserSwapsQuery = {
  __typename: 'Query';
  swaps: Array<{
    __typename: 'GqlPoolSwap';
    id: string;
    poolId: string;
    timestamp: number;
    tokenAmountIn: string;
    tokenAmountOut: string;
    tokenIn: string;
    tokenOut: string;
    tx: string;
    valueUSD: number;
  }>;
};

export type GetPoolSnapshotsQueryVariables = Exact<{
  poolId: Scalars['String'];
  range: GqlPoolSnapshotDataRange;
}>;

export type GetPoolSnapshotsQuery = {
  __typename: 'Query';
  snapshots: Array<{
    __typename: 'GqlPoolSnapshot';
    id: string;
    timestamp: number;
    totalLiquidity: string;
    volume24h: string;
    fees24h: string;
    sharePrice: string;
  }>;
};

export type GetPoolTokensDynamicDataQueryVariables = Exact<{
  addresses: Array<Scalars['String']> | Scalars['String'];
}>;

export type GetPoolTokensDynamicDataQuery = {
  __typename: 'Query';
  staticData: Array<{
    __typename: 'GqlTokenData';
    id: string;
    tokenAddress: string;
    description?: string | null;
    discordUrl?: string | null;
    telegramUrl?: string | null;
    twitterUsername?: string | null;
    websiteUrl?: string | null;
  }>;
  dynamicData: Array<{
    __typename: 'GqlTokenDynamicData';
    id: string;
    tokenAddress: string;
    ath: number;
    atl: number;
    marketCap?: string | null;
    fdv?: string | null;
    priceChange24h: number;
    priceChangePercent24h: number;
    priceChangePercent7d?: number | null;
    priceChangePercent14d?: number | null;
    priceChangePercent30d?: number | null;
    high24h: number;
    low24h: number;
    updatedAt: string;
  }>;
};

export type GetPoolsQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<GqlPoolOrderBy>;
  orderDirection?: InputMaybe<GqlPoolOrderDirection>;
  where?: InputMaybe<GqlPoolFilter>;
  textSearch?: InputMaybe<Scalars['String']>;
}>;

export type GetPoolsQuery = {
  __typename: 'Query';
  count: number;
  poolGetPools: Array<{
    __typename: 'GqlPoolMinimal';
    id: string;
    address: string;
    name: string;
    symbol: string;
    createTime: number;
    dynamicData: {
      __typename: 'GqlPoolDynamicData';
      totalLiquidity: string;
      totalLiquidity24hAgo: string;
      totalShares: string;
      fees24h: string;
      swapFee: string;
      volume24h: string;
      apr: {
        __typename: 'GqlPoolApr';
        hasRewardApr: boolean;
        thirdPartyApr: string;
        nativeRewardApr: string;
        swapApr: string;
        total: string;
        items: Array<{
          __typename: 'GqlBalancePoolAprItem';
          id: string;
          title: string;
          apr: string;
          subItems?: Array<{
            __typename: 'GqlBalancePoolAprSubItem';
            id: string;
            title: string;
            apr: string;
          }> | null;
        }>;
      };
    };
    allTokens: Array<{
      __typename: 'GqlPoolTokenExpanded';
      id: string;
      address: string;
      isNested: boolean;
      isPhantomBpt: boolean;
      weight?: string | null;
      symbol: string;
    }>;
    staking?: {
      __typename: 'GqlPoolStaking';
      id: string;
      type: GqlPoolStakingType;
      address: string;
      gauge?: {
        __typename: 'GqlPoolStakingGauge';
        id: string;
        gaugeAddress: string;
        depositFee: number;
        withdrawFee: number;
        rewards: Array<{
          __typename: 'GqlPoolStakingGaugeReward';
          id: string;
          rewardPerSecond: string;
          tokenAddress: string;
        }>;
      } | null;
    } | null;
  }>;
};

export type GetPoolFiltersQueryVariables = Exact<{ [key: string]: never }>;

export type GetPoolFiltersQuery = {
  __typename: 'Query';
  filters: Array<{ __typename: 'GqlPoolFilterDefinition'; id: string; title: string }>;
};

export type GqlPoolMinimalFragment = {
  __typename: 'GqlPoolMinimal';
  id: string;
  address: string;
  name: string;
  symbol: string;
  createTime: number;
  dynamicData: {
    __typename: 'GqlPoolDynamicData';
    totalLiquidity: string;
    totalLiquidity24hAgo: string;
    totalShares: string;
    fees24h: string;
    swapFee: string;
    volume24h: string;
    apr: {
      __typename: 'GqlPoolApr';
      hasRewardApr: boolean;
      thirdPartyApr: string;
      nativeRewardApr: string;
      swapApr: string;
      total: string;
      items: Array<{
        __typename: 'GqlBalancePoolAprItem';
        id: string;
        title: string;
        apr: string;
        subItems?: Array<{
          __typename: 'GqlBalancePoolAprSubItem';
          id: string;
          title: string;
          apr: string;
        }> | null;
      }>;
    };
  };
  allTokens: Array<{
    __typename: 'GqlPoolTokenExpanded';
    id: string;
    address: string;
    isNested: boolean;
    isPhantomBpt: boolean;
    weight?: string | null;
    symbol: string;
  }>;
  staking?: {
    __typename: 'GqlPoolStaking';
    id: string;
    type: GqlPoolStakingType;
    address: string;
    gauge?: {
      __typename: 'GqlPoolStakingGauge';
      id: string;
      gaugeAddress: string;
      depositFee: number;
      withdrawFee: number;
      rewards: Array<{
        __typename: 'GqlPoolStakingGaugeReward';
        id: string;
        rewardPerSecond: string;
        tokenAddress: string;
      }>;
    } | null;
  } | null;
};

export type GetRewardPoolsQueryVariables = Exact<{
  user?: InputMaybe<Scalars['String']>;
}>;

export type GetRewardPoolsQuery = {
  __typename: 'Query';
  getRewardPools: Array<{
    __typename: 'RewardPool';
    address: string;
    startBlock: number;
    endBlock: number;
    blocksRemaining: string;
    daysRemaining: string;
    amountStaked: string;
    amountStakedValue: string;
    isPartnerPool: boolean;
    rewardToken: {
      __typename: 'RewardPoolRewardToken';
      address: string;
      name: string;
      symbol: string;
      rewardPerBlock: string;
      logoURI: string;
    };
    aprs: { __typename: 'RewardPoolAprs'; apr: string; daily: string };
    userInfo?: {
      __typename: 'RewardPoolUserInfo';
      poolAddress: string;
      amountDeposited: string;
      amountDepositedFull: string;
      depositValue: string;
      hasPendingRewards: boolean;
      pendingRewards: string;
      pendingRewardValue: string;
      percentageOwned: string;
    } | null;
  } | null>;
};

export type GetTokenRelativePriceChartDataQueryVariables = Exact<{
  tokenIn: Scalars['String'];
  tokenOut: Scalars['String'];
  range: GqlTokenChartDataRange;
}>;

export type GetTokenRelativePriceChartDataQuery = {
  __typename: 'Query';
  prices: Array<{
    __typename: 'GqlTokenPriceChartDataItem';
    id: string;
    price: string;
    timestamp: number;
  }>;
};

export type GetSorSwapsQueryVariables = Exact<{
  tokenIn: Scalars['String'];
  tokenOut: Scalars['String'];
  swapType: GqlSorSwapType;
  swapAmount: Scalars['BigDecimal'];
  swapOptions: GqlSorSwapOptionsInput;
}>;

export type GetSorSwapsQuery = {
  __typename: 'Query';
  swaps: {
    __typename: 'GqlSorGetSwapsResponse';
    tokenIn: string;
    tokenOut: string;
    swapAmount: string;
    tokenAddresses: Array<string>;
    swapType: GqlSorSwapType;
    marketSp: string;
    returnAmount: string;
    returnAmountScaled: string;
    returnAmountFromSwaps?: string | null;
    returnAmountConsideringFees: string;
    swapAmountScaled: string;
    swapAmountForSwaps?: string | null;
    tokenInAmount: string;
    tokenOutAmount: string;
    effectivePrice: string;
    effectivePriceReversed: string;
    priceImpact: string;
    isV1Trade: boolean;
    swaps: Array<{
      __typename: 'GqlSorSwap';
      poolId: string;
      amount: string;
      userData: string;
      assetInIndex: number;
      assetOutIndex: number;
    }>;
    routes: Array<{
      __typename: 'GqlSorSwapRoute';
      tokenIn: string;
      tokenOut: string;
      tokenInAmount: string;
      tokenOutAmount: string;
      share: number;
      hops: Array<{
        __typename: 'GqlSorSwapRouteHop';
        poolId: string;
        tokenIn: string;
        tokenOut: string;
        tokenInAmount: string;
        tokenOutAmount: string;
        pool: {
          __typename: 'GqlPoolMinimal';
          id: string;
          name: string;
          type: GqlPoolMinimalType;
          symbol: string;
          dynamicData: { __typename: 'GqlPoolDynamicData'; totalLiquidity: string };
          allTokens: Array<{
            __typename: 'GqlPoolTokenExpanded';
            address: string;
            isNested: boolean;
            isPhantomBpt: boolean;
            weight?: string | null;
          }>;
        };
      }>;
    }>;
  };
};

export type GqlSorGetSwapsResponseFragment = {
  __typename: 'GqlSorGetSwapsResponse';
  tokenIn: string;
  tokenOut: string;
  swapAmount: string;
  tokenAddresses: Array<string>;
  swapType: GqlSorSwapType;
  marketSp: string;
  returnAmount: string;
  returnAmountScaled: string;
  returnAmountFromSwaps?: string | null;
  returnAmountConsideringFees: string;
  swapAmountScaled: string;
  swapAmountForSwaps?: string | null;
  tokenInAmount: string;
  tokenOutAmount: string;
  effectivePrice: string;
  effectivePriceReversed: string;
  priceImpact: string;
  isV1Trade: boolean;
  swaps: Array<{
    __typename: 'GqlSorSwap';
    poolId: string;
    amount: string;
    userData: string;
    assetInIndex: number;
    assetOutIndex: number;
  }>;
  routes: Array<{
    __typename: 'GqlSorSwapRoute';
    tokenIn: string;
    tokenOut: string;
    tokenInAmount: string;
    tokenOutAmount: string;
    share: number;
    hops: Array<{
      __typename: 'GqlSorSwapRouteHop';
      poolId: string;
      tokenIn: string;
      tokenOut: string;
      tokenInAmount: string;
      tokenOutAmount: string;
      pool: {
        __typename: 'GqlPoolMinimal';
        id: string;
        name: string;
        type: GqlPoolMinimalType;
        symbol: string;
        dynamicData: { __typename: 'GqlPoolDynamicData'; totalLiquidity: string };
        allTokens: Array<{
          __typename: 'GqlPoolTokenExpanded';
          address: string;
          isNested: boolean;
          isPhantomBpt: boolean;
          weight?: string | null;
        }>;
      };
    }>;
  }>;
};

export type GqlSorSwapRouteFragment = {
  __typename: 'GqlSorSwapRoute';
  tokenIn: string;
  tokenOut: string;
  tokenInAmount: string;
  tokenOutAmount: string;
  share: number;
  hops: Array<{
    __typename: 'GqlSorSwapRouteHop';
    poolId: string;
    tokenIn: string;
    tokenOut: string;
    tokenInAmount: string;
    tokenOutAmount: string;
    pool: {
      __typename: 'GqlPoolMinimal';
      id: string;
      name: string;
      type: GqlPoolMinimalType;
      symbol: string;
      dynamicData: { __typename: 'GqlPoolDynamicData'; totalLiquidity: string };
      allTokens: Array<{
        __typename: 'GqlPoolTokenExpanded';
        address: string;
        isNested: boolean;
        isPhantomBpt: boolean;
        weight?: string | null;
      }>;
    };
  }>;
};

export type GqlSorSwapRouteHopFragment = {
  __typename: 'GqlSorSwapRouteHop';
  poolId: string;
  tokenIn: string;
  tokenOut: string;
  tokenInAmount: string;
  tokenOutAmount: string;
  pool: {
    __typename: 'GqlPoolMinimal';
    id: string;
    name: string;
    type: GqlPoolMinimalType;
    symbol: string;
    dynamicData: { __typename: 'GqlPoolDynamicData'; totalLiquidity: string };
    allTokens: Array<{
      __typename: 'GqlPoolTokenExpanded';
      address: string;
      isNested: boolean;
      isPhantomBpt: boolean;
      weight?: string | null;
    }>;
  };
};

export type GetTradeSelectedTokenDataQueryVariables = Exact<{
  tokenIn: Scalars['String'];
  tokenOut: Scalars['String'];
}>;

export type GetTradeSelectedTokenDataQuery = {
  __typename: 'Query';
  tokenInData?: {
    __typename: 'GqlTokenData';
    id: string;
    tokenAddress: string;
    description?: string | null;
    discordUrl?: string | null;
    telegramUrl?: string | null;
    twitterUsername?: string | null;
  } | null;
  tokenOutData?: {
    __typename: 'GqlTokenData';
    id: string;
    tokenAddress: string;
    description?: string | null;
    discordUrl?: string | null;
    telegramUrl?: string | null;
    twitterUsername?: string | null;
  } | null;
  tokenInDynamicData?: {
    __typename: 'GqlTokenDynamicData';
    id: string;
    tokenAddress: string;
    ath: number;
    atl: number;
    marketCap?: string | null;
    fdv?: string | null;
    priceChange24h: number;
    priceChangePercent24h: number;
    priceChangePercent7d?: number | null;
    priceChangePercent14d?: number | null;
    priceChangePercent30d?: number | null;
    high24h: number;
    low24h: number;
    updatedAt: string;
  } | null;
  tokenOutDynamicData?: {
    __typename: 'GqlTokenDynamicData';
    id: string;
    tokenAddress: string;
    ath: number;
    atl: number;
    marketCap?: string | null;
    fdv?: string | null;
    priceChange24h: number;
    priceChangePercent24h: number;
    priceChangePercent7d?: number | null;
    priceChangePercent14d?: number | null;
    priceChangePercent30d?: number | null;
    high24h: number;
    low24h: number;
    updatedAt: string;
  } | null;
};

export type GqlTokenDynamicDataFragment = {
  __typename: 'GqlTokenDynamicData';
  id: string;
  tokenAddress: string;
  ath: number;
  atl: number;
  marketCap?: string | null;
  fdv?: string | null;
  priceChange24h: number;
  priceChangePercent24h: number;
  priceChangePercent7d?: number | null;
  priceChangePercent14d?: number | null;
  priceChangePercent30d?: number | null;
  high24h: number;
  low24h: number;
  updatedAt: string;
};

export type GetLiquidityGaugesQueryVariables = Exact<{ [key: string]: never }>;

export type GetLiquidityGaugesQuery = {
  __typename: 'Query';
  getLiquidityGauges: Array<{
    __typename: 'LiquidityGauge';
    id: string;
    address: string;
    symbol: string;
    poolId: string;
    totalSupply: string;
    depositFee: number;
    withdrawFee: number;
    isKilled: boolean;
    factory?: { __typename: 'GaugeFactory'; id: string } | null;
    rewardTokens: Array<{
      __typename: 'RewardToken';
      tokenAddress: string;
      decimals: number;
      symbol: string;
      logoURI: string;
    }>;
    pool: {
      __typename: 'GaugePool';
      id: string;
      name: string;
      address: string;
      poolType: string;
      tokensList: Array<string>;
      tokens: Array<{
        __typename: 'GqlPoolToken';
        address: string;
        weight?: string | null;
        logoURI?: string | null;
        symbol: string;
      }>;
    };
  } | null>;
};

export type GetUserStakesQueryVariables = Exact<{
  user: Scalars['String'];
  poolIds: Array<Scalars['String']> | Scalars['String'];
}>;

export type GetUserStakesQuery = {
  __typename: 'Query';
  getUserGaugeStakes: Array<{ __typename: 'LiquidityGauge'; id: string } | null>;
};

export type GetUserVeLockInfoQueryVariables = Exact<{ [key: string]: never }>;

export type GetUserVeLockInfoQuery = {
  __typename: 'Query';
  userGetVeLockInfo: {
    __typename: 'GqlUserVoteEscrowInfo';
    lockedAmount: string;
    lockEndDate: string;
    totalSupply: string;
    currentBalance: string;
    epoch: string;
    hasExistingLock: boolean;
    isExpired: boolean;
    percentOwned: string;
  };
};

export const GqlPoolBatchSwapSwapFragmentDoc = gql`
  fragment GqlPoolBatchSwapSwap on GqlPoolBatchSwapSwap {
    id
    timestamp
    tokenAmountIn
    tokenAmountOut
    tokenIn
    tokenOut
    valueUSD
    pool {
      id
      name
      type
      symbol
      allTokens {
        address
        isNested
        isPhantomBpt
        weight
      }
    }
  }
`;
export const GqlPoolBatchSwapFragmentDoc = gql`
  fragment GqlPoolBatchSwap on GqlPoolBatchSwap {
    id
    timestamp
    tokenAmountIn
    tokenAmountOut
    tokenIn
    tokenOut
    tokenInPrice
    tokenOutPrice
    tx
    userAddress
    valueUSD
    swaps {
      ...GqlPoolBatchSwapSwap
    }
  }
  ${GqlPoolBatchSwapSwapFragmentDoc}
`;
export const GqlPoolCardDataFragmentDoc = gql`
  fragment GqlPoolCardData on GqlPoolMinimal {
    id
    address
    name
    dynamicData {
      totalLiquidity
      totalShares
      apr {
        hasRewardApr
        thirdPartyApr
        nativeRewardApr
        swapApr
        total
        items {
          id
          title
          apr
          subItems {
            id
            title
            apr
          }
        }
      }
    }
    allTokens {
      id
      address
      isNested
      isPhantomBpt
      weight
    }
  }
`;
export const GqlPoolFeaturedPoolGroupFragmentDoc = gql`
  fragment GqlPoolFeaturedPoolGroup on GqlPoolFeaturedPoolGroup {
    id
    icon
    title
    items {
      ... on GqlPoolMinimal {
        ...GqlPoolCardData
      }
    }
  }
  ${GqlPoolCardDataFragmentDoc}
`;
export const GqlPoolLinearFragmentDoc = gql`
  fragment GqlPoolLinear on GqlPoolLinear {
    id
    address
    name
    owner
    decimals
    factory
    symbol
    createTime
    dynamicData {
      poolId
      swapEnabled
      totalLiquidity
      totalLiquidity24hAgo
      totalShares
      totalShares24hAgo
      fees24h
      swapFee
      volume24h
      fees48h
      volume48h
      apr {
        hasRewardApr
        thirdPartyApr
        nativeRewardApr
        swapApr
        total
        items {
          id
          title
          apr
          subItems {
            id
            title
            apr
          }
        }
      }
    }
    mainIndex
    wrappedIndex
    lowerTarget
    upperTarget
    tokens {
      id
      index
      name
      symbol
      balance
      address
      priceRate
      decimals
      weight
      totalBalance
    }
  }
`;
export const GqlPoolTokenFragmentDoc = gql`
  fragment GqlPoolToken on GqlPoolToken {
    id
    index
    name
    symbol
    balance
    address
    priceRate
    decimals
    weight
    totalBalance
    logoURI
  }
`;
export const GqlPoolTokenLinearFragmentDoc = gql`
  fragment GqlPoolTokenLinear on GqlPoolTokenLinear {
    id
    index
    name
    symbol
    balance
    address
    priceRate
    decimals
    weight
    mainTokenBalance
    wrappedTokenBalance
    totalMainTokenBalance
    totalBalance
    pool {
      id
      name
      symbol
      address
      owner
      factory
      createTime
      wrappedIndex
      mainIndex
      upperTarget
      lowerTarget
      totalShares
      totalLiquidity
      bptPriceRate
      tokens {
        ... on GqlPoolToken {
          ...GqlPoolToken
        }
      }
    }
  }
  ${GqlPoolTokenFragmentDoc}
`;
export const GqlPoolTokenPhantomStableFragmentDoc = gql`
  fragment GqlPoolTokenPhantomStable on GqlPoolTokenPhantomStable {
    id
    index
    name
    symbol
    balance
    address
    weight
    priceRate
    decimals
    totalBalance
    pool {
      id
      name
      symbol
      address
      owner
      factory
      createTime
      totalShares
      totalLiquidity
      nestingType
      swapFee
      amp
      tokens {
        ... on GqlPoolToken {
          ...GqlPoolToken
        }
        ... on GqlPoolTokenLinear {
          ...GqlPoolTokenLinear
        }
      }
    }
  }
  ${GqlPoolTokenFragmentDoc}
  ${GqlPoolTokenLinearFragmentDoc}
`;
export const GqlPoolMinimalFragmentDoc = gql`
  fragment GqlPoolMinimal on GqlPoolMinimal {
    id
    address
    name
    symbol
    createTime
    dynamicData {
      totalLiquidity
      totalLiquidity24hAgo
      totalShares
      fees24h
      swapFee
      volume24h
      apr {
        hasRewardApr
        thirdPartyApr
        nativeRewardApr
        swapApr
        total
        items {
          id
          title
          apr
          subItems {
            id
            title
            apr
          }
        }
      }
    }
    allTokens {
      id
      address
      isNested
      isPhantomBpt
      weight
      symbol
    }
    staking {
      id
      type
      address
      gauge {
        id
        gaugeAddress
        depositFee
        withdrawFee
        rewards {
          id
          rewardPerSecond
          tokenAddress
        }
      }
    }
  }
`;
export const GqlSorSwapRouteHopFragmentDoc = gql`
  fragment GqlSorSwapRouteHop on GqlSorSwapRouteHop {
    poolId
    pool {
      id
      name
      type
      symbol
      dynamicData {
        totalLiquidity
      }
      allTokens {
        address
        isNested
        isPhantomBpt
        weight
      }
    }
    tokenIn
    tokenOut
    tokenInAmount
    tokenOutAmount
  }
`;
export const GqlSorSwapRouteFragmentDoc = gql`
  fragment GqlSorSwapRoute on GqlSorSwapRoute {
    tokenIn
    tokenOut
    tokenInAmount
    tokenOutAmount
    share
    hops {
      ...GqlSorSwapRouteHop
    }
  }
  ${GqlSorSwapRouteHopFragmentDoc}
`;
export const GqlSorGetSwapsResponseFragmentDoc = gql`
  fragment GqlSorGetSwapsResponse on GqlSorGetSwapsResponse {
    tokenIn
    tokenOut
    swapAmount
    tokenAddresses
    swapType
    marketSp
    swaps {
      poolId
      amount
      userData
      assetInIndex
      assetOutIndex
    }
    returnAmount
    returnAmountScaled
    returnAmountFromSwaps
    returnAmountConsideringFees
    swapAmount
    swapAmountScaled
    swapAmountForSwaps
    tokenInAmount
    tokenOutAmount
    effectivePrice
    effectivePriceReversed
    priceImpact
    routes {
      ...GqlSorSwapRoute
    }
    isV1Trade
  }
  ${GqlSorSwapRouteFragmentDoc}
`;
export const GqlTokenDynamicDataFragmentDoc = gql`
  fragment GqlTokenDynamicData on GqlTokenDynamicData {
    id
    tokenAddress
    ath
    atl
    marketCap
    fdv
    priceChange24h
    priceChangePercent24h
    priceChangePercent7d
    priceChangePercent14d
    priceChangePercent30d
    high24h
    low24h
    updatedAt
  }
`;
export const GetPoolBatchSwapsDocument = gql`
  query GetPoolBatchSwaps($first: Int, $skip: Int, $where: GqlPoolSwapFilter) {
    batchSwaps: poolGetBatchSwaps(first: $first, skip: $skip, where: $where) {
      ...GqlPoolBatchSwap
    }
  }
  ${GqlPoolBatchSwapFragmentDoc}
`;

/**
 * __useGetPoolBatchSwapsQuery__
 *
 * To run a query within a React component, call `useGetPoolBatchSwapsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPoolBatchSwapsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPoolBatchSwapsQuery({
 *   variables: {
 *      first: // value for 'first'
 *      skip: // value for 'skip'
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetPoolBatchSwapsQuery(
  baseOptions?: Apollo.QueryHookOptions<GetPoolBatchSwapsQuery, GetPoolBatchSwapsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetPoolBatchSwapsQuery, GetPoolBatchSwapsQueryVariables>(
    GetPoolBatchSwapsDocument,
    options,
  );
}
export function useGetPoolBatchSwapsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetPoolBatchSwapsQuery,
    GetPoolBatchSwapsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetPoolBatchSwapsQuery, GetPoolBatchSwapsQueryVariables>(
    GetPoolBatchSwapsDocument,
    options,
  );
}
export type GetPoolBatchSwapsQueryHookResult = ReturnType<typeof useGetPoolBatchSwapsQuery>;
export type GetPoolBatchSwapsLazyQueryHookResult = ReturnType<typeof useGetPoolBatchSwapsLazyQuery>;
export type GetPoolBatchSwapsQueryResult = Apollo.QueryResult<
  GetPoolBatchSwapsQuery,
  GetPoolBatchSwapsQueryVariables
>;
export const GetAppGlobalDataDocument = gql`
  query GetAppGlobalData {
    tokenGetTokens {
      address
      name
      symbol
      decimals
      chainId
      logoURI
      priority
      tradable
    }
    tokenGetCurrentPrices {
      price
      address
    }
  }
`;

/**
 * __useGetAppGlobalDataQuery__
 *
 * To run a query within a React component, call `useGetAppGlobalDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAppGlobalDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAppGlobalDataQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAppGlobalDataQuery(
  baseOptions?: Apollo.QueryHookOptions<GetAppGlobalDataQuery, GetAppGlobalDataQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetAppGlobalDataQuery, GetAppGlobalDataQueryVariables>(
    GetAppGlobalDataDocument,
    options,
  );
}
export function useGetAppGlobalDataLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetAppGlobalDataQuery, GetAppGlobalDataQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetAppGlobalDataQuery, GetAppGlobalDataQueryVariables>(
    GetAppGlobalDataDocument,
    options,
  );
}
export type GetAppGlobalDataQueryHookResult = ReturnType<typeof useGetAppGlobalDataQuery>;
export type GetAppGlobalDataLazyQueryHookResult = ReturnType<typeof useGetAppGlobalDataLazyQuery>;
export type GetAppGlobalDataQueryResult = Apollo.QueryResult<
  GetAppGlobalDataQuery,
  GetAppGlobalDataQueryVariables
>;
export const GetAppGlobalPollingDataDocument = gql`
  query GetAppGlobalPollingData {
    tokenGetCurrentPrices {
      price
      address
    }
    protocolMetrics {
      totalLiquidity
      totalSwapVolume
      totalSwapFee
      poolCount
      swapFee24h
      swapVolume24h
    }
    blocksGetBlocksPerDay
    blocksGetAverageBlockTime
    beetsGetBeetsPrice
  }
`;

/**
 * __useGetAppGlobalPollingDataQuery__
 *
 * To run a query within a React component, call `useGetAppGlobalPollingDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAppGlobalPollingDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAppGlobalPollingDataQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAppGlobalPollingDataQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetAppGlobalPollingDataQuery,
    GetAppGlobalPollingDataQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetAppGlobalPollingDataQuery, GetAppGlobalPollingDataQueryVariables>(
    GetAppGlobalPollingDataDocument,
    options,
  );
}
export function useGetAppGlobalPollingDataLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetAppGlobalPollingDataQuery,
    GetAppGlobalPollingDataQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetAppGlobalPollingDataQuery, GetAppGlobalPollingDataQueryVariables>(
    GetAppGlobalPollingDataDocument,
    options,
  );
}
export type GetAppGlobalPollingDataQueryHookResult = ReturnType<
  typeof useGetAppGlobalPollingDataQuery
>;
export type GetAppGlobalPollingDataLazyQueryHookResult = ReturnType<
  typeof useGetAppGlobalPollingDataLazyQuery
>;
export type GetAppGlobalPollingDataQueryResult = Apollo.QueryResult<
  GetAppGlobalPollingDataQuery,
  GetAppGlobalPollingDataQueryVariables
>;
export const GetTokensDocument = gql`
  query GetTokens {
    tokens: tokenGetTokens {
      address
      name
      symbol
      decimals
      chainId
      logoURI
      priority
      tradable
    }
  }
`;

/**
 * __useGetTokensQuery__
 *
 * To run a query within a React component, call `useGetTokensQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTokensQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTokensQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetTokensQuery(
  baseOptions?: Apollo.QueryHookOptions<GetTokensQuery, GetTokensQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetTokensQuery, GetTokensQueryVariables>(GetTokensDocument, options);
}
export function useGetTokensLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetTokensQuery, GetTokensQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetTokensQuery, GetTokensQueryVariables>(GetTokensDocument, options);
}
export type GetTokensQueryHookResult = ReturnType<typeof useGetTokensQuery>;
export type GetTokensLazyQueryHookResult = ReturnType<typeof useGetTokensLazyQuery>;
export type GetTokensQueryResult = Apollo.QueryResult<GetTokensQuery, GetTokensQueryVariables>;
export const GetTokenPricesDocument = gql`
  query GetTokenPrices {
    tokenPrices: tokenGetCurrentPrices {
      price
      address
    }
  }
`;

/**
 * __useGetTokenPricesQuery__
 *
 * To run a query within a React component, call `useGetTokenPricesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTokenPricesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTokenPricesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetTokenPricesQuery(
  baseOptions?: Apollo.QueryHookOptions<GetTokenPricesQuery, GetTokenPricesQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetTokenPricesQuery, GetTokenPricesQueryVariables>(
    GetTokenPricesDocument,
    options,
  );
}
export function useGetTokenPricesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetTokenPricesQuery, GetTokenPricesQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetTokenPricesQuery, GetTokenPricesQueryVariables>(
    GetTokenPricesDocument,
    options,
  );
}
export type GetTokenPricesQueryHookResult = ReturnType<typeof useGetTokenPricesQuery>;
export type GetTokenPricesLazyQueryHookResult = ReturnType<typeof useGetTokenPricesLazyQuery>;
export type GetTokenPricesQueryResult = Apollo.QueryResult<
  GetTokenPricesQuery,
  GetTokenPricesQueryVariables
>;
export const GetTokensDynamicDataDocument = gql`
  query GetTokensDynamicData($addresses: [String!]!) {
    dynamicData: tokenGetTokensDynamicData(addresses: $addresses) {
      ath
      atl
      fdv
      high24h
      id
      low24h
      marketCap
      price
      priceChange24h
      priceChangePercent7d
      priceChangePercent14d
      priceChangePercent24h
      priceChangePercent30d
      tokenAddress
      updatedAt
    }
  }
`;

/**
 * __useGetTokensDynamicDataQuery__
 *
 * To run a query within a React component, call `useGetTokensDynamicDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTokensDynamicDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTokensDynamicDataQuery({
 *   variables: {
 *      addresses: // value for 'addresses'
 *   },
 * });
 */
export function useGetTokensDynamicDataQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetTokensDynamicDataQuery,
    GetTokensDynamicDataQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetTokensDynamicDataQuery, GetTokensDynamicDataQueryVariables>(
    GetTokensDynamicDataDocument,
    options,
  );
}
export function useGetTokensDynamicDataLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetTokensDynamicDataQuery,
    GetTokensDynamicDataQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetTokensDynamicDataQuery, GetTokensDynamicDataQueryVariables>(
    GetTokensDynamicDataDocument,
    options,
  );
}
export type GetTokensDynamicDataQueryHookResult = ReturnType<typeof useGetTokensDynamicDataQuery>;
export type GetTokensDynamicDataLazyQueryHookResult = ReturnType<
  typeof useGetTokensDynamicDataLazyQuery
>;
export type GetTokensDynamicDataQueryResult = Apollo.QueryResult<
  GetTokensDynamicDataQuery,
  GetTokensDynamicDataQueryVariables
>;
export const GetProtocolDataDocument = gql`
  query GetProtocolData {
    protocolData: protocolMetrics {
      totalLiquidity
      totalSwapVolume
      totalSwapFee
      poolCount
      swapFee24h
      swapVolume24h
    }
    beetsPrice: beetsGetBeetsPrice
  }
`;

/**
 * __useGetProtocolDataQuery__
 *
 * To run a query within a React component, call `useGetProtocolDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProtocolDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProtocolDataQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetProtocolDataQuery(
  baseOptions?: Apollo.QueryHookOptions<GetProtocolDataQuery, GetProtocolDataQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetProtocolDataQuery, GetProtocolDataQueryVariables>(
    GetProtocolDataDocument,
    options,
  );
}
export function useGetProtocolDataLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetProtocolDataQuery, GetProtocolDataQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetProtocolDataQuery, GetProtocolDataQueryVariables>(
    GetProtocolDataDocument,
    options,
  );
}
export type GetProtocolDataQueryHookResult = ReturnType<typeof useGetProtocolDataQuery>;
export type GetProtocolDataLazyQueryHookResult = ReturnType<typeof useGetProtocolDataLazyQuery>;
export type GetProtocolDataQueryResult = Apollo.QueryResult<
  GetProtocolDataQuery,
  GetProtocolDataQueryVariables
>;
export const GetBlocksPerDayDocument = gql`
  query GetBlocksPerDay {
    blocksPerDay: blocksGetBlocksPerDay
    avgBlockTime: blocksGetAverageBlockTime
  }
`;

/**
 * __useGetBlocksPerDayQuery__
 *
 * To run a query within a React component, call `useGetBlocksPerDayQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBlocksPerDayQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBlocksPerDayQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetBlocksPerDayQuery(
  baseOptions?: Apollo.QueryHookOptions<GetBlocksPerDayQuery, GetBlocksPerDayQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetBlocksPerDayQuery, GetBlocksPerDayQueryVariables>(
    GetBlocksPerDayDocument,
    options,
  );
}
export function useGetBlocksPerDayLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetBlocksPerDayQuery, GetBlocksPerDayQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetBlocksPerDayQuery, GetBlocksPerDayQueryVariables>(
    GetBlocksPerDayDocument,
    options,
  );
}
export type GetBlocksPerDayQueryHookResult = ReturnType<typeof useGetBlocksPerDayQuery>;
export type GetBlocksPerDayLazyQueryHookResult = ReturnType<typeof useGetBlocksPerDayLazyQuery>;
export type GetBlocksPerDayQueryResult = Apollo.QueryResult<
  GetBlocksPerDayQuery,
  GetBlocksPerDayQueryVariables
>;
export const GetBeetsPriceDocument = gql`
  query GetBeetsPrice {
    beetsPrice: beetsGetBeetsPrice
  }
`;

/**
 * __useGetBeetsPriceQuery__
 *
 * To run a query within a React component, call `useGetBeetsPriceQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBeetsPriceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBeetsPriceQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetBeetsPriceQuery(
  baseOptions?: Apollo.QueryHookOptions<GetBeetsPriceQuery, GetBeetsPriceQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetBeetsPriceQuery, GetBeetsPriceQueryVariables>(
    GetBeetsPriceDocument,
    options,
  );
}
export function useGetBeetsPriceLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetBeetsPriceQuery, GetBeetsPriceQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetBeetsPriceQuery, GetBeetsPriceQueryVariables>(
    GetBeetsPriceDocument,
    options,
  );
}
export type GetBeetsPriceQueryHookResult = ReturnType<typeof useGetBeetsPriceQuery>;
export type GetBeetsPriceLazyQueryHookResult = ReturnType<typeof useGetBeetsPriceLazyQuery>;
export type GetBeetsPriceQueryResult = Apollo.QueryResult<
  GetBeetsPriceQuery,
  GetBeetsPriceQueryVariables
>;
export const GetUserDataDocument = gql`
  query GetUserData {
    balances: userGetPoolBalances {
      poolId
      tokenAddress
      tokenPrice
      totalBalance
      stakedBalance
      walletBalance
    }
    staking: userGetStaking {
      id
      type
      address
      gauge {
        id
        gaugeAddress
        depositFee
        withdrawFee
        rewards {
          id
          rewardPerSecond
          tokenAddress
        }
      }
    }
    boosts: userGetGaugeBoosts {
      poolId
      gaugeAddress
      boost
    }
  }
`;

/**
 * __useGetUserDataQuery__
 *
 * To run a query within a React component, call `useGetUserDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserDataQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserDataQuery(
  baseOptions?: Apollo.QueryHookOptions<GetUserDataQuery, GetUserDataQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetUserDataQuery, GetUserDataQueryVariables>(GetUserDataDocument, options);
}
export function useGetUserDataLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetUserDataQuery, GetUserDataQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetUserDataQuery, GetUserDataQueryVariables>(
    GetUserDataDocument,
    options,
  );
}
export type GetUserDataQueryHookResult = ReturnType<typeof useGetUserDataQuery>;
export type GetUserDataLazyQueryHookResult = ReturnType<typeof useGetUserDataLazyQuery>;
export type GetUserDataQueryResult = Apollo.QueryResult<
  GetUserDataQuery,
  GetUserDataQueryVariables
>;
export const UserSyncBalanceDocument = gql`
  mutation UserSyncBalance($poolId: String!) {
    userSyncBalance(poolId: $poolId)
  }
`;
export type UserSyncBalanceMutationFn = Apollo.MutationFunction<
  UserSyncBalanceMutation,
  UserSyncBalanceMutationVariables
>;

/**
 * __useUserSyncBalanceMutation__
 *
 * To run a mutation, you first call `useUserSyncBalanceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUserSyncBalanceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [userSyncBalanceMutation, { data, loading, error }] = useUserSyncBalanceMutation({
 *   variables: {
 *      poolId: // value for 'poolId'
 *   },
 * });
 */
export function useUserSyncBalanceMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UserSyncBalanceMutation,
    UserSyncBalanceMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UserSyncBalanceMutation, UserSyncBalanceMutationVariables>(
    UserSyncBalanceDocument,
    options,
  );
}
export type UserSyncBalanceMutationHookResult = ReturnType<typeof useUserSyncBalanceMutation>;
export type UserSyncBalanceMutationResult = Apollo.MutationResult<UserSyncBalanceMutation>;
export type UserSyncBalanceMutationOptions = Apollo.BaseMutationOptions<
  UserSyncBalanceMutation,
  UserSyncBalanceMutationVariables
>;
export const GetHomeDataDocument = gql`
  query GetHomeData {
    poolGetFeaturedPoolGroups {
      ...GqlPoolFeaturedPoolGroup
    }
    contentGetNewsItems {
      id
      text
      image
      url
      source
      timestamp
      discussionUrl
    }
  }
  ${GqlPoolFeaturedPoolGroupFragmentDoc}
`;

/**
 * __useGetHomeDataQuery__
 *
 * To run a query within a React component, call `useGetHomeDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetHomeDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetHomeDataQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetHomeDataQuery(
  baseOptions?: Apollo.QueryHookOptions<GetHomeDataQuery, GetHomeDataQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetHomeDataQuery, GetHomeDataQueryVariables>(GetHomeDataDocument, options);
}
export function useGetHomeDataLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetHomeDataQuery, GetHomeDataQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetHomeDataQuery, GetHomeDataQueryVariables>(
    GetHomeDataDocument,
    options,
  );
}
export type GetHomeDataQueryHookResult = ReturnType<typeof useGetHomeDataQuery>;
export type GetHomeDataLazyQueryHookResult = ReturnType<typeof useGetHomeDataLazyQuery>;
export type GetHomeDataQueryResult = Apollo.QueryResult<
  GetHomeDataQuery,
  GetHomeDataQueryVariables
>;
export const GetHomeFeaturedPoolsDocument = gql`
  query GetHomeFeaturedPools {
    featuredPoolGroups: poolGetFeaturedPoolGroups {
      ...GqlPoolFeaturedPoolGroup
    }
  }
  ${GqlPoolFeaturedPoolGroupFragmentDoc}
`;

/**
 * __useGetHomeFeaturedPoolsQuery__
 *
 * To run a query within a React component, call `useGetHomeFeaturedPoolsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetHomeFeaturedPoolsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetHomeFeaturedPoolsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetHomeFeaturedPoolsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetHomeFeaturedPoolsQuery,
    GetHomeFeaturedPoolsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetHomeFeaturedPoolsQuery, GetHomeFeaturedPoolsQueryVariables>(
    GetHomeFeaturedPoolsDocument,
    options,
  );
}
export function useGetHomeFeaturedPoolsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetHomeFeaturedPoolsQuery,
    GetHomeFeaturedPoolsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetHomeFeaturedPoolsQuery, GetHomeFeaturedPoolsQueryVariables>(
    GetHomeFeaturedPoolsDocument,
    options,
  );
}
export type GetHomeFeaturedPoolsQueryHookResult = ReturnType<typeof useGetHomeFeaturedPoolsQuery>;
export type GetHomeFeaturedPoolsLazyQueryHookResult = ReturnType<
  typeof useGetHomeFeaturedPoolsLazyQuery
>;
export type GetHomeFeaturedPoolsQueryResult = Apollo.QueryResult<
  GetHomeFeaturedPoolsQuery,
  GetHomeFeaturedPoolsQueryVariables
>;
export const GetHomeNewsItemsDocument = gql`
  query GetHomeNewsItems {
    newsItems: contentGetNewsItems {
      id
      text
      image
      url
      source
      timestamp
      discussionUrl
    }
  }
`;

/**
 * __useGetHomeNewsItemsQuery__
 *
 * To run a query within a React component, call `useGetHomeNewsItemsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetHomeNewsItemsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetHomeNewsItemsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetHomeNewsItemsQuery(
  baseOptions?: Apollo.QueryHookOptions<GetHomeNewsItemsQuery, GetHomeNewsItemsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetHomeNewsItemsQuery, GetHomeNewsItemsQueryVariables>(
    GetHomeNewsItemsDocument,
    options,
  );
}
export function useGetHomeNewsItemsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetHomeNewsItemsQuery, GetHomeNewsItemsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetHomeNewsItemsQuery, GetHomeNewsItemsQueryVariables>(
    GetHomeNewsItemsDocument,
    options,
  );
}
export type GetHomeNewsItemsQueryHookResult = ReturnType<typeof useGetHomeNewsItemsQuery>;
export type GetHomeNewsItemsLazyQueryHookResult = ReturnType<typeof useGetHomeNewsItemsLazyQuery>;
export type GetHomeNewsItemsQueryResult = Apollo.QueryResult<
  GetHomeNewsItemsQuery,
  GetHomeNewsItemsQueryVariables
>;
export const GetLinearPoolsDocument = gql`
  query GetLinearPools {
    pools: poolGetLinearPools {
      ...GqlPoolLinear
    }
  }
  ${GqlPoolLinearFragmentDoc}
`;

/**
 * __useGetLinearPoolsQuery__
 *
 * To run a query within a React component, call `useGetLinearPoolsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLinearPoolsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLinearPoolsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetLinearPoolsQuery(
  baseOptions?: Apollo.QueryHookOptions<GetLinearPoolsQuery, GetLinearPoolsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetLinearPoolsQuery, GetLinearPoolsQueryVariables>(
    GetLinearPoolsDocument,
    options,
  );
}
export function useGetLinearPoolsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetLinearPoolsQuery, GetLinearPoolsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetLinearPoolsQuery, GetLinearPoolsQueryVariables>(
    GetLinearPoolsDocument,
    options,
  );
}
export type GetLinearPoolsQueryHookResult = ReturnType<typeof useGetLinearPoolsQuery>;
export type GetLinearPoolsLazyQueryHookResult = ReturnType<typeof useGetLinearPoolsLazyQuery>;
export type GetLinearPoolsQueryResult = Apollo.QueryResult<
  GetLinearPoolsQuery,
  GetLinearPoolsQueryVariables
>;
export const GetPoolDocument = gql`
  query GetPool($id: String!) {
    pool: poolGetPool(id: $id) {
      id
      address
      name
      owner
      decimals
      factory
      symbol
      createTime
      dynamicData {
        poolId
        swapEnabled
        totalLiquidity
        totalLiquidity24hAgo
        totalShares
        totalShares24hAgo
        fees24h
        swapFee
        volume24h
        fees48h
        volume48h
        lifetimeVolume
        lifetimeSwapFees
        holdersCount
        swapsCount
        sharePriceAth
        sharePriceAthTimestamp
        sharePriceAtl
        sharePriceAtlTimestamp
        totalLiquidityAth
        totalLiquidityAthTimestamp
        totalLiquidityAtl
        totalLiquidityAtlTimestamp
        volume24hAth
        volume24hAthTimestamp
        volume24hAtl
        volume24hAtlTimestamp
        fees24hAth
        fees24hAthTimestamp
        fees24hAtl
        fees24hAtlTimestamp
        apr {
          hasRewardApr
          thirdPartyApr
          nativeRewardApr
          swapApr
          total
          items {
            id
            title
            apr
            subItems {
              id
              title
              apr
            }
          }
        }
      }
      allTokens {
        id
        address
        name
        symbol
        decimals
        isNested
        isPhantomBpt
      }
      staking {
        id
        type
        address
        gauge {
          id
          gaugeAddress
          depositFee
          withdrawFee
          rewards {
            id
            rewardPerSecond
            tokenAddress
          }
        }
      }
      investConfig {
        singleAssetEnabled
        proportionalEnabled
        options {
          poolTokenIndex
          poolTokenAddress
          tokenOptions {
            ... on GqlPoolToken {
              ...GqlPoolToken
            }
          }
        }
      }
      withdrawConfig {
        singleAssetEnabled
        proportionalEnabled
        options {
          poolTokenIndex
          poolTokenAddress
          tokenOptions {
            ... on GqlPoolToken {
              ...GqlPoolToken
            }
          }
        }
      }
      ... on GqlPoolWeighted {
        nestingType
        tokens {
          ... on GqlPoolToken {
            ...GqlPoolToken
          }
          ... on GqlPoolTokenLinear {
            ...GqlPoolTokenLinear
          }
          ... on GqlPoolTokenPhantomStable {
            ...GqlPoolTokenPhantomStable
          }
        }
      }
      ... on GqlPoolStable {
        amp
        tokens {
          ... on GqlPoolToken {
            ...GqlPoolToken
          }
        }
      }
      ... on GqlPoolMetaStable {
        amp
        tokens {
          ... on GqlPoolToken {
            ...GqlPoolToken
          }
        }
      }
      ... on GqlPoolElement {
        unitSeconds
        principalToken
        baseToken
        tokens {
          ... on GqlPoolToken {
            ...GqlPoolToken
          }
        }
      }
      ... on GqlPoolPhantomStable {
        amp
        nestingType
        tokens {
          ... on GqlPoolToken {
            ...GqlPoolToken
          }
          ... on GqlPoolTokenLinear {
            ...GqlPoolTokenLinear
          }
          ... on GqlPoolTokenPhantomStable {
            ...GqlPoolTokenPhantomStable
          }
        }
      }
      ... on GqlPoolLinear {
        mainIndex
        wrappedIndex
        lowerTarget
        upperTarget
        tokens {
          ... on GqlPoolToken {
            ...GqlPoolToken
          }
        }
      }
      ... on GqlPoolLiquidityBootstrapping {
        name
        nestingType
        tokens {
          ... on GqlPoolToken {
            ...GqlPoolToken
          }
          ... on GqlPoolTokenLinear {
            ...GqlPoolTokenLinear
          }
          ... on GqlPoolTokenPhantomStable {
            ...GqlPoolTokenPhantomStable
          }
        }
      }
    }
  }
  ${GqlPoolTokenFragmentDoc}
  ${GqlPoolTokenLinearFragmentDoc}
  ${GqlPoolTokenPhantomStableFragmentDoc}
`;

/**
 * __useGetPoolQuery__
 *
 * To run a query within a React component, call `useGetPoolQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPoolQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPoolQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetPoolQuery(
  baseOptions: Apollo.QueryHookOptions<GetPoolQuery, GetPoolQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetPoolQuery, GetPoolQueryVariables>(GetPoolDocument, options);
}
export function useGetPoolLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetPoolQuery, GetPoolQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetPoolQuery, GetPoolQueryVariables>(GetPoolDocument, options);
}
export type GetPoolQueryHookResult = ReturnType<typeof useGetPoolQuery>;
export type GetPoolLazyQueryHookResult = ReturnType<typeof useGetPoolLazyQuery>;
export type GetPoolQueryResult = Apollo.QueryResult<GetPoolQuery, GetPoolQueryVariables>;
export const GetPoolSwapsDocument = gql`
  query GetPoolSwaps($first: Int, $skip: Int, $where: GqlPoolSwapFilter) {
    swaps: poolGetSwaps(first: $first, skip: $skip, where: $where) {
      id
      poolId
      timestamp
      tokenAmountIn
      tokenAmountOut
      tokenIn
      tokenOut
      tx
      userAddress
      valueUSD
    }
  }
`;

/**
 * __useGetPoolSwapsQuery__
 *
 * To run a query within a React component, call `useGetPoolSwapsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPoolSwapsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPoolSwapsQuery({
 *   variables: {
 *      first: // value for 'first'
 *      skip: // value for 'skip'
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetPoolSwapsQuery(
  baseOptions?: Apollo.QueryHookOptions<GetPoolSwapsQuery, GetPoolSwapsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetPoolSwapsQuery, GetPoolSwapsQueryVariables>(
    GetPoolSwapsDocument,
    options,
  );
}
export function useGetPoolSwapsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetPoolSwapsQuery, GetPoolSwapsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetPoolSwapsQuery, GetPoolSwapsQueryVariables>(
    GetPoolSwapsDocument,
    options,
  );
}
export type GetPoolSwapsQueryHookResult = ReturnType<typeof useGetPoolSwapsQuery>;
export type GetPoolSwapsLazyQueryHookResult = ReturnType<typeof useGetPoolSwapsLazyQuery>;
export type GetPoolSwapsQueryResult = Apollo.QueryResult<
  GetPoolSwapsQuery,
  GetPoolSwapsQueryVariables
>;
export const GetPoolJoinExitsDocument = gql`
  query GetPoolJoinExits($first: Int, $skip: Int, $poolId: String!) {
    joinExits: poolGetJoinExits(first: $first, skip: $skip, where: { poolIdIn: [$poolId] }) {
      id
      timestamp
      tx
      type
      poolId
      valueUSD
      amounts {
        address
        amount
      }
    }
  }
`;

/**
 * __useGetPoolJoinExitsQuery__
 *
 * To run a query within a React component, call `useGetPoolJoinExitsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPoolJoinExitsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPoolJoinExitsQuery({
 *   variables: {
 *      first: // value for 'first'
 *      skip: // value for 'skip'
 *      poolId: // value for 'poolId'
 *   },
 * });
 */
export function useGetPoolJoinExitsQuery(
  baseOptions: Apollo.QueryHookOptions<GetPoolJoinExitsQuery, GetPoolJoinExitsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetPoolJoinExitsQuery, GetPoolJoinExitsQueryVariables>(
    GetPoolJoinExitsDocument,
    options,
  );
}
export function useGetPoolJoinExitsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetPoolJoinExitsQuery, GetPoolJoinExitsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetPoolJoinExitsQuery, GetPoolJoinExitsQueryVariables>(
    GetPoolJoinExitsDocument,
    options,
  );
}
export type GetPoolJoinExitsQueryHookResult = ReturnType<typeof useGetPoolJoinExitsQuery>;
export type GetPoolJoinExitsLazyQueryHookResult = ReturnType<typeof useGetPoolJoinExitsLazyQuery>;
export type GetPoolJoinExitsQueryResult = Apollo.QueryResult<
  GetPoolJoinExitsQuery,
  GetPoolJoinExitsQueryVariables
>;
export const GetPoolBptPriceChartDataDocument = gql`
  query GetPoolBptPriceChartData($address: String!, $range: GqlTokenChartDataRange!) {
    prices: tokenGetPriceChartData(address: $address, range: $range) {
      id
      price
      timestamp
    }
  }
`;

/**
 * __useGetPoolBptPriceChartDataQuery__
 *
 * To run a query within a React component, call `useGetPoolBptPriceChartDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPoolBptPriceChartDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPoolBptPriceChartDataQuery({
 *   variables: {
 *      address: // value for 'address'
 *      range: // value for 'range'
 *   },
 * });
 */
export function useGetPoolBptPriceChartDataQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetPoolBptPriceChartDataQuery,
    GetPoolBptPriceChartDataQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetPoolBptPriceChartDataQuery, GetPoolBptPriceChartDataQueryVariables>(
    GetPoolBptPriceChartDataDocument,
    options,
  );
}
export function useGetPoolBptPriceChartDataLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetPoolBptPriceChartDataQuery,
    GetPoolBptPriceChartDataQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetPoolBptPriceChartDataQuery, GetPoolBptPriceChartDataQueryVariables>(
    GetPoolBptPriceChartDataDocument,
    options,
  );
}
export type GetPoolBptPriceChartDataQueryHookResult = ReturnType<
  typeof useGetPoolBptPriceChartDataQuery
>;
export type GetPoolBptPriceChartDataLazyQueryHookResult = ReturnType<
  typeof useGetPoolBptPriceChartDataLazyQuery
>;
export type GetPoolBptPriceChartDataQueryResult = Apollo.QueryResult<
  GetPoolBptPriceChartDataQuery,
  GetPoolBptPriceChartDataQueryVariables
>;
export const GetPoolUserJoinExitsDocument = gql`
  query GetPoolUserJoinExits($first: Int = 10, $skip: Int = 0, $poolId: String!) {
    joinExits: userGetPoolJoinExits(poolId: $poolId, first: $first, skip: $skip) {
      id
      timestamp
      tx
      type
      poolId
      valueUSD
      amounts {
        address
        amount
      }
    }
  }
`;

/**
 * __useGetPoolUserJoinExitsQuery__
 *
 * To run a query within a React component, call `useGetPoolUserJoinExitsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPoolUserJoinExitsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPoolUserJoinExitsQuery({
 *   variables: {
 *      first: // value for 'first'
 *      skip: // value for 'skip'
 *      poolId: // value for 'poolId'
 *   },
 * });
 */
export function useGetPoolUserJoinExitsQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetPoolUserJoinExitsQuery,
    GetPoolUserJoinExitsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetPoolUserJoinExitsQuery, GetPoolUserJoinExitsQueryVariables>(
    GetPoolUserJoinExitsDocument,
    options,
  );
}
export function useGetPoolUserJoinExitsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetPoolUserJoinExitsQuery,
    GetPoolUserJoinExitsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetPoolUserJoinExitsQuery, GetPoolUserJoinExitsQueryVariables>(
    GetPoolUserJoinExitsDocument,
    options,
  );
}
export type GetPoolUserJoinExitsQueryHookResult = ReturnType<typeof useGetPoolUserJoinExitsQuery>;
export type GetPoolUserJoinExitsLazyQueryHookResult = ReturnType<
  typeof useGetPoolUserJoinExitsLazyQuery
>;
export type GetPoolUserJoinExitsQueryResult = Apollo.QueryResult<
  GetPoolUserJoinExitsQuery,
  GetPoolUserJoinExitsQueryVariables
>;
export const GetUserSwapsDocument = gql`
  query GetUserSwaps($first: Int = 10, $skip: Int = 0, $poolId: String!) {
    swaps: userGetSwaps(first: $first, skip: $skip, poolId: $poolId) {
      id
      poolId
      timestamp
      tokenAmountIn
      tokenAmountOut
      tokenIn
      tokenOut
      tx
      valueUSD
    }
  }
`;

/**
 * __useGetUserSwapsQuery__
 *
 * To run a query within a React component, call `useGetUserSwapsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserSwapsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserSwapsQuery({
 *   variables: {
 *      first: // value for 'first'
 *      skip: // value for 'skip'
 *      poolId: // value for 'poolId'
 *   },
 * });
 */
export function useGetUserSwapsQuery(
  baseOptions: Apollo.QueryHookOptions<GetUserSwapsQuery, GetUserSwapsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetUserSwapsQuery, GetUserSwapsQueryVariables>(
    GetUserSwapsDocument,
    options,
  );
}
export function useGetUserSwapsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetUserSwapsQuery, GetUserSwapsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetUserSwapsQuery, GetUserSwapsQueryVariables>(
    GetUserSwapsDocument,
    options,
  );
}
export type GetUserSwapsQueryHookResult = ReturnType<typeof useGetUserSwapsQuery>;
export type GetUserSwapsLazyQueryHookResult = ReturnType<typeof useGetUserSwapsLazyQuery>;
export type GetUserSwapsQueryResult = Apollo.QueryResult<
  GetUserSwapsQuery,
  GetUserSwapsQueryVariables
>;
export const GetPoolSnapshotsDocument = gql`
  query GetPoolSnapshots($poolId: String!, $range: GqlPoolSnapshotDataRange!) {
    snapshots: poolGetSnapshots(id: $poolId, range: $range) {
      id
      timestamp
      totalLiquidity
      volume24h
      fees24h
      sharePrice
    }
  }
`;

/**
 * __useGetPoolSnapshotsQuery__
 *
 * To run a query within a React component, call `useGetPoolSnapshotsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPoolSnapshotsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPoolSnapshotsQuery({
 *   variables: {
 *      poolId: // value for 'poolId'
 *      range: // value for 'range'
 *   },
 * });
 */
export function useGetPoolSnapshotsQuery(
  baseOptions: Apollo.QueryHookOptions<GetPoolSnapshotsQuery, GetPoolSnapshotsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetPoolSnapshotsQuery, GetPoolSnapshotsQueryVariables>(
    GetPoolSnapshotsDocument,
    options,
  );
}
export function useGetPoolSnapshotsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetPoolSnapshotsQuery, GetPoolSnapshotsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetPoolSnapshotsQuery, GetPoolSnapshotsQueryVariables>(
    GetPoolSnapshotsDocument,
    options,
  );
}
export type GetPoolSnapshotsQueryHookResult = ReturnType<typeof useGetPoolSnapshotsQuery>;
export type GetPoolSnapshotsLazyQueryHookResult = ReturnType<typeof useGetPoolSnapshotsLazyQuery>;
export type GetPoolSnapshotsQueryResult = Apollo.QueryResult<
  GetPoolSnapshotsQuery,
  GetPoolSnapshotsQueryVariables
>;
export const GetPoolTokensDynamicDataDocument = gql`
  query GetPoolTokensDynamicData($addresses: [String!]!) {
    staticData: tokenGetTokensData(addresses: $addresses) {
      id
      tokenAddress
      description
      discordUrl
      telegramUrl
      twitterUsername
      websiteUrl
    }
    dynamicData: tokenGetTokensDynamicData(addresses: $addresses) {
      ...GqlTokenDynamicData
    }
  }
  ${GqlTokenDynamicDataFragmentDoc}
`;

/**
 * __useGetPoolTokensDynamicDataQuery__
 *
 * To run a query within a React component, call `useGetPoolTokensDynamicDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPoolTokensDynamicDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPoolTokensDynamicDataQuery({
 *   variables: {
 *      addresses: // value for 'addresses'
 *   },
 * });
 */
export function useGetPoolTokensDynamicDataQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetPoolTokensDynamicDataQuery,
    GetPoolTokensDynamicDataQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetPoolTokensDynamicDataQuery, GetPoolTokensDynamicDataQueryVariables>(
    GetPoolTokensDynamicDataDocument,
    options,
  );
}
export function useGetPoolTokensDynamicDataLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetPoolTokensDynamicDataQuery,
    GetPoolTokensDynamicDataQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetPoolTokensDynamicDataQuery, GetPoolTokensDynamicDataQueryVariables>(
    GetPoolTokensDynamicDataDocument,
    options,
  );
}
export type GetPoolTokensDynamicDataQueryHookResult = ReturnType<
  typeof useGetPoolTokensDynamicDataQuery
>;
export type GetPoolTokensDynamicDataLazyQueryHookResult = ReturnType<
  typeof useGetPoolTokensDynamicDataLazyQuery
>;
export type GetPoolTokensDynamicDataQueryResult = Apollo.QueryResult<
  GetPoolTokensDynamicDataQuery,
  GetPoolTokensDynamicDataQueryVariables
>;
export const GetPoolsDocument = gql`
  query GetPools(
    $first: Int
    $skip: Int
    $orderBy: GqlPoolOrderBy
    $orderDirection: GqlPoolOrderDirection
    $where: GqlPoolFilter
    $textSearch: String
  ) {
    poolGetPools(
      first: $first
      skip: $skip
      orderBy: $orderBy
      orderDirection: $orderDirection
      where: $where
      textSearch: $textSearch
    ) {
      ...GqlPoolMinimal
    }
    count: poolGetPoolsCount(
      first: $first
      skip: $skip
      orderBy: $orderBy
      orderDirection: $orderDirection
      where: $where
      textSearch: $textSearch
    )
  }
  ${GqlPoolMinimalFragmentDoc}
`;

/**
 * __useGetPoolsQuery__
 *
 * To run a query within a React component, call `useGetPoolsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPoolsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPoolsQuery({
 *   variables: {
 *      first: // value for 'first'
 *      skip: // value for 'skip'
 *      orderBy: // value for 'orderBy'
 *      orderDirection: // value for 'orderDirection'
 *      where: // value for 'where'
 *      textSearch: // value for 'textSearch'
 *   },
 * });
 */
export function useGetPoolsQuery(
  baseOptions?: Apollo.QueryHookOptions<GetPoolsQuery, GetPoolsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetPoolsQuery, GetPoolsQueryVariables>(GetPoolsDocument, options);
}
export function useGetPoolsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetPoolsQuery, GetPoolsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetPoolsQuery, GetPoolsQueryVariables>(GetPoolsDocument, options);
}
export type GetPoolsQueryHookResult = ReturnType<typeof useGetPoolsQuery>;
export type GetPoolsLazyQueryHookResult = ReturnType<typeof useGetPoolsLazyQuery>;
export type GetPoolsQueryResult = Apollo.QueryResult<GetPoolsQuery, GetPoolsQueryVariables>;
export const GetPoolFiltersDocument = gql`
  query GetPoolFilters {
    filters: poolGetPoolFilters {
      id
      title
    }
  }
`;

/**
 * __useGetPoolFiltersQuery__
 *
 * To run a query within a React component, call `useGetPoolFiltersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPoolFiltersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPoolFiltersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPoolFiltersQuery(
  baseOptions?: Apollo.QueryHookOptions<GetPoolFiltersQuery, GetPoolFiltersQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetPoolFiltersQuery, GetPoolFiltersQueryVariables>(
    GetPoolFiltersDocument,
    options,
  );
}
export function useGetPoolFiltersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetPoolFiltersQuery, GetPoolFiltersQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetPoolFiltersQuery, GetPoolFiltersQueryVariables>(
    GetPoolFiltersDocument,
    options,
  );
}
export type GetPoolFiltersQueryHookResult = ReturnType<typeof useGetPoolFiltersQuery>;
export type GetPoolFiltersLazyQueryHookResult = ReturnType<typeof useGetPoolFiltersLazyQuery>;
export type GetPoolFiltersQueryResult = Apollo.QueryResult<
  GetPoolFiltersQuery,
  GetPoolFiltersQueryVariables
>;
export const GetRewardPoolsDocument = gql`
  query GetRewardPools($user: String) {
    getRewardPools(user: $user) {
      address
      startBlock
      endBlock
      blocksRemaining
      daysRemaining
      amountStaked
      amountStakedValue
      isPartnerPool
      rewardToken {
        address
        name
        symbol
        rewardPerBlock
        logoURI
      }
      aprs {
        apr
        daily
      }
      userInfo {
        poolAddress
        amountDeposited
        amountDepositedFull
        depositValue
        hasPendingRewards
        pendingRewards
        pendingRewardValue
        percentageOwned
      }
    }
  }
`;

/**
 * __useGetRewardPoolsQuery__
 *
 * To run a query within a React component, call `useGetRewardPoolsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRewardPoolsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRewardPoolsQuery({
 *   variables: {
 *      user: // value for 'user'
 *   },
 * });
 */
export function useGetRewardPoolsQuery(
  baseOptions?: Apollo.QueryHookOptions<GetRewardPoolsQuery, GetRewardPoolsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetRewardPoolsQuery, GetRewardPoolsQueryVariables>(
    GetRewardPoolsDocument,
    options,
  );
}
export function useGetRewardPoolsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetRewardPoolsQuery, GetRewardPoolsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetRewardPoolsQuery, GetRewardPoolsQueryVariables>(
    GetRewardPoolsDocument,
    options,
  );
}
export type GetRewardPoolsQueryHookResult = ReturnType<typeof useGetRewardPoolsQuery>;
export type GetRewardPoolsLazyQueryHookResult = ReturnType<typeof useGetRewardPoolsLazyQuery>;
export type GetRewardPoolsQueryResult = Apollo.QueryResult<
  GetRewardPoolsQuery,
  GetRewardPoolsQueryVariables
>;
export const GetTokenRelativePriceChartDataDocument = gql`
  query GetTokenRelativePriceChartData(
    $tokenIn: String!
    $tokenOut: String!
    $range: GqlTokenChartDataRange!
  ) {
    prices: tokenGetRelativePriceChartData(tokenIn: $tokenIn, tokenOut: $tokenOut, range: $range) {
      id
      price
      timestamp
    }
  }
`;

/**
 * __useGetTokenRelativePriceChartDataQuery__
 *
 * To run a query within a React component, call `useGetTokenRelativePriceChartDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTokenRelativePriceChartDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTokenRelativePriceChartDataQuery({
 *   variables: {
 *      tokenIn: // value for 'tokenIn'
 *      tokenOut: // value for 'tokenOut'
 *      range: // value for 'range'
 *   },
 * });
 */
export function useGetTokenRelativePriceChartDataQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetTokenRelativePriceChartDataQuery,
    GetTokenRelativePriceChartDataQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetTokenRelativePriceChartDataQuery,
    GetTokenRelativePriceChartDataQueryVariables
  >(GetTokenRelativePriceChartDataDocument, options);
}
export function useGetTokenRelativePriceChartDataLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetTokenRelativePriceChartDataQuery,
    GetTokenRelativePriceChartDataQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetTokenRelativePriceChartDataQuery,
    GetTokenRelativePriceChartDataQueryVariables
  >(GetTokenRelativePriceChartDataDocument, options);
}
export type GetTokenRelativePriceChartDataQueryHookResult = ReturnType<
  typeof useGetTokenRelativePriceChartDataQuery
>;
export type GetTokenRelativePriceChartDataLazyQueryHookResult = ReturnType<
  typeof useGetTokenRelativePriceChartDataLazyQuery
>;
export type GetTokenRelativePriceChartDataQueryResult = Apollo.QueryResult<
  GetTokenRelativePriceChartDataQuery,
  GetTokenRelativePriceChartDataQueryVariables
>;
export const GetSorSwapsDocument = gql`
  query GetSorSwaps(
    $tokenIn: String!
    $tokenOut: String!
    $swapType: GqlSorSwapType!
    $swapAmount: BigDecimal!
    $swapOptions: GqlSorSwapOptionsInput!
  ) {
    swaps: sorGetSwaps(
      tokenIn: $tokenIn
      tokenOut: $tokenOut
      swapType: $swapType
      swapAmount: $swapAmount
      swapOptions: $swapOptions
    ) {
      ...GqlSorGetSwapsResponse
    }
  }
  ${GqlSorGetSwapsResponseFragmentDoc}
`;

/**
 * __useGetSorSwapsQuery__
 *
 * To run a query within a React component, call `useGetSorSwapsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSorSwapsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSorSwapsQuery({
 *   variables: {
 *      tokenIn: // value for 'tokenIn'
 *      tokenOut: // value for 'tokenOut'
 *      swapType: // value for 'swapType'
 *      swapAmount: // value for 'swapAmount'
 *      swapOptions: // value for 'swapOptions'
 *   },
 * });
 */
export function useGetSorSwapsQuery(
  baseOptions: Apollo.QueryHookOptions<GetSorSwapsQuery, GetSorSwapsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetSorSwapsQuery, GetSorSwapsQueryVariables>(GetSorSwapsDocument, options);
}
export function useGetSorSwapsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetSorSwapsQuery, GetSorSwapsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetSorSwapsQuery, GetSorSwapsQueryVariables>(
    GetSorSwapsDocument,
    options,
  );
}
export type GetSorSwapsQueryHookResult = ReturnType<typeof useGetSorSwapsQuery>;
export type GetSorSwapsLazyQueryHookResult = ReturnType<typeof useGetSorSwapsLazyQuery>;
export type GetSorSwapsQueryResult = Apollo.QueryResult<
  GetSorSwapsQuery,
  GetSorSwapsQueryVariables
>;
export const GetTradeSelectedTokenDataDocument = gql`
  query GetTradeSelectedTokenData($tokenIn: String!, $tokenOut: String!) {
    tokenInData: tokenGetTokenData(address: $tokenIn) {
      id
      tokenAddress
      description
      discordUrl
      telegramUrl
      twitterUsername
    }
    tokenOutData: tokenGetTokenData(address: $tokenOut) {
      id
      tokenAddress
      description
      discordUrl
      telegramUrl
      twitterUsername
    }
    tokenInDynamicData: tokenGetTokenDynamicData(address: $tokenIn) {
      ...GqlTokenDynamicData
    }
    tokenOutDynamicData: tokenGetTokenDynamicData(address: $tokenOut) {
      ...GqlTokenDynamicData
    }
  }
  ${GqlTokenDynamicDataFragmentDoc}
`;

/**
 * __useGetTradeSelectedTokenDataQuery__
 *
 * To run a query within a React component, call `useGetTradeSelectedTokenDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTradeSelectedTokenDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTradeSelectedTokenDataQuery({
 *   variables: {
 *      tokenIn: // value for 'tokenIn'
 *      tokenOut: // value for 'tokenOut'
 *   },
 * });
 */
export function useGetTradeSelectedTokenDataQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetTradeSelectedTokenDataQuery,
    GetTradeSelectedTokenDataQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetTradeSelectedTokenDataQuery, GetTradeSelectedTokenDataQueryVariables>(
    GetTradeSelectedTokenDataDocument,
    options,
  );
}
export function useGetTradeSelectedTokenDataLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetTradeSelectedTokenDataQuery,
    GetTradeSelectedTokenDataQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetTradeSelectedTokenDataQuery,
    GetTradeSelectedTokenDataQueryVariables
  >(GetTradeSelectedTokenDataDocument, options);
}
export type GetTradeSelectedTokenDataQueryHookResult = ReturnType<
  typeof useGetTradeSelectedTokenDataQuery
>;
export type GetTradeSelectedTokenDataLazyQueryHookResult = ReturnType<
  typeof useGetTradeSelectedTokenDataLazyQuery
>;
export type GetTradeSelectedTokenDataQueryResult = Apollo.QueryResult<
  GetTradeSelectedTokenDataQuery,
  GetTradeSelectedTokenDataQueryVariables
>;
export const GetLiquidityGaugesDocument = gql`
  query GetLiquidityGauges {
    getLiquidityGauges {
      id
      address
      symbol
      poolId
      totalSupply
      depositFee
      withdrawFee
      isKilled
      factory {
        id
      }
      rewardTokens {
        tokenAddress
        decimals
        symbol
        logoURI
      }
      pool {
        id
        name
        address
        poolType
        tokensList
        tokens {
          address
          weight
          logoURI
          symbol
        }
      }
    }
  }
`;

/**
 * __useGetLiquidityGaugesQuery__
 *
 * To run a query within a React component, call `useGetLiquidityGaugesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLiquidityGaugesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLiquidityGaugesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetLiquidityGaugesQuery(
  baseOptions?: Apollo.QueryHookOptions<GetLiquidityGaugesQuery, GetLiquidityGaugesQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetLiquidityGaugesQuery, GetLiquidityGaugesQueryVariables>(
    GetLiquidityGaugesDocument,
    options,
  );
}
export function useGetLiquidityGaugesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetLiquidityGaugesQuery,
    GetLiquidityGaugesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetLiquidityGaugesQuery, GetLiquidityGaugesQueryVariables>(
    GetLiquidityGaugesDocument,
    options,
  );
}
export type GetLiquidityGaugesQueryHookResult = ReturnType<typeof useGetLiquidityGaugesQuery>;
export type GetLiquidityGaugesLazyQueryHookResult = ReturnType<
  typeof useGetLiquidityGaugesLazyQuery
>;
export type GetLiquidityGaugesQueryResult = Apollo.QueryResult<
  GetLiquidityGaugesQuery,
  GetLiquidityGaugesQueryVariables
>;
export const GetUserStakesDocument = gql`
  query GetUserStakes($user: String!, $poolIds: [String!]!) {
    getUserGaugeStakes(user: $user, poolIds: $poolIds) {
      id
    }
  }
`;

/**
 * __useGetUserStakesQuery__
 *
 * To run a query within a React component, call `useGetUserStakesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserStakesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserStakesQuery({
 *   variables: {
 *      user: // value for 'user'
 *      poolIds: // value for 'poolIds'
 *   },
 * });
 */
export function useGetUserStakesQuery(
  baseOptions: Apollo.QueryHookOptions<GetUserStakesQuery, GetUserStakesQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetUserStakesQuery, GetUserStakesQueryVariables>(
    GetUserStakesDocument,
    options,
  );
}
export function useGetUserStakesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetUserStakesQuery, GetUserStakesQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetUserStakesQuery, GetUserStakesQueryVariables>(
    GetUserStakesDocument,
    options,
  );
}
export type GetUserStakesQueryHookResult = ReturnType<typeof useGetUserStakesQuery>;
export type GetUserStakesLazyQueryHookResult = ReturnType<typeof useGetUserStakesLazyQuery>;
export type GetUserStakesQueryResult = Apollo.QueryResult<
  GetUserStakesQuery,
  GetUserStakesQueryVariables
>;
export const GetUserVeLockInfoDocument = gql`
  query GetUserVeLockInfo {
    userGetVeLockInfo {
      lockedAmount
      lockEndDate
      totalSupply
      currentBalance
      epoch
      hasExistingLock
      isExpired
      percentOwned
    }
  }
`;

/**
 * __useGetUserVeLockInfoQuery__
 *
 * To run a query within a React component, call `useGetUserVeLockInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserVeLockInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserVeLockInfoQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserVeLockInfoQuery(
  baseOptions?: Apollo.QueryHookOptions<GetUserVeLockInfoQuery, GetUserVeLockInfoQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetUserVeLockInfoQuery, GetUserVeLockInfoQueryVariables>(
    GetUserVeLockInfoDocument,
    options,
  );
}
export function useGetUserVeLockInfoLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetUserVeLockInfoQuery,
    GetUserVeLockInfoQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetUserVeLockInfoQuery, GetUserVeLockInfoQueryVariables>(
    GetUserVeLockInfoDocument,
    options,
  );
}
export type GetUserVeLockInfoQueryHookResult = ReturnType<typeof useGetUserVeLockInfoQuery>;
export type GetUserVeLockInfoLazyQueryHookResult = ReturnType<typeof useGetUserVeLockInfoLazyQuery>;
export type GetUserVeLockInfoQueryResult = Apollo.QueryResult<
  GetUserVeLockInfoQuery,
  GetUserVeLockInfoQueryVariables
>;
