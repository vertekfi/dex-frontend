import { Box, ModalHeader, ModalOverlay } from '@chakra-ui/react';
import { Modal, ModalBody, ModalCloseButton, ModalContent } from '@chakra-ui/modal';
import { RefObject, useRef, useState } from 'react';
import { LiquidityGauge } from '~/apollo/generated/graphql-codegen-generated';
import { PoolSelectPoolList } from './PoolSelectPoolList';
import { PoolSelectSearchInput } from './PoolSelectSearchInput';

interface Props {
  gauges: LiquidityGauge[];
  title: string;
  isOpen: boolean;
  onOpen(): void;
  onClose(): void;
  onOptionSelected(address: string): void;
  finalFocusRef: RefObject<HTMLInputElement>;
}

export function PoolSelectModal({
  isOpen,
  onClose,
  finalFocusRef,
  title,
  gauges,
  onOptionSelected,
}: Props) {
  const [searchTerm, setSearchTerm] = useState('');

  const listHeight = 500;
  const initialFocusRef = useRef(null);

  function onPoolRowClick(address: string) {
    onClose();

    setTimeout(() => {
      onOptionSelected(address);
      setSearchTerm('');
    });
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="lg"
      initialFocusRef={initialFocusRef}
      finalFocusRef={finalFocusRef}
    >
      <ModalOverlay bg="blackAlpha.800" />
      <ModalContent borderWidth={1} borderColor="vertek.neonpurple.500">
        <Box bg="vertek.slatepurple.900">
          <Box className="bg">
            <ModalCloseButton />
            <ModalHeader>Select a {title}</ModalHeader>
            <ModalBody p="0" position="relative">
              <Box
                px="6"
                pb="6"
                boxShadow="2xl"
                borderBottomWidth={1}
                borderBottomColor="vertek.neonpurple.500"
              >
                <PoolSelectSearchInput
                  ref={initialFocusRef}
                  placeholder="Search by name..."
                  value={searchTerm}
                  setValue={(value: string) => {
                    setSearchTerm(value);
                  }}
                />
              </Box>
              <PoolSelectPoolList
                gauges={gauges}
                listHeight={listHeight}
                searchTerm={searchTerm}
                onPoolRowClick={(address) => onPoolRowClick(address)}
              />
            </ModalBody>
          </Box>
        </Box>
      </ModalContent>
    </Modal>
  );
}
