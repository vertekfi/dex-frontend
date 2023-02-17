import { Box, BoxProps, Flex, LinkBox, Text, Tooltip } from '@chakra-ui/react';
import AprTooltip from '~/components/apr-tooltip/AprTooltip';
import Card from '~/components/card/Card';
import TokenAvatarSet from '~/components/token/TokenAvatarSet';
import { GqlPoolCardDataFragment } from '~/apollo/generated/graphql-codegen-generated';
import numeral from 'numeral';
import { NextLinkOverlay } from '~/components/link/NextLink';
import { useUserData } from '~/lib/user/useUserData';
import { getAprValues } from '~/lib/util/apr-utils';

interface Props extends BoxProps {
  pool: GqlPoolCardDataFragment;
}

export function PoolCard({ pool, ...rest }: Props) {
  const { boostForPool } = useUserData();

  const boost = boostForPool(pool.id);
  const { dailyMinApr, dailyMaxApr, isVePool, dailyVe } = getAprValues(pool.dynamicData.apr, boost);
  return (
    <LinkBox as="article" flex="1" {...rest} padding="1">
      <Card
        flexDirection="column"
        borderRadius="18px"
        height="327px"
        paddingX="4"
        paddingY="4" 
        marginTop="1"
        boxShadow="0 0 10px #5BC0F8, 0 0 20px #4A4AF6"
        css={{
          transition: 'transform 0.5s',
          '&:hover': {
            transform: 'scale(1.02)',
          },
        }}
      >
        <Box
          height="full"
          bg="vertek.slatepurple.900"
          borderRadius="md"
          boxShadow="2px 24px 12px 0px #000"
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
              imageSize={50}
              renderPopover={false}
            />

          </Flex>
          <Box pb="4" mt="3" justifyContent="center">
            <NextLinkOverlay href={`pool/${pool.id}`}>
              <Text
                fontSize="1.3rem"
                color="gray.100"
                textAlign="center"
                fontWeight="bold"
                noOfLines={1}
              >
                {pool.name}
              </Text>
            </NextLinkOverlay>
          </Box>
        </Box>
        <Box
          height="full"
          marginTop="4"
          bg="vertek.slatepurple.900"
          borderRadius="md"
          boxShadow="2px 24px 12px 0px #000"
        >
          <Box
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
              poolId={pool.id}
              data={pool.dynamicData.apr}
              placement="bottom-end"
            />

            {!isVePool ? (
              <Text color="gray.100" textAlign="center" fontSize="18px" lineHeight="24px">
                {numeral(dailyMinApr).format('0.00[0]%')} -{' '}
                {numeral(dailyMaxApr).format('0.00[0]%')} Daily
              </Text>
            ) : (
              <Text color="gray.100" textAlign="center" fontSize="18px" lineHeight="24px">
                {numeral(dailyVe).format('0.00[0]%')}
                Daily
              </Text>
            )}
          </Box>
        </Box>
      </Card>
    </LinkBox>
  );
}
