import { Button, TabProps, HStack, useTab, Box } from '@chakra-ui/react';
import { forwardRef } from 'react';
import { Eye } from 'react-feather';

const BeetsTab = forwardRef((props: { children: any } & TabProps, ref: any) => {
  const tabProps = useTab({ ...props, ref });
  const isSelected = !!tabProps['aria-selected'];

  return (
    <Button
      fontSize="sm"
      rounded="12px"
      color={isSelected ? 'white' : 'gray.100'}
      bgColor={isSelected ? 'vertek.neonpurple.500' : 'vertek.slatepurple.900'}
      _hover={{ bgColor: 'vertek.neonpurple.500', boxShadow:'none' }}
      _focus={{ outline: 'none !important' }}
      height="fit-content"
      boxShadow="0px 10px 4px #000"
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
