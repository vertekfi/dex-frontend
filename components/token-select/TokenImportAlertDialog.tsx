import {
    Alert,
    AlertDialog,
    AlertDialogBody,
    AlertDialogCloseButton,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    AlertIcon,
    Box,
    Button,
    Checkbox,
    HStack,
} from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { AlertTriangle } from 'react-feather';

export function TokenImportAlertDialog({
    onClose,
    isOpen,
    onImport,
}: {
    onClose: () => void;
    onImport: () => void;
    isOpen: boolean;
}) {
    const continueRef = useRef();
    const [checked, setChecked] = useState(false);

    return (
        <AlertDialog
            motionPreset="slideInBottom"
            //@ts-ignore
            leastDestructiveRef={continueRef}
            onClose={onClose}
            isOpen={isOpen}
            isCentered
            size="xl"
           
        >
            <AlertDialogOverlay />

            <AlertDialogContent bgColor="vertek.slate.900">
                <AlertDialogHeader>
                    <HStack>
                        <AlertTriangle />
                        <Box color="white" >Token import</Box>
                    </HStack>
                </AlertDialogHeader>
                <AlertDialogCloseButton />
                <AlertDialogBody >
                    <Alert status="warning" mb="4" bgColor="black">
                        <AlertIcon color="vertek.neonpurple.500" />
                        Anyone can create a token with any name, including fake versions of existing tokens and tokens
                        that claim to represent projects that do not have a token.
                    </Alert>
                    <Alert status="warning" mb="4" bgColor="black">
                        <AlertIcon color="vertek.neonpurple.500" />
                        This interface can load arbitrary tokens by address. Please take extra caution and do your
                        research when interacting with unlisted tokens.
                    </Alert>
                    <Alert status="warning" mb="4" bgColor="black">
                        <AlertIcon color="vertek.neonpurple.500" />
                        If you purchase an unlisted token, you may be unable to sell it back.
                    </Alert>
                </AlertDialogBody>
                <AlertDialogFooter>
                    <Box flex="1">
                        <Checkbox colorScheme="white" isChecked={checked} onChange={(e) => setChecked(e.target.checked)}>
                            I understand
                        </Checkbox>
                    </Box>
                    {/*
                    // @ts-ignore */}
                    <Button ref={continueRef} colorScheme="red" isDisabled={!checked} onClick={onImport}>
                        Continue
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
