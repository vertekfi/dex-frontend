import { Modal, Text, ModalOverlay, ModalContent, GridItem, ModalCloseButton, Grid, Box, Button, Flex } from "@chakra-ui/react";
import { BeetsModalBody, BeetsModalContent, BeetsModalHeader, BeetsModalHeadline } from '~/components/modal/BeetsModal';
import { useState } from 'react';
import { FormControl, FormLabel, Input } from '@chakra-ui/react';
import { Calendar } from "react-feather";
import { Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, } from '@chakra-ui/react';
import { LockPreview } from "./LockPreview";
import styled from "@emotion/styled";

interface Props {
isOpen: boolean;
onClose: () => void;
}


export function LockForm(props: Props) {
const [isModalOpen, setIsModalOpen] = useState(false);
const handleOpenModal = () => setIsModalOpen(true);

return (
    <Modal 
    isOpen={props.isOpen} 
    onClose={props.onClose} 
    size="xl"
    >
    <ModalOverlay bgColor="vertek.slate.900"/> 
    <ModalContent 
    minW={{ base:'auto', md:'90vw' }} maxW={{base:'auto', md:'90vw'}} 
    bg="vertek.slatepurple.900" 
    paddingY="2rem" borderRadius="12px" 
    marginTop="1.5rem">
        <ModalCloseButton />
        <BeetsModalHeader>
            <BeetsModalHeadline textAlign="center" fontSize="1.5rem" color="white" mb="12px" mt="-1rem" >
                Lock VRTK-WBNB
            </BeetsModalHeadline>
        </BeetsModalHeader>
    <BeetsModalBody bgColor="transparent" p="0" textAlign="center" fontSize="1.2rem">
        <Grid 
        pl={{base: '2', md:'4'}}
        pr={{ base: '2', md:'4'}} 
        templateColumns={{ base: '1fr', md: '2fr 3fr 2fr' }}>
        <GridItem 
            boxShadow={{base:'none', md:'0 0px 10px 1px #fff'}}
            width={{base:'90%', lg:'auto'}}
            m={{ base:'2', md:'2'}}
            bgGradient="linear-gradient(90deg, #302B84 0%, #362BA8 80%, #4132D0 100%)" 
            borderRadius="12px">
                <Box padding={{ base:'2', md:'2'}} borderRadius="12px" mb="6" >
                    <Text align="left" padding="1" mb="4" fontWeight="bold" color="white" fontSize="1.2rem">
                            Lockable tokens in my wallet
                    </Text>
                    <Flex align="center" mt="6">
                            <Text fontSize="1rem" mr="auto">80VRTK-20WBNB</Text>
                            <Text fontSize="1rem" ml="auto">0</Text>
                    </Flex>
                    <Flex align="center" mt="1" >
                            <Text fontSize="1rem" mr="auto">Vertek Governance</Text>
                            <Text fontSize="1rem" ml="auto">$0.00</Text>
                    </Flex>
                    <Flex  
                    mt="8" >
                        <Button 
                        variant="stayblacklock" 
                        as="a"
                        href="/pool/0xc107b351b787e64c0a59a1f44cb393704da07d3f000200000000000000000006"
                        borderWidth="1px" 
                        width="100%" height="2.2rem" >
                            Get VRTK-WBNB
                        </Button>
                    </Flex>
                    </Box>
                    <Box padding="2" borderRadius="12px" mb="6" bgGradient="linear-gradient(90deg, #302B84 0%, #362BA8 80%, #4132D0 100%)">
                    <Text fontSize="1rem" mr="auto">
                    </Text>
                    <Accordion allowToggle padding={1}>
                        <AccordionItem>
                            <AccordionButton _expanded={{}} >
                                <Box flex="1" textAlign="center">
                                How to lock
                                </Box>
                                <AccordionIcon color="black"/>
                            </AccordionButton>
                            
                            <AccordionPanel pb={5} bg="" >
                                <Text align="left" color="white" fontSize="1rem">
                                    1. Invest in the pool. <br />
                                    2. How to lock and earn? 80VRTK-20BNB APT <br />
                                    3. veVRTK holders get boosted liquidity mining yields (up to 2.5x) and increased voting power. <br />
                                    4. Use this voting power to choose which pool gauges get allocated liquidity mining incentives.
                            </Text>
                            </AccordionPanel>
                            </AccordionItem>
                        </Accordion>

                </Box>
            </GridItem>
            <GridItem 
            boxShadow={{base:'none', md:'0 0px 10px 1px #fff'}}
            width={{base:'90%', lg:'auto'}}
            m={{ base:'2', md:'2'}}
            bgGradient="linear-gradient(90deg, #302B84 0%, #362BA8 80%, #4132D0 100%)" 
            borderRadius="12px">
            <Box padding="2" borderRadius="12px" mb="6" bgGradient="linear-gradient(90deg, #302B84 0%, #362BA8 80%, #4132D0 100%)">
                <Text align="left" padding="1" mb="4" fontWeight="bold" color="white" fontSize="1.2rem">
                    Lock to get veVRTK
                </Text>
                <Text 
                align="left" 
                paddingX="3" mb="0" 
                fontWeight="normal"
                color="white" 
                fontSize="1rem" >
                    How much do you want to lock?
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
                            paddingX={{base:'none', md:'1'}}
                            justifyContent="space-between" 
                            display="flex" >
                                <Button variant="stayblacklock" >
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
                
                    <Button 
                    onClick={handleOpenModal} 
                    variant="stayblack" mb="4" width={{ base: '90%', lg: '100%' }}>
                        Preview
                    </Button>
                    {isModalOpen && (
                            <LockPreview
                            isOpen={isModalOpen}
                            onClose={() => setIsModalOpen(false)}
                        />
                        )}
                </Box>
            </GridItem>
            <GridItem 
            boxShadow={{base:'none', md:'0 0px 10px 1px #fff'}}
            width={{base:'90%', lg:'auto'}}
            m={{ base:'2', md:'2'}}
            bgGradient="linear-gradient(90deg, #302B84 0%, #362BA8 80%, #4132D0 100%)" 
            borderRadius="12px">
            <Box padding="2" borderRadius="12px" mb="6" bgGradient="linear-gradient(90deg, #302B84 0%, #362BA8 80%, #4132D0 100%)">
            <Text align="left" padding="1" mb="4" fontWeight="bold" color="white" fontSize="1.2rem">
                    My veVRTK
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
