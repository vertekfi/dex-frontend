import { Modal, ModalBody, ModalCloseButton, ModalContent } from '@chakra-ui/modal';
import {
  Button,
  Heading,
  IconButton,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { PoolInvestProportional } from '~/modules/pool/invest/components/PoolInvestProportional';
import { ChevronLeft } from 'react-feather';
import { PoolInvestPreview } from '~/modules/pool/invest/components/PoolInvestPreview';
import { useEffect, useRef, useState } from 'react';
import { PoolInvestTypeChoice } from '~/modules/pool/invest/components/PoolInvestTypeChoice';
import { PoolInvestCustom } from '~/modules/pool/invest/components/PoolInvestCustom';
import { motion } from 'framer-motion';
import { useInvestState } from '~/modules/pool/invest/lib/useInvestState';
import { usePool } from '~/modules/pool/lib/usePool';
import { usePoolUserTokenBalancesInWallet } from '~/modules/pool/lib/usePoolUserTokenBalancesInWallet';

export function PoolInvestModal() {
const { isOpen, onOpen, onClose } = useDisclosure();
const { pool, formattedTypeName } = usePool();
const [modalState, setModalState] = useState<'start' | 'proportional' | 'custom' | 'preview'>(
  'start',
);
const [type, setInvestType] = useState<'proportional' | 'custom' | null>(null);
const initialRef = useRef(null);
const [investComplete, setInvestComplete] = useState(false);
const { clearInvestState, setSelectedOptions, hasSelectedOptions } = useInvestState();
const { optionsWithLargestBalances } = usePoolUserTokenBalancesInWallet();

useEffect(() => {
  if (modalState !== 'start') {
    setModalState('start');
  }
  clearInvestState();
}, [pool.id]);

useEffect(() => {
  if (isOpen && !hasSelectedOptions) {
    setSelectedOptions(optionsWithLargestBalances);
  }
}, [isOpen]);

function onModalClose() {
  onClose();
  setModalState('start');
  setInvestType(null);
  clearInvestState();
}
return (
<>
  <Button 
    mb={{ base:'3', md:'0'}}
    variant="verteklight" 
    onClick={onOpen} 
    width={{ base: 'full', md: '140px' }} 
    mr="2"
    _hover={{ 
      boxShadow: '0 0 10px #5BC0F8, 0 0 20px #4A4AF6', 
      background: 'vertek.slate.900', 
      color: 'white', 
      borderWidth: '2px', 
      borderColor: 'vertek.neonpurple.500', 
      transform: 'scale(1.01)' 
      }}
    >
        Invest
  </Button>
  <Modal
    isOpen={isOpen}
    onClose={onModalClose}
    size={modalState === 'start' ? '3xl' : '2xl'}
    initialFocusRef={initialRef} 
    >
    
    <ModalOverlay 
      bg=
      {`radial-gradient(circle at center, 
          #4132D0 0%, 
          rgba(0,0,0, 0.8) 70% )`}
      />
      <ModalContent 
        bgColor="rgba(0, 0, 0, 0.8)"
        boxShadow="0 0 10px #5BC0F8, 0 0 20px #4A4AF6"
        borderRadius="16px"
        mb="2"
        padding="4"
      >
      <ModalCloseButton />
      {modalState !== 'start' ? (
        <IconButton
          aria-label={'back-button'}
          icon={<ChevronLeft />}
          variant="ghost"
          p="0"
          width="32px"
          height="32px"
          minWidth="32px"
          position="absolute"
          top="8px"
          left="12px"
          onClick={() => {
            if (modalState === 'proportional' || modalState === 'custom') {
              setModalState('start');
            } else if (modalState === 'preview') {
              if (type === 'proportional') {
                setModalState('proportional');
              } else if (type === 'custom') {
                setModalState('custom');
              }
            }
          }}
        />
      ) : null}
      <ModalHeader className="bg">
        {modalState === 'start' ? (
          <>
            <Heading size="lg" noOfLines={1}>
              Invest into {pool.name}
            </Heading>
            <Text color="vertek.neonpurple.500" fontSize="md">
              {formattedTypeName}
            </Text>
          </>
        ) : null}

        {modalState === 'proportional' ? (
          <Heading size="md" textAlign="center">
            Proportional investment
          </Heading>
        ) : null}

        {modalState === 'custom' ? (
          <Heading size="lg" textAlign="center">
            Custom investment
          </Heading>
        ) : null}

        {modalState === 'preview' ? (
          <Heading size="md" textAlign="center">
            Investment preview
          </Heading>
        ) : null}
      </ModalHeader>
      <ModalBody className="bg" pb="2">
        {modalState === 'start' ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <PoolInvestTypeChoice
              onShowProportional={() => {
                setInvestType('proportional');
                setModalState('proportional');
              }}
              onShowCustom={() => {
                setInvestType('custom');
                setModalState('custom');
              }}
            />
          </motion.div>
        ) : null}

        {modalState === 'proportional' ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <PoolInvestProportional
              onShowPreview={() => {
                setInvestType('proportional');
                setModalState('preview');
              }}
            />
          </motion.div>
        ) : null}
        {modalState === 'custom' ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <PoolInvestCustom
              onShowPreview={() => {
                setInvestType('custom');
                setModalState('preview');
              }}
            />
          </motion.div>
        ) : null}
        {modalState === 'preview' ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <PoolInvestPreview
              onInvestComplete={() => {
                setInvestComplete(true);
              }}
              onClose={onModalClose}
            />
          </motion.div>
        ) : null}
      </ModalBody>
    </ModalContent>
  </Modal>
</>
);
}
