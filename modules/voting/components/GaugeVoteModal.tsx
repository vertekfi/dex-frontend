import { useEffect, useRef, useState } from 'react';
import { FormControl, FormLabel, Input } from '@chakra-ui/react';
import {
  BeetsModalBody,
  BeetsModalContent,
  BeetsModalHeader,
  BeetsModalHeadline,
} from '~/components/modal/BeetsModal';
import { Box, HStack, Modal, Text, Button } from '@chakra-ui/react';
import { VotingGaugeWithVotes } from '~/lib/services/staking/types';
import { TokenAvatarSetInList } from '~/components/token/TokenAvatarSetInList';
import { memo } from 'react';
import { bnum, scale } from '~/lib/util/big-number.utils';
import { useVeVRTK } from '../lib/useVeVRTK';
import { WalletError } from '~/lib/services/web3/web3.service';
import { useGaugeVoting } from '../lib/useGaugeVoting';
import { BigNumber } from 'ethers';

const MemoizedTokenAvatarSetInList = memo(TokenAvatarSetInList);

const MINIMUM_LOCK_TIME = 86_400_000 * 7;

type Props = {
  gauge: VotingGaugeWithVotes;
  unallocatedVoteWeight: number;
  // logoURIs: string[];
  // poolURL: string;
  // veBalLockInfo?: VeBalLockInfo;
  isOpen: boolean;
  onClose: () => void;
};

type VoteState = {
  init: boolean;
  confirming: boolean;
  confirmed: boolean;
  error?: {
    title: string;
    description: string;
  };
};

export function GaugeVoteModal(props: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const [voteTitle, setVoteTitle] = useState<string>('');
  const [voteButtonText, setVoteButtonText] = useState<string>('');

  const [hasEnoughVotes, setHasEnoughVotes] = useState<boolean>(false);
  const [hasVotes, setHasVotes] = useState<boolean>(false);

  const [voteWeight, setVoteWeight] = useState<string>('');
  const [currentWeight, setCurrentWeight] = useState<string>('');
  const [currentWeightNormalized, setCurrentWeightNormalized] = useState<string>('');

  const [unallocatedVotesFormatted, setunallocatedVotesFormatted] = useState<string>('');
  const [remainingVotes, setRemainingVotes] = useState<string>('');
  const [voteLockedUntilText, setVoteLockedUntilText] = useState<string>('');

  const [voteError, setVoteError] = useState<{ title: string; description: string }>();
  const [voteWarning, setVoteWarning] = useState<boolean>(false);
  const [veBalVoteOverLimitWarning, setVeBalVoteOverLimitWarning] = useState<boolean>(false);
  const [voteButtonDisabled, setVoteButtonDisabled] = useState<boolean>();
  const [voteInputDisabled, setVoteInputDisabled] = useState<boolean>();

  const [votedToRecentlyWarning, setVotedToRecentlyWarning] = useState<{
    title: string;
    description: string;
  }>();

  // Probably wont need this
  const [voteState, setVoteState] = useState<VoteState>({
    init: false,
    confirming: false,
    confirmed: false,
  });

  const { veBalBalance } = useVeVRTK();
  const { voteForGauge } = useGaugeVoting();

  // const currentWeight = computed(() => props.gauge.userVotes);
  // const currentWeightNormalized = computed(() => scale(bnum(currentWeight.value), -2).toString());
  // const hasVotes = computed((): boolean => bnum(currentWeight.value).gt(0));

  useEffect(() => {
    setCurrentWeight(props.gauge.userVotes);
    setCurrentWeightNormalized(scale(bnum(currentWeight), -2).toString());
    setHasVotes(bnum(currentWeight).gt(0));
  }, [props.gauge.userVotes]);

  useEffect(() => {
    const voteDisabled = !(!!voteWarning || !!voteError || !hasEnoughVotes);
    setVoteButtonDisabled(voteDisabled);

    if (!!voteError) {
      setVoteInputDisabled(true);
    }
  }, [voteWarning, voteError, hasEnoughVotes]);

  useEffect(() => {
    if (hasVotes) {
      setVoteWeight(currentWeightNormalized);
      setVoteTitle('Edit gauge vote');
      setVoteButtonText('Edit vote');
    } else {
      setVoteTitle('Gauge vote');
      setVoteButtonText('Confirm vote');
    }
  }, [hasVotes]);

  const onClose = () => setIsOpen(false);
  const onOpen = () => setIsOpen(true);

  function isVoteWeightValid(voteWeight: string) {
    if (voteWeight === '') return true;
    const currentValue = scale(voteWeight, 2).toNumber();
    const isValid = currentValue <= props.unallocatedVoteWeight + Number(currentWeight);
    return isValid;
  }

  async function submitVote() {
    if (!voteWeight) {
      return;
    }
    console.log(voteWeight);
    const totalVoteShares = scale(voteWeight, 2).toString();
    console.log('submitting user vote weight of: ' + totalVoteShares);

    try {
      voteForGauge(props.gauge.address, BigNumber.from(totalVoteShares));
    } catch (e) {
      console.error(e);
      const error = e as WalletError;
      setVoteState({
        ...voteState,
        init: false,
        confirming: false,
        error: {
          title: 'Vote failed',
          description: error.message,
        },
      });
    }
  }

  return (
    <>
      <Button variant="stayblack" width={{ base: '90%', lg: '130px' }} onClick={onOpen}>
        Vote
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <BeetsModalContent bg="black" paddingY="2rem" borderRadius="12px">
          <BeetsModalHeader>
            <BeetsModalHeadline textAlign="center" fontSize="1.5rem">
              {voteTitle}
            </BeetsModalHeadline>
          </BeetsModalHeader>

          <BeetsModalBody textAlign="center" fontSize="1.2rem">
            <Box
              display="flex"
              flexDirection="column"
              gap={4}
              padding="2"
              alignItems="flex-start"
              h="full"
            >
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
                  type="number"
                  onChange={(event) => setVoteWeight(event.target.value)}
                  autoComplete="off"
                  autoCorrect="off"
                  spellCheck={false}
                  color="grey.100"
                  step="any"
                  placeholder="0%"
                  disabled={voteInputDisabled}
                  size="md"
                  autoFocus
                />
              </FormControl>
              {!!voteError && <Box>{voteError.description}</Box>}
            </div>
          </BeetsModalBody>

          <HStack alignItems="center" justifyContent="center" width="100%">
            <Button width="40%" variant="verteklight" onClick={onClose}>
              Cancel
            </Button>
            <Button
              width="40%"
              variant="vertekdark"
              disabled={voteButtonDisabled}
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
