import { useRef, useState } from 'react';
import { FormControl, FormLabel, Input } from '@chakra-ui/react';
import { BeetsModalBody, BeetsModalContent, BeetsModalHeader, BeetsModalHeadline } from '~/components/modal/BeetsModal';
import { Box, HStack, Modal, ModalOverlay, Portal, Text, Button } from '@chakra-ui/react';
import { VotingGaugeWithVotes } from '~/lib/services/staking/types';
import { VeBalLockInfo } from '~/lib/services/balancer/contracts/veBAL';
import { TokenAvatarSetInList, TokenAvatarSetInListTokenData } from '~/components/token/TokenAvatarSetInList';
import { memo } from 'react';

type Props = {
    gauge: VotingGaugeWithVotes;
    unallocatedVoteWeight: number;
    logoURIs: string[];
    poolURL: string;
    veBalLockInfo?: VeBalLockInfo;
  };

export function GaugeVoteModal (){
const MINIMUM_LOCK_TIME = 86_400_000 * 7;
// const props = defineProps<Props>();

const [isOpen, setIsOpen] = useState(false);
const onClose = () => setIsOpen(false);
const onOpen = () => setIsOpen(true);
const MemoizedTokenAvatarSetInList = memo(TokenAvatarSetInList);
// const currentWeight = computed(() => props.gauge.userVotes);


// STATE


  return (
    <>
    <Button onClick={onOpen}>Voting Modal</Button>
    
    <Modal
    isOpen={isOpen}
    onClose={onClose}
    size="xl" 
    >
    <ModalOverlay bg="vertek.slatepurple.900" />
    
    <BeetsModalContent bg="black" paddingY="2rem" borderRadius="12px" >
        <BeetsModalHeader>
          <BeetsModalHeadline textAlign="center" fontSize="1.5rem">
            Voting
          </BeetsModalHeadline>
        </BeetsModalHeader>

        <BeetsModalBody textAlign="center" fontSize="1.2rem">
        <Box display="flex" gap={4} alignItems="center" h="full">
            Placeholder text for MemoizedTokenAvatarSetInList
            {/* <MemoizedTokenAvatarSetInList 
                logoURIs={props.logoURIs} width={100} size={32} />
        {props.gauge.pool.name ? (
        <>
            <Text fontWeight="medium" color="black" >
                {props.gauge.pool.name}
            </Text>
            <Text fontSize="sm" color="white">
                {props.gauge.pool.symbol}
            </Text>
        </>
        ) : (
            <Text fontWeight="medium" color="black">
            {props.gauge.pool.symbol}
            </Text>
      )} */}
    </Box>
        <div >
            <FormControl>
            <FormLabel color="white" >
                %
            </FormLabel>
            <Input
            id="voteWeight"
            name="voteWeight"
            type="number"
            // value={voteWeight}
            // onChange={(event) => setVoteWeight(event.target.value)}
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
            step="any"
            placeholder="0"
            // validateOn="input"
            // rules={inputRules}
            // disabled={voteInputDisabled || transactionInProgress || voteState.receipt}
            size="md"
            autoFocus
            />
            </FormControl>
</div>

        </BeetsModalBody>
       
       <HStack alignItems="center" justifyContent="center" width="100%" >
        <Button width="40%" variant="vertekconnect2" onClick={onClose}>
            Cancel
        </Button>
        <Button width="40%" variant="vertekconnect25">
            Save
        </Button>
        </HStack>

      </BeetsModalContent>
    </Modal>

    </>
  );
}
