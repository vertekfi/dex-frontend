import { Button } from '@chakra-ui/button';
import { HStack, Text } from '@chakra-ui/layout';
import { Skeleton } from '@chakra-ui/react';
import { memo } from 'react';
import { TokenAvatarSetInList } from '../token/TokenAvatarSetInList';
import { LiquidityGauge } from '~/apollo/generated/graphql-codegen-generated';

const MemoizedTokenAvatarSetInList = memo(TokenAvatarSetInList);

type PoolRowProps = {
  gauge: LiquidityGauge;
  userBalanceUSD: number;
  loading: boolean;
  onClick(): void;
};

export function PoolRow({ gauge, onClick, loading }: PoolRowProps) {
  return (
    <Button
      width="full"
      variant="ghost"
      _hover={{ backgroundColor: 'whiteAlpha.200' }}
      _focus={{ boxShadow: 'none' }}
      borderRadius="none"
      onClick={onClick}
      height="56px"
      fontWeight="normal"
      color="gray.100"
    >
      <HStack px="3" width="full" paddingY="4" justifyContent="space-between">
        <HStack>
          {loading ? (
            <>
              <Skeleton width="12" height="3" mb="1" />
              <Skeleton width="12" height="3" />
            </>
          ) : (
            <>
              <MemoizedTokenAvatarSetInList imageSize={28} width={92} tokens={gauge.pool.tokens} />
              <Text fontSize="lg">{gauge.pool.name}</Text>
            </>
          )}
        </HStack>
        {/* <Box marginTop="2px" display="flex" flexDirection="column">
          {loading ? (
            <>
              <Skeleton width="12" height="3" mb="1" />
              <Skeleton width="12" height="3" />
            </>
          ) : (
            <>
              <Text textAlign="right">
                {hasBalance ? tokenFormatAmountPrecise(userBalance, 4) : '-'}
              </Text>
              <Text color="gray.200" textAlign="right" fontSize="sm">
                {userBalanceUSD > 0 ? numberFormatUSDValue(userBalanceUSD) : '-'}
              </Text>
            </>
          )}
        </Box> */}
      </HStack>
    </Button>
  );
}
