import { Flex, IconButton, Box, Input, Link, Menu, MenuButton, MenuItem, MenuList, useDisclosure } from '@chakra-ui/react';
import { Check } from 'react-feather';
import { useSlippage } from '~/lib/global/useSlippage';
import numeral from 'numeral';
import { useState } from 'react';

export function SlippageTextLinkMenu() {
const { isOpen, onOpen, onClose } = useDisclosure();
const { slippage, setSlippage } = useSlippage();
const [custom, setCustom] = useState('');
const customIsValid = custom !== '' && parseFloat(custom) < 50 && parseFloat(custom) >= 0.01;

return (
    <Menu isOpen={isOpen} onClose={onClose} onOpen={onOpen}>
        <MenuButton as={Link} color="#5BC0F8" fontWeight="bold" userSelect="none" textDecoration="underline">
             {numeral(slippage).format('0.0[000]%')}
        </MenuButton>
        <MenuList 
        color="grey.100" 
        bgColor="black" 
        fontWeight="bold"
        padding="2"
        borderRadius="12px">
            <Box borderRadius="12px" bgColor="vertek.slatepurple.900" padding="4"  >
                Slippage Tolerance
            <MenuItem mt="1" 
                borderRadius="12px"
                _focus={{ bg: "vertek.slatepurple.700" }}
                _hover={{ bg: "vertek.neonpurple.500", boxShadow:"0 0 1px 1px white" }} 
                onClick={() => setSlippage('0.001')}>
                    0.1%
            </MenuItem>
            <MenuItem 
          borderRadius="12px"
          _focus={{ bg: "vertek.slatepurple.700" }}
          _hover={{ bg: "vertek.neonpurple.500", boxShadow:"0 0 1px 1px white" }} 
            onClick={() => setSlippage('0.005')}>
                0.5%
            </MenuItem>
            <MenuItem 
           borderRadius="12px"
           _focus={{ bg: "vertek.slatepurple.700" }}
           _hover={{ bg: "vertek.neonpurple.500", boxShadow:"0 0 1px 1px white" }} 
            onClick={() => setSlippage('0.01')}>
                1.0%
            </MenuItem>
            <Flex px="4" pt="2">
                <Input
                    placeholder="Custom"
                    flex="1"
                    fontWeight="bold"
                    width="200px"
                    mr="4"
                    type="number"
                    value={custom}
                    onChange={(e) => setCustom(e.currentTarget.value)}
                    onKeyUp={(e) => {
                        if (e.key === 'Enter' && customIsValid) {
                            setSlippage(`${parseFloat(custom) / 100}`);
                            onClose();
                        }
                    }}
                />

                <IconButton
                    aria-label="save-custom"
                    icon={<Check />}
                    isDisabled={!customIsValid}
                    color="vertek.neonpurple.500"
                    onClick={() => {
                        setSlippage(`${parseFloat(custom) / 100}`);
                        onClose();
                    }}
                />
            </Flex>
            </Box>
        </MenuList>
        
    </Menu>
);
}
