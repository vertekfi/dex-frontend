import { SimpleGrid, Box, GridItem, Text, Skeleton, Tooltip } from '@chakra-ui/react';
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
import { InfoIcon } from '@chakra-ui/icons';

export function ClaimContainer() {
  const [gaugesWithRewards, setGaugesWithRewards] = useState<Gauge[]>([]);
  const [hasGaugeRewards, sethasGaugeRewards] = useState<boolean>(false);
  const [hasProtocolRewards, sethasProtocolRewards] = useState<boolean>(false);
  const [claiming, setClaiming] = useState<boolean>(false);

  const {
    rewardGauges,
    isLoading: isClaimsLoading,
    refetchGauges,
    protocolData,
    refetchProtocolRewards,
  } = useClaimsData();

  const { claimProtocolRewards, txState } = useProtocolRewardClaim();

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
    refetchGauges();
  }

  async function handleProtocolClaim() {
    setClaiming(true);
    await claimProtocolRewards();
    refetchProtocolRewards();
    refetchGauges();
    setClaiming(false);
  }

  return (
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
          <Text fontSize="1.20rem">Vertek (VRTK) Earnings</Text>
        </Box>
        {isClaimsLoading ? (
          <Skeleton isLoaded={!isClaimsLoading && !gaugesWithRewards.length} />
        ) : (
          <>
            {!isClaimsLoading && gaugesWithRewards.length ? (
              <ClaimTable gaugesWithRewards={gaugesWithRewards} />
            ) : (
              <NoRewardsBox label="No gauge staking rewards to claim" />
            )}
          </>
        )}
      </GridItem>

      <GridItem display="flex" flexDirection="column" paddingY="0">
        <Box flexDirection="row" display="flex" mb="0" paddingX="1">
          <Text fontSize="1.20rem">veVRTK and Protocol Earnings </Text>
          <Tooltip label="Protocol fee distribution is based on your percentage ownership of veVRTK at the start of the previous weeks epoch.">
            <InfoIcon />
          </Tooltip>
        </Box>
        <Box>
          {!isClaimsLoading && hasProtocolRewards ? (
            <ProtocolRewardsList
              protocolRewards={protocolData}
              onClaim={handleProtocolClaim}
              disabled={claiming}
            />
          ) : (
            <NoRewardsBox label="No veVRTK protocol rewards to claim" />
          )}
        </Box>
      </GridItem>

      <GridItem display="flex" flexDirection="column">
        <Text fontSize="1.20rem">Other Gauge Earnings</Text>

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
                <NoRewardsBox label="No additional staking rewards to claim" />
              )}
            </>
          )}
        </Box>
      </GridItem>
    </SimpleGrid>
  );
}
