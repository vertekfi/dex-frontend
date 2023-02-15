import { useEffect, useState } from 'react';
import {
  FormControl,
  Input,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Box,
  HStack,
  Modal,
  Text,
  Button,
  ModalOverlay,
} from '@chakra-ui/react';
import {
  BeetsModalBody,
  BeetsModalContent,
  BeetsModalHeader,
  BeetsModalHeadline,
} from '~/components/modal/BeetsModal';
import { VotingGaugeWithVotes } from '~/lib/services/staking/types';
import { TokenAvatarSetInList } from '~/components/token/TokenAvatarSetInList';
import { memo } from 'react';
import { RepeatClockIcon } from '@chakra-ui/icons';
import { SunIcon } from '@chakra-ui/icons';
import { LockIcon } from '@chakra-ui/icons';
import { useGaugeVoting } from '../lib/useGaugeVoting';
import { useVotingState } from '../lib/useVotingState';
import { useUserVeData } from '../lib/useUserVeData';
import { BigNumber } from 'ethers';
import { scale } from '~/lib/util/big-number.utils';
import { useUserAccount } from '~/lib/user/useUserAccount';

const MemoizedTokenAvatarSetInList = memo(TokenAvatarSetInList);

type Props = {
  gauge: VotingGaugeWithVotes;
  unallocatedVoteWeight: number;
  onClose: () => void;
  onSucess: () => void;
  isOpen: boolean;
  veBalLockInfo?: {
    hasExistingLock: boolean;
    isExpired: boolean;
    lockEndDate: number;
  };
};

export function GaugeVoteModal(props: Props) {
  const [userVote, setUserVote] = useState<string>();
  const { voteForGauge, isConfirmed, isFailed, isPending } = useGaugeVoting();
  const { currentVeBalance, lockEndDate } = useUserVeData();
  const { isConnected } = useUserAccount();

  const {
    voteWeight,
    setVoteWeight,
    voteError,
    voteTitle,
    voteButtonText,
    voteButtonDisabled,
    voteInputDisabled,
    voteLockedUntilText,
    remainingVotes,
  } = useVotingState(props.gauge, props.unallocatedVoteWeight, {
    ...props.veBalLockInfo,
    currentVeBalance: currentVeBalance || '0',
    lockEndDate,
  });

  useEffect(() => {
    if (isConfirmed) {
      props.onSucess();
    }

    if (isFailed) {
      // TODO: how should we handle this?
    }
  }, [isConfirmed, isFailed]);

  async function submitVote() {
    if (!userVote) {
      return;
    }
    const totalVoteShares = scale(userVote, 2).toString();
    try {
      voteForGauge(props.gauge.address, BigNumber.from(totalVoteShares));
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <>
      <Modal isOpen={props.isOpen} onClose={props.onClose} size="xl">
        <ModalOverlay
          display={{ base: 'none', md: 'block' }}
          bg={`radial-gradient(circle at center, #4132D0 0%, rgba(0,0,0, 0.85) 55% )`}
        />
        <BeetsModalContent bgColor="vertek.slate.900">
          <BeetsModalHeader mt="2">
            <BeetsModalHeadline textAlign="center" fontSize="2rem">
              {voteTitle}
              <Text fontSize="1rem" textAlign="center" mt="2">
                Your balance of veVRTK: {currentVeBalance}
              </Text>
            </BeetsModalHeadline>
          </BeetsModalHeader>

          <BeetsModalBody
            mt="0"
            bgColor="vertek.slatepurple.900"
            textAlign="center"
            fontSize="1.2rem"
          >
            <Box
              display="flex"
              flexDirection="column"
              gap={4}
              padding="2"
              alignItems="flex-start"
              h="full"
            >
              <Box display="flex" flexDirection="column" fontSize="1rem" textAlign="left">
                <Text mb="2">
                  <RepeatClockIcon ml="2" mr="2" />
                  Your vote directs future liquidity mining emissions starting from the next period
                  on Thursday at 0:00 UTC.
                </Text>
                <Text mb="2">
                  <LockIcon ml="2" mr="2" />
                  Votes are timelocked for 10 days. If you vote now, no edits can be made until{' '}
                  {voteLockedUntilText}.
                </Text>
                <Text mb="2">
                  <SunIcon ml="2" mr="2" />
                  Voting power is set at the time of the vote. If you get more veVRTK later,
                  resubmit your vote to use your increased power.
                </Text>
              </Box>

              {!!voteError && (
                <Alert
                  bg="black"
                  flexDirection="column"
                  status="error"
                  color="white"
                  mt={{ base: '2', md: '4' }}
                  borderRadius="12px"
                >
                  <Box display="flex" flexDirection="row">
                    <AlertIcon color="beets.green" />
                    <AlertTitle fontSize="1rem">{voteError.title}</AlertTitle>
                  </Box>
                  <AlertDescription fontSize="0.9rem" textAlign="left" lineHeight="1.1rem">
                    {voteError.description}
                  </AlertDescription>
                </Alert>
              )}

              <Text fontWeight="medium">{props.gauge.pool.name}</Text>
              <MemoizedTokenAvatarSetInList
                imageSize={28}
                marginBottom="4"
                width={92}
                tokens={props.gauge.pool.tokens}
              />
            </Box>
            <div>
              <FormControl>
                <Input
                  id="voteWeight"
                  name="voteWeight"
                  type="text"
                  value={userVote}
                  onChange={(event) => setUserVote(event.target.value)}
                  autoComplete="off"
                  autoCorrect="off"
                  spellCheck={false}
                  color="grey.100"
                  step="any"
                  placeholder={voteWeight || '0'}
                  disabled={voteInputDisabled}
                  size="md"
                  autoFocus
                />
              </FormControl>
              {!!voteError ? <Box>{voteError.description}</Box> : <Box>{remainingVotes}</Box>}
            </div>
          </BeetsModalBody>

          <HStack alignItems="center" justifyContent="center" width="100%">
            <Button width="40%" variant="verteklight" onClick={props.onClose}>
              Cancel
            </Button>
            <Button
              width="40%"
              variant="stayblack"
              disabled={!isConnected || isPending || voteButtonDisabled}
              onClick={submitVote}
            >
              {voteButtonText}
            </Button>
          </HStack>
        </BeetsModalContent>
      </Modal>
    </>
  );
}
