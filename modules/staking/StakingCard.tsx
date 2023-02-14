import { Flex, Text, Box, GridItem } from '@chakra-ui/react';
import { StakingCardGuts } from './StakingCardGuts';
import StakingNFTPools from '../../lib/abi/StakingNFTPools.json';
import NextImage from 'next/image';
import { StakingAccordion } from './StakingAccordion';
import { useGetTokenPricesQuery } from '~/apollo/generated/graphql-codegen-generated';
import Vertek from '~/assets/svg/vertektransparent.svg';
import { readContract } from '@wagmi/core';
import { useAccount } from 'wagmi';
import { formatUnits } from 'ethers/lib/utils';
import { useEffect, useState } from 'react';
import { networkConfig } from '~/lib/config/network-config';

export function StakingCard(props: { pool: any | null }) {
  const pool = props.pool;
  const query = useAccount();

  const [poolInfo, setPoolInfo] = useState<any>();
  const [apr, setApr] = useState<string>();
  const [aprDaily, setAprDaily] = useState<string>();
  const [boostedAprDaily, setBoostedAprDaily] = useState<number>();

  const basePath = '/images/stakingPools/';

  const { data: pricesResponse } = useGetTokenPricesQuery();

  console.log(networkConfig.beets.address);
  const priceOfToken =
    pricesResponse &&
    pricesResponse.tokenPrices
      .filter((item: any) => item.address === networkConfig.beets.address.toLowerCase())[0]
      .price.toFixed(2);

  useEffect(() => {
    if (!priceOfToken || !query.address || !pool) return;
    readContract({
      addressOrName: networkConfig.nft.nftStakingContract.toLowerCase(),
      contractInterface: StakingNFTPools,
      chainId: 56,
      functionName: 'poolInfo',
      args: [pool.poolId],
    }).then((res) => {
      const nftStaked = parseInt(res.mpStakedAmount.toString())
      const rewardsPerDay = formatUnits(res.RewardPerSecond.mul(60).mul(60).mul(24), 18);
      const stakedAmount = formatUnits(res.xBooStakedAmount, 18);
      // NEED TO ADD IN THE PRICE OF THE REWARDS IN THE NUMERATOR
      const apr = (
        (parseInt(rewardsPerDay) / parseInt(stakedAmount)) *
        parseFloat(priceOfToken) *
        100 *.9
      )
        .toFixed(2)
        .toString();
      const aprYearly = (
        (parseInt(rewardsPerDay) / parseInt(stakedAmount)) *
        parseFloat(priceOfToken) *
        365 *
        100*.9
      )
        .toFixed(2)
        .toString();
      const boostedAPRD = 1/(nftStaked) * (
        (parseInt(rewardsPerDay) / parseInt(stakedAmount)) *
        parseFloat(priceOfToken) *
        100*.1
      )
      setAprDaily(apr);
      setBoostedAprDaily(boostedAPRD);
      setApr(aprYearly);
      setPoolInfo(res);
    });
  }, [priceOfToken, query.address]);

  return pool ? (
    <>
      {poolInfo && (
        <GridItem
          className="blk"
          boxShadow="0 0 10px #5BC0F8, 0 0 20px #4A4AF6"
          borderRadius="18px"
          maxW="550px"
          color="white"
        >
          <Flex
            direction="row"
            justify="center"
            fontWeight="bold"
            padding="2"
            ml="2"
            borderColor="box.500"
            borderBottomWidth="2px"
            alignItems="center"
          >
            <Box marginRight="2">
              <Text fontSize="1rem">Stake</Text>
            </Box>
            <Box>
              <NextImage
                width={75}
                height={75}
                objectFit="contain"
                src={Vertek}
                alt={`Logo for deposit token}`}
              />
            </Box>
            <Box marginRight="2" marginLeft="12">
              <Text fontSize="1rem">Earn</Text>
            </Box>
            <Box>
              <NextImage
                width={75}
                height={75}
                objectFit="contain"
                src={`${basePath}${pool.rewardToken.logoURI}`}
                alt={`Logo for ${pool.rewardToken.name}`}
              />
            </Box>
          </Flex>
          <StakingCardGuts
            pool={pool}
            poolInfo={poolInfo}
            apr={apr}
            aprDaily={aprDaily}
            priceOfToken={priceOfToken}
            boostedAprDaily={boostedAprDaily}
          />
          <StakingAccordion pool={pool} poolInfo={poolInfo} priceOfToken={priceOfToken}/>
        </GridItem>
      )}
    </>
  ) : null;
}
