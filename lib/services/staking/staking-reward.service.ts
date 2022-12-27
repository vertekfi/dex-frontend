import { getUnixTime } from 'date-fns';
import { formatUnits, getAddress } from 'ethers/lib/utils';
import { isNil, mapValues } from 'lodash';
import { networkConfig } from '~/lib/config/network-config';
import { mapBigNumberResult } from '~/lib/util/useMultiCall';
import { GaugeController } from '../balancer/contracts/gauge-controller';
import { LiquidityGaugeClass } from '../balancer/contracts/liquidity-gauge';
import { BalancerTokenAdmin } from '../balancer/contracts/token-admin';
import { VEBalHelpers } from '../balancer/contracts/vebal-helpers';

export type GaugeBalApr = { min: string; max: string };
export type GaugeBalAprs = Record<string, GaugeBalApr>;
export type GaugeRewardTokenAprs = Record<string, string>;

export class StakingRewardService {
  private gaugeController = new GaugeController(
    networkConfig.balancer.votingEscrow.gaugeController,
  );
  private veBALHelpers = new VEBalHelpers(networkConfig.balancer.votingEscrow.veBALHelpers);

  constructor() {}

  async getWorkingSupplyForGauges(gaugeAddresses: string[]) {
    // start with a fresh multicaller
    const multicaller = LiquidityGaugeClass.getMulticaller();

    for (const gaugeAddress of gaugeAddresses) {
      multicaller.call(getAddress(gaugeAddress), getAddress(gaugeAddress), 'working_supply');
    }
    const supplies = await mapBigNumberResult(multicaller);
    return supplies;
  }

  private async getTotalSupplyForGauges(gaugeAddresses: string[]) {
    // start with a fresh multicaller
    const multicaller = LiquidityGaugeClass.getMulticaller();

    for (const gaugeAddress of gaugeAddresses) {
      multicaller.call(getAddress(gaugeAddress), getAddress(gaugeAddress), 'totalSupply');
    }
    const supplies = await mapBigNumberResult(multicaller);
    return supplies;
  }

  private async getRelativeWeightsForGauges(gaugeAddresses: string[]) {
    // const timestamp = getUnixTime(new Date());
    // if (configService.network.chainId === Network.KOVAN) {
    //   return await this.gaugeController.getRelativeWeights(gaugeAddresses, timestamp);
    // }
    // the ve bal helpers contract for gauge weights calls
    // the checkpoint function which is necesary for returning
    // the correct value.
    return await this.veBALHelpers.getRelativeWeights(gaugeAddresses);
  }

  //   async getGaugeBALAprs({
  //     prices,
  //     gauges,
  //     pools,
  //   }: {
  //     prices: TokenPrices;
  //     gauges: SubgraphGauge[];
  //     pools: Pool[];
  //   }): Promise<GaugeBalAprs> {
  //     const gaugeAddresses = gauges.map((gauge) => gauge.id);
  //     const balAddress = TOKENS.AddressMap[configService.network.chainId].BAL;
  //     const [inflationRate, relativeWeights, workingSupplies, totalSupplies] = await Promise.all([
  //       new BalancerTokenAdmin(networkConfig.balancer.votingEscrow.tokenAdmin).getInflationRate(),
  //       this.getRelativeWeightsForGauges(gaugeAddresses),
  //       this.getWorkingSupplyForGauges(gaugeAddresses),
  //       this.getTotalSupplyForGauges(gaugeAddresses),
  //     ]);

  //     const aprs = gauges.map((gauge) => {
  //       const poolId = gauge.poolId;
  //       const pool = pools.find((pool) => pool.id === poolId);
  //       const nilApr = [poolId, { min: '0', max: '0' }];

  //       if (!pool) return nilApr;
  //       if (isNil(inflationRate)) return nilApr;

  //       const poolService = new PoolService(pool);
  //       if (!balAddress) return nilApr;

  //       const totalSupply = bnum(totalSupplies[getAddress(gauge.id)]);
  //       const balPrice = prices[getAddress(balAddress)].usd;

  //       const gaugeBALApr = calculateGaugeApr({
  //         gaugeAddress: getAddress(gauge.id),
  //         bptPrice: poolService.bptPrice,
  //         balPrice: String(balPrice),
  //         // undefined inflation rate is guarded above
  //         inflationRate: inflationRate as string,
  //         boost: '1',
  //         workingSupplies,
  //         relativeWeights,
  //         totalSupply,
  //       });

  //       const range = getAprRange(gaugeBALApr || '0'.toString());
  //       return [poolId, { ...range }];
  //     });
  //     return Object.fromEntries(aprs);
  //   }
}
