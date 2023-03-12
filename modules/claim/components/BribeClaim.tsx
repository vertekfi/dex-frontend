import { useEffect } from 'react';
import { Box, Button, Flex, Grid, GridItem, Text } from '@chakra-ui/react';
import TokenAvatarSet from '~/components/token/TokenAvatarSet';
import { useGetTokens } from '~/lib/global/useToken';
import { tokenFormatAmount } from '~/lib/services/token/token-util';
import { useUserAccount } from '~/lib/user/useUserAccount';
import { numberFormatUSDValue } from '~/lib/util/number-formats';
import { useBribeClaim } from '../lib/useClaimBribes';
import { StatGridItemRight } from './ClaimTableUtils';
import { useClaimsData } from '../lib/useClaimsData';

type Props = {
  bribeRewards: any[];
};

export function BribeClaim({ bribeRewards }: Props) {
  const { getToken } = useGetTokens();
  const { userAddress } = useUserAccount();
  const { refetchBribeRewards } = useClaimsData();
  const { claimBribes, txState } = useBribeClaim();

  useEffect(() => {
    if (txState.isFailed) {
      console.log(txState.error);
    }
  }, [txState]);

  const bribes: any[] = [];
  bribeRewards.forEach((bribe) => {
    const token = getToken(bribe.token);

    bribes.push({
      ...bribe,
      token,
      amountOwed: bribe.amountOwed,
    });
  });

  async function doBribeClaims() {
    const claimer: string = userAddress || '';
    const claims: any[] = [];
    const tokens: string[] = [];

    bribeRewards.forEach((bribe, idx) => {
      const distributor = bribe.briber;
      const tokenIndex = idx;
      const merkleProof = bribe.proof;

      tokens.push(bribe.token);
      claims.push([bribe.distributionId, bribe.amountOwedBN, distributor, tokenIndex, merkleProof]);
    });

    await claimBribes(claimer, claims, tokens);
    refetchBribeRewards();
  }

  return (
    <Box borderRadius="16px" mt={5}>
      <Box
        borderTopRadius="16px"
        borderBottomRadius={{ base: '16px', lg: 'none' }}
        overflow="hidden"
        boxShadow="0 0px 5px #5BC0F8, 0 0px 10px #4A4AF6"
      >
        <Grid
          display={{ base: 'none', lg: 'grid' }}
          paddingX="6"
          paddingY="4"
          borderTopRadius="16px"
          templateColumns={{
            base: 'repeat(1fr 1fr)',
            lg: '1fr 3fr 1fr 1fr 1fr',
          }}
          gap="0"
          bg="vertek.slatepurple.900"
        >
          <GridItem>
            <Text fontWeight="bold">Reward</Text>
          </GridItem>
          <GridItem>
            <Text fontWeight="bold">Gauge</Text>
          </GridItem>
          <GridItem>
            <Text fontWeight="bold" textAlign="left">
              Amount
            </Text>
          </GridItem>
          <GridItem justifyContent="center" display="flex">
            <Text fontWeight="bold">Value</Text>
          </GridItem>
        </Grid>

        {bribes.map((bribe) => {
          return (
            <Box
              borderTopColor="#4A4AF6"
              boxShadow={{ base: '0 0 5px #5BC0F8, 0 0 10px #4A4AF6', lg: 'none' }}
              borderTopWidth="1px"
            >
              <Grid
                pl="4"
                pr="4"
                py="2"
                templateColumns={{
                  base: 'repeat(1fr 1fr)',
                  lg: '1fr 3fr 1fr 1fr 1fr',
                }}
                gap="0"
                alignItems="center"
                templateAreas={{
                  base: `
                  "name name"
                  "icons icons"
                  "shares value"
                  "claim claim" `,
                  lg: `"icons name shares value claim"`,
                }}
              >
                <GridItem area="icons" mb={{ base: '6', lg: '0' }}>
                  <Box display="flex" justifyContent={{ base: 'center', lg: 'flex-start' }}>
                    <TokenAvatarSet width={32} tokenData={[{ address: bribe.token.address }]} />
                  </Box>
                </GridItem>
                <GridItem
                  area="name"
                  textAlign={{ base: 'center', lg: 'left' }}
                  mb={{ base: '1', lg: '0' }}
                >
                  <Text
                    fontSize={{ base: '1rem', lg: 'md' }}
                    fontWeight={{ base: 'bold', lg: 'normal' }}
                  >
                    {bribe.gaugeRecord.symbol}
                  </Text>
                </GridItem>
                <GridItem area="shares" textAlign="left">
                  <Text
                    fontSize={{ base: '1rem', lg: 'md' }}
                    fontWeight={{ base: 'bold', lg: 'normal' }}
                    textAlign="left"
                  >
                    {tokenFormatAmount(bribe.amountOwed)}
                  </Text>
                </GridItem>

                <StatGridItemRight area="value">
                  <Text
                    fontSize={{ base: '1rem', lg: 'md' }}
                    fontWeight={{ base: 'bold', lg: 'normal' }}
                  >
                    {' '}
                    {numberFormatUSDValue(bribe.valueUSD)}
                  </Text>
                </StatGridItemRight>
              </Grid>
            </Box>
          );
        })}
      </Box>
      <Box>
        <Flex
          display={{ base: 'none', lg: 'grid' }}
          p="3"
          borderLeftWidth="1px"
          borderRightWidth="1px"
          borderBottomWidth="1px"
          borderColor="#4A4AF6"
          borderBottomRadius="16px"
          bg={{ base: 'none', lg: 'vertek.slatepurple.900' }}
          justifyContent={{ base: 'center', lg: 'flex-end' }}
        >
          <Button
            display={{ base: 'none', lg: 'flex' }}
            variant="verteklight"
            padding="1em"
            borderRadius="10px"
            mt="1"
            ml="4"
            borderWidth="1px"
            alignItems="center"
            height="2em"
            disabled={false}
            width={{ base: '200px', lg: '125px' }}
            isDisabled={txState.isPending}
            onClick={doBribeClaims}
          >
            Claim
          </Button>
        </Flex>
      </Box>
    </Box>
  );
}
