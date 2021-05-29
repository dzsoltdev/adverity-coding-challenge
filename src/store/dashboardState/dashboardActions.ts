import {dashboardActionTypes} from "./dashboardStateTypes";
import axios from "axios";
import {zipObject} from 'lodash';

export const getDashboardData = async (dispatch: Function) => {
  const response = await axios.get('http://adverity-challenge.s3-website-eu-west-1.amazonaws.com/DAMKBAoDBwoDBAkOBAYFCw.csv');
  let data = response?.data;

  if(data) {
    let keys: any = [];

    data = data.split('\n');
    keys = data.shift().split(',');

    data = data.map((item: string) => {
      return zipObject(keys, item.split(','));
    });
  }

  dispatch({
    type: dashboardActionTypes.GET_DASHBOARD_DATA,
    payload: data
  });
}