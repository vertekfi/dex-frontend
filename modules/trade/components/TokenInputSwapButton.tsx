import { Button } from '@chakra-ui/button';
import { Box } from '@chakra-ui/layout';
import { Spinner } from '@chakra-ui/react';
import { AnimatePresence, useAnimation } from 'framer-motion';
import { useEffect } from 'react';
import { ChevronsDown } from 'react-feather';
import { AnimatedBox } from '~/components/animation/chakra';

type Props = {
  isLoading?: boolean;
  onSwap?: () => void;
};
export function TokenInputSwapButton({ isLoading, onSwap }: Props) {
  return (
    <Button
      justifyContent="center"
      my="2"
      backgroundColor="gray.600"
      alignItems="center"
      rounded="full"
      border="4px"
      padding="1"
      borderColor="vertek.neonpurple.500"
      zIndex="2"
      role="group"
      _hover={{ borderColor: 'vertek.neonpurple.500', cursor: 'pointer' }}
      _active={{ borderColor: 'white' }}
      _focus={{ outline: 'none' }}
      onClick={onSwap}
    >
      <AnimatePresence>
        <Box
          marginTop="1px"
          color="gray.200"
          css={{
            transform: 'rotate(360deg)',
            transition: 'transform linear .15s',
          }}
          _groupHover={{
            color: 'vertek.neonpurple.500',
            cursor: 'pointer',
            transform: 'rotate(180deg)',
            transition: 'all linear .15s',
          }}
          _groupFocus={{ color: 'vertek.neonpurple.500', cursor: 'pointer' }}
          _groupActive={{
            color: 'white',
            cursor: 'pointer',
            
          }}
        >
          {!isLoading && (
            <AnimatedBox
              display="flex"
              justifyContent="center"
              alignItems="center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ChevronsDown size={24} color="currentColor" />
            </AnimatedBox>
          )}
          {isLoading && (
            <AnimatedBox
              display="flex"
              justifyContent="center"
              alignItems="center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Spinner color="vertek.neonpurple.500" size="sm" marginBottom="1px" />
            </AnimatedBox>
          )}
        </Box>
      </AnimatePresence>
    </Button>
  );
}
