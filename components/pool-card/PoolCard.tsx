import { Box, BoxProps, Flex, LinkBox, HStack, VStack, LinkOverlay, SimpleGrid, Text, GridItem } from '@chakra-ui/react';
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
  const gradient = 'linear-gradient(to right, #4A4AF6, #9B51E0)';
  return (

<LinkBox as="article" flex="1"  {...rest} padding="1" >
<Flex
    flexDirection="column" 
    bgColor="rgba(91, 192, 248, .03)"
    borderRadius="18px"
    height="327px"
    padding="1"
    marginTop="1"
    boxShadow="0 0 10px #5BC0F8, 0 0 20px #4A4AF6"
    css={{
      transition: "transform 0.5s",
      "&:hover": {
        transform: "scale(1.02)",
      },
    }}
// potentially add white to the box shadow 
    > 
    <Flex justify="center" padding="2" paddingTop="4" my="4" >
                      <TokenAvatarSet
                            tokenData={pool.allTokens
                            .filter((token) => !token.isNested && !token.isPhantomBpt)
                            .map((token) => ({
                              address: token.address,
                              ...(token.weight && { weight: token.weight }),
                            }))}
                            width={150}
                            imageSize={40}
                            renderPopover={false} />
    </Flex>
    <Box  pb="4" mt="3" justifyContent="center">
        <NextLinkOverlay href={`pool/${pool.id}`}>
            <Text  fontSize="1.3rem" 
            textAlign="center" 
            fontWeight="bold" 
            noOfLines={1}>
              {pool.name}
            </Text>
        </NextLinkOverlay>
    </Box>
    <Box 
    display="flex"
    mt="6" 
    pt="4" 
    mb="8" 
    justifyContent="center" 
    alignItems="center" 
    flexDirection="column"  >
        <AprTooltip
              textProps={{ fontSize: '24px', fontWeight: 'normal', mr: '0', lineHeight: '32px' }}
              data={pool.dynamicData.apr}/>
            <Text 
            color="slate.300" 
            textAlign="center" 
            fontSize="18px" 
            lineHeight="24px" >
              {numeral(dailyApr).format('0.00[0]%')} Daily
              </Text>
    </Box>
        {/* </GridItem> */}
  </Flex>
</LinkBox>

  );
}
