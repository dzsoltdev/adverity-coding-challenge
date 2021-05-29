import React, {useEffect} from 'react';
import {useDispatch} from "react-redux";
import {getDashboardData} from "./store/dashboardState/dashboardActions";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    getDashboardData(dispatch);
  }, []);

  return (
    <div className="App">
      <header className="App-header">

      </header>
    </div>
  );
}

export default App;
