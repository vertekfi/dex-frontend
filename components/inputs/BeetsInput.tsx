import { Input, InputProps } from '@chakra-ui/input';
import { Box, BoxProps, Heading, HeadingProps, HStack, VStack } from '@chakra-ui/layout';
import PresetSelector from './PresetSelector';
import { Lock } from 'react-feather';
import { forwardRef } from '@chakra-ui/react';

type Props = {
    label?: string;
    secondaryLabel?: string;
    headingProps?: HeadingProps;
    wrapperProps?: BoxProps;
};

export const BeetsInput = forwardRef(
    ({ label, secondaryLabel, children, headingProps, wrapperProps, ...inputProps }: InputProps & Props, ref) => {
        return (
            <Box position="relative" width="full" bg="vertek.slatepurple.900" boxShadow="0px 0px 8px 4px rgba(0, 0, 0, 0.4)"
            borderRadius="md" {...wrapperProps}>
                <HStack >
                    {label && (
                        <Heading
                            position="absolute"
                            top=".5rem"
                            left=".75rem"
                            fontWeight="normal"
                            color="white"
                            size="lg"
                            {...headingProps}
                        >
                            {label}
                        </Heading>
                    )}
                    {secondaryLabel && (
                        <Heading
                            position="absolute"
                            zIndex="dropdown"
                            top=".5rem"
                            right=".75rem"
                            fontWeight="normal"
                            color="white"
                            size="lg"
                            {...headingProps}
                        >
                            {secondaryLabel}
                        </Heading>
                    )}
                </HStack>
                <Input
                    ref={ref}
                    width="full"
                    minHeight="20"
                    height="full"
                    fontSize="lg"
                    fontWeight="semibold"
                    borderColor="transparent"
                    border="1px"
                    bgColor="transparent"
                    paddingTop="5"
                    _hover={{
                        borderColor: 'vertek.slatepurple.500',
                    }}
                    _focus={{
                        outline: 'vertek.slatepurple.500', 
                        borderWidth: '1px', 
                    }}
                    _placeholder={{
                        color: 'vertek.slatepurple.500',
                    }}
                    {...inputProps}
                />
                {children}
            </Box>
        );
    },
);
