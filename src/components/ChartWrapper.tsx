import React, {useEffect, useState, useCallback, useRef} from "react";
import { groupBy } from 'lodash';

import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  LineSeries,
  ZoomAndPan,
} from '@devexpress/dx-react-chart-material-ui';

import {
  ValueScale
} from '@devexpress/dx-react-chart';
import {useFilterContext} from "../utilities/filterContext";

interface ChartWrapperProps {
  data: Array<any>
}

const clicksColor = '#1b0b49';
const impressionsColor = '#3c94d7';

const clicksColorStyle = {'--color': clicksColor} as React.CSSProperties;
const impressionsColorStyle = {'--color': impressionsColor} as React.CSSProperties;

export default (props: ChartWrapperProps) => {
  const chartContainerRef = useRef<any>(null);
  const {data}= props;
  const {selectedCampaigns, selectedDataSources, availableCampaigns, availableDataSources} = useFilterContext();

  const getTitle = useCallback(() => {
    let retVal = [];

    retVal.push(getLabelForDataSource(selectedDataSources, 'Datasource', availableDataSources));
    retVal.push(getLabelForDataSource(selectedCampaigns, 'Campaign', availableCampaigns));

    return retVal;

  }, [selectedDataSources, selectedCampaigns, availableDataSources, availableCampaigns]);

  const transformData = useCallback(() => {
    const groupedData = groupBy(data, 'Date');

    const retVal = Object.keys(groupedData).reduce((acc: Array<any>, key: string) => {
      return [
        ...acc,
        {
          x: key,
          clicks: groupedData[key].reduce((acc: number, item: any) => (acc += Number(item.Clicks)), 0),
          impressions: groupedData[key].reduce((acc: number, item: any) => (acc += Number(item.Impressions)), 0),
        }
      ]
    }, []);

    return retVal;
  }, [data]);

  const [chartData, setChartData] = useState(transformData());
  const [viewport, setViewport] = useState<any>();

  const [chartHeight, setChartHeight] = useState(0);

  const handleViewportChange = (newViewport: any) => {
    setViewport(newViewport);
  }

  useEffect(() => {
    setChartData(transformData())
  },[transformData]);

  useEffect(() => {
    const wrapperDimensions = chartContainerRef.current.getBoundingClientRect();

    setChartHeight(wrapperDimensions.height);
  }, []);

  return <div className={'chart-wrapper'}>
    <div className={'title'}>{getTitle().map((titleItem: string, index: number) => (
      <span key={`title-item-${index}`}>{titleItem}</span>
    ))}</div>
    <div className={'chart-container'} ref={chartContainerRef}>
      <label className={'axis-label y1'}>Clicks</label>
      <label className={'axis-label y2'}>Impressions</label>
      <Chart data={chartData} height={chartHeight}>
        <ValueScale
          name="clickScale"
        />
        <ValueScale
          name="impressionScale"
        />

        <ArgumentAxis labelComponent={(props: ArgumentAxis.LabelProps) => renderLabel(props)}
                      showTicks={false}
        />
        <ValueAxis scaleName="clickScale" />
        <ValueAxis
          showGrid={false}
          scaleName="impressionScale"
          position="right"
        />

        <LineSeries valueField="clicks" argumentField="x" scaleName="clickScale" color={clicksColor} />
        <LineSeries valueField="impressions" argumentField="x" scaleName="impressionScale" color={impressionsColor} />
        <ZoomAndPan viewport={viewport} onViewportChange={handleViewportChange} />
      </Chart>
    </div>
    <div className={'legends'}>
      <span className={'legend'} style={clicksColorStyle}>Clicks</span>
      <span className={'legend'} style={impressionsColorStyle}>Impressions</span>
    </div>
  </div>
};

const labelHalfWidth = 80;
let lastLabelCoordinate: number = 0;

const renderLabel = (props: any) => {
  const {text, x} = props;

  if (
    lastLabelCoordinate &&
    lastLabelCoordinate < x &&
    x - lastLabelCoordinate <= labelHalfWidth
  ) {
    return null;
  }
  lastLabelCoordinate = x;

  return <text className="Component-root-5" {...props}>{text}</text>
}

const getLabelForDataSource = (selectedItems: Array<any>, defaultLabel: string, availableItems: Array<any>) => {
  if(selectedItems.length === 0 || selectedItems.length === availableItems.length) {
    return `All ${defaultLabel}s`;
  }

  let retVal = selectedItems.map((item: any) => `"${item}"`);

  if(retVal.length > 1) {
    return `${defaultLabel } ${retVal.slice(0, retVal.length - 1).join(', ')} and ${retVal.pop()}`;
  } else {
    return `${defaultLabel } ${retVal[0]}`;
  }
}