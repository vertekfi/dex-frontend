import {
  GqlTokenData,
  GqlTokenDynamicDataFragment,
} from '~/apollo/generated/graphql-codegen-generated';
import { TokenBase } from '~/lib/services/token/token-types';
import { BeetsBox } from '~/components/box/BeetsBox';
import { Box, BoxProps, Flex, HStack, Link, Text } from '@chakra-ui/react';
import TokenAvatar from '~/components/token/TokenAvatar';
import { useBoolean } from '@chakra-ui/hooks';
import { numberFormatUSDValue } from '~/lib/util/number-formats';
import { ExternalLink, Globe } from 'react-feather';
import DiscordIcon from '~/assets/icons/discord.svg';
import TwitterIcon from '~/assets/icons/twitter.svg';
import NextImage from 'next/image';
import { etherscanGetTokenUrl } from '~/lib/util/etherscan';
import { PercentChangeBadge } from '~/components/badge/PercentChangeBadge';
import { Divider } from '@chakra-ui/layout';

interface Props extends BoxProps {
  token: TokenBase;
  price: number | null;
  data?: GqlTokenData | null;
  dynamicData?: GqlTokenDynamicDataFragment | null;
}

export function PoolDetailTokenInfoCard({ token, price, data, dynamicData, ...rest }: Props) {
  const [showFullText, textState] = useBoolean(false);
  const hasLinks =
    data?.websiteUrl || data?.discordUrl || data?.telegramUrl || data?.twitterUsername;

  return (
    <BeetsBox p="4" {...rest}>
      <Flex>
        <HStack flex="1">
          <TokenAvatar address={token.address} size="sm" />
          <Box>
            <HStack spacing="1">
              <Text fontWeight="semibold" fontSize="lg" lineHeight="1.6rem">
                {token.symbol}
              </Text>
              <Link href={etherscanGetTokenUrl(token.address)} target="_blank">
                <ExternalLink size={16} style={{ marginBottom: 1 }} />
              </Link>
            </HStack>

            <Text lineHeight="1.1rem" color="gray.200">
              {token.name}
            </Text>
          </Box>
        </HStack>

        {price ? (
          <Box display="flex" flexDirection="column">
            <Flex alignItems="center">
              <Text fontSize="lg" fontWeight="semibold" textAlign="right">
                {numberFormatUSDValue(price)}
              </Text>
            </Flex>
            {dynamicData ? (
              <Flex justifyContent="flex-end" alignItems="center">
                <PercentChangeBadge percentChange={dynamicData.priceChangePercent24h / 100} />
              </Flex>
            ) : null}
          </Box>
        ) : null}
      </Flex>
      {data?.description ? (
        <Box mt="4">
          <Text
            noOfLines={showFullText ? undefined : 3}
            dangerouslySetInnerHTML={{ __html: data.description }}
          />
          <Box mt="1">
            <Link onClick={textState.toggle}>{showFullText ? 'Show less' : 'Show more'}</Link>
          </Box>
        </Box>
      ) : null}
      {hasLinks && <Divider mt="4" mb="4" />}
      {hasLinks && (
        <Flex>
          {/* <Link mr="3" href={`https://www.coingecko.com/en/coins/${token.address}`} target="_blank">
            <NextImage src={CoingeckoLogo} width="24" height="24" />
          </Link> */}
          {data?.websiteUrl && (
            <Box mr="3">
              <Link
                href={data.websiteUrl}
                target="_blank"
                color="gray.100"
                _hover={{ color: 'vertek.neonpurple.500' }}
              >
                <Globe size={24} />
              </Link>
            </Box>
          )}
          {data?.twitterUsername && (
            <Box mr="3">
              <Link href={`https://twitter.com/${data.twitterUsername}`} target="_blank">
                <NextImage src={TwitterIcon} width="24" height="24" color="white" />
              </Link>
            </Box>
          )}
          {data?.discordUrl && (
            <Link href={data.discordUrl} target="_blank">
              <NextImage src={DiscordIcon} width="25" height="25" />
            </Link>
          )}
        </Flex>
      )}
    </BeetsBox>
  );
}
