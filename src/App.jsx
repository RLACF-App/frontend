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
    fetching: false,
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

  const setSelectedOpportunity = (opp) => {
    setState((prevState) => ({
      ...prevState,
      selectedOpportunity: opp,
    }));
  };

  const handleLoadMoreClick = () => {
    Axios
      .get(`${process.env.REACT_APP_ENDPOINT}/api/opportunities`, {
        params: {
          length: state.opportunities.length,
        },
      })
      .then((res) => {
        setState((prevState) => ({
          opportunities: [...prevState.opportunities, ...res.data],
          fetching: false,
        }));
      })
      .catch((err) => {
        console.log(err); // eslint-disable-line
      });
  };

  window.onscroll = () => {
    const d = document.documentElement;
    const offset = d.scrollTop + window.innerHeight;
    const height = d.offsetHeight;
    if (offset >= height && !state.fetching) {
      console.log(state.fetching, state.opportunities); 
      setState((prevState) => ({
        ...prevState, fetching: true,
      }));
      handleLoadMoreClick();
    }
  };

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
                handleLoadMoreClick={handleLoadMoreClick}
                setSelectedOpportunity={setSelectedOpportunity}
              />
            )}
          />
          <Route
            path="/opportunity/:id"
            render={(routeProps) => (
              <OppInfo
                routeProps={routeProps}
                opp={state.opportunities}
                selectedOpportunity={state.selectedOpportunity}
              />
            )}
          />
        </div>
      </div>
    </DVOContext.Provider>
  );
}

export default withRouter(App);
