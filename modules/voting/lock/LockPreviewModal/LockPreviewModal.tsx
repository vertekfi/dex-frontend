import { Box, Modal, ModalCloseButton, ModalContent, ModalOverlay } from '@chakra-ui/react';
import { BeetsModalHeader, BeetsModalHeadline } from '~/components/modal/BeetsModal';
import { LockSummary } from './components/LockSummary';
import { LockType } from '../types';
import { PreviewLockAmount } from './components/PreviewLockAmount';
import { LockActions } from './components/LockActions';
import { useUserVeData } from '../../lib/useUserVeData';
import useLockAmount from '../lib/useLockAmount';
import { useLockEndDate } from '../lib/useLockEndDate';
import { tokenFormatAmount } from '~/lib/services/token/token-util';

type Props = {
  lockablePool: any;
  lockType: LockType[];
  currentVeBalance: string;
  isOpen: boolean;
  onClose: () => void;
  lockEndDate: string;
  lockAmount: string;
  totalLpTokens: string;
  expectedVeBalAmount: string;
};

export function LockPreviewModal(props: Props) {
  const { refetchUserVeData } = useUserVeData();

  const { setLockDate } = useLockEndDate();

  const { setLockAmount } = useLockAmount();

  let lockConfirmed = false;
  let title = '';

  if (props.lockType?.length == 1) {
    title = lockConfirmed ? `Extend lock preview confirmed` : 'Extend lock preview';
  } else {
    title = lockConfirmed ? 'Locking confirmed' : 'Locking preview';
  }

  function handleSuccess() {
    lockConfirmed = true;
    refetchUserVeData();
    setLockAmount('');
    setLockDate('');
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
          <PreviewLockAmount
            totalLpTokens={props.totalLpTokens}
            lockablePool={props.lockablePool}
          />
        </Box>

        <Box
          bg="vertek.slatepurple.900"
          height="full"
          padding="2"
          boxShadow="2px 24px 12px 0px #000, 0px 0px 12px 4px #000"
          borderRadius="16px"
          mb="2rem"
        >
          <LockSummary
            expectedVeBalAmount={props.expectedVeBalAmount}
            lockAmount={props.lockAmount}
            lockEndDate={props.lockEndDate}
            totalLpTokens={props.totalLpTokens}
            lockablePool={props.lockablePool}
            currentVeBalance={tokenFormatAmount(props.currentVeBalance || '0')}
            lockType={props.lockType}
          />
        </Box>

        <Box
          bg="vertek.slatepurple.900"
          height="full"
          padding="2"
          boxShadow="2px 24px 12px 0px #000, 0px 0px 12px 4px #000"
          borderRadius="16px"
          mb="2rem"
        >
          <LockActions
            lockAmount={props.lockAmount}
            lockEndDate={props.lockEndDate}
            lockType={props.lockType}
            onSuccess={handleSuccess}
            onClose={props.onClose}
          />
        </Box>
      </ModalContent>
    </Modal>
  );
}
