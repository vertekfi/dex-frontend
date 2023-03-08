import { Box, Button, Flex, Grid, GridItem, Text } from '@chakra-ui/react';

export function BribeClaim() {
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
          templateColumns={{
            base: 'repeat(1fr 1fr)',
            lg: '1fr 3fr 1fr 1fr 1fr',
          }}
          bg="vertek.slatepurple.900"
        >
          <GridItem>
            <Flex justifyContent="space-between">
              {/* <MemoizedTokenAvatarSetInList imageSize={32} width={92} tokens={gauge.pool.tokens} />
              <Text ml="1" fontWeight="bold">
                {gauge.pool.name}
              </Text> */}
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
        <Grid
          display={{ base: 'grid', lg: 'none' }}
          paddingX="1"
          paddingY="4"
          borderTopRadius="16px"
          templateColumns={{
            base: 'repeat(1fr 1fr)',
            lg: '1fr 3fr 1fr 1fr 1fr',
          }}
          bg="vertek.slatepurple.900"
        >
          <GridItem>
            <Flex justifyContent="center" alignItems="center">
              {/* <MemoizedTokenAvatarSetInList imageSize={32} width={92} tokens={gauge.pool.tokens} />
              <Text ml="1" fontWeight="bold">
                {gauge.pool.name}
              </Text> */}
            </Flex>
          </GridItem>
          <Box display="flex" justifyContent="center" mt="4">
            {/* {!txState.isPending ? (
              <Button
                display={{ base: 'flex', lg: 'none' }}
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
                Claim All
              </Button>
            ) : (
              <Button
                display={{ base: 'flex', lg: 'none' }}
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
            )} */}
          </Box>
        </Grid>
      </Box>

      {/* {gauge.rewardTokens.map((token) => (
        <GaugeRewardRow
          token={token}
          key={token.tokenAddress}
          claimableRewards={gauge.claimableRewards[token.tokenAddress]}
        />
      ))} */}

      <Box mb={{ base: 'none', lg: '10' }}>
        <Flex
          display={{ base: 'none', lg: 'grid' }}
          p="3"
          mt={0}
          borderLeftWidth="1px"
          borderRightWidth="1px"
          borderBottomWidth="1px"
          borderColor="#4A4AF6"
          borderBottomRadius="16px"
          borderTopRadius={{ base: '16px', lg: 'none' }}
          bg={{ base: 'none', lg: 'vertek.slatepurple.900' }}
          justifyContent={{ base: 'center', lg: 'flex-end' }}
        >
          {/* {!txState.isPending ? (
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
              onClick={onGaugeClaim}
            >
              Claim
            </Button>
          ) : (
            <Button
              display={{ base: 'none', lg: 'flex' }}
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
          )} */}
        </Flex>
      </Box>
    </Box>
  );
}
