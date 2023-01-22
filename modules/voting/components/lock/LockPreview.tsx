import { Modal, Text, ModalOverlay, ModalContent, GridItem, ModalCloseButton, Grid, Box, Button, Flex } from "@chakra-ui/react";
import { BeetsModalBody, BeetsModalContent, BeetsModalHeader, BeetsModalHeadline } from '~/components/modal/BeetsModal';
import { FormControl, FormLabel, Input } from '@chakra-ui/react';
import { Calendar } from "react-feather";
import { useState } from "react";
import { Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, } from '@chakra-ui/react';

interface Props {
isOpen: boolean;
onClose: () => void;
}

export function LockPreview(props: Props) {
const [isModalOpen, setIsModalOpen] = useState(false);
const handleOpenModal = () => setIsModalOpen(true);
return (
<Modal 
isOpen={props.isOpen} 
onClose={props.onClose} 
size="md" >
    <ModalOverlay 
    bg=
        {`radial-gradient(circle at center, 
            #4132D0 0%, 
            rgba(0,0,0, 0.8) 70% )`}
        />
    <ModalContent 
    bg="black" 
    paddingY="2rem" 
    borderRadius="24px" 
    alignSelf="center" >
        <ModalCloseButton />
        <BeetsModalHeader>
            <BeetsModalHeadline textAlign="center" fontSize="1.5rem" color="white" mb="12px" mt="-1rem" >
                Locking Preview
            </BeetsModalHeadline>
        </BeetsModalHeader>
        <Box padding="4">
            <Box 
            padding="12px" 
            borderRadius="12px" 
            display="flex" 
            flexDirection="column" 
            alignItems="flex-start" 
            borderWidth="1px" 
            borderColor="vertek.neonpurple.500"          
            >
                <Text align="left">
                    VPT Tokens 
                </Text>
                <Text align="left">
                    80% VRTK/20% WBNB 
                </Text>
            </Box>
        </Box>
        <Box padding="4">
            <Text textAlign="center" fontWeight="bold">
                Locking summary 
            </Text>
            <Flex align="center" mt="6">
                        <Text fontSize="1rem" mr="auto">Total to lock</Text>
                        <Text fontSize="1rem" ml="auto">$12.10</Text>
                </Flex>
                <Flex align="center" mt="1" >
                        <Text fontSize="1rem" mr="auto">Lock-up end date</Text>
                        <Text fontSize="1rem" ml="auto">17 January 2024 </Text>
                </Flex>
                <Flex align="center" mt="1" >
                        <Text fontSize="1rem" mr="auto">Total voting escrow </Text>
                        <Text fontSize="1rem" ml="auto">21.81 veVRTK </Text>
                </Flex>
        </Box>
        <Flex  
            mt="8" >
                <Button 
                variant="stayblacklock" 
                borderWidth="1px" 
                width="100%" height="2.2rem" >
                    Approve LP for locking
                </Button>
    </Flex>
    </ModalContent>
</Modal>
);
}
