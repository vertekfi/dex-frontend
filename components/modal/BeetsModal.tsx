import { ModalBody, ModalBodyProps, ModalContent, ModalContentProps, ModalHeaderProps } from '@chakra-ui/modal';
import { Heading, ModalHeader, Text, TextProps } from '@chakra-ui/react';
import { Box, HeadingProps } from '@chakra-ui/layout';

export function BeetsModalContent(props: ModalContentProps) {
    return (
        <ModalContent bgColor="vertek.slatepurple.900" {...props}>
            <Box 
            bg="vertek.slatepurple.900" 
            boxShadow="0 0 10px #5BC0F8, 0 0 20px #4A4AF6"
            padding="10px"
            borderRadius="12px" 
            >
                <Box className="bg" >{props.children}</Box>
            </Box>
        </ModalContent>
    );
}

export function BeetsModalHeader(props: ModalHeaderProps) {
    return <ModalHeader px="4" {...props} />;
}

export function BeetsModalBody(props: ModalBodyProps) {
    return <ModalBody 
            px="4" 
            pb="6" 
            borderRadius="12px"
            bg="vertek.slatepurple.800" {...props} />;
}

export function BeetsModalHeadline(props: HeadingProps) {
    return <Heading size="md" {...props} />;
}

export function BeetsModalSubHeadline(props: TextProps) {
    return <Text color="gray.200" fontSize="md" {...props} />;
}
