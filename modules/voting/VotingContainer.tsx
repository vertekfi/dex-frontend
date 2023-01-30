import { UserDataProvider } from '~/lib/user/useUserData';
import { VotingHeader } from './components/VotingHeader';
import { Skeleton } from '@chakra-ui/react';
import { GaugeList } from './components/GaugeList';
import { GaugeListProvider } from './lib/useVotingGauges';
import { UserVeDataProvider } from './lib/useUserVeData';
import { TokensProvider } from '~/lib/global/useToken';

export function VotingContainer() {
  return (
    <TokensProvider>
      <UserDataProvider>
        <GaugeListProvider>
          <UserVeDataProvider>
            <VotingHeader />

            <Skeleton isLoaded={true}>
              <GaugeList />
            </Skeleton>
          </UserVeDataProvider>
        </GaugeListProvider>
      </UserDataProvider>
    </TokensProvider>
  );
}
