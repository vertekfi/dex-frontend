import { Box, BoxProps, Flex, Skeleton } from '@chakra-ui/react';
import { InfoButton } from '~/components/info-button/InfoButton';
import AprTooltip from '~/components/apr-tooltip/AprTooltip';
import { BeetsBox } from '~/components/box/BeetsBox';
import { numberFormatUSDValue } from '~/lib/util/number-formats';
import { useInvest } from '~/modules/pool/invest/lib/useInvest';
import { usePoolJoinGetBptOutAndPriceImpactForTokensIn } from '~/modules/pool/invest/lib/usePoolJoinGetBptOutAndPriceImpactForTokensIn';
import numeral from 'numeral';

import { CardRow } from '~/components/card/CardRow';
import { usePool } from '~/modules/pool/lib/usePool';

interface Props extends BoxProps {}

export function PoolInvestSummary({ ...rest }: Props) {
  const { pool } = usePool();
  const { totalInvestValue } = useInvest();
  const weeklyYield = (totalInvestValue * parseFloat(pool.dynamicData.apr.total)) / 52;
  const { formattedPriceImpact, hasHighPriceImpact, hasMediumPriceImpact, isLoading } =
    usePoolJoinGetBptOutAndPriceImpactForTokensIn();

  return (
    <BeetsBox p="2" {...rest}>
      <CardRow>
        <Box flex="1">Total</Box>
        <Box>{numberFormatUSDValue(totalInvestValue)}</Box>
      </CardRow>
      <CardRow
        style={
          hasHighPriceImpact ? { color: 'white', fontWeight: 'bold', backgroundColor: 'red' } : {}
        }
      >
        <Box flex="1">
          <InfoButton
            label="Price impact"
            moreInfoUrl="https://vertek.exchange"
            infoText="This is the difference between the current market price and the price you will pay due to your investment influencing the balance and internal price of tokens within the pool."
          />
        </Box>
        {isLoading ? (
          <Skeleton height="24px" width="64px" />
        ) : (
          <Box color={hasMediumPriceImpact ? 'orange' : 'current'}>{formattedPriceImpact}</Box>
        )}
      </CardRow>
      <CardRow mb="0">
        <Box flex="1">
          <InfoButton
            label="Potential weekly yield"
            moreInfoUrl="https://vertek.exchange"
            infoText="This is your projected weekly yield based on the last 24 hours. The APR is a culmination of swap fees and additional incentives."
          />
        </Box>
        <Flex alignItems="center">
          <Box mr="1">{numberFormatUSDValue(weeklyYield)}</Box>
          <AprTooltip data={pool.dynamicData.apr} onlySparkles={true} sparklesSize="sm" />
        </Flex>
      </CardRow>
    </BeetsBox>
  );
}
