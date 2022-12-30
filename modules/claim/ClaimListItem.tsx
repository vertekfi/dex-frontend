import { GqlPoolMinimalFragment } from '~/apollo/generated/graphql-codegen-generated';
import { Box, Grid, GridItem, Button, Text } from '@chakra-ui/react';
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
    borderBottomWidth="1px">
        <Grid 
            pl="4" pr="4"
            py="2"
            templateColumns={{
                base: 'repeat(1fr 1fr)',
                lg: '3fr 1fr 1fr 1fr' }}
            gap="0" alignItems="center" 
            templateAreas={
                {
                    base: `"icons icons"
                            "shares value"
                            "claim claim"`,
                    lg: `"icons shares value claim"`
                  }
            }
            
            >
            <GridItem area="icons">
                <Box>
                <NextImage  width="36px" height="36px"  src={VertekIcon} />
                <NextImage  width="100px" height="36px"  src={VertekText} />
                <NextImage  width="36px" height="36px"  src={VertekIcon} />
                </Box>
                {/*  a little VertekSandwich above until MemoizedTokenAvatar is straight
                <MemoizedTokenAvatarSetInList
                imageSize={25}
                width={92}
                tokens={tokens}
                //renderPopover={false}
              /> */}
            </GridItem>

            <GridItem area="shares">
            {/* <StatGridItem 
                area="volume"
                display={showUserBalance ? { base: 'block', lg: 'none', xl: 'block' } : 'block'}
                >       */}
                    <Text fontSize="1rem" textAlign="left"> 
                        150 shares
                    </Text>
                   {/* </StatGridItem> */}
            </GridItem>

            {/* {showUserBalance && ( */}
            <GridItem area="value">
                <Text
                    textAlign="end"
                    fontSize={{ base: '3xl', lg: 'md' }}
                    fontWeight={{ base: 'bold', lg: 'normal' }} > 
                $150k in pure solid gold
                  {/* {numberFormatUSDValue(userBalance || '0')} */}
                </Text>
              </GridItem>
              <GridItem area="claim">
                <Box display="flex" justifyContent="flex-end">
                <Button  variant="vertekconnect2" width={{ base: '100px', lg: '100px' }}>
                Claim
              </Button>
              </Box>
              </GridItem>
            {/* 
            )} 
            */}
        </Grid>
    </Box>
)
}
