import { Box, Grid, GridItem, Button, Text, GridItemProps } from '@chakra-ui/react';
import { TokenAvatarSetInList } from '~/components/token/TokenAvatarSetInList';
import { memo, useEffect } from 'react';
import { Gauge } from '~/lib/services/staking/types';
import { useGetTokens } from '~/lib/global/useToken';
import { networkConfig } from '~/lib/config/network-config';
import { useVrtkClaim } from '../lib/useVrtkClaim';
import { useClaimsData } from '../lib/useClaimsData';
import { MobileLabelLeft, StatGridItemRight, MobileLabelRight, ClaimGrid } from './ClaimTableUtils';

const MemoizedTokenAvatarSetInList = memo(TokenAvatarSetInList);

export function ClaimListItem(props: { gauge: Gauge }) {
  const { formattedPrice } = useGetTokens();
  const { claim, txState } = useVrtkClaim(props.gauge.address);
  const { refetchClaimsData } = useClaimsData();

  useEffect(() => {
    if (txState.isConfirmed) {
      refetchClaimsData;
    }
  }, [txState]);

  return (
    <Box
      borderTopColor="#4A4AF6"
      boxShadow={{ base: '0 0 5px #5BC0F8, 0 0 10px #4A4AF6', lg: 'none' }}
      borderTopWidth="1px"
      mt={{ base: '6', lg: '0' }}
      mb={{ base: '4', lg: '0' }}
      paddingY={{ base: '4', lg: '0' }}
      paddingX={{ base: '2', lg: '0' }}
      borderRadius={{ base: '16px', lg: '0' }}
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
            <MemoizedTokenAvatarSetInList
              imageSize={32}
              width={92}
              tokens={props.gauge.pool.tokens}
            />
          </Box>
        </GridItem>
        <GridItem
          area="name"
          textAlign={{ base: 'center', lg: 'left' }}
          mb={{ base: '1', lg: '0' }}
        >
          <Text
            color="white"
            fontSize={{ base: 'xl', lg: 'md' }}
            fontWeight={{ base: 'bold', lg: 'bold' }}
          >
            {props.gauge.pool.name}
          </Text>
        </GridItem>
        <GridItem area="shares" textAlign="left">
          <MobileLabelLeft text="My balance" />
          <Text
            fontSize={{ base: '1rem', lg: 'md' }}
            fontWeight={{ base: 'bold', lg: 'normal' }}
            textAlign="left"
          >
            {props.gauge.claimableTokens}
          </Text>
        </GridItem>

        <StatGridItemRight area="value">
          <MobileLabelRight text="Value" />
          <Text fontSize={{ base: '1rem', lg: 'md' }} fontWeight={{ base: 'bold', lg: 'normal' }}>
            {formattedPrice({
              address: networkConfig.beets.address,
              amount: props.gauge.claimableTokens,
            })}
          </Text>
        </StatGridItemRight>

        <ClaimGrid area="claim">
          <Box display="flex" justifyContent={{ base: 'center', lg: 'flex-end' }}>
            <Button
              variant="verteklight"
              padding="1em"
              borderRadius="10px"
              mt="1"
              ml="4"
              borderWidth="1px"
              alignItems="center"
              height="2em"
              disabled={false}
              width={{ base: '75%', lg: '125px' }}
              isDisabled={txState.isPending}
              onClick={claim}
            >
              Claim
            </Button>
          </Box>
        </ClaimGrid>
      </Grid>
    </Box>
  );
}
