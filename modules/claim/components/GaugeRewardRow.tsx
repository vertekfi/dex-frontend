import { Box, Grid, GridItem, Text } from '@chakra-ui/react';
import { RewardToken } from '~/apollo/generated/graphql-codegen-generated';
import TokenAvatarSet from '~/components/token/TokenAvatarSet';
import { useGetTokens } from '~/lib/global/useToken';
import { MobileLabelLeft, StatGridItemRight, MobileLabelRight } from './ClaimTableUtils';

type Props = {
  token: RewardToken;
  claimableRewards: string;
};

export function GaugeRewardRow({ token, claimableRewards }: Props) {
  const { formattedPrice } = useGetTokens();

  return (
    <Box
      borderColor="#4A4AF6" borderLeftWidth="1px" borderRightWidth="1px"
      boxShadow={{ base: '0 0 5px #5BC0F8, 0 0 10px #4A4AF6', lg: 'none' }}
      borderTopWidth="1px" borderBottomWidth="1px"
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
            <TokenAvatarSet width={32} tokenData={[{ address: token.tokenAddress }]} />
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
            {token.symbol}
          </Text>
        </GridItem>
        <GridItem area="shares" textAlign="left">
          <MobileLabelLeft text="My balance" />
          <Text
            fontSize={{ base: '1rem', lg: 'md' }}
            fontWeight={{ base: 'bold', lg: 'normal' }}
            textAlign="left"
          >
            {claimableRewards}
          </Text>
        </GridItem>
        <StatGridItemRight area="value">
          <MobileLabelRight text="Value" />
          <Text fontSize={{ base: '1rem', lg: 'md' }} fontWeight={{ base: 'bold', lg: 'normal' }}>
            {formattedPrice({
              address: token.tokenAddress,
              amount: claimableRewards,
            })}
          </Text>
        </StatGridItemRight>
      </Grid>
    </Box>
  );
}
