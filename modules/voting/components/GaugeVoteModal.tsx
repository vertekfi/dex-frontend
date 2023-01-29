import { useEffect, useState } from 'react';
import { FormControl, Input, Alert, AlertIcon, AlertTitle, AlertDescription, Skeleton, VStack } from '@chakra-ui/react';
import { BeetsModalBody, BeetsModalContent, BeetsModalHeader, BeetsModalHeadline } from '~/components/modal/BeetsModal';
import { Box, HStack, Modal, Text, Button } from '@chakra-ui/react';
import { VotingGaugeWithVotes } from '~/lib/services/staking/types';
import { TokenAvatarSetInList } from '~/components/token/TokenAvatarSetInList';
import { memo } from 'react';
import { bnum, scale } from '~/lib/util/big-number.utils';
import { useVeVRTK } from '../lib/useVeVRTK';
import { WalletError } from '~/lib/services/web3/web3.service';
import { useGaugeVoting } from '../lib/useGaugeVoting';
import { BigNumber } from 'ethers';
import { useUserVeLockInfoQuery } from '../lib/useUserVeLockInfoQuery';
import { fNum2, FNumFormats } from '~/lib/util/useNumber';
import { useUserAccount } from '~/lib/user/useUserAccount';
import { VeBAL } from '~/lib/services/balancer/contracts/veBAL';
import { useUserData } from '~/lib/user/useUserData';
import { tokenFormatAmount } from '~/lib/services/token/token-util';
import { networkConfig } from '~/lib/config/network-config';
import { numberFormatUSDValue } from '~/lib/util/number-formats';
import { differenceInDays, format } from 'date-fns';
import { PRETTY_DATE_FORMAT } from '../constants';


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

type ErrorMessage = {
  title: string;
  description: string;
};

type VoteState = {
  init: boolean;
  confirming: boolean;
  confirmed: boolean;
  error?: ErrorMessage;
};

