import { GqlPoolMinimalFragment } from '~/apollo/generated/graphql-codegen-generated';
import { Box, Grid, GridItem, GridItemProps, Text } from '@chakra-ui/react';
import Link from 'next/link';
import numeral from 'numeral';
import AprTooltip from '~/components/apr-tooltip/AprTooltip';
import { BoxProps } from '@chakra-ui/layout';
import { AmountHumanReadable } from '~/lib/services/token/token-types';
import { numberFormatUSDValue } from '~/lib/util/number-formats';
import {
  TokenAvatarSetInList,
  TokenAvatarSetInListTokenData,
} from '~/components/token/TokenAvatarSetInList';
import { memo } from 'react';
import { UserTokenBalancesProvider } from '~/lib/user/useUserTokenBalances';
import { PoolListProvider } from '~/modules/pools/usePoolList';

export function GaugeListItem(){
return (
<PoolListProvider>
<UserTokenBalancesProvider>
<Grid
    bg="vertek.slatepurple.900"
    borderBottomColor="vertek.slatepurple.600"
    borderBottomWidth="1"
    padding="6px"
    templateColumns={{ base: '150px 1fr 150px 200px 200px', lg: '150px 1fr 150px 150px 150px' }}
    gap="0"
    >
        <GridItem padding={4}>Icon Set </GridItem>
        <GridItem padding={4}>Token Pills </GridItem>
        <GridItem padding={4}>0% </GridItem>
        <GridItem padding={4}>69%</GridItem>
        <GridItem padding={4}>Vote Button</GridItem>
        
    </Grid>
</UserTokenBalancesProvider>
</PoolListProvider>
);
}
