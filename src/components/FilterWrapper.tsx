import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {useFilterContext} from "../utilities/filterContext";
import {uniqBy} from 'lodash';

import CircleSign from "./CircleSign";
import RefreshSign from "./RefreshSign";

import Select from 'react-select';

export default () => {
  const data = useSelector((state: any) => state.dashboard.data);
  const {
    setSelectedDataSources,
    selectedCampaigns,
    selectedDataSources,
    setSelectedCampaigns
  } = useFilterContext();

  const [availableDataSources, setAvailableDataSources] = useState<Array<any>>([]);
  const [availableCampaigns, setAvailableCampaigns] = useState<Array<any>>([]);

  useEffect(() => {
    setAvailableDataSources(uniqBy(data.map((item: any) => ({value: item.Datasource, label: item.Datasource})), (item: any) => item.value));
    setAvailableCampaigns(uniqBy(data.map((item: any) => ({value: item.Campaign, label: item.Campaign})), (item: any) => item.value));
  }, [data]);

  const handleSelectedDataSourceChange = (selectedOptions: any) => {
    setSelectedDataSources(selectedOptions);
  }

  const handleSelectedCampaignChange = (selectedOptions: any) => {
    setSelectedCampaigns(selectedOptions);
  }

  return <div className={'filter-wrapper'}>
    <header>
      Filter dimension values
    </header>
    <div className={'filter'}>
      <span className={'label'}>
        <label>Datasource</label>
        <CircleSign />
        <RefreshSign />
      </span>
      <Select value={selectedDataSources}
              options={availableDataSources}
              onChange={handleSelectedDataSourceChange}
              placeholder={'All'}
              isClearable={false}
              isMulti
              isSearchable
      />
    </div>
    <div className={'filter'}>
      <span className={'label'}>
        <label>Campaign</label>
        <CircleSign />
        <RefreshSign />
      </span>
      <Select value={selectedCampaigns}
              options={availableCampaigns}
              onChange={handleSelectedCampaignChange}
              placeholder={'All'}
              isClearable={false}
              isMulti
              isSearchable
      />
    </div>
  </div>
};