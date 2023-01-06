import { Box, BoxProps, Flex, Text, Divider, LinkBox } from '@chakra-ui/react';
import AprTooltip from '~/components/apr-tooltip/AprTooltip';
import TokenAvatarSet from '~/components/token/TokenAvatarSet';
import { GqlPoolCardDataFragment } from '~/apollo/generated/graphql-codegen-generated';
import numeral from 'numeral';
import { numberFormatUSDValue } from '~/lib/util/number-formats';
import { tokenFormatAmount } from '~/lib/services/token/token-util';
import { NextLinkOverlay } from '~/components/link/NextLink';

interface Props extends BoxProps {
  pool: GqlPoolCardDataFragment;
  balance: string;
  balanceUSD: number;
}

export function PoolCardUser({ pool, balance, balanceUSD, ...rest }: Props) {
  const dailyApr = parseFloat(pool.dynamicData.apr.total) / 365;

  return (
    <LinkBox as="article" flex="1" {...rest}>
      <Flex
        bgColor="vertek.slatepurple.900"
        borderRadius="16px"
        p="1"
        boxShadow="0 0 10px #5BC0F8, 0 0 20px #4A4AF6"
        flexDirection="column"
        height="327px"
      >
        <Flex justify="center" padding="2" paddingTop="4" my="4">
          <TokenAvatarSet
            tokenData={pool.allTokens
              .filter((token) => !token.isNested && !token.isPhantomBpt)
              .map((token) => ({
                address: token.address,
                ...(token.weight && { weight: token.weight }),
              }))}
            width={150}
            imageSize={40}
            renderPopover={false}
          />
        </Flex>
        <Box pb="4" mt="3" justifyContent="center">
          <NextLinkOverlay href={`pool/${pool.id}`}>
            <Text fontSize="1.3rem" textAlign="center" fontWeight="bold" noOfLines={1}>
              {pool.name}
            </Text>
          </NextLinkOverlay>
        </Box>

        <Box mt="6" color="white" fontSize="0.9rem" justifyContent="center" textAlign="center">
          My balance:
        </Box>
        <Box
          justifyContent="center"
          textAlign="center"
          fontSize="1.2rem"
          lineHeight="38px"
          color="white"
        >
          {numberFormatUSDValue(balanceUSD)}
        </Box>
        <Box color="white" textAlign="center">
          {tokenFormatAmount(balance)} BPT
        </Box>
        <Divider mt="4" mb="4" />
        {/* <Box
          display="flex"
          mt="6"
          pt="4"
          mb="8"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
        >
          <AprTooltip
            textProps={{ fontSize: '24px', fontWeight: 'normal', mr: '0', lineHeight: '32px' }}
            data={pool.dynamicData.apr}
            aprLabel={true}
          />
          <Text color="slate.300" textAlign="center" fontSize="18px" lineHeight="24px">
            {numeral(dailyApr).format('0.00[0]%')} Daily
          </Text>
        </Box> */}
      </Flex>
    </LinkBox>
  );
}
