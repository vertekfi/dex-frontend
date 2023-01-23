import { forwardRef, Box, Button, Text, VStack, HStack, Tooltip, Skeleton } from '@chakra-ui/react';
import { useGetTokens } from '~/lib/global/useToken';
import TokenAvatar from '../token/TokenAvatar';
import { BeetsInput } from './BeetsInput';
import {
tokenFormatAmountPrecise,
tokenGetAmountForAddress,
} from '~/lib/services/token/token-util';
import { useUserTokenBalances } from '~/lib/user/useUserTokenBalances';
import { useUserAccount } from '~/lib/user/useUserAccount';
import PresetSelector from './PresetSelector';
import { ChevronDown, Lock } from 'react-feather';
import {
tokenInputBlockInvalidCharacters,
tokenInputTruncateDecimalPlaces,
} from '~/lib/util/input-util';
import { numberFormatLargeUsdValue } from '~/lib/util/number-formats';
import { oldBnumScaleAmount } from '~/lib/services/pool/lib/old-big-number';
import { formatFixed } from '@ethersproject/bignumber';
import { LockIcon, SmallCloseIcon } from '@chakra-ui/icons';

type Props = {
label?: string;
toggleTokenSelect?: () => void;
address: string | null;
onChange?: (event: { currentTarget: { value: string } }) => void;
value?: string | null;
showBalance?: boolean;
showPresets?: boolean;
requiresApproval?: boolean;
};

export const CreateInput = forwardRef(
(
{ label, toggleTokenSelect, address, onChange, value, requiresApproval, showPresets }: Props,
ref,
) => {
const { getToken, priceForAmount } = useGetTokens();
const { userAddress, isConnected } = useUserAccount();
const { userBalances, isLoading } = useUserTokenBalances();
const userBalance = address ? tokenGetAmountForAddress(address, userBalances) : '0';
const token = getToken(address || '');
const decimalPlaces = token ? token.decimals : 18;

const handleOnChange = (event: { currentTarget: { value: string } }) => {
    const newValue = tokenInputTruncateDecimalPlaces(event.currentTarget.value, decimalPlaces);

    onChange && onChange({ currentTarget: { value: newValue } });
};

const handlePresetSelected = (preset: number) => {
    const scaledAmount = oldBnumScaleAmount(userBalance, token?.decimals)
    .times(preset)
    .toFixed(0);

    handleOnChange({ currentTarget: { value: formatFixed(scaledAmount, token?.decimals) } });
};

return (
<HStack width="full" marginY="2" paddingY="2" paddingX="1"  alignItems="center" justifyContent="space-between">
    <Box bgColor="vertek.slatepurple.900" padding="2" borderRadius="8px" position="relative" width="60%" height="50px">
        <Box position="absolute" left=".75rem" top="50%" transform="translateY(-50%)" zIndex="2">
            <VStack spacing="none">
                <Button
                height="fit-content"
                paddingY="1"
                onClick={toggleTokenSelect}
                backgroundColor="transparent"
                _hover={{ backgroundColor: 'vertek.neonpurple.500', color: 'white' }}
                paddingX="1"
                _focus={{ boxShadow: 'none' }}
                >
                <HStack spacing="none">
                    <TokenAvatar
                    size="xs"
                    address={address || '0xB98d4C97425d9908E8a53bEec2cF6A5CCA9bFDD5'}
                    />
                    <Text fontSize="lg" paddingLeft="2">
                    {token?.symbol}
                    </Text>
                    <Box marginLeft="1">
                    <ChevronDown size={16} />
                    </Box>
                </HStack>
                </Button>
            </VStack>
        </Box>
    </Box>
    <Box display="flex" justifyContent="center" alignItems="center" marginX="2" flexDirection="row" >
        <Box mx="4">
            %
        </Box>
        <Box mx="2">
           <LockIcon />
        </Box>
        <Box mx="2">
            <SmallCloseIcon />
        </Box>
    </Box>
</HStack>
);
},
);
