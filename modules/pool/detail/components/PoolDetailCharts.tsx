import { HStack, Select, Box } from '@chakra-ui/react';
import Card from '~/components/card/Card';
import { PoolDetailBptPriceChart } from '~/modules/pool/detail/components/charts/PoolDetailBptPriceChart';
import { useState } from 'react';
import { PoolDetailVolumeLiquidityChart } from '~/modules/pool/detail/components/charts/PoolDetailVolumeLiquidityChart';
import { PoolDetailFeesChart } from '~/modules/pool/detail/components/charts/PoolDetailFeesChart';
import {
  GqlPoolSnapshotDataRange,
  useGetPoolSnapshotsQuery,
} from '~/apollo/generated/graphql-codegen-generated';
import { usePool } from '~/modules/pool/lib/usePool';

type ChartType = 'BPT_PRICE' | 'VOLUME_TVL' | 'FEES' | 'TVL';

export function PoolDetailCharts() {
  const { pool } = usePool();
  const [chartType, setChartType] = useState<ChartType>('BPT_PRICE');
  const [range, setRange] = useState<GqlPoolSnapshotDataRange>('THIRTY_DAYS');
  const { data } = useGetPoolSnapshotsQuery({ variables: { poolId: pool.id, range } });

  return (
    <Card
      width="full"
      boxShadow=" 0 0 4px #5BC0F8,  0 0 8px #4A4AF6,  0 0 2px #fff"
      minHeight="540px"
      padding="8px"
      borderRadius="12px"
    >
      <HStack
        padding={{ base: '2', lg: '4' }}
        pb="0"
        
        justify={{ base: 'space-between', lg: 'flex-start' }}
      >
        <Select
          value={chartType}
          onChange={(e) => setChartType(e.currentTarget.value as ChartType)}
          width="160px"
          bgColor="black" 
          color="white" 
          variant="filled"
        >

          <option value="BPT_PRICE">VPT price</option>
          <option value="FEES">Fees</option>
          <option value="TVL">TVL</option>
          <option value="VOLUME_TVL">Volume / TVL</option>

        </Select>
        <Select
          value={range}
          onChange={(e) => setRange(e.currentTarget.value as GqlPoolSnapshotDataRange)}
          width="160px"
          bgColor="vertek.slatepurple.900" 
          color="gray.100" 
          css={`
            & > option {
              background-color: black;
              color: white;
            }
          `}
          variant="filled"
        >
          <option value="THIRTY_DAYS">last 30 days</option>
          <option value="NINETY_DAYS">last 90 days</option>
          <option value="ONE_HUNDRED_EIGHTY_DAYS">last 180 days</option>
          <option value="ONE_YEAR">last 365 days</option>
          <option value="ALL_TIME">All time</option>
        </Select>
      </HStack>
      {chartType === 'BPT_PRICE' && (
        <PoolDetailBptPriceChart
          prices={(data?.snapshots || []).map((snapshot) => ({
            timestamp: snapshot.timestamp,
            price: snapshot.sharePrice,
          }))}
        />
      )}
      {chartType === 'VOLUME_TVL' && (
        <PoolDetailVolumeLiquidityChart data={data?.snapshots || []} />
      )}
      {chartType === 'TVL' && (
        <PoolDetailVolumeLiquidityChart data={data?.snapshots || []} hideVolume />
      )}
      {chartType === 'FEES' && <PoolDetailFeesChart data={data?.snapshots || []} />}
    </Card>
  );
}
