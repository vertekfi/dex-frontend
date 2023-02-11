import { Box, Button, Flex, Grid, GridItem, Text } from '@chakra-ui/react';
import { memo } from 'react';
import { TokenAvatarSetInList } from '~/components/token/TokenAvatarSetInList';
import { Gauge } from '~/lib/services/staking/types';
import { useGaugeRewardsClaim } from '../lib/useGaugeRewardsClaim';
import { GaugeRewardRow } from './GaugeRewardRow';

const MemoizedTokenAvatarSetInList = memo(TokenAvatarSetInList);

type Props = {
  gauge: Gauge;
  onClaimSuccess: () => void;
};

export function GaugeRewardsTable({ gauge }: Props) {
  const { doClaim, txState } = useGaugeRewardsClaim(gauge.address);

  async function onGaugeClaim() {
    console.log('Claim for gauge: ' + gauge.address);
    await doClaim();
  }

  return (
    <Box borderRadius="16px" mt={5}>
      <Box
        borderRadius="16px"
        overflow="hidden"
        boxShadow={{ base: 'none', lg: '0 0px 5px #5BC0F8, 0 0px 10px #4A4AF6' }}
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
          bg="vertek.slatepurple.900"
        >
          <GridItem>
            <Flex justifyContent="space-between">
              <MemoizedTokenAvatarSetInList imageSize={32} width={92} tokens={gauge.pool.tokens} />
              <Text ml="1" fontWeight="bold">
                {gauge.pool.name}
              </Text>
            </Flex>
          </GridItem>

          <GridItem>{/* <Text fontWeight="bold"></Text> */}</GridItem>
          <GridItem>
            <Text fontWeight="bold" textAlign="left">
              Amount
            </Text>
          </GridItem>
          <GridItem justifyContent="center" display="flex">
            <Text fontWeight="bold">Value</Text>
          </GridItem>
        </Grid>
      </Box>
      {gauge.rewardTokens.map((token) => (
        <GaugeRewardRow
          token={token}
          key={token.tokenAddress}
          claimableRewards={gauge.claimableRewards[token.tokenAddress]}
        />
      ))}

      <Box mb={10}>
        <Flex
          display={{ base: 'none', lg: 'grid' }}
          p="3"
          mt={1}
          borderRadius="16px"
          bg="vertek.slatepurple.900"
          justifyContent="flex-end"
        >
          {!txState.isPending ? (
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
              onClick={onGaugeClaim}
            >
              Claim
            </Button>
          ) : (
            <Button
              variant="vertekdark"
              padding="1em"
              borderRadius="10px"
              mt="1"
              ml="4"
              borderWidth="1px"
              alignItems="center"
              height="2em"
              disabled={true}
              width={{ base: '75%', lg: '125px' }}
            >
              Pending...
            </Button>
          )}
        </Flex>
      </Box>
    </Box>
  );
}
