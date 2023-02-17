import {
  Box,
  Button,
  HStack,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
  StackDivider,
  Text,
  VStack,
} from '@chakra-ui/react';

import { useInvestState } from '~/modules/pool/invest/lib/useInvestState';
import {
  replaceEthWithWeth,
  replaceWethWithEth,
  tokenFormatAmount,
  tokenGetAmountForAddress,
} from '~/lib/services/token/token-util';
import { PoolInvestSettings } from '~/modules/pool/invest/components/PoolInvestSettings';
import { BeetsBox } from '~/components/box/BeetsBox';
import { TokenSelectInline } from '~/components/token-select-inline/TokenSelectInline';
import TokenAvatar from '~/components/token/TokenAvatar';
import { numberFormatUSDValue } from '~/lib/util/number-formats';
import { PoolInvestSummary } from '~/modules/pool/invest/components/PoolInvestSummary';
import { useGetTokens } from '~/lib/global/useToken';
import { useEffect, useState } from 'react';
import { usePoolJoinGetProportionalInvestmentAmount } from '~/modules/pool/invest/lib/usePoolJoinGetProportionalInvestmentAmount';
import { keyBy, mapValues } from 'lodash';
import {
  oldBnum,
  oldBnumScale,
  oldBnumToHumanReadable,
} from '~/lib/services/pool/lib/old-big-number';
import { useInvest } from '~/modules/pool/invest/lib/useInvest';
import { CardRow } from '~/components/card/CardRow';
import { useHasBatchRelayerApproval } from '~/lib/util/useHasBatchRelayerApproval';
import { usePool } from '~/modules/pool/lib/usePool';
import { usePoolUserTokenBalancesInWallet } from '../../lib/usePoolUserTokenBalancesInWallet';
import { bnum } from '~/lib/util/big-number.utils';
import { GqlPoolToken } from '~/apollo/generated/graphql-codegen-generated';
import { tokenInputTruncateDecimalPlaces } from '~/lib/util/input-util';
import { TokenRow } from '~/components/token-select/TokenRow';

interface Props {
  onShowPreview(): void;
}

export function PoolInvestProportional({ onShowPreview }: Props) {
  const { pool, poolService } = usePool();
  const investOptions = pool.investConfig.options;
  const { setSelectedOption, selectedOptions, setInputAmounts, inputAmounts } = useInvestState();
  const { data } = usePoolJoinGetProportionalInvestmentAmount();
  const { selectedInvestTokens, userInvestTokenBalances, isInvestingWithEth } = useInvest();

  const { userPoolTokenBalances } = usePoolUserTokenBalancesInWallet();

  console.log(data);

  async function onTokenAmountChange(token: GqlPoolToken, amount: string) {
    console.log('TOKEN CHANGED');
    console.log(token);
    console.log(amount);

    if (!amount) {
      setInputAmounts({});
      return;
    }

    if (poolService.joinGetProportionalSuggestionForFixedAmount) {
      const scaledAmounts = await poolService.joinGetProportionalSuggestionForFixedAmount(
        {
          address: replaceEthWithWeth(token.address),
          amount: tokenInputTruncateDecimalPlaces(amount, token.decimals),
        },
        [replaceEthWithWeth(token.address)],
      );

      setInputAmounts(
        mapValues(
          keyBy(scaledAmounts, (amount) =>
            isInvestingWithEth ? replaceWethWithEth(amount.address) : amount.address,
          ),
          (amount) => amount.amount,
        ),
      );
    }
  }

  const exceedsTokenBalances = userInvestTokenBalances.some((tokenBalance) => {
    if (!inputAmounts[tokenBalance.address] || !tokenBalance.amount) return false;
    return bnum(inputAmounts[tokenBalance.address]).gt(tokenBalance.amount);
  });

  const firstToken = selectedInvestTokens[0];
  const proportionalPercent =
    !exceedsTokenBalances && data && data[firstToken.address] && inputAmounts[firstToken.address]
      ? Math.round(
          (parseFloat(inputAmounts[firstToken.address]) / parseFloat(data[firstToken.address])) *
            100,
        )
      : 0;

  return (
    <Box mt="4">
      <Text>Drag the slider to configure your investment amount.</Text>
      <Slider
        mt="12"
        aria-label="slider-ex-1"
        value={proportionalPercent}
        onChange={(value) => {
          if (value === 100) {
            setInputAmounts(data || {});
          } else if (value === 0) {
            setInputAmounts({});
          } else {
            const inputAmounts = mapValues(data || {}, (maxAmount, address) => {
              const tokenDecimals =
                selectedInvestTokens.find((token) => token.address === address)?.decimals || 18;

              return oldBnumToHumanReadable(
                oldBnumScale(maxAmount, tokenDecimals).times(value / 100),
                tokenDecimals,
              );
            });

            setInputAmounts(inputAmounts);
          }
        }}
      >
        <SliderTrack bg="gray.100">
          <SliderFilledTrack bg="vertek.neonpurple.500" />
        </SliderTrack>
        <SliderThumb boxSize={4} />
        <SliderMark
          value={proportionalPercent}
          textAlign="center"
          color="white"
          mt="-10"
          ml="-30px"
          w="12"
          fontSize="md"
          width="60px"
          borderRadius="md"
        >
          {proportionalPercent}%
        </SliderMark>
      </Slider>
      <BeetsBox mt="4" p="2">
        <VStack width="full" divider={<StackDivider borderColor="whiteAlpha.200" />}>
          {investOptions.map((option, index) => {
            const tokenOption = selectedInvestTokens[index];
            const amount = inputAmounts[tokenOption.address];
            return (
              <TokenRow
                withInput
                onAmountChange={(amount) => onTokenAmountChange(tokenOption, amount)}
                key={tokenOption.address}
                alternateTokens={option.tokenOptions}
                address={tokenOption.address}
                selectedAlternateToken={
                  selectedOptions[`${option.poolTokenIndex}`] || option.tokenOptions[0].address
                }
                onSelectedAlternateToken={(address) => {
                  setSelectedOption(option.poolTokenIndex, address);
                }}
                amount={amount}
                balance={tokenGetAmountForAddress(tokenOption.address, userPoolTokenBalances)}
              />
            );
          })}
        </VStack>
      </BeetsBox>

      <PoolInvestSummary mt="6" />
      <PoolInvestSettings mt="8" />
      <Button
        variant="primary"
        width="full"
        mt="8"
        onClick={onShowPreview}
        isDisabled={exceedsTokenBalances || proportionalPercent === 0}
      >
        Preview
      </Button>
    </Box>
  );
}
