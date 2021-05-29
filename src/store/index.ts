import { configureStore, combineReducers } from '@reduxjs/toolkit';

import dashboardReducer from "./dashboardState/dashboardReducer";

export interface ActionType {
  type: string;
  payload?: any;
}

const rootReducer = combineReducers({
  dashboard: dashboardReducer
});

const store = configureStore({
  reducer: rootReducer
})

export default store;