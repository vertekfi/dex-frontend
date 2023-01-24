import { useEffect, useState } from 'react';
import { GqlToken } from '~/apollo/generated/graphql-codegen-generated';
import { useGetTokens } from '~/lib/global/useToken';
import { VotingGaugeWithVotes } from '~/lib/services/staking/types';
import { fNum2 } from '~/lib/util/useNumber';

type Props = {
  gauge: VotingGaugeWithVotes;
  isLoading: boolean;
};

type Reward = {
  token: GqlToken;
  amount: string;
  value: string;
};

export function GaugeRewardsTable(props: Props) {
  const [rewardsData, setRewardsData] = useState();
  const [totalRewardValue, setTotalRewardValue] = useState();

  const { getToken } = useGetTokens();

  useEffect(() => {
    //if (props.gauge.rewardTokens)
  }, [props.gauge]);

  useEffect(() => {
    //
  }, [rewardsData]);
}
