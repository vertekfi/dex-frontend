import { Box, BoxProps, Flex, LinkBox, VStack, LinkOverlay, Text } from '@chakra-ui/react';
import AprTooltip from '~/components/apr-tooltip/AprTooltip';
import TokenAvatarSet from '~/components/token/TokenAvatarSet';
import { GqlPoolCardDataFragment } from '~/apollo/generated/graphql-codegen-generated';
import numeral from 'numeral';
import { NextLinkOverlay } from '~/components/link/NextLink';

interface Props extends BoxProps {
  pool: GqlPoolCardDataFragment;
}

export function PoolCard({ pool, ...rest }: Props) {
  const dailyApr = parseFloat(pool.dynamicData.apr.total) / 365;

  return (
<LinkBox as="article" flex="1" {...rest} >
  <Box  position="relative" 
        width="full" 
        bgGradient='linear(90deg, #161626 0%, #363562 50%, #1C1C34 100%)' 
        borderRadius="16px"  
        mb="1"
        height="266px"
        flexDirection="column" >
          <Box 
          flex="1"
          minWidth="full" 
          alignItems="center" height="60px"
          borderTopRadius="16px" 
          paddingY="2" 
          paddingX="4" 
          >
          <Box bgColor="vertek.slate.900" 
          flex="1"
          minWidth="full" 
          alignItems="center" justifyContent="center" height="60px"
          borderRadius="16px" 
          paddingY="2" 
          paddingX="2" >
              <NextLinkOverlay href={`pool/${pool.id}`}>
                <Text  fontSize="1rem" textAlign="center" fontWeight="bold" paddingX="2" noOfLines={2}>
                  {pool.name}
                </Text>
              </NextLinkOverlay>
          </Box>
          </Box>

      <Box position="absolute" 
      bottom="2" padding="2" left="50%" 
      transform="translateX(-50%)">
          <TokenAvatarSet
              tokenData={pool.allTokens
              .filter((token) => !token.isNested && !token.isPhantomBpt)
              .map((token) => ({
                address: token.address,
                ...(token.weight && { weight: token.weight }),
              }))}
            width={140}
            imageSize={48}
            renderPopover={false}
          />
    
      <Box flex="1" mt="8" pt="4" mb="4" >
          <AprTooltip
            textProps={{ fontSize: '2xl', fontWeight: 'normal', mr: '0', lineHeight: '26px' }}
            data={pool.dynamicData.apr}
            placement="left"
          />
          <Text color="slate.300">{numeral(dailyApr).format('0.00[0]%')} Daily</Text>
      </Box>
    </Box>
  </Box>
</LinkBox>
  );
}
