import { Box, BoxProps, Grid, GridItem } from '@chakra-ui/react';
import { BeetsHeadline } from '~/components/typography/BeetsHeadline';

import { BeetsSubHeadline } from '~/components/typography/BeetsSubHeadline';
import { HomeNewsCard } from '~/modules/home/components/HomeNewsCard';
import { useGetHomeNewsItemsQuery } from '~/apollo/generated/graphql-codegen-generated';

export function HomeNews(props: BoxProps) {
  const { data } = useGetHomeNewsItemsQuery({ fetchPolicy: 'cache-only' });
  const newsItems = data?.newsItems || [];

  return (
    <Box {...props}>
      <BeetsHeadline mb="10">What&apos;s new</BeetsHeadline>
      <BeetsSubHeadline mb="4">Latest community updates</BeetsSubHeadline>
      <Box>
        <Grid
          templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(1, 1fr)' }}
          columnGap={{ base: '0', md: '4', lg: '0' }}
          rowGap="4"
        >
          {newsItems.map((newsItem) => (
            <GridItem key={newsItem?.id}>{newsItem && <HomeNewsCard item={newsItem} />}</GridItem>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
