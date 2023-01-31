import { Button, TabProps, HStack, useTab, Box } from '@chakra-ui/react';
import { forwardRef } from 'react';
import { Eye } from 'react-feather';

const BeetsTab = forwardRef((props: { children: any } & TabProps, ref: any) => {
  const tabProps = useTab({ ...props, ref });
  const isSelected = !!tabProps['aria-selected'];

  return (
    <Button
      fontSize="sm"
      rounded="full"
      color={isSelected ? 'gray.100' : 'white'}
      bgColor={isSelected ? 'vertek.neonpurple.500' : 'vertek.neonpurple.900'}
      _hover={{ bgColor: 'vertek.neonpurple.500' }}
      _focus={{ outline: 'none !important' }}
      height="fit-content"
      paddingY="3"
      paddingX="4"
      {...tabProps}
      {...props}
    >
      <HStack>
        <Box>{tabProps.children}</Box>
        {isSelected && <Eye size={16} />}
      </HStack>
    </Button>
  );
});

BeetsTab.displayName = 'BeetsTab';
export default BeetsTab;
