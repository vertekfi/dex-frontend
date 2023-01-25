import { useTheme } from '@chakra-ui/react';
import ReactECharts from 'echarts-for-react';
import { useMemo } from 'react';
import { EChartsOption, graphic } from 'echarts';
import numeral from 'numeral';
import { format } from 'date-fns';
import { chartGetPrimaryColor } from '~/modules/pool/detail/components/charts/chart-util';
import { useNetworkConfig } from '~/lib/global/useNetworkConfig';

interface Props {
    data: { timestamp: number; totalLiquidity: string; volume24h: string }[];
    hideVolume?: boolean;
}

export function PoolDetailVolumeLiquidityChart({ data, hideVolume = false }: Props) {
    const { colors } = useTheme();
    const networkConfig = useNetworkConfig();

    const option = useMemo<EChartsOption>(
        () => ({
            tooltip: {
                show: true,
                trigger: 'axis',
                type: 'shadow',
                backgroundColor: 'rgba(24, 24, 46, 0.95)',
                borderColor: 'transparent',
                borderRadius: 8,
                padding: 16, 
                textStyle: {
                    color: 'white',
                },
                axisPointer: {
                    type: 'cross',
                    crossStyle: {
                        color: '#fff',
                    },
                    lineStyle: {
                        color: '#376df4',
                        width: 2,
                        opacity: 1,
                      },
                },
            },
            legend: {
                show: false,
                data: ['TVL', 'Daily Volume'],
                textStyle: {
                    color: colors.gray['100'],
                },
                top: '0',
                right: '2%',
            },
            grid: {
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                containLabel: true,
            },
            xAxis: {
                type: 'time',
                minorSplitLine: { show: false },
                axisTick: { show: false },
                axisLabel: {
                    formatter: (value: number, index: number) => {
                        return format(new Date(value), 'MMM d');
                    },
                    fontSize: 14, 
                    color: colors.gray['100'],
                    interval: 'auto',

                    showMaxLabel: false,
                    showMinLabel: false,
                },
                //maxInterval: 3600 * 1000 * 24,
                axisPointer: {
                    type: 'line',
                    label: {
                        formatter: (params) => {
                            return format(new Date(params.value), 'MMM d');
                        },
                    },
                },
                axisLine: { show: false },
            },
            yAxis: [
                {
                    type: 'value',
                    axisLine: { show: false },
                    minorSplitLine: { show: false },
                    splitLine: { show: false },
                    axisLabel: {
                        formatter: function (value: number, index: number) {
                            return index % 3 === 1 ? `$${numeral(value).format('0a')}` : '';
                        },
                        color: colors.gray['100'],
                    },
                    axisPointer: {
                        label: {
                            formatter: function (params) {
                                return `$${numeral(params.value).format('0a')}`;
                            },
                        },
                    },
                },
                {
                    type: 'value',
                    //max: 6000000, // align with left_axis
                    axisLine: { show: false },
                    minorSplitLine: { show: false },
                    splitLine: { show: false },
                    axisLabel: {
                        formatter: function (value: number, index: number) {
                            return index % 3 === 1 ? `$${numeral(value).format('0a')}` : '';
                        },
                        color: colors.gray['100'],
                    },
                    axisPointer: {
                        label: {
                            formatter: function (params) {
                                return `$${numeral(params.value).format('0a')}`;
                            },
                        },
                    },
                },
            ],
            series: [
                {
                    data: data.map((item) => [item.timestamp * 1000, item.totalLiquidity]),
                    name: 'TVL',
                    type: 'bar',
                    tooltip: {
                        valueFormatter: function (value) {
                            return `$${numeral(value).format('0a')}`;
                        },
                    },
                    itemStyle: {
                        opacity: 1,
                        borderRadius: [5, 5, 0, 0],
                        color: new graphic.LinearGradient(0, 0, 0, 1, [
                            { offset: 0, color: 'rgba(80, 78, 144, 1)' },
              { offset: 1, color: 'rgba(28, 28, 52, 1)' },
                        ]),
                    },
                },
                {
                    data: hideVolume ? [] : data.map((item) => [item.timestamp * 1000, item.volume24h]),
                    name: 'Daily Volume',
                    type: 'line',
                    yAxisIndex: 1,
                    tooltip: {
                        valueFormatter: function (value) {
                            return `$${numeral(value).format('0a')}`;
                        },
                    },
                    symbol: 'circle',
                    symbolSize: data.length > 60 ? 6 : 8,
                    itemStyle: {
                        color:  colors.vertek.neonpurple['500'],

                    },
                    lineStyle: {
                        color: colors.white,
                    },
                },
            ],
        }),
        [JSON.stringify(data)],
    );

    return <ReactECharts option={option} style={{ height: '100%' }} />;
}
