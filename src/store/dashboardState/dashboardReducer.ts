import {DashboardState, dashboardActionTypes} from './dashboardStateTypes';
import {ActionType} from "../index";

const initialState: DashboardState = {
  data: []
};

const dashboardReducer = (state = initialState, action: ActionType) => {
  switch (action.type) {
    case dashboardActionTypes.GET_DASHBOARD_DATA: {
      return {
        data: action.payload
      };
    }
    default:
      return state;
  }
}

export default dashboardReducer;