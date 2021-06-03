import { createContext, useContext } from 'react';

export type FilterContextType = {
  selectedDataSources: Array<string>;
  selectedCampaigns: Array<string>;
  setSelectedDataSources: Function;
  setSelectedCampaigns: Function;

  availableDataSources: Array<any>;
  availableCampaigns: Array<any>;
  setAvailableDataSources: Function;
  setAvailableCampaigns: Function;
}

export const FilterContext = createContext<FilterContextType>({
  selectedDataSources: [],
  selectedCampaigns: [],
  setSelectedDataSources: () => console.warn('no setter provider'),
  setSelectedCampaigns: () => console.warn('no setter provider'),

  availableDataSources: [],
  availableCampaigns: [],
  setAvailableDataSources: () => console.warn('no setter provider'),
  setAvailableCampaigns: () => console.warn('no setter provider'),
});
export const useFilterContext = () => useContext(FilterContext);