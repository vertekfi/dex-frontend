import { TransactionResponse } from '@ethersproject/abstract-provider';
import { formatUnits } from '@ethersproject/units';
import { BigNumber, Contract } from 'ethers';
import { zipObject } from 'lodash';
import { networkConfig } from '~/lib/config/network-config';

import FeeDistributorABI from '../../../abi/FeeDistributor.json';
import FeeDistributorStaticABI from '../../../abi/FeeDistributorStatic.json';
import { Multicaller } from '../../util/multicaller.service';
import { networkProvider } from '~/lib/global/network';
import { BalanceMap } from '../../token/token-types';
import { web3Service } from '../../web3/web3.service';

export class FeeDistributor {
  public claimableTokens: string[] = [
    networkConfig.beets.address, // VRTK
  ];

  constructor(
    public readonly address: string,
    private readonly abi = FeeDistributorABI,
    private readonly staticAbi = FeeDistributorStaticABI,
  ) {}

  /**
   * @summary Instantiates a contract instance for the FeeDistributor.
   * @returns Ethers Contract instance
   */
  public getInstance(): Contract {
    return new Contract(this.address, this.abi, networkProvider);
  }

  /**
   * @summary Instantiates a multicaller instance of the FeeDistributor
   */
  public getMulticaller(): Multicaller {
    return new Multicaller(networkProvider, this.abi);
  }

  /**
   * @summary Get claimable protocol fee reward balances
   * @descrition To get claimable balances we have to simulate a transaction to
   * the claimTokens method by modifing the ABI to make it a view function.
   */
  public async getClaimableBalances(userAddress: string): Promise<BalanceMap> {
    const balances = await web3Service.callStatic<BigNumber[]>(
      this.address,
      this.staticAbi,
      'claimTokens',
      [userAddress, this.claimableTokens],
    );
    const stringBalances = balances.map((balance: BigNumber) => balance.toString());

    return zipObject(this.claimableTokens, stringBalances);
  }

  /**
   * @summary Claim all protocol reward token balances.
   */
  public async claimBalances(userAddress: string): Promise<TransactionResponse> {
    return await web3Service.sendTransaction(this.address, this.abi, 'claimTokens', [
      userAddress,
      this.claimableTokens,
    ]);
  }

  /**
   * @summary Claim specific protocol reward token balance.
   */
  public async claimBalance(
    userAddress: string,
    tokenAddress: string,
  ): Promise<TransactionResponse> {
    return await web3Service.sendTransaction(this.address, this.abi, 'claimToken', [
      userAddress,
      tokenAddress,
    ]);
  }

  /**
   * @summary Get total token distribution in week.
   * @param {string} token address to check distribution for, either bb-a-USD or BAL
   * @param {number} timestamp unix timestamp of epoch to check, has to be exact
   * epoch timestamp
   */
  public async getTokensDistributedInWeek(
    token: string,
    timestamp: number,
    instance?: Contract,
  ): Promise<string> {
    if (!instance) instance = this.getInstance();
    const amount = await instance.getTokensDistributedInWeek(token, timestamp);

    return formatUnits(amount, 18);
  }

  /**
   * @summary Get total veBAL supply at epoch.
   * @param {number} timestamp unix timestamp of epoch to check, has to be exact
   * epoch timestamp
   */
  public async getTotalSupply(timestamp: number, instance?: Contract): Promise<string> {
    if (!instance) instance = this.getInstance();
    const amount = await instance.getTotalSupplyAtTimestamp(timestamp);

    return formatUnits(amount, 18);
  }
}
