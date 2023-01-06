import { Box, Flex } from '@chakra-ui/react';
import {
  BatchSwapDashedLine,
  BatchSwapRouteDashedLineArrowSpacer,
  BatchSwapRouteDashedLineLeftSide,
  BatchSwapRouteDashedLineRightSide,
} from '~/components/batch-swap/components/BatchSwapDashedLine';
import { BatchSwapTokenAmount } from '~/components/batch-swap/components/BatchSwapTokenAmount';
import { BatchSwapHop } from '~/components/batch-swap/components/BatchSwapHop';
import { GqlSorSwapRouteFragment } from '~/apollo/generated/graphql-codegen-generated';
import { Fragment } from 'react';
import { GqlSorGetSwapsResponseFragment } from '~/apollo/generated/graphql-codegen-generated';
import { useGetTokens } from '~/lib/global/useToken';


interface Props {
  route: GqlSorSwapRouteFragment;
  swapInfo: GqlSorGetSwapsResponseFragment;

}

export function BatchSwapRoute({ route, swapInfo }: Props) {
console.log('route:', route);
console.log('route.tokenInAmount:', route.tokenInAmount);
console.log('route.tokenOutAmount:', route.tokenOutAmount);
console.log('swapInfo.tokenOutAmount:', swapInfo.tokenOutAmount); 
const { getToken } = useGetTokens();
const tokenIn = getToken(swapInfo.tokenIn);
const tokenOut = getToken(swapInfo.tokenOut);


  return (
    <Box height="64px">
      <Flex flex="1" flexDirection="column" justifyContent="space-around">
        <Flex position="relative" columnGap="5px">
          <BatchSwapRouteDashedLineLeftSide />
          <BatchSwapRouteDashedLineRightSide />
          <BatchSwapDashedLine />
          <BatchSwapTokenAmount address={route.tokenIn} amount={route.tokenInAmount} />
          <Flex flex="1" height="64px" alignItems="center" position="relative" top="2px">
            <Box flex="1">
              <BatchSwapRouteDashedLineArrowSpacer />
            </Box>
            {route.hops
              .filter((hop) => hop.pool.type !== 'LINEAR')
              .map((hop, index) => (
                <Fragment key={index}>
                  <BatchSwapHop hop={hop} />
                  <BatchSwapRouteDashedLineArrowSpacer />
                </Fragment>
              ))}
          </Flex>
          {/* <BatchSwapTokenAmount address={route.tokenOut} amount={route.tokenOutAmount} /> */}
          <BatchSwapTokenAmount address={swapInfo.tokenOut} amount={swapInfo.tokenOutAmount} />

        </Flex>
      </Flex>
    </Box>
  );
}
