import { formatUnits, getAddress } from 'ethers/lib/utils';
import { mapValues } from 'lodash';

import VEBalHelpersABI from '../../../abi/VEBalHelpers.json';
import { Multicaller } from '../../util/multicaller.service';
import { networkProvider } from '~/lib/global/network';

export class VEBalHelpers {
  constructor(
    public readonly address: string,
    private readonly provider = networkProvider,
    private readonly abi = VEBalHelpersABI,
  ) {}

  async getRelativeWeights(gaugeAddresses: string[]) {
    const multicaller = this.getMulticaller();
    for (const gaugeAddress of gaugeAddresses) {
      multicaller.call(getAddress(gaugeAddress), this.address, 'gauge_relative_weight', [
        getAddress(gaugeAddress),
      ]);
    }
    const result = await multicaller.execute();
    const weights = mapValues(result, (weight) => formatUnits(weight, 18));
    return weights;
  }

  private getMulticaller(): Multicaller {
    return new Multicaller(this.provider, this.abi);
  }
}
