import { getUnixTime } from 'date-fns';
import { getAddress } from 'ethers/lib/utils';
import { networkProvider } from '~/lib/global/network';
import { Multicaller } from '../../util/multicaller.service';
import GaugeControllerAbi from '../../../abi/GaugeController.json';
import { mapBigNumberResult } from '~/lib/util/useMultiCall';

export class GaugeController {
  constructor(
    public readonly address: string,
    private readonly provider = networkProvider,
    private readonly abi = GaugeControllerAbi,
  ) {}

  async getRelativeWeights(gaugeAddresses: string[], timestamp: number) {
    const multicaller = this.getMulticaller();
    for (const gaugeAddress of gaugeAddresses) {
      multicaller.call(
        getAddress(gaugeAddress),
        this.address,
        'gauge_relative_weight(address, uint256)',
        [getAddress(gaugeAddress), timestamp || getUnixTime(new Date())],
      );
    }
    const weights = await mapBigNumberResult(multicaller);
    return weights;
  }

  private getMulticaller(): Multicaller {
    return new Multicaller(this.provider, this.abi);
  }
}
