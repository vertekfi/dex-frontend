import { Interface } from '@ethersproject/abi';
import GaugeActionsAbi from '~/lib/abi/GaugeActions.json';

export class GaugeActionsService {
  /**
   * Claims "extra" reward tokens(Not BAL/VRTK) from a list of gauges in one call
   * @param gauges
   * @returns
   */
  gaugeClaimRewards(gauges: string[]): string {
    return new Interface(GaugeActionsAbi).encodeFunctionData('gaugeClaimRewards', gauges);
  }

  /**
   * Uses BalancerMinter to claim (BAL/VRTK) token rewards from a list of gauges
   * @param gauges
   * @returns
   */
  gaugeClaimTokens(gauges: string[], outputReference = 0): string {
    return new Interface(GaugeActionsAbi).encodeFunctionData('gaugeMint', [
      gauges,
      outputReference,
    ]);
  }
}
