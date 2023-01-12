import { Grid, GridItem, Text } from '@chakra-ui/react';
import { TokenAvatarSetInList } from '~/components/token/TokenAvatarSetInList';
import { memo } from 'react';
import { UserTokenBalancesProvider } from '~/lib/user/useUserTokenBalances';
import { PoolListProvider } from '~/modules/pools/usePoolList';
import { GaugeVoteModal } from './GaugeVoteModal';
import { useState } from 'react';
import { VotingGaugeWithVotes } from '~/lib/services/staking/types';
import { bnum } from '@balancer-labs/sor';
import { scale } from '@georgeroman/balancer-v2-pools/dist/src/utils/big-number';
import { fNum2 } from '~/lib/util/useNumber';

const MemoizedTokenAvatarSetInList = memo(TokenAvatarSetInList);

export function GaugeListItem(props: { gauge: VotingGaugeWithVotes }) {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const onOpen = () => setIsOpen(true);

  function formatVotesAsPercent(votes: string): string {
    const normalizedVotes = scale(bnum(votes), -18);
    return fNum2(normalizedVotes.toString(), {
      style: 'percent',
      maximumFractionDigits: 2,
      fixedFormat: true,
    });
  }

  return (
    <PoolListProvider>
      <UserTokenBalancesProvider>
        <Grid
          bg="vertek.slatepurple.900"
          boxShadow={{ base: '0 0 10px #5BC0F8, 0 0 20px #4A4AF6', lg: 'none' }}
          borderBottomColor="vertek.slatepurple.600"
          borderBottomWidth="1px"
          pl="4"
          py="4"
          borderRadius={{ base: '12px', lg: '' }}
          templateColumns={{
            base: 'repeat(1fr 1fr)',
            lg: '150px 1fr 200px 200px 200px',
          }}
          gap={{ base: '4', lg: '0' }}
          mb={{ base: '4', lg: '0' }}
          templateAreas={{
            base: `
        "name name"
        "icons icons" 
        "nextvote myvote"
        "votebutton votebutton" `,
            lg: `"icons name nextvote myvote votebutton"`,
          }}
        >
          <GridItem
            area="icons"
            display="flex"
            alignItems="center"
            justifyContent={{ base: 'center', lg: 'flex-start' }}
          >
            <MemoizedTokenAvatarSetInList
              imageSize={28}
              width={92}
              tokens={props.gauge.pool.tokens}
            />
          </GridItem>

          <GridItem
            area="name"
            display="flex"
            alignItems="center"
            fontWeight={{ base: 'bold', lg: 'normal' }}
            justifyContent={{ base: 'center', lg: 'flex-start' }}
            fontSize="1.2rem"
          >
            {props.gauge.pool.name}
          </GridItem>

          <GridItem
            area="nextvote"
            display={{ base: 'block', lg: 'flex' }}
            alignItems="center"
            justifyContent={{ base: 'center', lg: 'center' }}
            textAlign={{ base: 'left', lg: 'right' }}
            ml={{ base: '8', lg: '0' }}
          >
            <MobileLabel text="Next Period Votes" />
            {formatVotesAsPercent(props.gauge.votesNextPeriod)}
          </GridItem>

          <GridItem
            area="myvote"
            display={{ base: 'block', lg: 'flex' }}
            alignItems="center"
            justifyContent={{ base: 'center', lg: 'center' }}
            textAlign={{ base: 'right', lg: 'right' }}
            mr={{ base: '8', lg: '2' }}
          >
            <MobileLabel text="My Votes" />
            {formatVotesAsPercent(props.gauge.userVotes)}
          </GridItem>

          <GridItem
            area="votebutton"
            display="flex"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
          >
            <GaugeVoteModal isOpen={isOpen} onClose={onClose} />
          </GridItem>
        </Grid>
      </UserTokenBalancesProvider>
    </PoolListProvider>
  );
}

function MobileLabel({ text }: { text: string }) {
  return (
    <Text fontSize="sm" color="gray.200" display={{ base: 'block', lg: 'none' }}>
      {text}
    </Text>
  );
}
