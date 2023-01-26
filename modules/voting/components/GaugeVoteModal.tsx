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
  confirmedAt: string;
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

  const [voteError, setVoteError] = useState<boolean>(false);
  const [voteWarning, setVoteWarning] = useState<boolean>(false);
  const [veBalVoteOverLimitWarning, setVeBalVoteOverLimitWarning] = useState<boolean>(false);

  const [votedToRecentlyWarning, setVotedToRecentlyWarning] = useState<{
    title: string;
    description: string;
  }>();

  // Probably wont need this
  const [voteState, setVoteState] = useState<VoteState>({
    init: false,
    confirming: false,
    confirmed: false,
    confirmedAt: '',
  });

  const { veBalBalance } = useVeVRTK();

  // const currentWeight = computed(() => props.gauge.userVotes);
  // const currentWeightNormalized = computed(() => scale(bnum(currentWeight.value), -2).toString());
  // const hasVotes = computed((): boolean => bnum(currentWeight.value).gt(0));

  useEffect(() => {
    setCurrentWeight(props.gauge.userVotes);
    setCurrentWeightNormalized(scale(bnum(currentWeight), -2).toString());
    setHasVotes(bnum(currentWeight).gt(0));
  }, [props.gauge.userVotes]);

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

  // async function submitVote() {
  //   const totalVoteShares = scale(voteWeight, 2).toString();
  //
  //   try {
  //     voteState.init = true;
  //     voteState.error = null;
  //     const tx = await gaugeControllerService.voteForGaugeWeights(
  //       props.gauge.address,
  //       BigNumber.from(totalVoteShares)
  //     );
  //     voteState.init = false;
  //     voteState.confirming = true;
  //     handleTransaction(tx);
  //   } catch (e) {
  //     console.error(e);
  //     const error = e as WalletError;
  //     voteState.init = false;
  //     voteState.confirming = false;
  //     voteState.error = {
  //       title: 'Vote failed',
  //       description: error.message
  //     };
  //   }
  // }

  // async function handleTransaction(tx) {
  //   addTransaction({
  //     id: tx.hash,
  //     type: 'tx',
  //     action: 'voteForGauge',
  //     summary: t('veBAL.liquidityMining.popover.voteForGauge', [
  //       fNum2(scale(voteWeight, -2).toString(), FNumFormats.percent),
  //       props.gauge.pool.symbol
  //     ]),
  //     details: {
  //       voteWeight: voteWeight
  //     }
  //   });

  //   txListener(tx, {
  //     onTxConfirmed: async (receipt: TransactionReceipt) => {
  //       voteState.receipt = receipt;

  //       const confirmedAt = await getTxConfirmedAt(receipt);
  //       voteState.confirmedAt = dateTimeLabelFor(confirmedAt);
  //       voteState.confirmed = true;
  //       voteState.confirming = false;
  //       emit('success');
  //     },
  //     onTxFailed: () => {
  //       console.error('Vote failed');
  //       voteState.error = {
  //         title: 'Vote Failed',
  //         description: 'Vote failed for an unknown reason'
  //       };
  //       voteState.confirming = false;
  //     }
  //   });
  // }

  return (
    <>
      <Button variant="stayblack" width={{ base: '90%', lg: '130px' }} onClick={onOpen}>
        Vote
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        {/* <ModalOverlay bg="vertek.slatepurple.900" /> */}

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
                {/* <FormLabel color="white">%</FormLabel> */}
                <Input
                  id="voteWeight"
                  name="voteWeight"
                  type="number"
                  // value={voteWeight}
                  onChange={(event) => setVoteWeight(event.target.value)}
                  autoComplete="off"
                  autoCorrect="off"
                  spellCheck={false}
                  color="grey.100"
                  step="any"
                  placeholder="0%"
                  // validateOn="input"
                  // rules={inputRules}
                  // disabled={voteInputDisabled || transactionInProgress || voteState.receipt}
                  size="md"
                  autoFocus
                />
              </FormControl>
            </div>
          </BeetsModalBody>

          <HStack alignItems="center" justifyContent="center" width="100%">
            <Button width="40%" variant="verteklight" onClick={onClose}>
              Cancel
            </Button>
            <Button width="40%" variant="vertekdark">
              Save
            </Button>
          </HStack>
        </BeetsModalContent>
      </Modal>
    </>
  );
}
