import {
  Modal,
  Text,
  ModalOverlay,
  ModalContent,
  GridItem,
  ModalCloseButton,
  Grid,
  Box,
  Button,
  Flex,
} from '@chakra-ui/react';
import { BeetsModalHeader, BeetsModalHeadline } from '~/components/modal/BeetsModal';
import { useEffect, useState } from 'react';
import { VeBalLockInfo } from '~/lib/services/balancer/contracts/veBAL';
import { LockTitles, LockType } from '../types';
import { useLockState } from '../lib/useLockState';
import { useVeBalQuery } from '../../../lib/useVeBalQuery';
import { LockSummary } from './LockSummary';
import { expectedVeBal } from '~/modules/voting/lib/useVeVRTK';

type Props = {
  lockablePool: any;
  // lockablePoolTokenInfo: TokenInfo;
  // lockAmount: string;
  lockEndDate: string;
  lockType: LockType[];
  veBalLockInfo?: VeBalLockInfo;
  totalLpTokens: string;
  isOpen: boolean;
  onClose: () => void;
};

export function LockPreview(props: Props) {
  const [title, setTitle] = useState<string>();
  const [lockConfirmed, setLockConfirmed] = useState<boolean>();
  const [expectedVeBalAmount, setExpectedVeBalAmount] = useState<string>();

  const { resetLockState, lockAmount } = useLockState();
  const { refetch: refetchLockInfo } = useVeBalQuery();

  useEffect(() => {
    if (props.lockType.length === 1) {
      setTitle(
        lockConfirmed
          ? LockTitles[props.lockType[0]].confirmed
          : LockTitles[props.lockType[0]].default,
      );
    } else {
      setTitle(
        lockConfirmed
          ? LockTitles[LockType.CREATE_LOCK].confirmed
          : LockTitles[LockType.CREATE_LOCK].default,
      );
    }
  }, [props.lockType]);

  useEffect(() => {
    if (props.totalLpTokens && props.lockEndDate) {
      setExpectedVeBalAmount(expectedVeBal(props.totalLpTokens, props.lockEndDate));
    }
  }, [props.totalLpTokens, props.lockEndDate]);

  function handleClose() {
    props.onClose();
  }

  function handleSuccess() {
    setLockConfirmed(true);
    refetchLockInfo();
    resetLockState();
  }

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} size="md">
      <ModalOverlay
        bg={`radial-gradient(circle at center, 
        #4132D0 0%, 
        rgba(0,0,0, .95) 70% )`}
      />
      <ModalContent
        bgColor="vertek.slate.900"
        paddingX="1rem"
        paddingY="0rem"
        paddingTop="2rem"
        borderRadius="16px"
        alignSelf="center"
        boxShadow="0 0 10px #5BC0F8, 0 0 20px #4A4AF6"
      >
        <ModalCloseButton />
        <BeetsModalHeader>
          <BeetsModalHeadline
            textAlign="center"
            fontSize="1.5rem"
            fontWeight="bold"
            color="vertek.neonpurple.500"
            mb="2rem"
            mt="-1rem"
          >
            {title}
          </BeetsModalHeadline>
        </BeetsModalHeader>
        <Box
          bg="vertek.slatepurple.900"
          height="full"
          padding="2"
          boxShadow="2px 24px 12px 0px #000, 0px 0px 12px 4px #000"
          borderRadius="16px"
          mb="2rem"
        >
          <Box padding="1" borderRadius="16px" display="flex" flexDirection="column">
            <Flex align="center" mt="4">
              <Text fontWeight="bold" fontSize="1rem" mr="auto">
                VPT Tokens{' '}
              </Text>
              <Text fontSize="1rem" fontWeight="bold" ml="auto">
                ____ (Amount designated to lock)
              </Text>
            </Flex>
            <Text align="left" color="gray.200">
              VRTK-BNB{' '}
            </Text>
          </Box>
        </Box>

        <LockSummary
          totalLpTokens={props.totalLpTokens}
          lockAmount={lockAmount}
          lockEndDate={props.lockEndDate}
          lockType={props.lockType}
          expectedVeBalAmount={expectedVeBalAmount || '0'}
          lockablePool={props.lockablePool}
          veBalLockInfo={props.veBalLockInfo}
        />
      </ModalContent>
    </Modal>
  );
}
