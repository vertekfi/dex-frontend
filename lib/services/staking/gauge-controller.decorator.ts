import { networkConfig } from '~/lib/config/network-config';
import { getChainId, networkProvider } from '~/lib/global/network';
import { Multicaller } from '../util/multicaller.service';
import { oneWeekInMs, toUnixTimestamp } from '../../util/time';
import {
  RawVotesData,
  RawVotesDataMap,
  VotesData,
  VotingGauge,
  VotingGaugeWithVotes,
} from './types';
import GaugeControllerAbi from '../../abi/GaugeController.json';

const STARTING_WEEKS_TIMESTAMP: { [key: number]: number } = {
  5: 1671685200,
  56: 1674686088,
};

export class GaugeControllerDecorator {
  address: string;
  multicaller: Multicaller;

  constructor() {
    this.address = networkConfig.balancer.votingEscrow.gaugeController;
    this.multicaller = this.resetMulticaller();
  }

  /**
   * @summary Decorate subgraph gauge schema with onchain data using multicalls.
   */
  async decorateWithVotes(
    votingGauges: VotingGauge[],
    userAddress?: string,
  ): Promise<VotingGaugeWithVotes[]> {
    this.multicaller = this.resetMulticaller();
    this.callGaugeWeightThisPeriod(votingGauges);
    this.callGaugeWeightNextPeriod(votingGauges);
    if (userAddress) {
      this.callUserGaugeVotes(votingGauges, userAddress);
      this.callUserGaugeVoteTime(votingGauges, userAddress);
    }

    const votesDataMap = await this.multicaller.execute<RawVotesDataMap>();

    const decoratedGauges = votingGauges.map((gauge) => {
      return {
        ...gauge,
        ...this.formatVotes(votesDataMap.gauges[gauge.address]),
      };
    });

    return decoratedGauges;
  }

  private formatVotes(votesData: RawVotesData): VotesData {
    const votes = votesData.gaugeWeightThisPeriod.toString();
    const votesNextPeriod = votesData.gaugeWeightNextPeriod.toString();

    return {
      votes,
      votesNextPeriod,
      userVotes: votesData?.userVotes?.power.toString() || '0',
      lastUserVoteTime: votesData?.lastUserVoteTime?.toNumber() || 0,
    };
  }

  /**
   * @summary Fetch total points allocated towards each gauge for this period
   */
  private callGaugeWeightThisPeriod(votingGauges: VotingGauge[]) {
    let thisWeekTimestamp = toUnixTimestamp(Math.floor(Date.now() / oneWeekInMs) * oneWeekInMs);
    console.log(new Date(thisWeekTimestamp * 1000).toLocaleString());
    // this makes sure we don't compute votes from before the gauge voting should happen in the "This period" entry,
    // since the system is not fully active during the first 7 days
    // (ie the first period starts the Thursday after ve/gauge controller setup took place)

    const chainStartTime = STARTING_WEEKS_TIMESTAMP[getChainId()];
    if (thisWeekTimestamp == chainStartTime) {
      thisWeekTimestamp = thisWeekTimestamp - oneWeekInMs;
    }
    votingGauges.forEach((gauge) => {
      this.multicaller.call(
        `gauges.${gauge.address}.gaugeWeightThisPeriod`,
        this.address,
        'gauge_relative_weight_write',
        [gauge.address, thisWeekTimestamp],
      );
    });
  }

  /**
   * @summary Fetch total points allocated towards each gauge for next period (+1 week)
   */
  private callGaugeWeightNextPeriod(votingGauges: VotingGauge[]) {
    const nextWeekTimestamp = toUnixTimestamp(
      Math.floor((Date.now() + oneWeekInMs) / oneWeekInMs) * oneWeekInMs,
    );
    votingGauges.forEach((gauge) => {
      this.multicaller.call(
        `gauges.${gauge.address}.gaugeWeightNextPeriod`,
        this.address,
        'gauge_relative_weight_write',
        [gauge.address, nextWeekTimestamp],
      );
    });
  }

  /**
   * @summary Fetch user's vote weight for each gauge
   */
  private callUserGaugeVotes(votingGauges: VotingGauge[], userAddress: string) {
    votingGauges.forEach((gauge) => {
      this.multicaller.call(`gauges.${gauge.address}.userVotes`, this.address, 'vote_user_slopes', [
        userAddress,
        gauge.address,
      ]);
    });
  }

  /**
   * @summary Fetch user's vote weight for each gauge
   */
  private callUserGaugeVoteTime(votingGauges: VotingGauge[], userAddress: string) {
    votingGauges.forEach((gauge) => {
      this.multicaller.call(
        `gauges.${gauge.address}.lastUserVoteTime`,
        this.address,
        'last_user_vote',
        [userAddress, gauge.address],
      );
    });
  }

  private resetMulticaller(): Multicaller {
    return new Multicaller(networkProvider, GaugeControllerAbi);
  }
}

export const gaugeControllerDecorator = new GaugeControllerDecorator();