export function GaugeVoteModal(props: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [voteTitle, setVoteTitle] = useState<string>('');
  const [voteButtonText, setVoteButtonText] = useState<string>('');
  const [hasEnoughVotes, setHasEnoughVotes] = useState<boolean>();
  const [hasVotes, setHasVotes] = useState<boolean>();
  const [voteWeight, setVoteWeight] = useState<string>('');
  const [currentWeight, setCurrentWeight] = useState<string>('');
  const [currentWeightNormalized, setCurrentWeightNormalized] = useState<string>('');
  const [unallocatedVotesFormatted, setUnallocatedVotesFormatted] = useState<string>();
  const [remainingVotes, setRemainingVotes] = useState<string>();
  const [voteLockedUntilText, setVoteLockedUntilText] = useState<string>('');
  const [voteError, setVoteError] = useState<ErrorMessage>();
  const [noVeBalWarning, setNoVeBalWarning] = useState<ErrorMessage>();
  const [veBalLockTooShortWarning, setVeBalLockTooShortWarning] = useState<{
    title: string;
    description: string;
  }>();
  const [voteWarning, setVoteWarning] = useState<ErrorMessage>();
  const [veBalVoteOverLimitWarning, setVeBalVoteOverLimitWarning] = useState<ErrorMessage>();
  const [votesNextPeriodGt10pct, setVotesNextPeriodGt10pct] = useState<boolean>();
  const [voteButtonDisabled, setVoteButtonDisabled] = useState<boolean>();
  const [voteInputDisabled, setVoteInputDisabled] = useState<boolean>();
  const [votedToRecentlyWarning, setVotedToRecentlyWarning] = useState<ErrorMessage>();
  // Probably wont need this
  const [voteState, setVoteState] = useState<VoteState>({
    init: false,
    confirming: false,
    confirmed: false,
  });


  const { userAddress, isConnected } = useUserAccount();
  const [hasLock, setHasLock] = useState<boolean>(false);
  const [hasExpiredLock, setExpiredHasLock] = useState<boolean>(false);
  const { veBalBalance, veBalTokenInfo } = useVeVRTK();
  

  const [lockInfoDisplay, setLockInfoDisplay] = useState<{
    lockedUntilDays: number;
    lockedUntilDate: string;
    veBalance: string;
    percentOwned: string;
  }>({
    lockedUntilDays: 0,
    lockedUntilDate: '-',
    veBalance: '0',
    percentOwned: '0',
  });
  const { data: userLockInfo } = useUserVeLockInfoQuery();

useEffect(() => {
    if (isConnected && userLockInfo) {
    if (userLockInfo.hasExistingLock && !userLockInfo.isExpired) {
      setHasLock(true);

    const percentOwned = fNum2(
      bnum(userLockInfo.lockedAmount).div(userLockInfo.totalSupply).toString(),
      {
        style: 'percent',
        maximumFractionDigits: 4,
      },
    );
    const lockedUntilDays = differenceInDays(new Date(userLockInfo.lockedEndDate), new Date());
    const veBalance = fNum2(userLockInfo.lockedAmount, FNumFormats.token);
    const lockedUntilDate = format(userLockInfo.lockedEndDate, PRETTY_DATE_FORMAT);
      setLockInfoDisplay({
        lockedUntilDays,
        percentOwned,
        veBalance,
        lockedUntilDate,
        });
      }
      if (userLockInfo.hasExistingLock && userLockInfo.isExpired) {
        setExpiredHasLock(true);
      }
    }
  }, [isConnected, userLockInfo]);

  // const { veBalBalance } = useVeVRTK();
  const { voteForGauge } = useGaugeVoting();
  const { data: veBalLockInfo, isLoading: isVeLoading } = useUserVeLockInfoQuery();
  useEffect(() => {
    const getIt = async () => {
      const userInfo = await new VeBAL().getLockInfo(userAddress);
      console.log(userInfo);
    };
    if (userAddress && isConnected) {
      getIt();
    }
  }, [userAddress, isConnected]);
  useEffect(() => {
    const remainingVotesFormatted = fNum2(
      scale(bnum(props.unallocatedVoteWeight).plus(bnum(currentWeight)), -4).toString(),
      FNumFormats.percent,
    );
    const currentVotesFormatted = fNum2(
      scale(bnum(currentWeight), -4).toString(),
      FNumFormats.percent,
    );

    let remainingVotesText;
    if (!hasEnoughVotes) {
      remainingVotesText = `This exceeds your remaining votes of: ${remainingVotesFormatted}`;
    } else {
      remainingVotesText = hasVotes
        ? `Your remaining votes: ${remainingVotesFormatted} (${currentVotesFormatted} current allocation in this pool + ${unallocatedVotesFormatted}  unallocated votes)`
        : `Your remaining votes: ${remainingVotesFormatted}`;
    }
    setRemainingVotes(remainingVotesText);
  }, [hasEnoughVotes, currentWeight, hasVotes, props.unallocatedVoteWeight]);
  useEffect(() => {
    setUnallocatedVotesFormatted(
      fNum2(scale(bnum(props.unallocatedVoteWeight), -4).toString(), FNumFormats.percent),
    );
  }, [props.unallocatedVoteWeight]);
  useEffect(() => {
    if (props.gauge) {
      const gaugeVoteWeightNormalized = scale(props.gauge.votesNextPeriod, -18);
      setVotesNextPeriodGt10pct(gaugeVoteWeightNormalized.gte(bnum('0.1')));
    }
  }, [props.gauge]);
  useEffect(() => {
    if (votesNextPeriodGt10pct) {
      setVeBalVoteOverLimitWarning({
        title: 'veVRTK CAP HIT: You may be wasting your vote!',
        description:
          'Distributions of weekly emissions to veVRTK holders are capped at 35%. Any votes exceeding this amount at Thursday 0:00 UTC will not be counted.',
      });
    }
  }, [votesNextPeriodGt10pct]);

  useEffect(() => {
    if (!isVeLoading && veBalLockInfo?.hasExistingLock && !veBalLockInfo?.isExpired) {
      const lockEndDate = veBalLockInfo.lockedEndDate;
      if (lockEndDate < Date.now() + MINIMUM_LOCK_TIME) {
        setVeBalLockTooShortWarning({
          title: 'veVRTK not locked for 7 days.',
          description: 'You must have veVRTK locked for more than 7 days to vote on gagues.',
        });
      }
    }
  }, [veBalLockInfo, isVeLoading]);

  useEffect(() => {
    if (
      !isVeLoading && lockInfoDisplay.veBalance === '0'
    ) {
      setNoVeBalWarning({
        title: 'You need some veVRTK to vote on gauges',
        description: 'Get veVRTK by locking up VPT tokens from the 80% VRTK / 20% BNB pool.',
      });
    }
  }, [isVeLoading, lockInfoDisplay.veBalance]);

  useEffect(() => {
    if (isVoteWeightValid(voteWeight)) {
      setHasEnoughVotes(true);
    }
  }, [voteWeight]);

  useEffect(() => {
    if (!!veBalVoteOverLimitWarning) return setVoteWarning(veBalVoteOverLimitWarning);
  }, [veBalVoteOverLimitWarning]);

  useEffect(() => {
    if (!!votedToRecentlyWarning) return setVoteError(votedToRecentlyWarning);
    if (!!noVeBalWarning) return setVoteError(noVeBalWarning);
    if (!!veBalLockTooShortWarning) return setVoteError(veBalLockTooShortWarning);
    if (!!voteState.error) return setVoteError(voteState.error);
  }, [votedToRecentlyWarning, noVeBalWarning, veBalLockTooShortWarning, voteState]);

  useEffect(() => {
    setCurrentWeight(props.gauge.userVotes);
  }, [props.gauge.userVotes]);

  useEffect(() => {
    setCurrentWeightNormalized(scale(bnum(currentWeight), -2).toString());
  }, [currentWeight]);

  useEffect(() => {
    setHasVotes(bnum(currentWeight).gt(0));
  }, [currentWeightNormalized, currentWeight]);

  useEffect(() => {
    if (!!voteError || !hasEnoughVotes) {
      console.log('Not enough votes');
      return setVoteInputDisabled(true);
    }

    const voteDisabled = !(!!voteWarning || !!voteError || !hasEnoughVotes);
    console.log(voteDisabled);
    setVoteButtonDisabled(voteDisabled);
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
  }, [hasVotes, currentWeightNormalized]);

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
    const totalVoteShares = scale(voteWeight, 2).toString();
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
    onClose();
  }

  return (
    <>
<Button variant="stayblack" width={{ base: '90%', lg: '130px' }} onClick={onOpen}>
  Vote  
</Button>
<Modal isOpen={isOpen} onClose={onClose} size="xl">
  <BeetsModalContent bgColor="vertek.slate.900">
    <BeetsModalHeader mt="2">
   
      <BeetsModalHeadline textAlign="center" fontSize="1.5rem">
        {voteTitle}
        <Text fontSize="1rem" color="white">
          veVRTK: {lockInfoDisplay.veBalance} shares
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
       
       


        {!!voteWarning ? (
          <Alert 
          bg="black" flexDirection="column" 
          status="warning" color="white" mt={{base:'2', md:'4'}} borderRadius="12px">
            <Box display="flex" flexDirection="row">
              
                <AlertIcon color="vertek.neonpurple.500" />  
                <AlertTitle fontSize="1rem" >
                    {voteWarning.title}
                </AlertTitle>
            </Box> 
            <AlertDescription fontSize="0.9rem" textAlign="left" lineHeight="1.1rem">
                {voteWarning.description}
            </AlertDescription>
          </Alert>
        ) : (
          
          <div>
            <ul>
              <li>
                Your vote directs future liquidity mining emissions starting from the next
                period on Thursday at 0:00 UTC.
              </li>
              <li>
                Voting power is set at the time of the vote. If you get more veAEQ later,
                resubmit your vote to use your increased power.
              </li>
              <li>
                Votes are timelocked for 10 days. If you vote now, no edits can be made until{' '}
                {voteLockedUntilText}.
              </li>
            </ul>
          </div>
        )}

        {!!voteError && (
          <Alert 
          bg="black" flexDirection="column" 
          status="error" color="white" mt={{base:'2', md:'4'}} borderRadius="12px">
              <Box display="flex" flexDirection="row">
                  <AlertIcon color="beets.green" />  
                  <AlertTitle fontSize="1rem" >
                {voteError.title}</AlertTitle>
              </Box>
              <AlertDescription fontSize="0.9rem" textAlign="left" lineHeight="1.1rem">
                {voteError.description}</AlertDescription>
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
            type="number"
            value={voteWeight}
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
        {!!voteError ? <Box>{voteError.description}</Box> : <Box>{remainingVotes}</Box>}
      </div>
    </BeetsModalBody>

    <HStack alignItems="center" justifyContent="center" width="100%">
      <Button width="40%" variant="verteklight" onClick={onClose}>
        Cancel
      </Button>
      <Button
        width="40%"
        variant="stayblack"
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
