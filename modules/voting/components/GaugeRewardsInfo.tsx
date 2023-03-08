import {
  Flex,
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
import Image from 'next/image';
import bribes from './moneybag.svg';
import { LiquidityGauge } from '~/apollo/generated/graphql-codegen-generated';
import TokenAvatarSet from '~/components/token/TokenAvatarSet';
import { numberFormatUSDValue } from '~/lib/util/number-formats';

type Props = {
  gauge: LiquidityGauge;
};

export function GaugeRewardsInfo({ gauge }: Props) {
  const hasBribes = gauge.currentEpochBribes.length || gauge.nextEpochBribes.length;

  let totalValue = 0;
  gauge.currentEpochBribes?.forEach((b) => (totalValue += b?.valueUSD || 0));
  gauge.nextEpochBribes?.forEach((b) => (totalValue += b?.valueUSD || 0));

  return (
    <>
      {hasBribes ? (
        <Popover>
          <PopoverTrigger>
            <Flex width="50%" justifyContent="space-between">
              <Flex className="cursor-pointer" justifyContent="center" alignContent="center">
                {/* <Box
                  display="flex"
                  p={1}
                  borderRadius={50}
                  border={{ sm: '0px', md: '1px solid white', lg: '1px solid white' }}
                > */}
                <Image src={bribes} height={25} width={25} />
                {/* </Box> */}
              </Flex>

              {numberFormatUSDValue(totalValue)}
            </Flex>
          </PopoverTrigger>

          <PopoverContent backgroundColor="">
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader bgColor="vertek.slatepurple.900">
              <Text fontSize="1.3rem"> Bribes</Text>
            </PopoverHeader>
            <Box p="1" paddingY="4" fontSize="md" bgColor="vertek.slatepurple.900">
              <Text mt={2} fontWeight={500} textAlign="center" fontSize="1.1rem">
                Current Epoch Bribes
              </Text>
              {gauge.currentEpochBribes.length ? (
                <Flex direction="column">
                  {gauge.currentEpochBribes?.map((bribe, i) => {
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

              <Divider />
              <Text mt={4} fontWeight={500} textAlign="center" fontSize="1.1rem">
                Next Epoch Bribes
              </Text>
              {gauge.nextEpochBribes.length ? (
                <Flex direction="column" mt={4}>
                  <Flex direction="column">
                    {gauge.nextEpochBribes?.map((bribe, i) => {
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
                </Flex>
              ) : (
                <Text p={5} textAlign="center">
                  No bribes for next epoch
                </Text>
              )}
            </Box>
          </PopoverContent>
        </Popover>
      ) : (
        <></>
      )}
    </>
  );
}
