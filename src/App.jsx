import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Axios from 'axios';
import { DVOContext } from './contexts/DVOContext';
import Feed from './components/Feed';
import dummyOpportunities from './assets/dummyData/DummyVolunteer';
import OppInfo from './components/OppInfo/OppInfo';

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

  const [opportunities, setOpportunites] = useState({
    dummyOpportunities,
    selectedOpportunity: 1,
  });

  return (
    <Router>
      <DVOContext.Provider value={{ opportunities, setOpportunites }}>
        <div className="App">
          <header className="header-wrapper">
            <div><h1>RLACF Header</h1></div>
          </header>
          <div className="wrapper">
            <Route exact path="/" component={Feed} />
            <Route path="/opportunity"
              render={() => (
                <OppInfo
                  opp={opportunities.selectedOpportunity}
                />
              )}
            />
          </div>
        </div>
      </DVOContext.Provider>
    </Router>
  );
}

export default App;
