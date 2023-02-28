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
  Text,
} from '@chakra-ui/react';
import { Modal, ModalBody, ModalCloseButton, ModalContent } from '@chakra-ui/modal';
import { useEffect, useRef, useState } from 'react';
import { TokenSelectModal } from '~/components/token-select/TokenSelectModal';
import { PoolSelectModal } from '~/components/pool-select/PoolSelectModal';
import { BribeSummary } from './BribeSummary';
import { GqlToken, LiquidityGauge } from '~/apollo/generated/graphql-codegen-generated';
import { useGetTokens } from '~/lib/global/useToken';
import { useSubmitBribe } from './lib/useSubmitBribe';
import { parseUnits } from 'ethers/lib/utils';
import { useAllowances } from '~/lib/util/useAllowances';
import { useUserAccount } from '~/lib/user/useUserAccount';
import { networkConfig } from '~/lib/config/network-config';
import { BeetsTokenApprovalButton } from '~/components/button/BeetsTokenApprovalButton';

interface Props {
  isOpen: boolean;
  onClose(): void;
  poolsWithGauges: any[];
}

export function BribeModal({ isOpen, onClose, poolsWithGauges }: Props) {
  const [isTokenModalOpen, setIsTokenModalOpen] = useState<boolean>(false);
  const [isPoolModalOpen, setIsPoolModalOpen] = useState<boolean>(false);
  const [selectedGauge, setSelectedGauge] = useState<LiquidityGauge>();
  const [selectedToken, setSelectedToken] = useState<GqlToken | null>();
  const [bribeAmount, setBribeAmount] = useState<{
    amount: string;
    value: number;
  }>();
  const [bribeConfirmed, setBribeConfirmed] = useState<boolean>(false);

  const { userAddress } = useUserAccount();
  const { getToken, priceForAmount, tokens } = useGetTokens();
  const { submitBribeForGauge, txState } = useSubmitBribe();

  const { hasApprovalForAmount, refetch: refetchAllowances } = useAllowances(
    userAddress || null,
    tokens,
    networkConfig.vertek.bribeManager,
  );

  useEffect(() => {
    if (txState.error) {
      console.log(txState.error);
    }

    if (txState.isConfirmed) {
      setBribeConfirmed(true);
    }
  }, [txState]);

  const tokenListRef = useRef(null);
  const isValidBribe = !!selectedGauge && !!selectedToken && !!bribeAmount;

  function handleTokenModalOpen() {
    setIsPoolModalOpen(false);
    setIsTokenModalOpen(true);
  }

  function handlePoolModalOpen() {
    setIsTokenModalOpen(false);
    setIsPoolModalOpen(true);
  }

  function onPoolGaugeSelected(gaugeAddress: string) {
    const gauge = poolsWithGauges.find((g) => g.address === gaugeAddress);
    setSelectedGauge(gauge);
  }

  function handleTokenSelected(address: string) {
    const token = getToken(address);
    setSelectedToken(token);
  }

  function handleSelectedTokenAmount(amount: string, amountNum: number) {
    const value = priceForAmount({
      address: selectedToken?.address || '',
      amount,
    });

    setBribeAmount({
      amount,
      value,
    });
  }

  function handleSubmitBribe() {
    if (isValidBribe) {
      submitBribeForGauge(
        selectedToken?.address,
        parseUnits(bribeAmount.amount),
        selectedGauge?.address,
      );
    }
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
                <Box>
                  <BribeSummary
                    gauge={selectedGauge}
                    selectedToken={selectedToken}
                    bribeAmount={bribeAmount}
                  />
                </Box>

                {bribeConfirmed ? (
                  <Box>
                    <Text>Your bribe has been added</Text>

                    <Button
                      variant="vertekdark"
                      padding="1em"
                      borderRadius="10px"
                      borderWidth="1px"
                      alignItems="center"
                      height="2em"
                      onClick={onClose}
                    >
                      Close
                    </Button>
                  </Box>
                ) : (
                  <>
                    <FormControl>
                      <FormLabel>Choose a gauge</FormLabel>
                      <Select
                        onClick={handlePoolModalOpen}
                        size="lg"
                        placeholder="Select"
                        bg="vertek.slatepurple.900"
                        color="vertek.neonpurple.500"
                        variant="filled"
                        // onChange={(event) => {}}
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
                        onChange={(event) => {}}
                      ></Select>
                    </FormControl>

                    <FormControl>
                      <FormLabel>Amount</FormLabel>
                      <NumberInput
                        min={0}
                        onChange={handleSelectedTokenAmount}
                        isDisabled={!selectedToken}
                      >
                        <NumberInputField />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                    </FormControl>

                    {/* <FormControl>
                  <FormLabel>Protcol ID (optional)</FormLabel>

                  <Input type="text" />
                </FormControl> */}

                    {isValidBribe &&
                    !hasApprovalForAmount(selectedToken.address, bribeAmount.amount) ? (
                      <BeetsTokenApprovalButton
                        tokenWithAmount={{
                          symbol: selectedToken?.symbol || '',
                          address: selectedToken?.address || '',
                          name: selectedToken?.name || '',
                          decimals: selectedToken?.decimals || 18,
                          amount: bribeAmount?.amount || '',
                        }}
                        contractToApprove={networkConfig.vertek.bribeManager}
                        onConfirmed={() => {
                          refetchAllowances();
                        }}
                        size="lg"
                      />
                    ) : (
                      <Button
                        variant="vertekdark"
                        padding="1em"
                        borderRadius="10px"
                        borderWidth="1px"
                        alignItems="center"
                        height="2em"
                        disabled={!isValidBribe || txState.isPending}
                        onClick={handleSubmitBribe}
                      >
                        Submit
                      </Button>
                    )}

                    {isTokenModalOpen && (
                      <TokenSelectModal
                        title="Select Bribe Token"
                        onTokenSelect={handleTokenSelected}
                        isOpen={isTokenModalOpen}
                        onOpen={() => null}
                        onClose={() => setIsTokenModalOpen(false)}
                        finalFocusRef={tokenListRef}
                      />
                    )}

                    {isPoolModalOpen && (
                      <PoolSelectModal
                        gauges={poolsWithGauges}
                        title="Gauge"
                        onOptionSelected={(address) => onPoolGaugeSelected(address)}
                        isOpen={isPoolModalOpen}
                        onOpen={() => null}
                        onClose={() => setIsPoolModalOpen(false)}
                        finalFocusRef={tokenListRef}
                      />
                    )}
                  </>
                )}
              </Flex>
            </ModalBody>
          </Box>
        </Box>
      </ModalContent>
    </Modal>
  );
}
