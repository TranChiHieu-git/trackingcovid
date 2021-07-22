import React, {useEffect, useRef, useState} from 'react';
import HighchartsReact from "highcharts-react-official";
import Highchart from "highcharts";
import HighchartMap from "highcharts/modules/map";
import {cloneDeep} from "lodash";

HighchartMap(Highchart);
const initOptions = {
    chart: {
        height: '500',
    },
    title: {
        text: null,
    },
    mapNavigation: {
        enabled: true,
    },
    colorAxis: {
        min: 0,
        stops: [
            [0.2, '#FFC4AA'],
            [0.4, '#FF8A66'],
            [0.6, '#FF392B'],
            [0.8, '#B71525'],
            [1, '#531616'],
        ]
    },
    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'bottom',
    },
    series: [
        {mapData: {}, name: 'Dân số', joinBy: ['hc-key', 'key']}
    ]
}

function Highmap(props) {
    const [options, setOptions] = useState({});
    const chartRef = useRef(null);
    useEffect(() => {
        if (props.mapData && Object.keys(props.mapData).length > 0) {
            const fakeData = props.mapData.features && props.mapData.features.length > 0 && props.mapData.features.map((feature, index) => ({
                key: feature.properties['hc-key'],
                value: index,
            }));
            if (props.mapData) {
                setOptions({
                    ...initOptions, series: [{
                        ...initOptions.series[0],
                        mapData: props.mapData,
                        data: fakeData,
                    }]
                })
            }
        }
    }, [props.mapData]);
    useEffect(() => {
        if (chartRef && chartRef.current && chartRef.current.chart && chartRef.current.chart.series[0]) {
            chartRef.current.chart.series[0].update({
                mapData: props.mapData
            })
        }
    }, [props.mapData])
    return (
        <HighchartsReact
            highcharts={Highchart}
            options={cloneDeep(options)}
            constructorType={'mapChart'}
            ref={chartRef}
        />
    );
}

export default Highmap;