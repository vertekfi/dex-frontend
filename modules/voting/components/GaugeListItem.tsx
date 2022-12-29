import { GqlPoolMinimalFragment } from '~/apollo/generated/graphql-codegen-generated';
import { Box, Grid, GridItem, GridItemProps, Text } from '@chakra-ui/react';
import { NextLink } from '~/components/link/NextLink';
import { Button } from '@chakra-ui/react';
import numeral from 'numeral';
import AprTooltip from '~/components/apr-tooltip/AprTooltip';
import { BoxProps } from '@chakra-ui/layout';
import { AmountHumanReadable } from '~/lib/services/token/token-types';
import { numberFormatUSDValue } from '~/lib/util/number-formats';
import { TokenAvatarSetInList, TokenAvatarSetInListTokenData } from '~/components/token/TokenAvatarSetInList';
import { memo } from 'react';
import { UserTokenBalancesProvider } from '~/lib/user/useUserTokenBalances';
import { PoolListProvider } from '~/modules/pools/usePoolList';

const MemoizedTokenAvatarSetInList = memo(TokenAvatarSetInList);

export function GaugeListItem(){
    return (

<PoolListProvider>
<UserTokenBalancesProvider>
<Grid
    
    bg="vertek.slatepurple.900"
    borderBottomColor="vertek.slatepurple.600"
    borderBottomWidth="1px"
    paddingY="1.5rem"
    paddingX="1rem"
    templateColumns={{ base: '150px 1fr 150px 200px 200px', lg: '150px 1fr 200px 200px 200px' }}
    gap="0"
    >
        <GridItem  
        display="flex"
        alignItems="center" 
        justifyContent="left" 
        textAlign="left">
            Icon Set 
        </GridItem>
        <GridItem  
        display="flex" 
        alignItems="center" 
        justifyContent="left" 
        textAlign="left">
            Token Pills 
        
        
        </GridItem>
        <GridItem  
        display="flex" 
        alignItems="center" 
        justifyContent="center" 
        textAlign="center">
            0% 
        </GridItem>
        <GridItem  
        display="flex" 
        alignItems="center" 
        justifyContent="center" 
        textAlign="center">
            69%
        </GridItem>
        <GridItem  
        display="flex" 
        alignItems="center" 
        justifyContent="center" 
        textAlign="center">
            <NextLink href="/pools" chakraProps={{ _hover: { textDecoration: 'none' } }}>
                <Button variant="vertekconnect2" width={{ base: '110px', lg: '130px' }}>
                    Vote
                </Button>
            </NextLink>
        </GridItem>
        
    </Grid>
</UserTokenBalancesProvider>
</PoolListProvider>
);
    }
