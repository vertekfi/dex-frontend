import { TransactionResponse } from '@ethersproject/abstract-provider';
import { BigNumber } from '@ethersproject/bignumber';
import { networkConfig } from '~/lib/config/network-config';
import { useSubmitTransaction } from '~/lib/util/useSubmitTransaction';

import GaugeControllerAbi from '../../abi/GaugeController.json';

export default class GaugeControllerService {
  abi: any;

  constructor() {
    this.abi = GaugeControllerAbi;
  }

  get address() {
    return networkConfig.balancer.votingEscrow.gaugeController;
  }

  public voteForManyGaugeWeights(
    gaugeAddresses: string[],
    weights: BigNumber[],
    options: Record<string, any> = {},
  ) {
    // return this.web3.sendTransaction(
    //   this.address,
    //   this.abi,
    //   'vote_for_many_gauge_weights',
    //   [gaugeAddresses, weights],
    //   options,
    // );

    const { submit, submitAsync, ...rest } = useSubmitTransaction({
      config: {
        addressOrName: this.address,
        contractInterface: this.abi,
        functionName: 'vote_for_gauge_weights(address, uint256)',
      },
      transactionType: 'VOTE',
    });
  }

  public voteForGaugeWeights(
    gaugeAddress: string,
    weight: BigNumber,
    options: Record<string, any> = {},
  ): Promise<TransactionResponse> {
    const { submit, submitAsync, ...rest } = useSubmitTransaction({
      config: {
        addressOrName: this.address,
        contractInterface: this.abi,
        functionName: 'vote_for_gauge_weights(address, uint256)',
      },
      transactionType: 'VOTE',
    });
  }
}

export const gaugeControllerService = new GaugeControllerService();
