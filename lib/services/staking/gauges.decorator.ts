import { AddressZero } from '@ethersproject/constants';
import { LiquidityGauge } from '~/apollo/generated/graphql-codegen-generated';

import LiquidityGaugeV5Abi from '~/lib/abi/LiquidityGaugeV5.json';
import { networkProvider } from '~/lib/global/network';
import { Multicaller } from '../util/multicaller.service';

import { OnchainGaugeData, OnchainGaugeDataMap } from './types';

const MAX_REWARD_TOKENS = 8;

export class GaugesDecorator {
  multicaller: Multicaller;

  constructor() {
    this.multicaller = this.resetMulticaller();
  }

  /**
   * @summary Combine subgraph gauge schema with onchain data using multicalls.
   */
  async decorate(subgraphGauges: LiquidityGauge[], userAddress: string) {
    this.multicaller = this.resetMulticaller();
    this.callRewardTokens(subgraphGauges);
    this.callClaimableTokens(subgraphGauges, userAddress);

    let gaugesDataMap = await this.multicaller.execute<OnchainGaugeDataMap>();

    this.callClaimableRewards(subgraphGauges, userAddress);

    gaugesDataMap = await this.multicaller.execute<OnchainGaugeDataMap>(gaugesDataMap);

    const data = subgraphGauges.map((subgraphGauge) => ({
      ...subgraphGauge,
      ...this.format(gaugesDataMap[subgraphGauge.id]),
    }));

    return data;
  }

  /**
   * @summary Format raw onchain data fetched from multicalls.
   */
  private format(gaugeData: OnchainGaugeData): OnchainGaugeData {
    return {
      ...gaugeData,
      rewardTokens: gaugeData.rewardTokens,
      claimableTokens: gaugeData.claimableTokens?.toString() || '0',
      claimableRewards: this.formatClaimableRewards(gaugeData.claimableRewards),
    };
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
    const methodName = 'claimable_reward';
    subgraphGauges.forEach((gauge) => {
      gauge.rewardTokens.forEach((rewardToken) => {
        this.multicaller.call(`${gauge.id}.claimableRewards.${rewardToken}`, gauge.id, methodName, [
          userAddress,
          rewardToken,
        ]);
      });
    });
  }

  /**
   * @summary converts claimable reward values in map to strings from BigNumbers.
   */
  private formatClaimableRewards(claimableRewards: Record<string, string>): Record<string, string> {
    if (!claimableRewards) return {};

    Object.keys(claimableRewards).forEach((rewardToken) => {
      claimableRewards[rewardToken] = claimableRewards[rewardToken].toString();
    });

    return claimableRewards;
  }

  private resetMulticaller(): Multicaller {
    return new Multicaller(networkProvider, LiquidityGaugeV5Abi);
  }
}

export const gaugesDecorator = new GaugesDecorator();
