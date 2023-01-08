import { Box, BoxProps } from '@chakra-ui/react';

interface Props extends BoxProps {}

export function BeetsBox({ children, ...rest }: Props) {
    return (
        <Box bgColor="vertek.slatepurple.900" rounded="lg" {...rest}>
            {children}
        </Box>
    );
}
