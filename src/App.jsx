import React, { useState, useEffect } from 'react';
import './App.css';
import { Route, withRouter } from 'react-router-dom';
import Axios from 'axios';
import { DVOContext } from './contexts/DVOContext';
import Feed from './components/Feed';
import dummyOpportunities from './assets/dummyData/DummyVolunteer';
import OppInfo from './components/OppInfo/OppInfo';
import Header from './components/Header/Header';

function App() {

  useEffect(() => {
    Axios
      .get(`${process.env.REACT_APP_ENDPOINT}/`)
      .then((res) => {
        console.log(res.data); // eslint-disable-line
      })
      .catch((err) => {
        console.log(err); // eslint-disable-line
      });
  }, []);

  const [state, setState] = useState({
    dummyOpportunities,
    selectedOpportunity: false,
  });

  return (
    <DVOContext.Provider value={{ state, setState }}>
      <div className="App">
        <header className="header-wrapper">
          <Header />
        </header>
        <div className="wrapper">
          <Route exact path="/"
            render={(routeProps) => (
              <Feed
                {...routeProps}
              />
            )}
          />
          <Route path="/opportunity/:id"
            render={(routeProps) => (
              <OppInfo
                {...routeProps} opp={state.dummyOpportunities}
              />
            )}
          />
        </div>
      </div>
    </DVOContext.Provider>
  );
}

export default withRouter(App);
