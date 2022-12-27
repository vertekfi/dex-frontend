import { Contract } from '@ethersproject/contracts';
import { formatUnits } from 'ethers/lib/utils';
import { networkProvider } from '~/lib/global/network';
import { Multicaller } from '../../util/multicaller.service';
import TokenAdminAbi from '../../../abi/TokenAdmin.json';

export class BalancerTokenAdmin {
  constructor(public readonly address: string, private readonly abi = TokenAdminAbi) {}

  async getInflationRate() {
    if (!this.address) return '0';
    const instance = new Contract(this.address, this.abi, networkProvider);
    const rate = await instance.getInflationRate();
    return formatUnits(rate, 18);
  }

  private getMulticaller(): Multicaller {
    return new Multicaller(networkProvider, this.abi);
  }
}
