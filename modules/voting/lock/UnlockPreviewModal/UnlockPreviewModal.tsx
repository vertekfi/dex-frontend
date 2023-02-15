import { Box, Modal, ModalCloseButton, ModalContent, ModalOverlay } from '@chakra-ui/react';
import { BeetsModalHeader, BeetsModalHeadline } from '~/components/modal/BeetsModal';
import { useUserVeData } from '../../lib/useUserVeData';
import { UnlockActions } from './components/UnlockActions';
import { UnlockAmount } from './components/UnlockAmount';
import { UnlockSummary } from './components/UnlockSummary';

type Props = {
  lockablePool: any;
  totalLpTokens: string;
  lockEndDate: number;
  currentVeBalance: string;
  isOpen: boolean;
  onClose: () => void;
};

export function UnlockPreviewModal(props: Props) {
  const { refetchUserVeData } = useUserVeData();

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
            //  color="vertek.neonpurple.500"
            mb="2rem"
            mt="-1rem"
          >
            Unlock Preview
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
          <UnlockAmount totalLpTokens={props.totalLpTokens} lockablePool={props.lockablePool} />
        </Box>

        <Box
          bg="vertek.slatepurple.900"
          height="full"
          padding="2"
          boxShadow="2px 24px 12px 0px #000, 0px 0px 12px 4px #000"
          borderRadius="16px"
          mb="2rem"
        >
          <UnlockSummary
            lockablePool={props.lockablePool}
            currentVeBalance={props.currentVeBalance}
            lockEndDate={props.lockEndDate}
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
          <UnlockActions onSuccess={refetchUserVeData} />
        </Box>
      </ModalContent>
    </Modal>
  );
}
