import { Alert, AlertIcon, Box, HStack, Text } from '@chakra-ui/react';
import { memo } from 'react';
import { GqlToken, LiquidityGauge } from '~/apollo/generated/graphql-codegen-generated';
import TokenAvatar from '~/components/token/TokenAvatar';
import { TokenAvatarSetInList } from '~/components/token/TokenAvatarSetInList';
import { numberFormatUSDValue } from '~/lib/util/number-formats';

const MemoizedTokenAvatarSetInList = memo(TokenAvatarSetInList);

type Props = {
  gauge?: LiquidityGauge;
  selectedToken?: GqlToken | null;
  bribeAmount?: {
    amount: string;
    value: number;
  };
};

export function BribeSummary({ gauge, selectedToken, bribeAmount }: Props) {
  return (
    <Box>
      <HStack>
        <Alert status="info">
          <AlertIcon />
          <Text color="black">Voting for your bribe will begin:</Text>
        </Alert>
        {gauge && (
          <>
            <Text fontSize="lg">Gauge: </Text>
            <MemoizedTokenAvatarSetInList imageSize={28} width={92} tokens={gauge.pool.tokens} />
            <Text fontSize="lg">{gauge.pool.name}</Text>
          </>
        )}
      </HStack>
      <HStack mt={3}>
        {selectedToken && (
          <>
            <Text fontSize="lg">Bribe Token: </Text>
            <TokenAvatar address={selectedToken.address} size="xs" />
            <Text fontSize="lg">{selectedToken.symbol}</Text>
          </>
        )}
      </HStack>
      <HStack mt={3}>
        {bribeAmount && (
          <>
            <Text fontSize="lg">Bribe Amount: </Text>
            <Text fontSize="lg">
              {bribeAmount.amount} ({numberFormatUSDValue(bribeAmount.value)})
            </Text>
          </>
        )}
      </HStack>
    </Box>
  );
}
