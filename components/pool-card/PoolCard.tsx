import { Box, BoxProps, Flex, LinkBox, VStack, LinkOverlay, SimpleGrid, Text, GridItem } from '@chakra-ui/react';
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
<LinkBox as="article" flex="1" {...rest} padding="1 ">

{/* staking card is box.500 then gray.500 */}
  <SimpleGrid
  position="relative"
  width="full" 
  mb="1" 
  columns={1}
  padding="1"
  marginTop="2"
  boxShadow=" 0px 0px 5px 0.5px #ECA833, 0px 5px 10px 2px #000"

  // boxShadow="0px 5px 5px 1px rgba(255, 215, 0, 0.5)"
  // boxShadow="0px 0px 10px 1px rgba(255, 215, 0, 0.5), 1px 1px 6px 2px #161626"
  // bgGradient='linear(90deg, #ECA833 0%, #F7D56F 100%)'
  // bgGradient='linear(90deg, #161626 0%, #363562 50%, #1C1C34 100%)' 
  // bg="vertek.neonpurple.500"
  bgGradient='linear(200deg, rgba(255,255,255,0.01), #161626)'
  // bg="box.500" 
  // bg="vertek.slate.00"
  borderRadius="16px">
    <GridItem  
      padding="" 
      borderRadius="16px" 
      // boxShadow="5px 5px 5px 1px #000"
      // bg="box.500" 
      // bg="gray.500"
      // bgGradient='linear(90deg, #161626 0%, #363562 50%, #1C1C34 100%)' 
      >
          <GridItem  
          padding="2"
          paddingTop="4"
          position="relative" 
          // bgGradient='linear(90deg, #161626 0%, #363562 50%, #1C1C34 100%)' 
          mb="1"
          flexDirection="column" >
              <Flex justify="center" >
                  <TokenAvatarSet
                        tokenData={pool.allTokens
                        .filter((token) => !token.isNested && !token.isPhantomBpt)
                        .map((token) => ({
                          address: token.address,
                          ...(token.weight && { weight: token.weight }),
                        }))}
                        width={300}
                        imageSize={48}
                        renderPopover={false} />
                </Flex>
          </GridItem>

          <GridItem
          // bg="gray.500"
          // borderRadius="16px"
          padding="2"
          marginTop="3"
          display="flex" justifyContent="center" >
              <NextLinkOverlay href={`pool/${pool.id}`}>
                    <Text  fontSize="1.1rem" textAlign="center" fontWeight="bold" paddingX="" noOfLines={1}>
                      {pool.name}
                    </Text>
              </NextLinkOverlay>
          </GridItem>
    
          <GridItem 
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
                <Text color="slate.300" textAlign="center" fontSize="18px" lineHeight="24px" >{numeral(dailyApr).format('0.00[0]%')} Daily</Text>
          </GridItem>
        </GridItem>
  </SimpleGrid>
</LinkBox>
  );
}
