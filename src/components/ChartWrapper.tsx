import React, {useEffect, useState, useCallback} from "react";
import { Line } from 'react-chartjs-2';

const chartOptions = {
  scales: {
    yAxes: [
      {
        type: 'linear',
        display: true,
        position: 'left',
        id: 'y-axis-1',
      }
    ],
  },
};

export default (props: any) => {
  const {data}= props;

  const getXAxisLabels = useCallback(() => {
    return data.map((item: any) => item.Date);
  }, [data]);

  const getSeriesItems = useCallback((key) => {
    return data.map((item: any) => item[key]);
  }, [data]);

  const [chartData, setChartData] = useState({
    labels: getXAxisLabels(),
    datasets: [
      {
        label: '# of Votes',
        data: getSeriesItems('Clicks'),
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
        yAxisID: 'y-axis-1',
      },
      {
        label: '# of No Votes',
        data: getSeriesItems('Impressions'),
        fill: false,
        backgroundColor: 'rgb(54, 162, 235)',
        borderColor: 'rgba(54, 162, 235, 0.2)',
        yAxisID: 'y-axis-1',
      },
    ],
  });

  useEffect(() => {
    console.log(data)
    setChartData({
      labels: getXAxisLabels(),
      datasets: [
        {
          label: 'Clicks',
          data: getSeriesItems('Clicks'),
          fill: false,
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgba(255, 99, 132, 0.2)',
          yAxisID: 'y-axis-1',
        },
        {
          label: 'Impressions',
          data: getSeriesItems('Impressions'),
          fill: false,
          backgroundColor: 'rgb(54, 162, 235)',
          borderColor: 'rgba(54, 162, 235, 0.2)',
          yAxisID: 'y-axis-1',
        },
      ],
    })
  },[getXAxisLabels, getSeriesItems]);

  return <div className={'chart-wrapper'}>
    <Line type={'line'} data={chartData} options={chartOptions} />
  </div>
};