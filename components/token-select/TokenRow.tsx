import { Box, HStack, Text } from '@chakra-ui/layout';
import TokenAvatar from '~/components/token/TokenAvatar';
import { tokenFormatAmount } from '~/lib/services/token/token-util';
import { numberFormatUSDValue } from '~/lib/util/number-formats';
import { Input, VStack } from '@chakra-ui/react';
import { useGetTokens } from '~/lib/global/useToken';
import { GqlPoolToken } from '~/apollo/generated/graphql-codegen-generated';
import { TokenSelectInline } from '../token-select-inline/TokenSelectInline';
import { tokenInputBlockInvalidCharacters } from '~/lib/util/input-util';

type Props = {
  address: string;
  amount: string;
  imported?: boolean;
  withInput?: boolean;
  withSlider?: boolean;
  alternateTokens?: GqlPoolToken[];
  onSelectedAlternateToken?: (address: string) => void;
  selectedAlternateToken?: string;
  onAmountChange?: (amount: string) => void;
  balance?: string;
};

export function TokenRow({
  address,
  selectedAlternateToken = '',
  onSelectedAlternateToken,
  onAmountChange,
  withInput,
  alternateTokens = [],
  amount,
  balance,
}: Props) {
  const { getToken, priceForAmount } = useGetTokens();
  const token = getToken(address);

  const _onSelectedAlternateToken = (address: string) => {
    onSelectedAlternateToken && onSelectedAlternateToken(address);
  };

  const _onAmountChange = (amount: string) => {
    onAmountChange && onAmountChange(amount);
  };

  return (
    <HStack width="full" justifyContent="space-between" key={address}>
      {alternateTokens.length > 1 ? (
        <Box flex="1">
          <TokenSelectInline
            tokenOptions={alternateTokens}
            selectedAddress={selectedAlternateToken}
            onOptionSelect={_onSelectedAlternateToken}
          />
        </Box>
      ) : (
        <HStack>
          <TokenAvatar width="40px" height="40px" address={address} />
          <Box>
            {token?.name}
            <HStack spacing="1">
              <Text fontWeight="bold">{token?.symbol}</Text>
            </HStack>
          </Box>
        </HStack>
      )}
      <VStack alignItems="flex-end" spacing="0">
        {withInput && (
          <Input
            type="number"
            min={0}
            placeholder="12.4.."
            textAlign="right"
            value={amount || ''}
            onChange={(e) => {
              _onAmountChange(e.currentTarget.value);
            }}
            _hover={{ borderColor: 'gray.200' }}
            _focus={{ outline: 'none' }}
            _placeholder={{ color: 'gray.400' }}
            color="gray.100"
            borderColor="transparent"
            border="2px"
            bgColor="blackAlpha.400"
            fontWeight="semibold"
            onKeyDown={tokenInputBlockInvalidCharacters}
            width="full"
            pr="1"
            pl="2"
            height="32px"
          />
        )}
        {!withInput && <Text>{tokenFormatAmount(amount)}</Text>}
        <Text fontSize="sm" color="beets.base.100">
          {numberFormatUSDValue(
            priceForAmount({
              address,
              amount,
            }),
          )}
        </Text>
        {balance && (
          <Text fontSize="sm" color="gray.100">
            You have {tokenFormatAmount(balance || '0')}
          </Text>
        )}
      </VStack>
    </HStack>
  );
}
