import { useState } from 'react';
import {
  GetPoolSnapshotsQueryVariables,
  GqlPoolSnapshotDataRange,
  useGetPoolSnapshotsQuery,
} from '~/apollo/generated/graphql-codegen-generated';
import { usePool } from './usePool';

type ChartType = 'BPT_PRICE' | 'VOLUME_TVL' | 'FEES' | 'TVL';

export function usePoolChartData(args: GetPoolSnapshotsQueryVariables) {
  const { pool } = usePool();
  const [chartType, setChartType] = useState<ChartType>('BPT_PRICE');
  const [range, setRange] = useState<GqlPoolSnapshotDataRange>('THIRTY_DAYS');
  // const { data } = useGetPoolSnapshotsQuery({ variables: { poolId: pool.id, range } });
  const snapshots = [
    {
      id: '',
      timestamp: 1000,
      totalLiquidity: '',
      volume24h: '',
      fees24h: '',
      sharePrice: '',
    },
  ];

  return {
    data: {
      snapshots,
    },
  };
}
