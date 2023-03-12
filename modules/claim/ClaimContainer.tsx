import { SimpleGrid, Box, GridItem, Text, Skeleton } from '@chakra-ui/react';
import NextImage from 'next/image';
import VertekIcon from '~/assets/svg/vertektransparent.svg';
import { useClaimsData } from './lib/useClaimsData';
import { useEffect, useState } from 'react';
import { ClaimTable } from './components/ClaimTable';
import { Gauge } from '~/lib/services/staking/types';
import { NoRewardsBox } from './components/NoRewardsBox';
import { GaugeRewardsContainer } from './components/GaugeRewardsContainer';
import { ProtocolRewardsList } from './components/ProtocolRewardsList';
import { useProtocolRewardClaim } from './lib/useProtocolRewardsClaim';
import { Loading } from '~/components/loading/Loading';
import { FadeInOutBox } from '~/components/animation/FadeInOutBox';
import { TableHeading } from './components/TableHeading';
import { useUserAccount } from '~/lib/user/useUserAccount';
import { BribeClaim } from './components/BribeClaim';

export function ClaimContainer() {
  const [gaugesWithRewards, setGaugesWithRewards] = useState<Gauge[]>([]);
  const [hasGaugeRewards, sethasGaugeRewards] = useState<boolean>(false);
  const [hasProtocolRewards, sethasProtocolRewards] = useState<boolean>(false);
  const [hasBribeRewards, sethasBribeRewards] = useState<boolean>(false);
  const [claiming, setClaiming] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const { isConnected, userAddress } = useUserAccount();

  const {
    rewardGauges,
    isLoading: isClaimsLoading,
    refetchClaimsData,
    protocolData,
    bribeClaims,
    getUserBribeClaims,
  } = useClaimsData();

  const { claimProtocolRewards, txState } = useProtocolRewardClaim();

  useEffect(() => {
    const getClaims = async () => {
      await getUserBribeClaims({
        variables: {
          user: userAddress || '',
          epoch: 1677715200, // TODO: Dynamic update
        },
      });
    };

    if (isConnected && userAddress) {
      getClaims();
    }
  }, [isConnected, userAddress]);

  useEffect(() => {
    if (bribeClaims?.getUserBribeClaims) {
      if (bribeClaims.getUserBribeClaims.length) {
        sethasBribeRewards(true);
      } else {
        sethasBribeRewards(false);
      }
    }
  }, [bribeClaims]);

  useEffect(() => {
    if (txState.error) {
      console.error(txState.error);
      setClaiming(false);
    }

    if (txState.isPending) {
      setClaiming(true);
    } else {
      setClaiming(false);
    }

    if (txState.isConfirmed) {
      setClaiming(false);
    }
  }, [txState]);

  useEffect(() => {
    if (!isClaimsLoading && rewardGauges?.length) {
      setGaugesWithRewards(rewardGauges.filter((g) => parseFloat(g.claimableTokens) > 0));

      let hasRewardsToClaim = false;
      rewardGauges.forEach((g) => {
        if (Object.keys(g.claimableRewards).length > 0) {
          hasRewardsToClaim = true;
        }
      });

      sethasGaugeRewards(hasRewardsToClaim);

      setTimeout(() => setLoading(false), 100);
    }
  }, [rewardGauges, isClaimsLoading]);

  useEffect(() => {
    if (!isClaimsLoading && protocolData) {
      if (!(parseFloat(protocolData[0]?.amount) > 0)) {
        sethasProtocolRewards(false);
      } else {
        sethasProtocolRewards(true);
      }
    }
  }, [isClaimsLoading, protocolData]);

  function handleUserRewardsClaim() {
    refetchClaimsData();
  }

  async function handleProtocolClaim() {
    setClaiming(true);
    await claimProtocolRewards();
    refetchClaimsData();
    setClaiming(false);
  }

  return (
    <>
      {loading ? (
        <Loading loading={loading} />
      ) : (
        <SimpleGrid columns={1} paddingX={0} spacing={6} borderRadius="12px">
          <GridItem paddingY={0}>
            <Text fontSize="1.5rem" mb="2">
              BNB Chain Liquidity Incentives
            </Text>
          </GridItem>

          <GridItem display="flex" flexDirection="column" paddingY="0">
            <Box flexDirection="row" display="flex" mb="1">
              <Box marginRight="2" display="flex" justifyContent="">
                <NextImage width="36px" height="36px" src={VertekIcon} />
              </Box>
              <Text fontSize="1.3rem">Vertek (VRTK) Earnings</Text>
            </Box>

            {hasGaugeRewards ? (
              <FadeInOutBox isVisible={!loading}>
                <ClaimTable gaugesWithRewards={gaugesWithRewards} />
              </FadeInOutBox>
            ) : (
              <NoRewardsBox label="No gauge staking rewards to claim" />
            )}
          </GridItem>

          <GridItem display="flex" flexDirection="column" paddingY="0">
            <TableHeading
              text="veVRTK and Protocol Earnings"
              tooltipText="Protocol fee distribution is based on your percentage ownership of veVRTK at the start of the previous weeks epoch."
            />

            <Box>
              {hasProtocolRewards ? (
                <FadeInOutBox isVisible={!loading}>
                  <ProtocolRewardsList
                    protocolRewards={protocolData}
                    onClaim={handleProtocolClaim}
                    disabled={claiming}
                  />
                </FadeInOutBox>
              ) : (
                <NoRewardsBox label="No veVRTK protocol rewards to claim" />
              )}
            </Box>
          </GridItem>

          <GridItem display="flex" flexDirection="column">
            <TableHeading text="Bribe Earnings" />

            <Box>
              {bribeClaims?.getUserBribeClaims.length ? (
                <FadeInOutBox isVisible={!loading}>
                  <BribeClaim bribeRewards={bribeClaims.getUserBribeClaims} />
                </FadeInOutBox>
              ) : (
                <NoRewardsBox label="No bribe rewards to claim" />
              )}
            </Box>
          </GridItem>

          <GridItem display="flex" flexDirection="column">
            <TableHeading text="Other Gauge Earnings" />

            <Box>
              {isClaimsLoading ? (
                <Skeleton isLoaded={!isClaimsLoading} />
              ) : (
                <>
                  {hasGaugeRewards ? (
                    <GaugeRewardsContainer
                      gauges={rewardGauges}
                      isLoading={isClaimsLoading}
                      onSuccessfulClaim={handleUserRewardsClaim}
                    />
                  ) : (
                    <>
                      {!loading && !hasGaugeRewards && (
                        <NoRewardsBox label="No additional staking rewards to claim" />
                      )}
                    </>
                  )}
                </>
              )}
            </Box>
          </GridItem>
        </SimpleGrid>
      )}
    </>
  );
}
