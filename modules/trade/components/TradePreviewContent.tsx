import { Alert, AlertIcon, Box, Checkbox, Flex, HStack, Link, StackDivider, Text, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { BeetsSubmitTransactionButton } from '~/components/button/BeetsSubmitTransactionButton';
import { useTrade } from '~/modules/trade/lib/useTrade';
import { useGetTokens } from '~/lib/global/useToken';
import { useSlippage } from '~/lib/global/useSlippage';
import { tokenFormatAmount, tokenFormatAmountPrecise } from '~/lib/services/token/token-util';
import { oldBnum } from '~/lib/services/pool/lib/old-big-number';
import { InfoButton } from '~/components/info-button/InfoButton';
import { SlippageTextLinkMenu } from '~/components/slippage/SlippageTextLinkMenu';
import numeral from 'numeral';
import { BeetsBox } from '~/components/box/BeetsBox';
import TokenAvatar from '~/components/token/TokenAvatar';
import { ExternalLink } from 'react-feather';
import { etherscanGetTokenUrl } from '~/lib/util/etherscan';
// import { CoingeckoIcon } from '~/assets/icons/CoingeckoIcon';
import { SubmitTransactionQuery } from '~/lib/util/useSubmitTransaction';
import { GqlSorGetSwapsResponseFragment } from '~/apollo/generated/graphql-codegen-generated';
import { transactionMessageFromError } from '~/lib/util/transaction-util';
import { useUserTokenBalances } from '~/lib/user/useUserTokenBalances';

interface Props {
  query: Omit<SubmitTransactionQuery, 'submit' | 'submitAsync'> & {
    batchSwap: (swapInfo: GqlSorGetSwapsResponseFragment) => void;
  };
  onTransactionSubmitted: () => void;
}

export function TradePreviewContent({ query, onTransactionSubmitted }: Props) {
  const { batchSwap, ...batchSwapQuery } = query;
  const { reactiveTradeState, hasNoticeablePriceImpact, hasHighPriceImpact, priceImpact } =
    useTrade();
  const { getToken, formattedPrice, priceForAmount, priceFor } = useGetTokens();
  const { slippage } = useSlippage();
  const swapInfo = reactiveTradeState.sorResponse;
  const tokenIn = getToken(swapInfo?.tokenIn || '');
  const tokenOut = getToken(swapInfo?.tokenOut || '');
  const [highPiAccepted, setHighPiAccepted] = useState(false);
  const { refetch: refetchUserBalances } = useUserTokenBalances();
  const tokenInPrecision = Math.min(tokenIn?.decimals || 18, 12);
  const tokenOutPrecision = Math.min(tokenOut?.decimals || 18, 12);

  if (!swapInfo) {
    //TODO: handle
    return null;
  }

  const exactIn = swapInfo.swapType === 'EXACT_IN';
  const maxAmountIn = tokenFormatAmountPrecise(
    oldBnum(swapInfo.tokenInAmount)
      .times(1 + parseFloat(slippage))
      .toString(),
  );
  const minAmountOut = tokenFormatAmountPrecise(
    oldBnum(swapInfo.tokenOutAmount)
      .times(1 - parseFloat(slippage))
      .toString(),
  );

  const exchangeRate = parseFloat(swapInfo.tokenOutAmount) / parseFloat(swapInfo.tokenInAmount);
  const reverseExchangeRate =
    parseFloat(swapInfo.tokenInAmount) / parseFloat(swapInfo.tokenOutAmount);
  const valueIn = priceForAmount({ address: swapInfo.tokenIn, amount: swapInfo.tokenInAmount });
  const tokenOutSwapPrice = valueIn / parseFloat(swapInfo.tokenOutAmount);
  const diff = priceFor(swapInfo.tokenOut) / tokenOutSwapPrice - 1;
  const coingeckoVariationText =
    diff >= 0
      ? `${numeral(Math.abs(diff)).format('%0.[00]')} cheaper`
      : `within ${numeral(Math.abs(diff)).format('%0.[00]')}`;

  return (
    <VStack width="full">
      <Box width="full" p="4" pt="0" pb="2">
        <BeetsBox width="full" p="2" px="2" mt="4">
          <VStack
            divider={<StackDivider borderColor="whiteAlpha.200" />}
            spacing="4"
            alignItems="flex-start"
          >
            <HStack justifyContent="space-between" width="full">
              <HStack>
                <TokenAvatar width="40px" height="40px" address={swapInfo.tokenIn} />
                <Text>
                  You sell
                  <HStack spacing="1">
                    <Text fontWeight="bold">{tokenIn?.symbol}</Text>
                    <Link
                      href={etherscanGetTokenUrl(swapInfo.tokenIn)}
                      color="vertek.neonpurple.500"
                      target="_blank"
                      ml="1.5"
                    >
                      <ExternalLink size={14} />
                    </Link>
                  </HStack>
                </Text>
              </HStack>
              <VStack alignItems="flex-end" spacing="0">
                <Text>{tokenFormatAmountPrecise(swapInfo.tokenInAmount, tokenInPrecision)}</Text>
                <Text fontSize="sm" color="beets.base.100">
                  ~
                  {formattedPrice({
                    address: swapInfo.tokenIn,
                    amount: swapInfo.tokenInAmount,
                  })}
                </Text>
              </VStack>
            </HStack>
            <HStack justifyContent="space-between" width="full">
              <HStack>
                <TokenAvatar width="40px" height="40px" address={swapInfo.tokenOut} />
                <Text>
                  to receive
                  <HStack spacing="1">
                    <Text fontWeight="bold">{tokenOut?.symbol}</Text>
                    <Link
                      href={etherscanGetTokenUrl(swapInfo.tokenOut)}
                      color="vertek.neonpurple.500"
                      target="_blank"
                      ml="1.5"
                    >
                      <ExternalLink size={14} />
                    </Link>
                  </HStack>
                </Text>
              </HStack>
              <VStack alignItems="flex-end" spacing="0">
                <Text>{tokenFormatAmountPrecise(swapInfo.tokenOutAmount, tokenOutPrecision)}</Text>
                <Text fontSize="sm" color="beets.base.100">
                  ~
                  {formattedPrice({
                    address: swapInfo.tokenOut,
                    amount: swapInfo.tokenOutAmount,
                  })}
                </Text>
              </VStack>
            </HStack>
          </VStack>
        </BeetsBox>
        <BeetsBox mt="4" p="2" px="4">
          <VStack paddingY="2"  divider={<StackDivider borderColor="vertek.neonpurple.500" />}
 >
            <HStack width="full" justifyContent="space-between" >
              <InfoButton
                label="Max slippage"
                infoText="The maximum change in the price you are willing to accept to account for external market movements."
              />
              <SlippageTextLinkMenu  />
            </HStack>
            {exactIn ? (
              <HStack width="full" justifyContent="space-between">
                <Text>Min {tokenOut?.symbol} received</Text>
                <Text>{tokenFormatAmountPrecise(minAmountOut, tokenOutPrecision)}</Text>
              </HStack>
            ) : (
              <HStack width="full" justifyContent="space-between">
                <Text>Max {tokenIn?.symbol} spent</Text>
                <Text>{tokenFormatAmountPrecise(maxAmountIn, tokenInPrecision)}</Text>
              </HStack>
            )}
          </VStack>
        </BeetsBox>
        <VStack width="full" spacing="4">
          {hasHighPriceImpact && (
            <Alert
              bgColor="vertek.neonpurple.500"
              color="white"
              status="error"
              mt="4"
              display="flex"
              alignItems="flex-start"
            >
              <Checkbox
                colorScheme="white"
                mt="1"
                mr="4"
                isChecked={highPiAccepted}
                onChange={() => setHighPiAccepted(!highPiAccepted)}
              />
              <Box color="white">
                I understand that this trade will significantly move the market price.
              </Box>
            </Alert>
          )}
          {batchSwapQuery && batchSwapQuery.submitError ? (
            <Alert status="error" mt={4} color="black" >
              <AlertIcon  color="vertek.neonpurple.500"/>
              {transactionMessageFromError(batchSwapQuery.submitError)}
            </Alert>
          ) : null}
          <BeetsSubmitTransactionButton
            {...batchSwapQuery}
            isDisabled={hasHighPriceImpact && !highPiAccepted}
            onClick={() => batchSwap(swapInfo)}
            onPending={onTransactionSubmitted}
            onConfirmed={() => refetchUserBalances()}
            width="full"
            size="lg"
            marginTop="4"
          >
            Swap
          </BeetsSubmitTransactionButton>
        </VStack>
      </Box>
      <VStack width="full" py="4" backgroundColor="blackAlpha.500" px="5">
        <HStack width="full" justifyContent="space-between">
          <Text color="gray.100" fontSize=".85rem">
            Price impact
          </Text>
          <Text
            fontSize=".85rem"
            color={hasHighPriceImpact ? 'beets.red' : hasNoticeablePriceImpact ? 'orange' : 'white'}
          >
            {numeral(priceImpact).format('0.00%')}
          </Text>
        </HStack>
        <HStack width="full" justifyContent="space-between">
          <Text color="gray.100" fontSize=".85rem">
            1 {tokenIn?.symbol} is
          </Text>
          <Text fontSize=".85rem" color="white">
            {tokenFormatAmount(swapInfo.effectivePriceReversed)} {tokenOut?.symbol}
          </Text>
        </HStack>
        <HStack width="full" justifyContent="space-between">
          <Text color="gray.100" fontSize=".85rem">
            1 {tokenOut?.symbol} is
          </Text>
          <Text fontSize=".85rem" color="white">
            {tokenFormatAmount(swapInfo.effectivePrice)} {tokenIn?.symbol}
          </Text>
        </HStack>
        {/* <HStack width="full" justifyContent="space-between">
          <HStack alignItems="center" spacing="1">
            <Text color="gray.100" fontSize=".85rem">
              Compared to
            </Text>
            <Flex alignItems="center" height="full">
              <CoingeckoIcon width="16px" height="16px" />
            </Flex>
          </HStack>
          <Text color="white" fontSize=".85rem">
            {coingeckoVariationText}
          </Text>
        </HStack> */}
      </VStack>
    </VStack>
  );
}
