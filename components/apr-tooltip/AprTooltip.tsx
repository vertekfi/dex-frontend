import {
  GqlPoolApr,
  GqlPoolCardDataFragment,
  GqlPoolUnion,
} from '~/apollo/generated/graphql-codegen-generated';
import {
  Box,
  Button,
  Flex,
  HStack,
  PlacementWithLogical,
  Popover,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger as OrigPopoverTrigger,
  Text,
  TextProps,
  Tooltip,
} from '@chakra-ui/react';
import StarsIcon from '~/components/apr-tooltip/StarsIcon';
import numeral from 'numeral';
import { AprText } from '~/components/apr-tooltip/AprText';
import { Info } from 'react-feather';
import { useUserData } from '~/lib/user/useUserData';
import { getAprValues } from '~/lib/util/apr-utils';

interface Props {
  poolId: string;
  data: GqlPoolApr;
  textProps?: TextProps;
  onlySparkles?: boolean;
  placement?: PlacementWithLogical;
  aprLabel?: boolean;
  sparklesSize?: 'sm' | 'md';
}

function AprTooltip({
  poolId,
  data,
  textProps,
  onlySparkles,
  placement,
  aprLabel,
  sparklesSize,
}: Props) {
  const PopoverTrigger: React.FC<{ children: React.ReactNode }> = OrigPopoverTrigger;

  const formatApr = (apr: string) => {
    if (parseFloat(apr) < 0.0000001) {
      return '0.00%';
    }
    return numeral(apr).format('0.00%');
  };

  const { boostForPool } = useUserData();

  const boost = boostForPool(poolId);
  const { minApr, maxApr, boostedTotalAPR, isVePool } = getAprValues(data, boost);

  console.log(data.hasRewardApr);
  if (!data.hasRewardApr) {
    console.log(data);
  }
  return (
    <Popover trigger="hover" placement={placement}>
      <HStack align="center">
        {!onlySparkles && isVePool ? (
          <Text fontSize="1rem" fontWeight="semibold" mr="1" color="white" {...textProps}>
            {formatApr(data.total)}
            {aprLabel ? ' APR' : ''}
          </Text>
        ) : (
          <Text fontSize="1rem" fontWeight="semibold" mr="1" color="white" {...textProps}>
            {formatApr(minApr)} - {formatApr(maxApr)}
          </Text>
        )}
        <PopoverTrigger>
          <Button
            minWidth="0"
            height="auto"
            variant="unstyled"
            _active={{ outline: 'none' }}
            _focus={{ outline: 'none' }}
          >
            {data.hasRewardApr || isVePool ? (
              <StarsIcon
                width={sparklesSize === 'sm' ? 18 : 24}
                height={sparklesSize === 'sm' ? 19 : 25}
              />
            ) : (
              <Box color="gray.200">
                <Info size={sparklesSize === 'sm' ? 18 : 24} />
              </Box>
            )}
          </Button>
        </PopoverTrigger>
      </HStack>
      <PopoverContent
        padding="4"
        borderRadius="16px"
        bgColor="vertek.slatepurple.900"
        boxShadow="0 0 12px #000"
      >
        <PopoverHeader bgColor="vertek.slatepurple.900">
          <Text textAlign="center" fontSize="1rem">
            APR Breakdown
          </Text>
        </PopoverHeader>
        <Box p="1" paddingY="4" fontSize="md" bgColor="vertek.slatepurple.900">
          {data.items.map((item, index) => {
            return (
              <Box key={index}>
                <Flex fontWeight="" align="center">
                  <AprText mr="auto">{item.title}:</AprText>
                  <Text ml="auto">{formatApr(item.apr)} </Text>
                </Flex>
                {item.subItems?.map((subItem, subItemIndex) => {
                  const isSubItemsLengthOne = item.subItems?.length === 1;
                  const isSubItemIndexZero = subItemIndex === 0;
                  return (
                    <Flex align="center" key={subItemIndex}>
                      <Box
                        w="1px"
                        m="0.25rem"
                        h={isSubItemsLengthOne ? '0.8rem' : isSubItemIndexZero ? '1rem' : '2rem'}
                        mt={
                          isSubItemsLengthOne
                            ? '-0.5rem'
                            : isSubItemIndexZero
                            ? '-0.3rem'
                            : '-1.7rem'
                        }
                        bgColor="gray.100"
                      />
                      {/* <Box h="1px" w="0.75rem" mr="0.25rem" ml="-0.25rem" bgColor="gray.100" /> */}
                      <Flex align="center" marginX="2">
                        <AprText mr="auto">{subItem.title}</AprText>
                        <Text ml="auto">{formatApr(subItem.apr)}</Text>
                      </Flex>
                    </Flex>
                  );
                })}
              </Box>
            );
          })}
        </Box>
        {!isVePool && (
          <PopoverFooter>
            <Flex align="center" mt="4">
              <Text mr="auto" color="vertek.neonpurple.500">
                My veVRTK Boost :{' '}
              </Text>
              <Text ml="auto">{parseFloat(boost.boost).toFixed(2)}x</Text>
            </Flex>
            <Flex align="center" mt="4">
              <Text mr="auto" color="vertek.neonpurple.500">
                My APR :{' '}
              </Text>
              <Text ml="auto">{formatApr(boostedTotalAPR)}</Text>
            </Flex>
          </PopoverFooter>
        )}
      </PopoverContent>
    </Popover>
  );
}

export default AprTooltip;
