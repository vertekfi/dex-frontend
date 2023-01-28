import { AmountHumanReadable, TokenBase } from '~/lib/services/token/token-types';
import { BaseProvider } from '@ethersproject/providers';
import LiquidityGaugeV5Abi from '~/lib/abi/LiquidityGaugeV5.json';
// import ChildChainGaugeRewardHelper from '~/lib/abi/ChildChainGaugeRewardHelper.json';
import { BigNumber, Contract } from 'ethers';
import { formatFixed } from '@ethersproject/bignumber';
import ERC20Abi from '~/lib/abi/ERC20.json';
import { GqlPoolStakingGauge } from '~/apollo/generated/graphql-codegen-generated';
import { StakingPendingRewardAmount } from './types';

interface GetUserStakedBalanceInput {
  userAddress: string;
  gaugeAddress: string;
  provider: BaseProvider;
  decimals?: number;
}

export class GaugeStakingService {
  constructor() {}

  async getUserStakedBalance({
    userAddress,
    provider,
    gaugeAddress,
    decimals = 18,
  }: GetUserStakedBalanceInput): Promise<AmountHumanReadable> {
    const gaugeContract = new Contract(gaugeAddress, LiquidityGaugeV5Abi, provider);
    const balance = await gaugeContract.balanceOf(userAddress);

    return formatFixed(balance, decimals);
  }

  async getGaugeTokenBalance({
    tokenAddress,
    gaugeAddress,
    provider,
    decimals = 18,
  }: {
    tokenAddress: string;
    gaugeAddress: string;
    provider: BaseProvider;
    decimals?: number;
  }): Promise<AmountHumanReadable> {
    const tokenContract = new Contract(tokenAddress, ERC20Abi, provider);
    const response: BigNumber = await tokenContract.balanceOf(gaugeAddress);

    return formatFixed(response, decimals);
  }

  async getPendingRewards({
    userAddress,
    gauges,
    tokens,
    provider,
  }: {
    userAddress: string;
    gauges: GqlPoolStakingGauge[];
    tokens: TokenBase[];
    provider: BaseProvider;
  }): Promise<StakingPendingRewardAmount[]> {
    return [];
  }
}

export const gaugeStakingService = new GaugeStakingService();
