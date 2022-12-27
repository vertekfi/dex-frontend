import { getAddress } from 'ethers/lib/utils';

import VEBalHelpersABI from '../../../abi/VEBalHelpers.json';
import { Multicaller } from '../../util/multicaller.service';
import { networkProvider } from '~/lib/global/network';
import { mapBigNumberResult } from '~/lib/util/useMultiCall';

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
    const weights = await mapBigNumberResult(multicaller);
    return weights;
  }

  private getMulticaller(): Multicaller {
    return new Multicaller(this.provider, this.abi);
  }
}
