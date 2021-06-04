import React, {useEffect, useState} from "react";
import {useFilterContext} from "../utilities/filterContext";
import {isEqual} from 'lodash';
import classNames from "classnames";

import CircleSign from "./CircleSign";
import RefreshSign from "./RefreshSign";

import {default as VSelect} from "react-virtualized-select";

export default () => {
  const {
    setSelectedDataSources,
    selectedCampaigns,
    selectedDataSources,
    setSelectedCampaigns,
    availableDataSources,
    availableCampaigns
  } = useFilterContext();

  const [selectedDataSourcesToApply, setSelectedDataSourcesToApply] = useState<Array<any>>(selectedDataSources);
  const [selectedCampaignsToApply, setSelectedCampaignsToApply] = useState<Array<any>>(selectedCampaigns);

  const [isFilterDirty, setFilterDirty] = useState(false);

  const handleSelectedDataSourceChange = (selectedOptions: any) => {
    setSelectedDataSourcesToApply(selectedOptions.length > 0 ? selectedOptions.split(',') : []);
  }

  const handleSelectedCampaignChange = (selectedOptions: any) => {
    setSelectedCampaignsToApply(selectedOptions.length > 0 ? selectedOptions.split(',') : []);
  }

  useEffect(() => {
    if(!isEqual(selectedDataSources, selectedDataSourcesToApply) || !isEqual(selectedCampaigns, selectedCampaignsToApply)) setFilterDirty(true);
  }, [selectedDataSources, selectedDataSourcesToApply, selectedCampaigns, selectedCampaignsToApply]);

  const applyChanges = () => {
    setSelectedDataSources(selectedDataSourcesToApply);
    setSelectedCampaigns(selectedCampaignsToApply);
    setFilterDirty(false);
  };

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
      <VSelect
        valueKey='value'
        labelKey='label'
        backspaceToRemoveMessage={''}
        placeholder={'All'}
        multi={true}
        onChange={handleSelectedDataSourceChange}
        options={availableDataSources}
        searchable={true}
        autofocus
        clearable={true}
        simpleValue
        value={selectedDataSourcesToApply.join(',')}
      />
    </div>
    <div className={'filter'}>
      <span className={'label'}>
        <label>Campaign</label>
        <CircleSign />
        <RefreshSign />
      </span>
      <VSelect
        valueKey='value'
        labelKey='label'
        backspaceToRemoveMessage={''}
        placeholder={'All'}
        multi={true}
        onChange={handleSelectedCampaignChange}
        options={availableCampaigns}
        searchable={true}
        autofocus
        clearable={true}
        simpleValue
        value={selectedCampaignsToApply.join(',')}
      />
    </div>

    <div className={classNames('button', {disabled: !isFilterDirty})} onClick={applyChanges}>Apply</div>
  </div>
};