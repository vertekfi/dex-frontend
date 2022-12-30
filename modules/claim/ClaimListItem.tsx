import { GqlPoolMinimalFragment } from '~/apollo/generated/graphql-codegen-generated';
import { Box, Grid, GridItem, Button, Text, GridItemProps } from '@chakra-ui/react';
import Link from 'next/link';
import numeral from 'numeral';
import { BoxProps } from '@chakra-ui/layout';
import { AmountHumanReadable } from '~/lib/services/token/token-types';
import { numberFormatUSDValue } from '~/lib/util/number-formats';
import {
  TokenAvatarSetInList,
  TokenAvatarSetInListTokenData,
} from '~/components/token/TokenAvatarSetInList';
import { memo } from 'react';
import VertekIcon from '~/assets/logo/verteknotext.svg'; 
import NextImage from 'next/image';
import VertekText from '~/assets/logo/verteklogotext.svg'; 


// interface Props extends BoxProps {
//     pool: GqlPoolMinimalFragment;
//     userBalance?: AmountHumanReadable;
//     showUserBalance: boolean;
//     tokens: TokenAvatarSetInListTokenData[];
//     // hasUnstakedBpt?: boolean;
//   }

const MemoizedTokenAvatarSetInList = memo(TokenAvatarSetInList);

export function ClaimListItem(){
//     pool,
//     userBalance,
//     showUserBalance,
//     tokens,
//     // hasUnstakedBpt,
//     // ...rest
//   }: Props) {
return (
<Box  bg="vertek.slatepurple.900" 
      borderBottomColor="vertek.slatepurple.600" 
      borderBottomWidth="1px"
      mt={{ base: '6', lg:'0'}}
      mb={{ base: '4', lg: '0' }} 
      paddingY={{ base:'4', lg:'0'}}
      paddingX={{ base:'2', lg:'0'}}
      borderRadius={{ base:'16px', lg:'0' }}
      >
      <Grid 
        pl="4" 
        pr="4"
        py="2"
        templateColumns={{
            base: 'repeat(1fr 1fr)',
            lg: '1fr 3fr 1fr 1fr 1fr' }}
        gap="4" alignItems="center" 
        templateAreas={{
            base: `
              "name name"
              "icons icons"
              "shares value"
              "claim claim" `,
              lg: `"icons name shares value claim"`
              }} 
        >
          <GridItem area="icons" mb={{ base: '6', lg: '0' }}>
            <Box display="flex" 
            justifyContent={{ base:'flex-start', lg:'flex-start'}}>
                <NextImage  width="100px" height="36px"  src={VertekText} />
                <NextImage  width="100px" height="36px"  src={VertekText} />
                <NextImage  width="100px" height="36px"  src={VertekText} />
            </Box>
            {/*  a little VertekSandwich above until MemoizedTokenAvatar is straight
            <MemoizedTokenAvatarSetInList
            imageSize={25}
            width={92}
            tokens={tokens}
            //renderPopover={false}
          /> */}
          </GridItem>
          <GridItem area="name"  textAlign="left" mb={{ base: '1', lg: '0' }}>
            <Text  color="white" fontSize={{ base: 'xl', lg: 'md' }} fontWeight={{ base: 'bold', lg: 'bold' }}>
              That Main Pool Thing 
            </Text>
          </GridItem>
          <GridItem area="shares" textAlign="left">
          {/* <StatGridItem 
              area="volume"
              display={showUserBalance ? { base: 'block', lg: 'none', xl: 'block' } : 'block'}
              >       */}
                  <MobileLabelLeft text="My balance" />
                  <Text 
                  fontSize={{ base: '1rem', lg: 'md' }}
                  fontWeight={{ base: 'bold', lg: 'normal' }} 
                  textAlign="left"
                  > 
                      150 shares
                  </Text>
                  {/* </StatGridItem> */}
          </GridItem>

        {/* {showUserBalance && ( */}
          <StatGridItemRight area="value">
              <MobileLabelRight  text="Value"  />
              <Text
                  fontSize={{ base: '1rem', lg: 'md' }}
                  fontWeight={{ base: 'bold', lg: 'normal' }} > 
              $150,000 
                {/* {numberFormatUSDValue(userBalance || '0')} */}
              </Text>
            </StatGridItemRight>
            {/* 
            )} 
            */}
            <ClaimGrid area="claim">
              <Box display="flex" justifyContent={{ base:'center', lg:'flex-end'}}>
                  <Button  variant="vertekconnect2" width={{ base: '75%', lg: '150px' }}>
                      Claim
                </Button>
              </Box>
            </ClaimGrid>
       
    </Grid>
</Box>
)
}

function MobileLabelRight({ text }: { text: string }) {
  return (
    <Text textAlign="right" fontSize="xs" color="gray.200" display={{ base: 'block', lg: 'none' }}>
      {text}
    </Text>
  );
}
function MobileLabelLeft({ text }: { text: string }) {
  return (
    <Text textAlign="left" fontSize="xs" color="gray.200" display={{ base: 'block', lg: 'none' }}>
      {text}
    </Text>
  );
}

function StatGridItemRight(props: GridItemProps) {
  return (
    <GridItem
      area="claim"
      width="100%"
      textAlign={{ base: 'right', lg: 'right' }}
      mb={{ base: '4', lg: '0' }}
      {...props}
    />
  );
}
function ClaimGrid(props: GridItemProps) {
  return (
    <GridItem
      area="value"
      textAlign={{ base: 'right', lg: 'right' }}
      mb={{ base: '4', lg: '0' }}
      {...props}
    />
  );
}
