import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Text,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
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
import { memo } from 'react';
import { useRef, useState } from 'react';
import { TokenSelectModal } from '~/components/token-select/TokenSelectModal';
import { LiquidityGauge } from '~/apollo/generated/graphql-codegen-generated';
import { TokenAvatarSetInList } from '~/components/token/TokenAvatarSetInList';
import { ChevronDownIcon } from '@chakra-ui/icons';
import VirtualList from 'react-tiny-virtual-list';

const MemoizedTokenAvatarSetInList = memo(TokenAvatarSetInList);

interface Props {
  isOpen: boolean;
  onClose(): void;
  gauges: LiquidityGauge[];
}

export function BribeModal({ isOpen, onClose, gauges }: Props) {
  const [isTokenModalOpen, setIsTokenModalOpen] = useState<boolean>(false);

  console.log(gauges);

  const tokenListRef = useRef(null);

  function handleModalClose() {}

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
                <Menu>
                  <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                    Choose Pool
                  </MenuButton>
                  <MenuList
                    bgColor="vertek.neonpurple.500"
                    zIndex="dropdown"
                    maxHeight={'60vh'}
                    overflowY={'scroll'}
                  >
                    {gauges?.map((gauge) => (
                      <>
                        <MenuItem key={gauge.address}>
                          <Flex justifyContent="space-between" width="385px">
                            <MemoizedTokenAvatarSetInList
                              imageSize={28}
                              width={92}
                              tokens={gauge.pool.tokens}
                            />
                            <Text pr="20"> {gauge.pool.name}</Text>
                          </Flex>
                        </MenuItem>
                        <MenuDivider />
                      </>
                    ))}
                  </MenuList>
                </Menu>

                <FormControl>
                  <FormLabel>Choose Reward Token</FormLabel>
                  <Select
                    onClick={() => setIsTokenModalOpen(true)}
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
              </Flex>
            </ModalBody>
          </Box>
        </Box>
      </ModalContent>
    </Modal>
  );
}
