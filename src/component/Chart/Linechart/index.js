import React, {useEffect, useState} from 'react';
import HighchartsReact from "highcharts-react-official";
import Highchart from "highcharts";
import moment from "moment";

const generationOptions = (data) => {
    return {
        chart: {height: 500},
        title: {text: 'Tổng số ca nhiễm'},
        xAxis: {
            categories: data.map(item => moment(item.Date).format("DD/MM/YYYY")),
            crosshair: true,
        },
        colors: ['#db5254'],
        yAxis: {
            min: 0,
            title: {
                text: null,
            },
            labels: {
                align: 'right'
            },
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span>',
            pointFormat: '<tr><td>{series.name} :</td>' + '<td><b>{point.y} ca</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [
            {
                name: 'Tổng ca nhiễm',
                data: data.map((item) => {
                    return item.Confirmed
                })
            }
        ]
    }
};

function LineChart(props) {
    const [options, setOption] = useState({});
    useEffect(() => {
        setOption(generationOptions(props.data));
    }, [props.data])
    return (
        <div>
            <HighchartsReact
                highcharts={Highchart}
                options={options}
            />
        </div>
    );
}

export default LineChart;