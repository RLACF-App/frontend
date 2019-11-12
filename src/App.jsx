import React, { useState, useEffect } from 'react';
import './App.scss';
import { Route, withRouter } from 'react-router-dom';
import Axios from 'axios';
import { DVOContext } from './contexts/DVOContext';
import Feed from './components/Feed/Feed';
// import dummyOpportunities from './assets/dummyData/DummyVolunteer';
import OppInfo from './components/OppInfo/OppInfo';
import Header from './components/Header/Header';

function App() {
  const [state, setState] = useState({
    opportunities: [],
    selectedOpportunity: false,
  });

  useEffect(() => {
    Axios
      .get(`${process.env.REACT_APP_ENDPOINT}/api/opportunities`)
      .then((res) => {
        setState({ opportunities: res.data });
      })
      .catch((err) => {
        console.log(err); // eslint-disable-line
      });
  }, []);

  return (
    <DVOContext.Provider value={{ state, setState }}>
      <div className="App">
        <Header />
        <div className="wrapper">
          <Route
            exact
            path="/"
            render={(routeProps) => (
              <Feed
                routeProps={routeProps}
              />
            )}
          />
          <Route
            path="/opportunity/:id"
            render={(routeProps) => (
              <OppInfo
                routeProps={routeProps}
                opp={state.opportunities}
              />
            )}
          />
        </div>
      </div>
    </DVOContext.Provider>
  );
}

export default withRouter(App);
