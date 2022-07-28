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

interface Props {
    route: GqlSorSwapRouteFragment;
}

export function BatchSwapRoute({ route }: Props) {
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
                                <>
                                    <BatchSwapHop key={index} hop={hop} />
                                    <BatchSwapRouteDashedLineArrowSpacer key={`spacer-${index}`} />
                                </>
                            ))}
                    </Flex>
                    <BatchSwapTokenAmount address={route.tokenOut} amount={route.tokenOutAmount} />
                </Flex>
            </Flex>
        </Box>
    );
}