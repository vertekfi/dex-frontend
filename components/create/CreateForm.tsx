import { Modal, Text, ModalOverlay, ModalContent, GridItem, ModalCloseButton, Grid, Box, HStack, Button, Flex } from "@chakra-ui/react";
import { BeetsModalBody, BeetsModalContent, BeetsModalHeader, BeetsModalHeadline } from '~/components/modal/BeetsModal';
import { useState } from 'react';
import { FormControl, FormLabel, Input } from '@chakra-ui/react';
import { Calendar } from "react-feather";
import { CreateInput } from "../inputs/CreateInput";
import { useNetworkConfig } from "~/lib/global/useNetworkConfig";
import { useUserAccount } from "~/lib/user/useUserAccount";
import { useAnimation } from "framer-motion";
import { useUserTokenBalances } from "~/lib/user/useUserTokenBalances";
import { useDisclosure } from "@chakra-ui/react";
import { useGetTokens } from "~/lib/global/useToken";
import { useTradeCard } from "~/modules/trade/lib/useTradeCard";
import { useUserAllowances } from "~/lib/util/useUserAllowances";
import { useRef } from "react";
import { CreateSearch } from "./CreateSearch";

interface Props {
isOpen: boolean;
onClose: () => void;
}

export function CreateForm(props: Props) {
const networkConfig = useNetworkConfig();
const { isConnected } = useUserAccount();
const { isAmountLessThanEqUserBalance, refetch: refetchUserBalances } = useUserTokenBalances();
const controls = useAnimation();
const tokenSelectDisclosure = useDisclosure();
const tradePreviewDisclosure = useDisclosure();
const { getToken, tokens } = useGetTokens();

const {
    sellAmount,
    buyAmount,
    isLoadingOrFetching,
    tokenIn,
    tokenOut,
    setTokenSelectKey,
    handleBuyAmountChanged,
    handleSellAmountChanged,
    handleTokensSwitched,
    refetchTrade,
    sorResponse,
    isNotEnoughLiquidity,
    tradeStartPolling,
    tradeStopPolling,
    isNativeAssetWrap,
    isNativeAssetUnwrap,
    tokenSelectKey,
} = useTradeCard();

const {
    hasApprovalForAmount,
    isLoading: isLoadingAllowances,
    refetch: refetchAllowances,
} = useUserAllowances(tokens.filter((token) => token.address === tokenIn.toLowerCase()));

const tokenInData = getToken(tokenIn);
const isAmountMoreThanUserBalance = !isAmountLessThanEqUserBalance({
    address: tokenIn,
    amount: sellAmount,
});
const isReviewDisabled =
    isLoadingOrFetching ||
    parseFloat(sellAmount || '0') === 0.0 ||
    parseFloat(buyAmount || '0') === 0.0 ||
    isAmountMoreThanUserBalance;
const hasApprovalForSellAmount =
    isLoadingAllowances ||
    !isConnected ||
    (isConnected && hasApprovalForAmount(tokenIn, sellAmount));

const finalRefTokenIn = useRef(null);
const finalRefTokenOut = useRef(null);

function showTokenSelect(tokenKey: 'tokenIn' | 'tokenOut') {
    setTokenSelectKey(tokenKey);
    tokenSelectDisclosure.onOpen();
}

return (
    <Modal 
    isOpen={props.isOpen} 
    onClose={props.onClose} 
    size="xl"
    >
    <ModalOverlay bgColor="vertek.slate.900"/> 
    <ModalContent 
    minW={{ base:'auto', md:'90vw' }} maxW={{base:'auto', md:'95vw'}} 
    bg={`radial-gradient(circle at top center, 
        rgba(77, 63, 236, 0.5) 0%, 
        rgba(0,0,0, 0.8) 70% )`}
    paddingY="2rem" borderRadius="12px" 
    marginTop="1.5rem">
        <ModalCloseButton />
        <BeetsModalHeader>
            <BeetsModalHeadline textAlign="center" fontSize="1.5rem" color="white" mb="12px" mt="-1rem" >
                    Create A Pool
            </BeetsModalHeadline>
        </BeetsModalHeader>
        <BeetsModalBody bgColor="transparent" p="0" textAlign="center" fontSize="1.2rem">
            <Grid 
            pl={{base: '2', md:'4'}}
            pr={{ base: '2', md:'4'}} 
            templateColumns={{ base: '1fr', md: '2fr 3fr 2fr' }}
            gap="8">
            <GridItem 
                boxShadow={{base:'none', md:'none'}}
                width={{base:'90%', lg:'auto'}}
                height={{ base:'auto', lg:'50%'}}
                m={{ base:'2', md:'2'}}
                mt={{ base:'auto', md:'24'}}
                bgGradient="linear-gradient(90deg, #302B84 0%, #362BA8 80%, #4132D0 100%)" 
                borderRadius="12px">
                <Box padding={{ base:'2', md:'2'}} borderRadius="12px" mb="6" >
                    <Text align="left" padding="1" mb="4" fontWeight="bold" color="white" fontSize="1.2rem">
                            Steps to creating your own pool  
                    </Text>
                    <Flex align="left" mt="6">
                            <Text fontSize="1rem">1. Choose tokens and weights</Text>
                            <Text fontSize="1rem" ml="auto"></Text>
                    </Flex>
                    <Flex align="center" mt="4" >
                            <Text fontSize="1rem" mr="auto">2. Set pool fees</Text>
                            <Text fontSize="1rem" ml="auto"></Text>
                    </Flex>
                    <Flex align="center" mt="4" >
                            <Text fontSize="1rem" mr="auto">3. Set initial liquidity</Text>
                            <Text fontSize="1rem" ml="auto"></Text>
                    </Flex>
                    <Flex align="center" mt="4" >
                            <Text fontSize="1rem" mr="auto">4. Confirm pool creation</Text>
                            <Text fontSize="1rem" ml="auto"></Text>
                    </Flex>  
                </Box>
                </GridItem>
                <GridItem 
                boxShadow={{base:'none', md:'none'}}
                width={{base:'90%', lg:'auto'}}
                m={{ base:'2', md:'2'}}
                bgGradient="linear-gradient(90deg, #302B84 0%, #362BA8 80%, #4132D0 100%)" 
                borderRadius="12px">
            <Box padding="2" borderRadius="12px" mb="6" bgGradient="linear-gradient(90deg, #302B84 0%, #362BA8 80%, #4132D0 100%)">
                    <Text align="left" padding="1" mb="4" fontWeight="bold" color="white" fontSize="1.2rem">
                        Choose tokens and weights 
                    </Text>
                    <Text 
                    align="left" 
                    paddingX="3" mb="0" 
                    fontWeight="normal"
                    color="white" 
                    fontSize="1rem" >
                        Token
                    </Text>
                    <Box padding="1" bgColor="black" borderRadius="12px" mb="2" >
                        <CreateInput
                            ref={finalRefTokenIn}
                            label=""
                            address={tokenIn}
                            toggleTokenSelect={() => showTokenSelect('tokenIn')}
                            onChange={handleSellAmountChanged}
                            value={sellAmount}
                            showPresets
                            requiresApproval={!hasApprovalForSellAmount && !isNativeAssetUnwrap}
                        />
                    </Box>
                    <Box padding="1" bgColor="black" borderRadius="12px" mb="2" >
                        <CreateInput
                            ref={finalRefTokenIn}
                            label=""
                            address={tokenIn}
                            toggleTokenSelect={() => showTokenSelect('tokenIn')}
                            onChange={handleSellAmountChanged}
                            value={sellAmount}
                            showPresets
                            requiresApproval={!hasApprovalForSellAmount && !isNativeAssetUnwrap}
                        />
                    </Box>
                        <CreateSearch
                            finalFocusRef={tokenSelectKey === 'tokenIn' ? finalRefTokenIn : finalRefTokenOut}
                            isOpen={tokenSelectDisclosure.isOpen}
                            onOpen={tokenSelectDisclosure.onOpen}
                            onClose={tokenSelectDisclosure.onClose}
                            />
                    <Box padding="1" 
                    bgColor="black" 
                    alignItems="flex-start" justifyContent="flex-start"
                    borderRadius="12px" mb="6" >
                        <HStack width="full" marginY="2" paddingY="2" paddingX="1"  alignItems="center" justifyContent="space-between">
                            <Button variant="stayblack"  >
                            Add a token
                        </Button>
                    </HStack>
                    </Box>
                    <Box padding="1" 
                    bgColor="black" 
                    alignItems="flex-start" justifyContent="flex-start"
                    borderRadius="12px" mb="6" textAlign="left" >
                        Total Allocated
                    </Box>

                    
                        <Button variant="stayblack" mb="4" width={{ base: '90%', lg: '100%' }}>
                            Preview
                        </Button>
                    </Box>
                </GridItem>
                <GridItem 
                boxShadow={{base:'none', md:'none'}}
                width={{base:'90%', lg:'auto'}}
                m={{ base:'2', md:'2'}}
                bgGradient="linear-gradient(90deg, #302B84 0%, #362BA8 80%, #4132D0 100%)" 
                borderRadius="12px">
            <Box padding="2" borderRadius="12px" mb="6" bgGradient="linear-gradient(90deg, #302B84 0%, #362BA8 80%, #4132D0 100%)">
                <Text align="left" padding="1" mb="4" fontWeight="bold" color="white" fontSize="1.2rem">
                        Pool Summary
                        </Text>
                    <Box mt="20" >
                        <Text fontSize="1.2rem" fontWeight="bold" align="center">0 veVRTK</Text>
                    </Box>
                    <Box mt="20" >
                    <Flex align="center">
                            <Text fontSize="1rem" mr="auto">% of total veVRTK</Text>
                            <Text fontSize="1rem" ml="auto">Locked until</Text>
                    </Flex>
                    </Box>
                </Box>
                </GridItem>
            </Grid>
    </BeetsModalBody>
    </ModalContent>
    </Modal>
);
}
