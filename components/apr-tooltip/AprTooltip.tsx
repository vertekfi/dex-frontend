import { GqlPoolApr, GqlUserGaugeBoost } from '~/apollo/generated/graphql-codegen-generated';
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
} from '@chakra-ui/react';
import StarsIcon from '~/components/apr-tooltip/StarsIcon';
import numeral from 'numeral';
import { AprText } from '~/components/apr-tooltip/AprText';
import { Info } from 'react-feather';
import { bnum } from '~/lib/util/big-number.utils';

interface Props {
  data: GqlPoolApr;
  boost: Pick<GqlUserGaugeBoost, 'boost' | 'gaugeAddress' | 'poolId'>;
  textProps?: TextProps;
  onlySparkles?: boolean;
  placement?: PlacementWithLogical;
  aprLabel?: boolean;
  sparklesSize?: 'sm' | 'md';
}

function AprTooltip({
  data,
  boost,
  textProps,
  onlySparkles,
  placement,
  aprLabel,
  sparklesSize,
}: Props) {
  const minAprItem = data.items.find((apr) => apr.title.includes('Min'));
  const maxAprItem = data.items.find((apr) => apr.title.includes('Max'));
  const swapApr = data.items.find((apr) => apr.title.includes('Swap'));

  const PopoverTrigger: React.FC<{ children: React.ReactNode }> = OrigPopoverTrigger;

  const formatApr = (apr: string) => {
    if (parseFloat(apr) < 0.0000001) {
      return '0.00%';
    }
    return numeral(apr).format('0.00%');
  };

  let minApr = '0';
  let maxApr = '0';
  let boostedTotalAPR = '0';
  if (minAprItem && maxAprItem) {
    minApr = String(parseFloat(minAprItem.apr) + parseFloat(swapApr?.apr || '0'));
    maxApr = String(parseFloat(maxAprItem.apr) + parseFloat(swapApr?.apr || '0'));
    boostedTotalAPR = bnum(String(parseFloat(minAprItem.apr)))
      .times(boost.boost)
      .plus(swapApr?.apr || '0')
      .toString();
  }

  return (
    <Popover trigger="hover" placement={placement}>
      <HStack align="center">
        {!onlySparkles && !minAprItem ? (
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
            {data.hasRewardApr ? (
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
            {/* <br />
            <span style={{ fontSize: '1.5rem', color: '#4A4AF6' }}>{formatApr(data.total)}</span> */}
          </Text>
        </PopoverHeader>
        <Box p="4" fontSize="md" bgColor="vertek.slatepurple.900">
          {data.items.map((item, index) => {
            return (
              <Box key={index}>
                <Flex>
                  {formatApr(item.apr)} <AprText>{item.title}</AprText>
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
                      <Box h="1px" w="0.75rem" mr="0.25rem" ml="-0.25rem" bgColor="gray.100" />
                      <Flex>
                        <Text>
                          <AprText>{subItem.title}</AprText>
                        </Text>
                        <Text>{formatApr(subItem.apr)}</Text>
                      </Flex>
                    </Flex>
                  );
                })}
              </Box>
            );
          })}
        </Box>
        <PopoverFooter>
          <Flex>
            <Text color="vertek.neonpurple.500">My veVRTK Boost : </Text>
            <Text>{parseFloat(boost.boost).toFixed(2)}x</Text>
          </Flex>
          <Flex>
            <Text color="vertek.neonpurple.500">My APR : </Text>
            <Text> {formatApr(boostedTotalAPR)}</Text>
          </Flex>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
}

export default AprTooltip;
