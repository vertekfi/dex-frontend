import { Alert, AlertIcon, Box, Flex, HStack, Text } from '@chakra-ui/react';
import { memo } from 'react';
import { GqlToken, LiquidityGauge } from '~/apollo/generated/graphql-codegen-generated';
import TokenAvatar from '~/components/token/TokenAvatar';
import { TokenAvatarSetInList } from '~/components/token/TokenAvatarSetInList';
import { getVotePeriodEndTime } from '~/lib/util/epoch-utils';
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
  const votingDate = getVotePeriodEndTime();

  return (
    <Box>
      <Alert status="info">
        <AlertIcon />
        <Flex direction="column">
          <Text color="black" lineHeight="24px" fontWeight={600}>
            Voting for your bribe will begin on :
          </Text>
          <Text color="black" fontWeight={600} lineHeight="24px">
            {new Date(votingDate).toUTCString()}
          </Text>
        </Flex>
      </Alert>
      <HStack mt={5}>
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
