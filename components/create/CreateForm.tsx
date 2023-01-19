import { Modal, Text, ModalOverlay, ModalContent, GridItem, ModalCloseButton, Grid, Box, Button, Flex } from "@chakra-ui/react";
import { BeetsModalBody, BeetsModalContent, BeetsModalHeader, BeetsModalHeadline } from '~/components/modal/BeetsModal';
import { useState } from 'react';
import { FormControl, FormLabel, Input } from '@chakra-ui/react';
import { Calendar } from "react-feather";
import { Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, } from '@chakra-ui/react';

interface Props {
isOpen: boolean;
onClose: () => void;
}

export function CreateForm(props: Props) {
    
return (
    <Modal 
    isOpen={props.isOpen} 
    onClose={props.onClose} 
    size="xl"
    >
    <ModalOverlay bgColor="vertek.slate.900"/> 
    <ModalContent 
    minW='90vw' maxW='90vw' 
    bg="vertek.slatepurple.900" 
    paddingY="2rem" borderRadius="12px" 
    marginTop="1.5rem">
        <ModalCloseButton />
        <BeetsModalHeader>
            <BeetsModalHeadline textAlign="center" fontSize="1.5rem" color="white" mb="12px" mt="-1rem" >
                    Create A Pool
            </BeetsModalHeadline>
        </BeetsModalHeader>
    <BeetsModalBody bgColor="transparent" p="4" textAlign="center" fontSize="1.2rem">
        <Grid pl="4" pr="4" templateColumns={{ base: '1fr 200px 1fr', md: '1fr 400px 1fr' }}>
        <GridItem 
            boxShadow="0 0 5px #fff"
            m="2" 
            bgGradient="linear-gradient(90deg, #302B84 0%, #362BA8 80%, #4132D0 100%)" 
            borderRadius="12px">
            <Box padding="2" borderRadius="12px" mb="6" >
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
            boxShadow="0 0 5px #fff"
            m="2" 
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
                <Box padding="2" bgColor="black" borderRadius="12px" mb="6">
                    <FormControl mb="8" >
                        <Input
                            focusBorderColor="vertek.neonpurple.500"
                            id="voteWeight"
                            name="voteWeight"
                            type="number"
                            // value={voteWeight}
                            // onChange={(event) => setVoteWeight(event.target.value)}
                            autoComplete="off"
                            autoCorrect="off"
                            spellCheck={false}
                            step="any"
                            placeholder="0.00"
                            // validateOn="input"
                            // rules={inputRules}
                            // disabled={voteInputDisabled || transactionInProgress || voteState.receipt}
                            size="md"
                            autoFocus
                            />
                        <FormLabel mt="2" mb="4" color="white" >
                            Balance: 0 
                        </FormLabel>
                    </FormControl>
                </Box>
                <Text 
                align="left" 
                paddingX="3" mb="0" 
                fontWeight="normal" 
                color="white" 
                fontSize="1rem" 
                textDecoration="uppercase" >
                    Lock until
                </Text>
                <Box padding="2" bgColor="black" borderRadius="12px" mb="6">
                    <FormControl mb="8" >
                        <Input id="voteWeight"
                            focusBorderColor="vertek.neonpurple.500"
                            name="voteWeight"
                            type="number"
                            // value={voteWeight}
                            // onChange={(event) => setVoteWeight(event.target.value)}
                            autoComplete="off"
                            autoCorrect="off"
                            spellCheck={false}
                            step="any"
                            placeholder="mm/dd/yyyy"
                            // validateOn="input"
                            // rules={inputRules}
                            // disabled={voteInputDisabled || transactionInProgress || voteState.receipt}
                            size="md"
                            autoFocus
                            />
                            <Box 
                            w="99%" 
                            paddingY="2"
                            paddingX="1"
                            justifyContent="space-between" 
                            display="flex" >
                                <Button variant="stayblacklock">
                                    1w
                                </Button>
                                <Button variant="stayblacklock">
                                    1m
                                </Button>
                                <Button variant="stayblacklock">
                                    3m
                                </Button>
                                <Button variant="stayblacklock">
                                    6m
                                </Button>
                                <Button variant="stayblacklock">
                                    1y
                                </Button>
                        </Box>
                    </FormControl>
                </Box>
                <Box borderRadius="12px" p="4" bgColor="black" mb="6" borderWidth="1px" borderColor="rgba(255, 255, 255, 0.3)" >
                    <Flex align="center">
                        <Text fontSize="0.9rem" mr="auto">Total Voting Escrow</Text>
                        <Text fontSize="0.9rem" ml="auto">0 veVRTK</Text>
                    </Flex>
                </Box>
                
                    <Button variant="stayblack" mb="4" width={{ base: '90%', lg: '100%' }}>
                        Preview
                    </Button>
                </Box>
            </GridItem>
            <GridItem 
            boxShadow="0 0 5px #fff"
            m="2" 
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
