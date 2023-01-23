import { Box, Link, LinkProps } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { NextLink } from '~/components/link/NextLink';

interface Props extends LinkProps {
  children: ReactNode | ReactNode[];
  linkType?: 'internal' | 'external';
  href: string;
}

export function FooterLink({ linkType = 'external', href, ...rest }: Props) {
  return (
    <Box mb="1" fontSize="1rem">
      {linkType === 'internal' ? (
        <NextLink
          chakraProps={{
            color: 'white',
            _hover: { color: 'vertek.neonpurple.500', textDecoration: 'underline'},
          }}
          href={href}
        >
          {rest.children}
        </NextLink>
      ) : (
        <Link
          color="white"
          _hover={{ color: 'vertek.neonpurple.500', 
          textDecoration: 'underline', 
        }}
          alignSelf="flex-start"
          href={href}
          target="_blank"
          {...rest}
        />
      )}
    </Box>
  );
}
