import { BaseProvider } from '@ethersproject/providers';
import { BigNumber, Contract } from 'ethers';
import { formatUnits, getAddress } from 'ethers/lib/utils';
import { mapValues } from 'lodash';
import { useContractWrite, useSigner, useWaitForTransaction } from 'wagmi';

import LiquidityGaugeV5Abi from '~/lib/abi/LiquidityGaugeV5.json';
import { networkProvider } from '~/lib/global/network';
import { ZERO_ADDRESS } from '~/lib/util/web3';
import { Multicaller } from '../util/multicaller.service';
import { web3Service } from '../web3/web3.service';

const MAX_REWARD_TOKENS = 8;

export class LiquidityGauge {
  instance: Contract;

  constructor(public readonly address: string, private readonly abi = LiquidityGaugeV5Abi) {
    this.instance = new Contract(this.address, this.abi, networkProvider);
  }

  async stake(amount: BigNumber) {
    const tx = web3Service.sendTransaction(this.address, this.abi, 'deposit(uint256)', [amount]);
    return tx;
  }

  async unstake(amount: BigNumber) {
    const tx = web3Service.sendTransaction(this.address, this.abi, 'withdraw(uint256)', [amount]);
    return tx;
  }

  async balance(account: string): Promise<string> {
    return this.instance.balanceOf(getAddress(account));
  }

  async totalSupply(): Promise<string> {
    const supply = await this.instance.totalSupply();
    return formatUnits(supply, 18);
  }

  /*
   * @summary Claim all user's reward tokens, e.g. everything that's not BAL
   */
  async claimRewards() {
    return await web3Service.sendTransaction(this.address, this.abi, 'claim_rewards()');
  }

  async getRewardTokens() {
    const multicaller = this.getMulticaller();
    for (let i = 0; i < MAX_REWARD_TOKENS; i++) {
      multicaller.call(this.address, this.address, 'reward_tokens', [i]);
    }
    const tokens = await multicaller.execute();
    return tokens;
  }

  static async getRewardTokensForGauges(
    gaugeAddresses: string[],
  ): Promise<Record<string, string[]>> {
    const multicaller = LiquidityGauge.getMulticaller();
    gaugeAddresses.forEach((gaugeAddress) => {
      for (let i = 0; i < MAX_REWARD_TOKENS; i++) {
        multicaller.call(
          `${getAddress(gaugeAddress)}.[${i}]`,
          getAddress(gaugeAddress),
          'reward_tokens',
          [i],
        );
      }
    });

    const tokensForGauges = await multicaller.execute();

    return mapValues(tokensForGauges, (rewardTokens) =>
      rewardTokens.filter((token: string) => token !== ZERO_ADDRESS),
    );
  }

  static async getRewardTokenDataForGauges(gaugeRewardTokenMap: Record<string, string[]>) {
    const multicaller = LiquidityGauge.getMulticaller();
    for (const gaugeAddress of Object.keys(gaugeRewardTokenMap)) {
      const _gaugeAddress = getAddress(gaugeAddress);
      for (const rewardToken of gaugeRewardTokenMap[gaugeAddress]) {
        const _rewardToken = getAddress(rewardToken);
        multicaller.call(`${_gaugeAddress}.${_rewardToken}`, _gaugeAddress, 'reward_data', [
          _rewardToken,
        ]);
      }
    }
    const rewardData = await multicaller.execute();
    return rewardData;
  }

  async workingSupplies(gaugeAddresses: string[]) {
    const multicaller = this.getMulticaller();
    for (const gaugeAddress of gaugeAddresses) {
      multicaller.call(gaugeAddress, this.address, 'working_supply');
    }
    const result = await multicaller.execute();
    const supplies = mapValues(result, (weight) => formatUnits(weight, 18));
    return supplies;
  }

  private getMulticaller(): Multicaller {
    return new Multicaller(networkProvider, LiquidityGaugeV5Abi);
  }

  static getMulticaller(): Multicaller {
    return new Multicaller(networkProvider, LiquidityGaugeV5Abi);
  }
}
