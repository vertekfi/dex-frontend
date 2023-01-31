import { Box, BoxProps, Text } from '@chakra-ui/react';
import Link from 'next/link';

interface Props extends Omit<BoxProps, 'children'> {
  selected?: boolean;
  href: string;
  text: string;
  isActive: boolean; 
}


export function NavbarLink({ href, selected, text, isActive, ...rest }: any) {
  return (
    <Box {...rest}>
      <Link href={href}>
        <Text
          fontSize="0.9rem"
          margin="12px"
          fontWeight={selected ? '700' : '500'}
          textDecoration={selected ? 'underline' : 'none'}
          textDecorationColor="vertek.neonpurple.500"
          color={selected ? 'white' : 'white'}
          cursor="pointer"
          _hover={{ color: 'vertek.neonpurple.500', fontWeight: '600' }}
          
        >
          {text}
{/*           
            <Box
            position="absolute"
            bottom="0"
            left="0"
            right="0"
            height="2px"
            bg="yellow"
            visibility="visible"
            /> */}

        </Text>
      </Link>
    </Box>
  );
}
