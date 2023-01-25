import { useTheme, Box } from '@chakra-ui/react';
import ReactECharts from 'echarts-for-react';
import { useMemo } from 'react';
import { EChartsOption, graphic } from 'echarts';
import numeral from 'numeral';
import { format } from 'date-fns';
import { chartGetPrimaryColor } from '~/modules/pool/detail/components/charts/chart-util';
import { useNetworkConfig } from '~/lib/global/useNetworkConfig';

interface Props {
  data: { timestamp: number; fees24h: string }[];
}

export function PoolDetailFeesChart({ data }: Props) {
  const networkConfig = useNetworkConfig();
  const { colors } = useTheme();

  const option = useMemo<EChartsOption>(
    () => ({
      tooltip: {
        trigger: 'axis',
        type: 'shadow',
        backgroundColor: 'rgba(24, 24, 46, 0.95)',
        borderColor: 'transparent',
        borderRadius: 8,
        textStyle: {
          color: 'white',
        },
        padding: 16,
        axisPointer: {
          animation: false,
          type: 'cross',
          lineStyle: {
            color: '#376df4',
            width: 2,
            opacity: 1,
          },
        },
      },
      grid: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        containLabel: false,
      },
      xAxis: {
        show: false,
        type: 'time',
        axisLine: { lineStyle: { color: '#8392A5' },  },
        offset: 0,
        axisLabel: {
          fontSize: 14, 
          formatter: (value: number, index: number) => {
            return format(new Date(value), 'MMM d');
          },
          color: colors.gray['200'],
          interval: 'auto',

          showMaxLabel: false,
          showMinLabel: false,
        },
        axisPointer: {
          type: 'line',
          label: {
            formatter: (params) => {
              return format(new Date(params.value), 'MMM d');
            },
          },
        },
      },
      yAxis: {
        type: 'value',
        axisLine: { show: false },
        minorSplitLine: { show: false },
        splitLine: { show: false },
        axisLabel: {
          formatter: function (value: number, index: number) {
            return index % 3 === 1 ? `$${numeral(value).format('0a')}` : '';
          },
          color: colors.beets.base['100'],
        },
        axisPointer: {
          label: {
            formatter: function (params) {
              return `$${numeral(params.value).format('0a')}`;
            },
          },
        },
      },
      color: ['#4A4AF6'],
      series: [
        {
          data: data.map((item) => [item.timestamp * 1000, item.fees24h]),
          name: 'Fees',
          type: 'bar',
          tooltip: {
            valueFormatter: function (value) {
              return `$${numeral(value).format('0a')}`;
            },
          },
          areaStyle: {
            opacity: 1,
            color: new graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(80, 78, 144, 1)' },
              { offset: 1, color: 'rgba(28, 28, 52, 1)' },
            ]),
          },
          itemStyle: {
            borderRadius: [5, 5, 0, 0],
            color: '#4A4AF6',
            borderColor: '#4A4AF6',
          },
        },
      ],
    }),
    [JSON.stringify(data)],
  );

  return (
    <Box width="full" height="full">
   <ReactECharts option={option} style={{ height: '100%' }} />
  </Box>
  );
}
