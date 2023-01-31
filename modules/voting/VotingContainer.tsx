import { UserDataProvider } from '~/lib/user/useUserData';
import { VotingHeader } from './components/VotingHeader';
import { GaugeList } from './components/GaugeList';
import { GaugeListProvider } from './lib/useVotingGauges';
import { UserVeDataProvider } from './lib/useUserVeData';
import { TokensProvider } from '~/lib/global/useToken';
import { UserTokenBalancesProvider } from '~/lib/user/useUserTokenBalances';

export function VotingContainer() {
  return (
    <TokensProvider>
      <UserTokenBalancesProvider>
        <UserDataProvider>
          <GaugeListProvider>
            <UserVeDataProvider>
              <VotingHeader />

              <GaugeList />
            </UserVeDataProvider>
          </GaugeListProvider>
        </UserDataProvider>
      </UserTokenBalancesProvider>
    </TokensProvider>
  );
}
