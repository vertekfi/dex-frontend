import { BeetsBox } from '~/components/box/BeetsBox';
import TokenAvatar from '~/components/token/TokenAvatar';
import { Box, Flex, Text } from '@chakra-ui/react';
import numeral from 'numeral';
import { useGetTokens } from '~/lib/global/useToken';

interface Token {
    address: string;
    weight?: string | null;
}

interface Props {
    token: Token;
}

export function PoolTokenPill({ token }: Props) {
    const { getToken } = useGetTokens();

    return (
        <BeetsBox px="4" py="2" bgColor="vertek.slatepurple.800"
        borderRadius="16px">
            <Flex alignItems="center">
                <TokenAvatar address={token.address} size="xs" 
                boxShadow="0px 0px 6px 0.5px rgba(255, 255, 255)" 
/>
                <Text ml="2">{getToken(token.address)?.symbol}</Text>
                {token.weight ? <Text ml="2">{numeral(token.weight).format('%')}</Text> : null}
            </Flex>
        </BeetsBox>
    );
}
