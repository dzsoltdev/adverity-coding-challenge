import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getDashboardData} from "../store/dashboardState/dashboardActions";
import {FilterContext} from "../utilities/filterContext";

import FilterWrapper from "../components/FilterWrapper";
import ChartWrapper from "../components/ChartWrapper";
import {uniqBy} from "lodash";

export default () => {
  const dispatch = useDispatch();

  useEffect(() => {
    getDashboardData(dispatch);
  }, []);

  const data = useSelector((state: any) => state.dashboard.data);

  const [selectedDataSources, setSelectedDataSources] = useState<Array<string>>([]);
  const [selectedCampaigns, setSelectedCampaigns] = useState<Array<string>>([]);

  const [availableDataSources, setAvailableDataSources] = useState<Array<any>>([]);
  const [availableCampaigns, setAvailableCampaigns] = useState<Array<any>>([]);

  useEffect(() => {
    setAvailableDataSources(uniqBy(data.filter((item: any) => !!item.Datasource).map((item: any) => ({value: item.Datasource, label: item.Datasource})), (item: any) => item.value));
    setAvailableCampaigns(uniqBy(data.filter((item: any) => !!item.Campaign).map((item: any) => ({value: item.Campaign, label: item.Campaign})), (item: any) => item.value));
  }, [data]);

  const [filteredData, setFilteredData] = useState<Array<any>>(data);

  useEffect(() => {
    if(selectedDataSources.length === 0 && selectedCampaigns.length === 0) setFilteredData(data);
    else {
      let retVal = data.filter((item: any) => {
        return (selectedCampaigns.length === 0 || !!selectedCampaigns.find((selectedItem: any) => selectedItem.value === item.Campaign)) &&
          (selectedDataSources.length === 0 || !!selectedDataSources.find((selectedItem: any) => selectedItem.value === item.Datasource));
      });

      setFilteredData(retVal);
    }
  }, [data, selectedDataSources, selectedCampaigns])

  return <FilterContext.Provider value={{
    setSelectedDataSources, selectedCampaigns, selectedDataSources, setSelectedCampaigns,
    availableDataSources, availableCampaigns, setAvailableDataSources, setAvailableCampaigns
  }}>
    <div className={'dashboard'}>
      <FilterWrapper />
      <ChartWrapper data={filteredData} />
    </div>
  </FilterContext.Provider>
};