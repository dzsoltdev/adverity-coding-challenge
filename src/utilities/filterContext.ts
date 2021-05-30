import { createContext, useContext } from 'react';

export type FilterContextType = {
  selectedDataSources: Array<string>;
  selectedCampaigns: Array<string>;
  setSelectedDataSources: Function;
  setSelectedCampaigns: Function;
}

export const FilterContext = createContext<FilterContextType>({
  selectedDataSources: [],
  selectedCampaigns: [],
  setSelectedDataSources: () => console.warn('no setter provider'),
  setSelectedCampaigns: () => console.warn('no setter provider'),
});
export const useFilterContext = () => useContext(FilterContext);