import {
  Flex,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverArrow,
  PopoverCloseButton,
  Box,
  Text,
  Divider,
} from '@chakra-ui/react';
import { DollarSign } from 'react-feather';
import { LiquidityGauge } from '~/apollo/generated/graphql-codegen-generated';
import TokenAvatarSet from '~/components/token/TokenAvatarSet';
import { numberFormatUSDValue } from '~/lib/util/number-formats';

type Props = {
  gauge: LiquidityGauge;
};

export function GaugeRewardsInfo({ gauge }: Props) {
  return (
    <>
      {gauge.bribes.length ? (
        <Popover>
          <PopoverTrigger>
            <Flex className="cursor-pointer" justifyContent="center" alignContent="center">
              <Box
                display="flex"
                p={1}
                borderRadius={50}
                border={{ sm: '0px', md: '1px solid white', lg: '1px solid white' }}
              >
                <Icon as={DollarSign} color="green" />
              </Box>
            </Flex>
          </PopoverTrigger>
          <PopoverContent backgroundColor="">
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader bgColor="vertek.slatepurple.900">
              <Text fontSize="1.3rem">Bribes</Text>
            </PopoverHeader>
            <Box p="1" paddingY="4" fontSize="md" bgColor="vertek.slatepurple.900">
              {gauge.bribes.length ? (
                <Flex direction="column">
                  {gauge.bribes.map((bribe, i) => {
                    return (
                      <Box key={i}>
                        <Flex alignItems="center" gap={2} p={3}>
                          <TokenAvatarSet
                            width={32}
                            tokenData={[{ address: bribe?.token.address || '' }]}
                          />
                          <Text>{bribe?.token.symbol}</Text>
                          <Text>{numberFormatUSDValue(bribe?.valueUSD || 0)}</Text>
                          {/* <Text>{bribe?.epochWeekLabel}</Text> */}
                        </Flex>
                      </Box>
                    );
                  })}
                </Flex>
              ) : (
                <Text p={5} textAlign="center">
                  No current bribes
                </Text>
              )}

              {/* <Divider />
          <Text mt={2} fontWeight={500} textAlign="left" pl={4} fontSize="1.1rem">
            Other Gauge Earnings
          </Text>
          {gauge.rewardTokens.length ? (
            <Flex direction="column" mt={2}>
              <Flex direction="column">
                {gauge.rewardTokens.map((reward, i) => {
                  return (
                    <Box key={i}>
                      <Flex alignItems="center" gap={2} p={3}>
                        <TokenAvatarSet
                          width={32}
                          tokenData={[{ address: reward.tokenAddress || '' }]}
                        />
                        <Text>{reward.symbol}</Text>
                      </Flex>
                    </Box>
                  );
                })}
              </Flex>
            </Flex>
          ) : (
            <Text p={5} textAlign="center">
              No bonus rewards
            </Text>
          )} */}
            </Box>
          </PopoverContent>
        </Popover>
      ) : (
        <></>
      )}
    </>
  );
}
