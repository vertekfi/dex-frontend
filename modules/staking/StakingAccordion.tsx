import { GridItem, Flex, SimpleGrid, Text, Box, HStack } from '@chakra-ui/react';
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
    <GridItem colSpan={2}>
      <Accordion allowToggle padding={4}>
        <AccordionItem>
          <AccordionButton _expanded={{}}>
            <Box flex="1" textAlign="center">
              Details
            </Box>
            <AccordionIcon />
          </AccordionButton>

          <AccordionPanel pb={10} bg="vertek.slatepurple.900" borderRadius="20px">
            <SimpleGrid
              style={{ minWidth: '100%' }}
              bg=""
              borderRadius="20px"
              columns={2}
              spacing={7}
              padding="4"
              marginTop="4"
            >
              <Text textAlign="left" fontWeight="bold">
                Total Staked
              </Text>
              <Flex direction="column">
                <Text textAlign="right" fontWeight="bold">
                  ${pool.amountStakedValue}
                </Text>
                <Text fontSize="0.7rem" textAlign="right">
                  {pool.amountStaked} VRTK
                </Text>
              </Flex>
              <Text textAlign="left" fontWeight="bold">
                Your total share
              </Text>
              <Flex direction="column">
                <Text textAlign="right" fontWeight="bold">
                  {pool.userInfo?.percentageOwned}%
                </Text>
              </Flex>
              <Text textAlign="left" fontWeight="bold">
                Ends in...
              </Text>
              <Flex direction="column">
                <Text textAlign="right" fontWeight="bold">
                  {pool.blocksRemaining} blocks
                </Text>
                <Text fontSize="0.7rem" textAlign="right">
                  ~{pool.daysRemaining} days
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
    </GridItem>
  );
}
