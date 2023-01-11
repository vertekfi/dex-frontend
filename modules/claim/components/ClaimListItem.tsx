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
import VertekIcon from '~/assets/svg/vertektransparent.svg';
import NextImage from 'next/image';
import { VotingGaugeWithVotes } from '~/lib/services/staking/types';

const MemoizedTokenAvatarSetInList = memo(TokenAvatarSetInList);

export function ClaimListItem(props: { gauge: VotingGaugeWithVotes }) {
  return (

    <Box
      // bg="vertek.slatepurple.900"
      borderTopColor="#4A4AF6"
      boxShadow={{ base: '0 0 5px #5BC0F8, 0 0 10px #4A4AF6', lg: 'none' }}
      borderTopWidth="1px"
      mt={{ base: '6', lg: '0' }}
      mb={{ base: '4', lg: '0' }}
      paddingY={{ base: '4', lg: '0' }}
      paddingX={{ base: '2', lg: '0' }}
      borderRadius={{ base: '16px', lg: '0' }}
      // boxShadow="0 0 10px #5BC0F8, 10px 10px 20px #4A4AF6"
    >
      <Grid
        pl="4"
        pr="4"
        // boxShadow="0 -5px 5px #5BC0F8, 0 -5px 10px #4A4AF6"
        py="2"
        templateColumns={{
          base: 'repeat(1fr 1fr)',
          lg: '1fr 3fr 1fr 1fr 1fr',
        }}
        gap="4"
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
        <GridItem area="name" textAlign={{base:'center', lg:'left'}} mb={{ base: '1', lg: '0' }}>
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
            0
          </Text>
        </GridItem>

        <StatGridItemRight area="value">
          <MobileLabelRight text="Value" />
          <Text fontSize={{ base: '1rem', lg: 'md' }} fontWeight={{ base: 'bold', lg: 'normal' }}>
            $0
            {/* {numberFormatUSDValue(userBalance || '0')} */}
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
            >
              Claim
            </Button>
          </Box>
        </ClaimGrid>
      </Grid>
    </Box>
  );
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
      textAlign={{ base: 'right', lg: 'center' }}
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
