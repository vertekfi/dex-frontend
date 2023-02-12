import { Flex, SimpleGrid, Text, Box, HStack } from '@chakra-ui/react';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { RewardPool } from '~/apollo/generated/graphql-codegen-generated';

export function StakingAccordion(props: { pool: RewardPool }) {
  const pool = props.pool;

  return (
    <Accordion allowToggle padding={4}>
      <AccordionItem>
        <AccordionButton _expanded={{}}>
          <Box flex="1" textAlign="center">
            Details
          </Box>
          <AccordionIcon />
        </AccordionButton>

        <AccordionPanel>
          <SimpleGrid
            style={{ minWidth: '100%' }}
            bg=""
            borderRadius="20px"
            columns={2}
            spacing={5}
            padding="4"
          >
            <Text textAlign="left" fontWeight="bold">
              Total Staked
            </Text>
            <Flex direction="column">
              <Text textAlign="right" fontWeight="bold">
                ${pool.amountStakedValue || '0'}
              </Text>

              <Text fontSize="0.7rem" textAlign="right">
                {pool.amountStaked || '0'} VRTK
              </Text>
            </Flex>

            <Text textAlign="left" fontWeight="bold">
              Your total share
            </Text>
            <Flex direction="column">
              <Text textAlign="right" fontWeight="bold">
                {pool.userInfo?.percentageOwned || '0'}%
              </Text>
            </Flex>
            <Text textAlign="left" fontWeight="bold">
              Ends in...
            </Text>
            <Flex direction="column">
              <Text textAlign="right" fontWeight="bold">
                {pool.blocksRemaining || '0'} blocks
              </Text>
              <Text fontSize="0.7rem" textAlign="right">
                ~{pool.daysRemaining || '0'} days
              </Text>
            </Flex>

            <div />
            <HStack justify="end">
              <Text fontSize="1rem" textAlign="right">
                Project Info
              </Text>
              <ExternalLinkIcon />
            </HStack>

            <div />
            <HStack justify="end">
              <Text fontSize="1rem" textAlign="right">
                Contract
              </Text>
              <ExternalLinkIcon />
            </HStack>
          </SimpleGrid>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}
