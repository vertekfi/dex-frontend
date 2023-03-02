import { VotingGaugeWithVotes } from '~/lib/services/staking/types';
import { scale, bnum } from '~/lib/util/big-number.utils';
import { fNum2, FNumFormats } from '~/lib/util/useNumber';
import { Box, Flex, Text, Spinner } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useUserVeData } from '../lib/useUserVeData';
import { useVotingGauges } from '../lib/useVotingGauges';
import { GaugeListItem } from './GaugeListItem';
import { GaugeVoteModal } from './GaugeVoteModal';
import { VotingSubheader } from './VotingSubheader';
import { GaugeListFooter } from './GaugeListFooter';
import { GaugeListTableHeader } from './GaugeListTableHeader';
import { FadeInOutBox } from '~/components/animation/FadeInOutBox';
import { Loading } from '~/components/loading/Loading';

export function GaugeList() {
  const [unallocatedVoteWeight, setUnallocatedVoteWeight] = useState<number>();
  const [activeVotingGauge, setActiveVotingGauge] = useState<VotingGaugeWithVotes | null>();

  const {
    isLoading: isLoadingGauges,
    votingGauges,
    unallocatedVotes,
    refetch: refetchVotingGauges,
  } = useVotingGauges();

  const { hasExistingLock, lockEndDate, isExpired } = useUserVeData();

  // Set users voting info
  useEffect(() => {
    const totalVotes = 1e4; // 10,000

    if (!isLoadingGauges && votingGauges?.length) {
      // Set the users remaining votes
      const votesRemaining = votingGauges.reduce((remainingVotes: number, gauge) => {
        return remainingVotes - parseFloat(gauge.userVotes);
      }, totalVotes);

      setUnallocatedVoteWeight(votesRemaining);
    } else {
      setUnallocatedVoteWeight(totalVotes);
    }
  }, [isLoadingGauges, votingGauges]);

  function setActiveGaugeVote(votingGauge: VotingGaugeWithVotes) {
    setActiveVotingGauge(votingGauge);
  }

  function handleModalClose() {
    setActiveVotingGauge(null);
  }

  function handleModalSuccess() {
    refetchVotingGauges();
    handleModalClose();
  }

  return (
    <>
      <VotingSubheader
        unallocatedVotesFormatted={fNum2(
          scale(bnum(unallocatedVotes || '0'), -4).toString(),
          FNumFormats.percent,
        )}
      />
      <Box
        mt="3rem"
        boxShadow={{ base: 'none', lg: '0 0 10px #5BC0F8, 0 0 20px #4A4AF6' }}
        mb="6rem"
        borderRadius="16px"
        flexDirection="column"
        display="flex"
      >
        <GaugeListTableHeader />
        <Box>
          <Loading loading={isLoadingGauges} />

          {votingGauges?.map((gauge) => {
            return (
              <FadeInOutBox isVisible={!isLoadingGauges} key={gauge.address}>
                <GaugeListItem gauge={gauge} onVoteClick={setActiveGaugeVote} />
              </FadeInOutBox>
            );
          })}
        </Box>
        <GaugeListFooter />
      </Box>

      {activeVotingGauge && (
        <GaugeVoteModal
          onClose={handleModalClose}
          onSucess={handleModalSuccess}
          gauge={activeVotingGauge}
          isOpen={activeVotingGauge !== null}
          unallocatedVoteWeight={unallocatedVoteWeight || 0}
          veBalLockInfo={{
            hasExistingLock: hasExistingLock || false,
            lockEndDate: lockEndDate || 0,
            isExpired: isExpired || true,
          }}
        />
      )}
    </>
  );
}
