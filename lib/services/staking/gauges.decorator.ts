import { AddressZero } from '@ethersproject/constants';
import { formatEther } from 'ethers/lib/utils';
import { LiquidityGauge } from '~/apollo/generated/graphql-codegen-generated';

import LiquidityGaugeV5Abi from '~/lib/abi/LiquidityGaugeV5.json';
import { networkProvider } from '~/lib/global/network';
import { tokenFormatAmount } from '../token/token-util';
import { Multicaller } from '../util/multicaller.service';

import { OnchainGaugeData, OnchainGaugeDataMap } from './types';

const MAX_REWARD_TOKENS = 8;

export class GaugesDecorator {
  multicaller: Multicaller;

  constructor() {
    this.multicaller = this.resetMulticaller();
  }

  /**
   * @summary Combine backend gauge data with onchain data using multicalls.
   */
  async decorate(gauges: LiquidityGauge[], userAddress: string) {
    this.multicaller = this.resetMulticaller();

    this.callClaimableTokens(gauges, userAddress);
    this.callClaimableRewards(gauges, userAddress);

    const gaugesDataMap = await this.multicaller.execute<OnchainGaugeDataMap>();

    const data = gauges.map((gauge) => {
      //  console.log(gaugesDataMap[gauge.id]);
      return {
        ...gauge,
        ...this.format(gaugesDataMap[gauge.id]),
      };
    });

    return data;
  }

  /**
   * @summary Format raw onchain data fetched from multicalls.
   */
  private format(gaugeData: OnchainGaugeData): OnchainGaugeData {
    return {
      ...gaugeData,
      claimableTokens: tokenFormatAmount(formatEther(gaugeData.claimableTokens?.toString() || '0')),
      claimableRewards: this.formatClaimableRewards(gaugeData.claimableRewards),
    };
  }

  /**
   * @summary converts claimable reward values in map to strings from BigNumbers.
   */
  private formatClaimableRewards(claimableRewards: Record<string, string>): Record<string, string> {
    if (!claimableRewards) return {};

    //  console.log(claimableRewards);

    Object.keys(claimableRewards).forEach((rewardToken) => {
      // claimableRewards[rewardToken] = claimableRewards[rewardToken].toString();
      claimableRewards[rewardToken] = tokenFormatAmount(
        formatEther(claimableRewards[rewardToken].toString()),
      );

      // console.log(claimableRewards[rewardToken]);
    });

    return claimableRewards;
  }

  /**
   * @summary Add multicaller calls that fetch list of reward token addresses for each gauge
   * in given array of gauges.
   */
  private callRewardTokens(subgraphGauges: LiquidityGauge[]) {
    subgraphGauges.forEach((gauge) => {
      for (let i = 0; i < MAX_REWARD_TOKENS; i++) {
        this.multicaller.call(`${gauge.id}.rewardTokens[${i}]`, gauge.id, 'reward_tokens', [i]);
      }
    });
  }

  /**
   * @summary Filter out zero addresses from reward tokens array.
   * @description There can be up to 8 reward tokens for a gauge.
   * The onchain call for reward tokens returns an array of length 8
   * with each position filled with the zero address if a reward token
   * has not been added.
   */
  private formatRewardTokens(rewardTokens: string[]): string[] {
    return rewardTokens.filter((token) => token !== AddressZero);
  }

  /**
   * @summary Add multicaller calls that fetch the user's claimable BAL
   * for each gauge in given array of gauges.
   */
  private callClaimableTokens(subgraphGauges: LiquidityGauge[], userAddress: string) {
    subgraphGauges.forEach((gauge) => {
      this.multicaller.call(`${gauge.id}.claimableTokens`, gauge.id, 'claimable_tokens', [
        userAddress,
      ]);
    });
  }

  /**
   * @summary Add multicaller calls that fetch the claimable amounts for reward tokens,
   * e.g. non BAL rewards on gauge.
   */
  private callClaimableRewards(subgraphGauges: LiquidityGauge[], userAddress: string) {
    subgraphGauges.forEach((gauge) => {
      gauge.rewardTokens.forEach((rewardToken) => {
        this.multicaller.call(
          `${gauge.id}.claimableRewards.${rewardToken.tokenAddress}`,
          gauge.id,
          'claimable_reward',
          [userAddress, rewardToken.tokenAddress],
        );
      });
    });
  }

  private resetMulticaller(): Multicaller {
    return new Multicaller(networkProvider, LiquidityGaugeV5Abi);
  }
}

export const gaugesDecorator = new GaugesDecorator();
