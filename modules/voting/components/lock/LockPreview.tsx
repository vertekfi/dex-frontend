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
import { useState } from 'react';
import { VeBalLockInfo } from '~/lib/services/balancer/contracts/veBAL';
import { LockType } from './types';
import { TokenInfo } from '~/modules/claim/types';

type Props = {
  //  lockablePool: Pool;
  // lockablePoolTokenInfo: TokenInfo;
  // lockAmount: string;
  // lockEndDate: string;
  // lockType: LockType[];
  // veBalLockInfo: VeBalLockInfo;
  // totalLpTokens: string;
  isOpen: boolean;
  onClose: () => void;
};

export function LockPreview(props: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => setIsModalOpen(true);

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
            Locking Summary
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

        <Box
          bg="vertek.slatepurple.900"
          height="full"
          padding="4"
          boxShadow="2px 24px 12px 0px #000, 0px 0px 12px 4px #000"
          borderRadius="md"
          mb="4"
        >
          <Box
            mt="1"
            pt="2"
            mb=""
            borderRadius="16px"
            justifyContent="center"
            fontWeight="bold"
            fontSize="1.1rem"
            alignItems="center"
            flexDirection="column"
          >
            <Flex align="center" mt="2">
              <Text fontWeight="normal" mr="auto">
                Total amount locked
              </Text>
              <Text ml="auto">$12.10</Text>
            </Flex>
            <Flex align="center" mt="1">
              <Text fontWeight="normal" mr="auto">
                Lock-up end date
              </Text>
              <Text fontWeight="bold" ml="auto">
                17 January 2024{' '}
              </Text>
            </Flex>
            <Flex align="center" mt="1">
              <Text fontWeight="normal" mr="auto">
                Total voting escrow{' '}
              </Text>
              <Text ml="auto">21.81 veVRTK </Text>
            </Flex>
            <Flex mt="8">
              <Button variant="vertekdark" width="100%" height="2.2rem">
                Approve LP for locking
              </Button>
            </Flex>
          </Box>
        </Box>
      </ModalContent>
    </Modal>
  );
}
