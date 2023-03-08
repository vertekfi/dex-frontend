import {
  Box,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  Text,
  VStack,
  Icon,
  HStack,
} from '@chakra-ui/react';
import { Info } from 'react-feather';
import { VotingGaugeWithVotes } from '~/lib/services/staking/types';
import { formatVotesAsPercent } from '../lib/utils';

type Props = {
  gauge: VotingGaugeWithVotes;
};

export function VotingStatsPopover({ gauge }: Props) {
  const votesThisPeriod = formatVotesAsPercent(gauge.votes);
  const votesNextPeriod = formatVotesAsPercent(gauge.votesNextPeriod);
  const voteDifference = Number(gauge.votesNextPeriod) - Number(gauge.votes);

  return (
    <Popover placement="top">
      <PopoverTrigger>
        <Box className="cursor-pointer">
          <Icon size={75} as={Info} />
        </Box>
      </PopoverTrigger>
      <PopoverContent bg="vertek.slatepurple.900">
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>
          <Text textAlign="center" color="white">
            Voting Breakdown
          </Text>
        </PopoverHeader>
        <PopoverBody textAlign="center">
          <Box>
            <Text display="inline-block" mr={2}>
              This epoch:
            </Text>
            <Text display="inline-block">{votesThisPeriod}</Text>
          </Box>
          <Box>
            <Text display="inline-block" mr={2}>
              Next epoch:
            </Text>
            <Text
              fontWeight={600}
              display="inline-block"
              color={voteDifference > 0 ? 'green' : 'red'}
            >
              {votesNextPeriod}
            </Text>
          </Box>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
