import { Box, BoxProps, Text } from '@chakra-ui/react';
import Link from 'next/link';

interface Props extends Omit<BoxProps, 'children'> {
  selected?: boolean;
  href: string;
  text: string;
}
const shadow = {
  textShadow: '0px 0px 201.6px #ECA833, 0px 0px 115.2px #ECA833, 0px 0px 67.2px #ECA833, 0px 0px 33.6px #ECA833, 0px 0px 9.6px #ECA833, 0px 0px 4.8px #ECA833', 
  background: '#ECA833', 
  position: 'absolute', 
  height: '3px', 
  left: '0px', 
  right: '0px',   
  bottom: '-1px', 
}

export function NavbarLink({ href, selected, text, ...rest }: Props) {
  return (
    <Box {...rest}>
      <Link href={href}>
        <Text
          fontSize="md"
          margin="16px"
          // sx={shadow}
          fontWeight={selected ? '600' : '500'}
          color={selected ? 'white' : 'vertek.slate.400'}
          cursor="pointer"
          _hover={{ color: 'vertek.gold.400' }}
        >
          {text}
        </Text>
      </Link>
    </Box>
  );
}
