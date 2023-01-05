import { Box, Menu, MenuButton, MenuItem, MenuList, Icon } from '@chakra-ui/react';
import { Check } from 'react-feather';
import { ChevronDownIcon } from '@chakra-ui/icons'


interface Props {
    buttonText: string;
    items: {
        label: string;
        selected?: boolean;
        onClick: () => void;
    }[];
}

export function TextButtonPopupMenu({ buttonText, items }: Props) {
    return (
        <Menu>
            <MenuButton

                fontSize="lg"
                userSelect="none"
                color="vertek.neonpurple.500"
                fontWeight="bold"
                _hover={{ textDecoration: 'underline', cursor: 'pointer' }}
            >
                <Box ml="1" >{buttonText} <ChevronDownIcon /> </Box>

            </MenuButton>
            <MenuList bgColor="vertek.slatepurple.900" p="2" borderColor="vertek.neonpurple.500" shadow="lg">
                {items.map((item, index) => (
                    <MenuItem display="flex" alignItems="center" onClick={item.onClick} key={index}>
                        <Box flex="1">{item.label}</Box>
                        {item.selected ? <Check /> : null}
                    </MenuItem>
                ))}
            </MenuList>
        </Menu>
    );
}
