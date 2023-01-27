import { BigNumber } from 'ethers';
import { networkConfig } from '~/lib/config/network-config';
import { useSubmitTransaction } from '~/lib/util/useSubmitTransaction';
import GaugeControllerAbi from '../../../lib/abi/GaugeController.json';

export function useGaugeVoting() {
  const { submit, ...rest } = useSubmitTransaction({
    config: {
      addressOrName: networkConfig.balancer.votingEscrow.gaugeController,
      contractInterface: GaugeControllerAbi,
      functionName: 'vote_for_gauge_weights',
    },
    transactionType: 'VOTE',
  });

  function voteForGauge(gaugeAddress: string, voteWeight: BigNumber) {
    console.log(gaugeAddress);
    console.log('Submitting gauge vote..');
    return submit({
      args: [gaugeAddress, voteWeight],
      toastText: `Voting for gauge`,
      walletText: `Vote for gauge`,
    });
  }

  return {
    voteForGauge,
    rest,
  };
}
