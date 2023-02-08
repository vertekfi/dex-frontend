import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  Skeleton,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { BeetsBox } from '~/components/box/BeetsBox';
import { numberFormatUSDValue } from '~/lib/util/number-formats';
import { tokenFormatAmount } from '~/lib/services/token/token-util';
import TokenAvatar from '~/components/token/TokenAvatar';
import { useGetTokens } from '~/lib/global/useToken';
import { usePoolUserDepositBalance } from '~/modules/pool/lib/usePoolUserDepositBalance';
import { usePoolUserBptBalance } from '~/modules/pool/lib/usePoolUserBptBalance';
import { PoolUnstakeModal } from '~/modules/pool/stake/PoolUnstakeModal';
import { CardRow } from '~/components/card/CardRow';
import { useWithdraw } from '~/modules/pool/withdraw/lib/useWithdraw';
import { TokenSelectInline } from '~/components/token-select-inline/TokenSelectInline';
import { useWithdrawState } from '~/modules/pool/withdraw/lib/useWithdrawState';
import { PoolWithdrawWeightedPoolDescription } from '~/modules/pool/withdraw/components/PoolWithdrawWeightedPoolDescription';
import { PoolWithdrawStablePoolDescription } from '~/modules/pool/withdraw/components/PoolWithdrawStablePoolDescription';
import { usePool } from '~/modules/pool/lib/usePool';

interface Props {
  onShowProportional(): void;
  onShowSingleAsset(): void;
}

export function PoolWithdrawTypeChoice({ onShowProportional, onShowSingleAsset }: Props) {
  const unstakeDisclosure = useDisclosure();
  const { pool } = usePool();
  const { priceForAmount } = useGetTokens();
  const { userPoolBalanceUSD, data, isLoading } = usePoolUserDepositBalance();
  const {
    userTotalBptBalance,
    userWalletBptBalance,
    userStakedBptBalance,
    hasBptInWallet,
    hasBptStaked,
  } = usePoolUserBptBalance();
  const valueStaked =
    (parseFloat(userStakedBptBalance) / parseFloat(userTotalBptBalance)) * userPoolBalanceUSD;
  const valueInWallet =
    (parseFloat(userWalletBptBalance) / parseFloat(userTotalBptBalance)) * userPoolBalanceUSD;
  const { selectedWithdrawTokenAddresses } = useWithdraw();
  const { selectedOptions, setSelectedOption } = useWithdrawState();
  const isStablePool =
    pool.__typename === 'GqlPoolStable' || pool.__typename === 'GqlPoolPhantomStable';

  return (
    <Box>
      <Grid mt="4" mb="6" gap="8" templateColumns={{ base: '1fr', md: '1fr', lg: '1fr 1fr' }}>
        <GridItem>
          <BeetsBox p="2" mb="6">
            <Flex mb="4">
              <Text fontSize="lg" fontWeight="semibold" flex="1">
                My balance
              </Text>
              <Skeleton isLoaded={!isLoading}>
                <Text fontSize="lg" fontWeight="semibold">
                  {numberFormatUSDValue(userPoolBalanceUSD)}
                </Text>
              </Skeleton>
            </Flex>
            {pool.staking ? (
              <>
                <CardRow>
                  <Text flex="1">Wallet balance</Text>
                  <Skeleton isLoaded={!isLoading}>
                    <Text>{numberFormatUSDValue(valueInWallet)}</Text>
                  </Skeleton>
                </CardRow>
                <CardRow mb="0">
                  <Text flex="1">Staked balance</Text>
                  <Skeleton isLoaded={!isLoading}>
                    <Text>{numberFormatUSDValue(valueStaked)}</Text>
                  </Skeleton>
                </CardRow>
              </>
            ) : null}
          </BeetsBox>

          <BeetsBox p="2">
            <Text fontSize="lg" fontWeight="semibold" mb="4">
              Pool tokens breakdown
            </Text>
            {pool.withdrawConfig.options.map((option, index) => {
              const hasOptions = option.tokenOptions.length > 1;
              const token =
                option.tokenOptions.find((tokenOption) =>
                  selectedWithdrawTokenAddresses.includes(tokenOption.address),
                ) || option.tokenOptions[0];
              const balance = data?.find((item) => item.address === token.address)?.amount || '0';

              return (
                <CardRow
                  key={token.address}
                  mb={index === pool.tokens.length - 1 ? '0' : '1'}
                  alignItems="center"
                  pl={hasOptions ? '1' : '2'}
                >
                  <Box flex="1">
                    {hasOptions ? (
                      <TokenSelectInline
                        tokenOptions={option.tokenOptions}
                        selectedAddress={
                          selectedOptions[`${option.poolTokenIndex}`] ||
                          option.tokenOptions[0].address
                        }
                        onOptionSelect={(address) =>
                          setSelectedOption(option.poolTokenIndex, address)
                        }
                      />
                    ) : (
                      <HStack spacing="1.5">
                        <TokenAvatar size="xs" address={token.address} />
                        <Text fontSize="lg">{token.symbol}</Text>
                      </HStack>
                    )}
                  </Box>

                  <Box>
                    <Box textAlign="right" fontSize="lg">
                      <Skeleton isLoaded={!isLoading}>{tokenFormatAmount(balance)}</Skeleton>
                    </Box>

                    <Box textAlign="right" fontSize="sm" color="gray.200">
                      <Skeleton isLoaded={!isLoading}>
                        {numberFormatUSDValue(
                          priceForAmount({
                            address: token.address,
                            amount: balance,
                          }),
                        )}
                      </Skeleton>
                    </Box>
                  </Box>
                </CardRow>
              );
            })}
          </BeetsBox>
        </GridItem>
        <GridItem>
          <BeetsBox p="4">
            {isStablePool ? (
              <PoolWithdrawStablePoolDescription />
            ) : (
              <PoolWithdrawWeightedPoolDescription />
            )}
          </BeetsBox>
        </GridItem>
      </Grid>
      {hasBptStaked && (
        <Alert bg="vertek.slatepurple.900" status="warning" color="vertek.neonpurple.500" mt="4">
          <AlertIcon color="vertek.neonpurple.500" />
          <Box flex="1" mr="4">
            You have ~{numberFormatUSDValue(valueStaked)} worth of VPT staked. In order to withdraw
            this amount, you must first unstake your VPT.
          </Box>
          <Button variant="outline" onClick={unstakeDisclosure.onOpen}>
            Unstake
          </Button>
        </Alert>
      )}
      <Button
        variant="verteklight"
        width="full"
        mb="2"
        isDisabled={!hasBptInWallet}
        onClick={onShowProportional}
        _hover={{ transform: 'scale(1.01)' }}
      >
        Withdraw proportionally
      </Button>
      {pool.id !== '0xcf61cf9654f5536b8d6c93f09a0308ff3c2650f9000200000000000000000015' && (
        <Button
          variant="vertekdark"
          width="full"
          isDisabled={!hasBptInWallet}
          onClick={onShowSingleAsset}
          _hover={{ transform: 'scale(1.01)' }}
        >
          Single asset withdraw
        </Button>
      )}

      {/* <PoolUnstakeModal /> */}
    </Box>
  );
}
