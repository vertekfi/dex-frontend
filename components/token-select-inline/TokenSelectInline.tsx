import {
  Menu,
  MenuItem,
  MenuList,
  MenuButton,
  Button,
  useTheme,
  Text,
  HStack,
  Flex,
} from '@chakra-ui/react';
import { Check, ChevronDown } from 'react-feather';
import { GqlPoolToken } from '~/apollo/generated/graphql-codegen-generated';
import TokenAvatar from '~/components/token/TokenAvatar';

interface Props {
  tokenOptions: GqlPoolToken[];
  selectedAddress: string;
  onOptionSelect: (address: string) => void;
  minimal?: boolean;
}

export function TokenSelectInline({
  tokenOptions,
  selectedAddress,
  onOptionSelect,
  minimal,
}: Props) {
  const theme = useTheme();
  const selectedToken = tokenOptions.find((option) => option.address === selectedAddress);

  return (
    <Menu>
      {({ isOpen }) => (
        <>
          <MenuButton
            isActive={isOpen}
            as={Button}
            rightIcon={<ChevronDown color={theme.colors.vertek.neonpurple['500']} />}
            bgColor="transparent"
            borderWidth="1px"
            _hover={{ backgroundColor: 'vertek.slatepurple.800' }}
            _active={{ backgroundColor: 'vertek.slatepurple.800' }}
            px="1.5"
          >
            <HStack spacing="1.5" flex="1">
              <TokenAvatar size="xs" address={selectedAddress} />
              <Text color="gray.100" fontWeight="normal">
                {selectedToken?.symbol}
              </Text>
            </HStack>
          </MenuButton>
          <MenuList bgColor="vertek.slatepurple.700" borderWidth="2px">
            {tokenOptions.map((option) => (
              <MenuItem
                bgColor="vertek.slatepurple.700"
                borderWidth="1px"
                _hover={{ backgroundColor: 'vertek.slatepurple.800' }}
                _focus={{ backgroundColor: 'vertek.slatepurple.800' }}
                _active={{ backgroundColor: 'vertek.slatepurple.800' }}
                key={option.address}
                display="flex"
                onClick={() => onOptionSelect(option.address)}
              >
                <HStack spacing="1.5" flex="1">
                  <TokenAvatar width="20px" height="20px" address={option.address} />
                  <Text color="gray.100" fontWeight="normal">
                    {option.symbol}
                  </Text>
                </HStack>
                {option.address === selectedAddress ? <Check /> : null}
              </MenuItem>
            ))}
          </MenuList>
        </>
      )}
    </Menu>
  );
}
