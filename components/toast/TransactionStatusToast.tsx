import { Box, CloseButton, HStack, Link, Progress, Text } from '@chakra-ui/react';
import {
    toastGetTransactionStatusHeadline,
    ToastTransactionStatus,
    BeetsTransactionType,
} from '~/components/toast/toast-util';
import { ExternalLink } from 'react-feather';
import { etherscanGetTxUrl } from '~/lib/util/etherscan';
import { useEffect } from 'react';

interface Props {
    type: BeetsTransactionType;
    status: ToastTransactionStatus;
    text: string;
    txHash: string;
    onClose: () => void;
}

export function TransactionStatusToast({ type, status, text, onClose, txHash }: Props) {
    useEffect(() => {
        if (status === 'PENDING') {
            const timeoutId = setTimeout(() => {
                onClose();
            }, 5000);
            // Return a cleanup function to clear the timeout if the component unmounts or the status changes
            return () => {
                clearTimeout(timeoutId);
            };
        }
    }, [status, onClose]);

    return (
        <Box position="relative" bgColor="black">
            {status === 'PENDING' ? (
                <Progress
                    isIndeterminate
                    size="xs"
                    colorScheme="orange"
                    borderTopLeftRadius="sm"
                    borderTopRightRadius="sm"
                    bg="orange"
                    opacity="0.9"
                />
            ) : (
                <Box
                    height="4px"
                    bg={status === 'CONFIRMED' ? 'vertek.neonpurple.500' : 'beets.red'}
                    borderTopLeftRadius="sm"
                    borderTopRightRadius="sm"
                    opacity="0.9"
                />
            )}
            <Box p="2" borderBottomLeftRadius="sm" borderBottomRightRadius="sm" className="bg">
                <HStack mb="1">
                    <Text fontSize="md" color="white">
                        {toastGetTransactionStatusHeadline(type, status)}
                    </Text>
                    <Link userSelect="none" color="gray.100" href={etherscanGetTxUrl(txHash)} target="_blank">
                        <ExternalLink size={16} />
                    </Link>
                </HStack>
                <Text>{text}</Text>
            </Box>

            <CloseButton position="absolute" top="2" right="1" size="sm" onClick={onClose} />
        </Box>
    );
}
