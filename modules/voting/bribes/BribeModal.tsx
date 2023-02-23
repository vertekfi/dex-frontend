import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  ModalHeader,
  ModalOverlay,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
} from '@chakra-ui/react';
import { Modal, ModalBody, ModalCloseButton, ModalContent } from '@chakra-ui/modal';
import { useRef, useState } from 'react';
import { TokenSelectModal } from '~/components/token-select/TokenSelectModal';
import { GqlPoolMinimal } from '~/apollo/generated/graphql-codegen-generated';
import { PoolSelectModal } from '~/components/pool-select/PoolSelectModal';
import { useBribeState } from './lib/useBribeState';

interface Props {
  isOpen: boolean;
  onClose(): void;
  poolsWithGauges: any[];
}

export function BribeModal({ isOpen, onClose, poolsWithGauges }: Props) {
  const [isTokenModalOpen, setIsTokenModalOpen] = useState<boolean>(false);
  const [isPoolModalOpen, setIsPoolModalOpen] = useState<boolean>(false);

  const { setSelectedGaugeAddress, isBribeStateValid } = useBribeState();

  console.log(poolsWithGauges);

  const tokenListRef = useRef(null);

  function handleTokenModalOpen() {
    setIsPoolModalOpen(false);
    setIsTokenModalOpen(true);
  }

  function handlePoolModalOpen() {
    setIsTokenModalOpen(false);
    setIsPoolModalOpen(true);
  }

  function onPoolSelected(address: string) {
    const pool = poolsWithGauges.find((p) => p.address === address);
    const gauge = pool?.staking?.gauge?.gaugeAddress;
    setSelectedGaugeAddress(gauge);
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="lg"
      initialFocusRef={tokenListRef}
      finalFocusRef={tokenListRef}
    >
      <ModalOverlay bg="blackAlpha.800" />
      <ModalContent borderWidth={1} borderColor="vertek.neonpurple.500">
        <Box bg="vertek.slatepurple.900">
          <Box className="bg">
            <ModalCloseButton />
            <ModalHeader>Add Bribe</ModalHeader>
            <ModalBody p="0" position="relative">
              <Flex
                p={10}
                gap={10}
                direction="column"
                justifyContent="center"
                alignContent="center"
              >
                <FormControl>
                  <FormLabel>Choose a gauge</FormLabel>
                  <Select
                    onClick={handlePoolModalOpen}
                    size="lg"
                    placeholder="Select"
                    bg="vertek.slatepurple.900"
                    color="vertek.neonpurple.500"
                    variant="filled"
                    onChange={(event) => {
                      //onPageSizeChange && onPageSizeChange(parseInt(event.target.value));
                    }}
                  ></Select>
                </FormControl>

                <FormControl>
                  <FormLabel>Choose Reward Token</FormLabel>
                  <Select
                    onClick={handleTokenModalOpen}
                    size="lg"
                    placeholder="Select"
                    bg="vertek.slatepurple.900"
                    color="vertek.neonpurple.500"
                    variant="filled"
                    onChange={(event) => {
                      //onPageSizeChange && onPageSizeChange(parseInt(event.target.value));
                    }}
                  ></Select>
                </FormControl>

                <FormControl>
                  <FormLabel>Amount</FormLabel>
                  <NumberInput min={0}>
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </FormControl>

                {isTokenModalOpen && (
                  <TokenSelectModal
                    isOpen={isTokenModalOpen}
                    onOpen={() => null}
                    onClose={() => setIsTokenModalOpen(false)}
                    finalFocusRef={tokenListRef}
                  />
                )}

                {isPoolModalOpen && (
                  <PoolSelectModal
                    pools={poolsWithGauges}
                    title="Gauge"
                    onOptionSelected={(address) => onPoolSelected(address)}
                    isOpen={isPoolModalOpen}
                    onOpen={() => null}
                    onClose={() => setIsPoolModalOpen(false)}
                    finalFocusRef={tokenListRef}
                  />
                )}
              </Flex>
            </ModalBody>
          </Box>
        </Box>
      </ModalContent>
    </Modal>
  );
}
